import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'motion/react'
import { words } from '../../data/words'
import { Hud } from '../Hud'
import { Monster, MONSTER_COUNT } from '../Monster'
import { SpellFlash } from '../SpellFlash'
import { SpellWord } from '../SpellWord'
import { WizardHands } from '../WizardHands'
import './style.css'


const GAME_OVER_WHISPERS = [
  "you almost had it (probably)",
  "that was… a valid attempt",
  // "failure is just a pause with consequences",
  "too slow.",
  "please try again during business hours",
  // "great job staying calm under artificial pressure",
  "stay calm under artificial pressure",
  // "it's over. you can now relax in a productive way",
  "relax in a productive way",
  "you were doing great until you weren’t",
  "no autocomplete can help here",
  "nothing is wrong. except the result",
  "try again. it'll be worse",
  "not this time.",
  "focus lost.",
  "game over? stay productive",
  "continue?",
]

function randomInt(maxExclusive) {
  if (maxExclusive <= 0) return 0
  if (globalThis.crypto?.getRandomValues) {
    const a = new Uint32Array(1)
    globalThis.crypto.getRandomValues(a)
    return a[0] % maxExclusive
  }
  return Math.floor(Math.random() * maxExclusive)
}

export function GameScene() {
  const [wordIndex, setWordIndex] = useState(() => randomInt(words.length))
  const [monsterIndex, setMonsterIndex] = useState(0)
  const [typedCount, setTypedCount] = useState(0)
  const [mistakeIndex, setMistakeIndex] = useState(-1)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [state, setState] = useState('playing') // playing | casting | gameover
  const [whisper, setWhisper] = useState('')

  const currentWord = useMemo(() => words[wordIndex] ?? words[0], [wordIndex])

  const approach = useMotionValue(0)
  // --- dificuldade ---
  // SPEED_INITIAL: velocidade da rodada 1
  // SPEED_INCREMENT: quanto aumenta por rodada
  // SPEED_MAX: teto
  const SPEED_INITIAL = 0.09
  const SPEED_INCREMENT = 0.012
  const SPEED_MAX = 0.32
  // --------------------
  const speedRef = useRef(SPEED_INITIAL)
  const rafRef = useRef(0)
  const lastTRef = useRef(0)
  const isMountedRef = useRef(false)
  const mistakeUntilRef = useRef(0)
  const stateRef = useRef(state)
  const mistakeIndexRef = useRef(mistakeIndex)
  const castTimeoutRef = useRef(0)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    mistakeIndexRef.current = mistakeIndex
  }, [mistakeIndex])

  const resetRound = () => {
    setWordIndex(prev => {
      // sorteia entre todas as palavras exceto a atual, evitando repetição imediata
      const nextCandidate = randomInt(words.length - 1)
      return nextCandidate >= prev ? nextCandidate + 1 : nextCandidate
    })
    setMonsterIndex(prev => (prev + 1) % MONSTER_COUNT)
    setTypedCount(0)
    setMistakeIndex(-1)
    approach.set(0)
  }

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      window.clearTimeout(castTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const key = e.key

      if (state === 'gameover' && key === 'Enter') {
        speedRef.current = 0.09
        setScore(0)
        setRound(1)
        setState('playing')
        resetRound()
        return
      }

      if (state !== 'playing') return
      if (key.length !== 1) return

      const nextChar = currentWord[typedCount]
      if (!nextChar) return

      if (key.toLowerCase() === nextChar.toLowerCase()) {
        setTypedCount((c) => c + 1)
        setMistakeIndex(-1)
      } else {
        const now = performance.now()
        mistakeUntilRef.current = now + 220
        setMistakeIndex(typedCount)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [currentWord, typedCount, state])

  useEffect(() => {
    if (state !== 'playing') return
    if (typedCount !== currentWord.length) return

    setState('casting')
    setScore((s) => s + 160)
  }, [typedCount, currentWord, state])

  useEffect(() => {
    if (state !== 'casting') return

    window.clearTimeout(castTimeoutRef.current)
    castTimeoutRef.current = window.setTimeout(() => {
      if (!isMountedRef.current) return
      speedRef.current = Math.min(speedRef.current + SPEED_INCREMENT, SPEED_MAX)
      setRound((r) => r + 1)
      resetRound()
      setState('playing')
    }, 520)

    return () => window.clearTimeout(castTimeoutRef.current)
  }, [state])

  useEffect(() => {
    function frame(t) {
      if (!isMountedRef.current) return
      if (lastTRef.current === 0) lastTRef.current = t
      const dt = Math.max(0, Math.min(0.05, (t - lastTRef.current) / 1000))
      lastTRef.current = t

      if (stateRef.current === 'playing') {
        const next = approach.get() + speedRef.current * dt
        approach.set(next)

        const now = performance.now()
        if (mistakeIndexRef.current >= 0 && now > mistakeUntilRef.current) setMistakeIndex(-1)

        if (next >= 1) {
          setState('gameover')
          setWhisper(GAME_OVER_WHISPERS[randomInt(GAME_OVER_WHISPERS.length)])
        }
      }

      rafRef.current = window.requestAnimationFrame(frame)
    }

    rafRef.current = window.requestAnimationFrame(frame)
    return () => {
      window.cancelAnimationFrame(rafRef.current)
      lastTRef.current = 0
    }
  }, [approach])

  const isCasting = state === 'casting'
  const isGameOver = state === 'gameover'

  const columnY = useTransform(approach, [0, 1], [40, 180])
  const columnScale = useTransform(approach, [0, 1], [0.85, 1.80])

  return (
    <div className="gameRoot">
      <div className="gameBg" />
      <SpellFlash visible={isCasting} />

      <div className="gameStage" role="application" aria-label="Monster Type Game">
        <Hud round={round} score={score} approach={approach} />
        <div className="gameStage__horizon" />

        {!isGameOver ? (
          <>
            <motion.div
              className="monsterColumn"
              style={{
                position: 'absolute',
                left: '50%',
                top: '5%',
                x: '-50%',
                y: columnY,
                scale: columnScale,
              }}
            >
              <div className="monsterColumn__word">
                {/* <p className="gameScene__prompt">Digite a palavra mágica antes do monstro chegar.</p> */}
                <SpellWord word={currentWord} typedCount={typedCount} mistakeIndex={mistakeIndex} />
              </div>
              <Monster key={round} monsterIndex={monsterIndex} isDefeated={isCasting} />
            </motion.div>
            <WizardHands isCasting={isCasting} />
          </>
        ) : null}


        <AnimatePresence>
          {isGameOver && (
            <motion.div
              className="gameUI"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              // exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="gameOver">
                <div className="gameOver__title">Game Over</div>
                <div className="gameOver__stats">
                  <div className="gameOver__stat">
                    <div className="gameOver__statLabel">Round</div>
                    <div className="gameOver__statValue">{round}</div>
                  </div>
                  <div className="gameOver__stat">
                    <div className="gameOver__statLabel">Score</div>
                    <div className="gameOver__statValue">{score.toLocaleString('pt-BR')}</div>
                  </div>
                </div>
                <div className="gameOver__subtitle">Press Enter to restart</div>
                <motion.div
                  className="gameOver__whisper"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1.4, ease: 'easeIn' }}
                >
                  {whisper}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
