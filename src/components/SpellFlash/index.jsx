import { AnimatePresence, motion } from 'motion/react'
import './style.css'

/** Piscada rápida cobrindo a viewport inteira (efeito de magia ao acertar a palavra). */
export function SpellFlash({ visible }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="spell-flash"
          className="spellFlash"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.34,
            times: [0, 0.14, 1],
            ease: ['linear', 'easeOut', 'easeIn'],
          }}
        />
      ) : null}
    </AnimatePresence>
  )
}
