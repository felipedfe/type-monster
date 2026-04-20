import './style.css'

export function Hud({ score, round, state }) {
  return (
    <div className="hud" aria-label="hud">
      <div className="hud__left">
        <div className="hud__stat">
          <div className="hud__label">Score</div>
          <div className="hud__value">{score}</div>
        </div>
        <div className="hud__stat">
          <div className="hud__label">Rodada</div>
          <div className="hud__value">{round}</div>
        </div>
      </div>
      {/* <div className="hud__right">
        <div className={`hud__badge hud__badge--${state}`}>{state}</div>
      </div> */}
    </div>
  )
}
