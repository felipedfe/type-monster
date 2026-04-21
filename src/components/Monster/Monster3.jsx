import { motion } from 'motion/react'
import cabecaBocaImg from '../../assets/monster-3/parts/cabeca-e-boca.png'
import orelhaImg from '../../assets/monster-3/parts/orelha.png'
import olhoImg from '../../assets/monster-3/parts/olho.png'
import pupilaImg from '../../assets/monster-3/parts/pupila.png'
import bochechaImg from '../../assets/monster-3/parts/bochecha.png'
import './monster3.css'

export function Monster3() {
  return (
    <div className="monster3">
      <motion.img
        className="monster3__orelha monster3__orelha--left"
        src={orelhaImg} alt="" draggable={false}
        style={{ transformOrigin: 'bottom right' }}
        animate={{ rotate: [0, -10, 6, -4, 0] }}
        transition={{ duration: 2, times: [0, 0.3, 0.6, 0.8, 1], repeat: Infinity, ease: 'easeInOut', repeatDelay: 0 }}
      />
      <motion.img
        className="monster3__orelha monster3__orelha--right"
        src={orelhaImg} alt="" draggable={false}
        style={{ transformOrigin: 'bottom right', scaleX: -1 }}
        animate={{
          rotate: [0, 10, -6, 4, 0] // movimento em cada keyframe
        }}
        transition={{
          duration: 2, // duração da anima em segundos
          times: [0, 0.3, 0.6, 0.8, 1], // em que momento cada keyframe acontece (array tem o mesmo número de keyframes)
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 0, // delay entre o reinicio de cada animação
          delay: 0.3 // delay na hora de começar a animação
        }}
      />
      <img className="monster3__cabeca" src={cabecaBocaImg} alt="" draggable={false} />
      <motion.img
        className="monster3__bochecha monster3__bochecha--left"
        src={bochechaImg} alt="" draggable={false}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <motion.img
        className="monster3__bochecha monster3__bochecha--right"
        src={bochechaImg} alt="" draggable={false}
        animate={{ rotate: -360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      <img className="monster3__olho" src={olhoImg} alt="" draggable={false} />
      <motion.img
        className="monster3__pupila"
        src={pupilaImg} alt="" draggable={false}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
