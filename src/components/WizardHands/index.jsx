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
      style={{ 
        x: '-110%' ,
        transformOrigin: '0% 100%', // anchor point
      }}
      // Animação de casting: recuo → arremesso → volta
      // y: positivo = desce, negativo = sobe. 14 = recuo, -18 = arremesso
      // rotate: graus. 3 = inclina no recuo, -5 = arremessa
      // scale: 0.94 = encolhe no recuo, 1.06 = estica no arremesso
      // duration: duração total em segundos
      // times: em que ponto do duration cada keyframe ocorre (0 a 1)
      // animate={isCasting
      //     ? { 
      //       // y: [0, 14, 14, 0],
      //       rotate: [0, 5, 5, 0], 
      //       // scale: [1, 1.06, 1.06, 1] 
      //     }
      //     : { y: 0, rotate: 0, scale: 1 }}
      transition={{ duration: 0.45, times: [0, 0.2, 0.55, 1], ease: 'easeOut' }}
    >
      <motion.img 
      className="wizard__braco" 
      src={bracoImg} alt="" 
      draggable={false} 
      animate={isCasting
        ? { 
          // y: [0, 14, 14, 0],
          rotate: [0, 2, 2, 0], 
          // scale: [1, 1.01, 1.01, 1] 
        }
        : { y: 0, rotate: 0, scale: 1 }}
        transition={{ duration: 0.25, 
          times: [0, 0.1, 0.55, 1], 
          ease: 'easeOut' 
        }}
      />

      <motion.img
        className="wizard__mao-varinha"
        src={maoVarinhaImg}
        alt=""
        draggable={false}
        initial={false}
        style={{ 
          transformOrigin: '0% 100%', // anchor point
        }}  
        animate={isCasting
          ? { 
            // y: [0, 14, 14, 0],
            rotate: [0, 8, 5, 0], 
            // scale: [1, 1.01, 1.01, 1] 
          }
          : { y: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.25, 
            times: [0, 0.5, 0.55, 1], 
            ease: 'easeOut' 
          }}
      />
    </motion.div>
  )
}
