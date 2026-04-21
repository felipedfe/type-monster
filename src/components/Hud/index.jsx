import { motion, useTransform } from 'motion/react'
import './style.css'

export function Hud({ round, score, approach }) {
  const barScale = useTransform(approach, [0, 1], [0, 1])

  return (
    <div className="hud" aria-label="hud">
      <div className="hud__timerBar">
        <motion.div className="hud__timerBar__fill" style={{ scaleX: barScale }} />
      </div>
      <div className="hud__stat">
        <div className="hud__label">Round</div>
        <div className="hud__value">{round}</div>
      </div>
      <div className="hud__stat">
        <div className="hud__label">Score</div>
        <div className="hud__value">{score.toLocaleString('pt-BR')}</div>
      </div>
    </div>
  )
}
