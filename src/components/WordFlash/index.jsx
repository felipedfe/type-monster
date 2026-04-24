import { AnimatePresence, motion } from 'motion/react'
import './style.css'

export function WordFlash({ src }) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          key={src}
          className="wordFlash"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.18, times: [0, 0.2, 1], ease: 'easeOut' }}
        >
          <img src={src} className="wordFlash__img" draggable={false} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
