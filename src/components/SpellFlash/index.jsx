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
          // impacto → eco suave → some
          animate={{ opacity: [0, 0.55, 0, 0.2, 0] }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.55,
            times: [0, 0.08, 0.3, 0.45, 1],
            ease: 'easeOut',
          }}
        />
      ) : null}
    </AnimatePresence>
  )
}
