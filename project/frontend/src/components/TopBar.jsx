import icon from '../assets/icon.png'

const ABAS = [
  { id: 'musicas', label: 'Músicas' },
  { id: 'artistas', label: 'Artistas' },
  { id: 'generos', label: 'Gêneros' },
  { id: 'estatisticas', label: 'Estatísticas' },
]

export default function TopBar({ abaAtiva, onMudarAba }) {
  return (
    <div className="app-header">
      <div className="header-left">
        <img className="spotify-icon" src={icon} alt="" />
        <div className="app-title">Spotify Explorer</div>
      </div>
      <div className="header-center">
        {ABAS.map(({ id, label }) => (
          <button
            key={id}
            className={`header-btn ${abaAtiva === id ? 'active' : ''}`}
            onClick={() => onMudarAba(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="header-right"></div>
    </div>
  )
}