import { motion } from 'motion/react'
import bracoImg from '../../assets/wizard-bw/parts/braco.png'
import maoVarinhaImg from '../../assets/wizard-bw/parts/mao-e-varinha.png'
import './style.css'

export function WizardHands({ isCasting }) {
  return (
    <motion.div
      className="wizard"
      aria-label="mago"
      initial={false}
      animate={isCasting ? { y: [0, -6, 0], rotate: [0, -2, 0] } : { y: 0, rotate: 0 }}
      transition={{ duration: 0.25 }}
    >
      <img className="wizard__braco" src={bracoImg} alt="" draggable={false} />
      <img className="wizard__mao-varinha" src={maoVarinhaImg} alt="" draggable={false} />
    </motion.div>
  )
}
