import { motion } from 'motion/react'
import { Monster1 } from './Monster1'
import './style.css'

const MONSTERS = [Monster1]

export function Monster({ monsterIndex, isDefeated }) {
  const MonsterComponent = MONSTERS[monsterIndex % MONSTERS.length]

  return (
    <motion.div
      className="monster"
      initial={false}
      // shake + cresce → some
      animate={isDefeated
        ? { x: [0, -10, 10, -7, 7, 0], scale: [1, 1.05, 1.1, 1.15, 1.25, 1.8], opacity: [1, 1, 1, 1, 1, 0] }
        : { x: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: 'linear' }}
    >
      <MonsterComponent />
    </motion.div>
  )
}
