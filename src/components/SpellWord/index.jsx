import { motion } from 'framer-motion'
import './style.css'

export function SpellWord({ word, typedCount, mistakeIndex }) {
  return (
    <div className="spellWord" aria-label="palavra mágica">
      {word.split('').map((ch, idx) => {
        const state =
          idx < typedCount ? 'correct' : idx === mistakeIndex ? 'wrong' : 'pending'

        return (
          <motion.span
            key={`${ch}-${idx}`}
            className={`spellChar spellChar--${state}`}
            initial={false}
            animate={
              state === 'correct'
                ? { x: 0, y: [0, -1.25, 0] }
                : { x: 0, y: 0 }
            }
            transition={{
              duration: 0.11,
              times: [0, 0.42, 1],
              ease: [0.25, 0.8, 0.25, 1],
            }}
          >
            {ch}
          </motion.span>
        )
      })}
    </div>
  )
}
