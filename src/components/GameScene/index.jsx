import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { words } from '../../data/words'
import mageImg from '../../assets/mage.png'
import monster1 from '../../assets/monster-1.png'
import monster2 from '../../assets/monster-2.png'
import monster3 from '../../assets/monster-3.png'
import { Hud } from '../Hud'
import { Monster } from '../Monster'
import { SpellFlash } from '../SpellFlash'
import { SpellWord } from '../SpellWord'
import { WizardHands } from '../WizardHands'
import './style.css'

const MONSTER_IMGS = [monster1, monster2, monster3]

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
  const [monsterIndex, setMonsterIndex] = useState(() => randomInt(MONSTER_IMGS.length))
  const [typedCount, setTypedCount] = useState(0)
  const [mistakeIndex, setMistakeIndex] = useState(-1)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [state, setState] = useState('playing') // playing | casting | gameover

  const currentWord = useMemo(() => words[wordIndex] ?? words[0], [wordIndex])
  const monsterImg = MONSTER_IMGS[monsterIndex]

  const approach = useMotionValue(0)
  const speedRef = useRef(0.09) // approach units per second
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
    setWordIndex(randomInt(words.length))
    setMonsterIndex((prev) => {
      const next = randomInt(MONSTER_IMGS.length - 1)
      return next >= prev ? next + 1 : next
    })
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
    setScore((s) => s + 1)
  }, [typedCount, currentWord, state])

  useEffect(() => {
    if (state !== 'casting') return

    window.clearTimeout(castTimeoutRef.current)
    castTimeoutRef.current = window.setTimeout(() => {
      if (!isMountedRef.current) return
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
  const columnScale = useTransform(approach, [0, 1], [0.65, 1.55])

  return (
    <div className="gameRoot">
      <div className="gameBg" />
      <SpellFlash visible={isCasting} />

      <Hud score={score} round={round} state={state} />

      <div className="gameStage" role="application" aria-label="Monster Type Game">
        <div className="gameStage__horizon" />

        {!isGameOver ? (
          <motion.div
            className="monsterColumn"
            style={{
              position: 'absolute',
              left: '50%',
              top: '10%',
              x: '-50%',
              y: columnY,
              scale: columnScale,
            }}
          >
            <div className="monsterColumn__word">
              {/* <p className="gameScene__prompt">Digite a palavra mágica antes do monstro chegar.</p> */}
              <SpellWord word={currentWord} typedCount={typedCount} mistakeIndex={mistakeIndex} />
            </div>
            <Monster monsterImg={monsterImg} approach={approach} isDefeated={isCasting} />
          </motion.div>
        ) : null}
        <WizardHands wizardImg={mageImg} isCasting={isCasting} />

        {isGameOver ? (
          <div className="gameUI">
            <div className="gameOver">
              <div className="gameOver__title">Game Over</div>
              <div className="gameOver__subtitle">Pressione Enter para recomeçar</div>
              <button
                className="gameOver__btn"
                onClick={() => {
                  speedRef.current = 0.09
                  setScore(0)
                  setRound(1)
                  setState('playing')
                  resetRound()
                }}
              >
                Recomeçar
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
