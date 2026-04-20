import { motion } from 'motion/react'
import cabecaImg from '../../assets/monster-1/parts/cabeca.png'
import chifreImg from '../../assets/monster-1/parts/chifre.png'
import olhosImg from '../../assets/monster-1/parts/olhos.png'
import pupilaImg from '../../assets/monster-1/parts/pupila.png'
import narizImg from '../../assets/monster-1/parts/nariz.png'
import './monster1.css'

export function Monster1() {
  return (
    <div className="monster1">
      {[
        { cls: 'monster1__chifre--left',   delay: 0,   style: {},             animate: { x: [0, 8, -3, 0],  y: [0, 8, -3, 0] } },
        { cls: 'monster1__chifre--center', delay: 0.5, style: { rotate: 45 }, animate: { y: [0, 8, -3, 0] }                    },
        { cls: 'monster1__chifre--right',  delay: 0.7, style: { scaleX: -1 }, animate: { x: [0, -4, 4, 0],  y: [0, 4, -4, 0] } },
      ].map(({ cls, delay, style, animate }) => (
        <motion.img
          key={cls}
          className={`monster1__chifre ${cls}`}
          src={chifreImg}
          alt=""
          draggable={false}
          style={style}
          animate={animate}
          transition={{
            duration: 1,
            times: [0, 0.65, 0.8, 1],
            ease: ['easeIn', 'easeOut', 'easeOut'],
            repeat: Infinity,
            delay,
          }}
        />
      ))}
      <img className="monster1__cabeca" src={cabecaImg} alt="" draggable={false} />
      <img className="monster1__nariz" src={narizImg} alt="" draggable={false} />
      <img className="monster1__olhos" src={olhosImg} alt="" draggable={false} />
      <motion.img
        className="monster1__pupila monster1__pupila--left"
        src={pupilaImg}
        alt=""
        draggable={false}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <motion.img
        className="monster1__pupila monster1__pupila--right"
        src={pupilaImg}
        alt=""
        draggable={false}
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
