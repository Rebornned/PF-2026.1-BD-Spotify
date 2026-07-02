import { useState, useEffect } from 'react'
import { AlertCircle, Clock } from 'lucide-react'
import icon from '../../public/icon.png'

export default function SplashScreen({ mensagem, erro, onTentarNovamente }) {
  const [segundos, setSegundos] = useState(0)

  useEffect(() => {
    if (erro) return
    const id = setInterval(() => setSegundos(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [erro])

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <img src={icon} alt="" className="splash-logo" />
        <div className="splash-title">Spotify Explorer</div>

        {erro ? (
          <>
            <div className="splash-error-icon">
              <AlertCircle size={40} />
            </div>
            <div className="splash-message splash-message-error">{mensagem}</div>
            <button
              type="button"
              className="splash-retry-btn"
              onClick={onTentarNovamente}
            >
              Tentar novamente
            </button>
          </>
        ) : (
          <>
            <div className="splash-spinner" aria-hidden="true" />
            <div className="splash-message">{mensagem}</div>

            <div className="splash-hint">
              <Clock size={14} />
              <span>A primeira conexão pode levar até 40 segundos enquanto o servidor inicia.</span>
            </div>

            {segundos >= 5 && (
              <div className="splash-timer">
                Aguardando há {segundos}s...
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}