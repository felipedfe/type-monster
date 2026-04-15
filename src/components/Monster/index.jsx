import { motion, useMotionTemplate, useTransform } from 'motion/react'
import './style.css'

export function Monster({ monsterImg, approach, isDefeated }) {
  const blur = useTransform(approach, [0, 1], [2, 0])
  const shadow = useTransform(approach, [0, 1], [0.15, 0.5])
  const filter = useMotionTemplate`blur(${blur}px)`
  const boxShadow = useMotionTemplate`0 18px 60px rgba(0,0,0,${shadow})`

  return (
    <motion.div
      className="monster"
      initial={false}
      animate={isDefeated ? { opacity: 0, scale: 1.7 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.22 }}
    >
      <motion.img
        className="monster__img"
        src={monsterImg}
        alt="Monstro"
        draggable={false}
        style={{
          filter,
          boxShadow,
        }}
      />
    </motion.div>
  )
}
