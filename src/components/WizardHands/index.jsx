import { motion } from 'motion/react'
import './style.css'

export function WizardHands({ wizardImg, isCasting }) {
  return (
    <div className="wizard" aria-label="mago">
      <motion.img
        className="wizard__img"
        src={wizardImg}
        alt="Mago"
        draggable={false}
        initial={false}
        animate={isCasting ? { y: [0, -6, 0], rotate: [0, -2, 0] } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        className="wizard__handGlow"
        aria-hidden
        initial={false}
        animate={
          isCasting ? { opacity: [0.2, 0.9, 0.2], scale: [1, 1.1, 1] } : { opacity: 0.2, scale: 1 }
        }
        transition={{ duration: 0.35 }}
      />
    </div>
  )
}
