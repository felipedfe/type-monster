import cabecaImg from '../../assets/monster-1/parts/cabeca.png'
import chifreImg from '../../assets/monster-1/parts/chifre.png'
import olhosImg from '../../assets/monster-1/parts/olhos.png'
import pupilaImg from '../../assets/monster-1/parts/pupila.png'
import narizImg from '../../assets/monster-1/parts/nariz.png'
import './monster1.css'

export function Monster1() {
  return (
    <div className="monster1">
      <img className="monster1__chifre monster1__chifre--left" src={chifreImg} alt="" draggable={false} />
      <img className="monster1__chifre monster1__chifre--center" src={chifreImg} alt="" draggable={false} />
      <img className="monster1__chifre monster1__chifre--right" src={chifreImg} alt="" draggable={false} />
      <img className="monster1__cabeca" src={cabecaImg} alt="" draggable={false} />
      <img className="monster1__nariz" src={narizImg} alt="" draggable={false} />
      <img className="monster1__olhos" src={olhosImg} alt="" draggable={false} />
      <img className="monster1__pupila monster1__pupila--left" src={pupilaImg} alt="" draggable={false} />
      <img className="monster1__pupila monster1__pupila--right" src={pupilaImg} alt="" draggable={false} />
    </div>
  )
}
