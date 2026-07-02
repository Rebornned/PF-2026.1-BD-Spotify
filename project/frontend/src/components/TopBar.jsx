import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import icon from '../../public/icon.png'

const ABAS = [
  { id: 'musicas',       label: 'Músicas' },
  { id: 'artistas',      label: 'Artistas' },
  { id: 'generos',       label: 'Gêneros' },
  { id: 'estatisticas',  label: 'Estatísticas' },
]

export default function TopBar({ abaAtiva, onMudarAba }) {
  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && menuAberto) setMenuAberto(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuAberto])

  const handleMudarAba = (id) => {
    onMudarAba(id)
    setMenuAberto(false)
  }

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-left">
          <img className="spotify-icon" src={icon} alt="" />
          <div className="app-title">Spotify Explorer</div>
        </div>

        <nav className="header-center header-nav-desktop">
          {ABAS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`header-btn ${abaAtiva === id ? 'active' : ''}`}
              onClick={() => handleMudarAba(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setMenuAberto(a => !a)}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
        >
          {menuAberto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuAberto && (
        <nav className="header-nav-mobile">
          {ABAS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`header-btn ${abaAtiva === id ? 'active' : ''}`}
              onClick={() => handleMudarAba(id)}
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}