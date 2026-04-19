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
      animate={isDefeated ? { opacity: 0, scale: 1.7 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.22 }}
    >
      <MonsterComponent />
    </motion.div>
  )
}
