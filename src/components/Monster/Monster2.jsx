import { motion } from 'motion/react'
import cabecaImg from '../../assets/monster-2/parts/cabeca.png'
import chifreImg from '../../assets/monster-2/parts/chifre.png'
import detalheChifreImg from '../../assets/monster-2/parts/detalhe-chifre.png'
import bocaImg from '../../assets/monster-2/parts/boca.png'
import pupilaImg from '../../assets/monster-2/parts/pupila.png'
import './monster2.css'

export function Monster2() {
  return (
    <div className="monster2">
      <img className="monster2__chifre monster2__chifre--left" src={chifreImg} alt="" draggable={false} />
      <img className="monster2__chifre monster2__chifre--right" src={chifreImg} alt="" draggable={false} />
      <img className="monster2__cabeca" src={cabecaImg} alt="" draggable={false} />
      <img className="monster2__boca" src={bocaImg} alt="" draggable={false} />
      {[
        { cls: 'monster2__pupila--1',  duration: 0.8 },
        { cls: 'monster2__pupila--2',  duration: 1.7  },
        { cls: 'monster2__pupila--3',  duration: 1  },
      ].map(({ cls, delay, duration }) => (
        <motion.img
          key={cls}
          className={`monster2__pupila ${cls}`}
          src={pupilaImg} alt="" draggable={false}
          animate={{ x: [-18, 18] }}
          transition={{ duration: duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
      ))}
      <motion.img
        className="monster2__detalhe monster2__detalhe--left"
        src={detalheChifreImg} alt="" draggable={false}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <motion.img
        className="monster2__detalhe monster2__detalhe--right"
        src={detalheChifreImg} alt="" draggable={false}
        animate={{ rotate: -360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
