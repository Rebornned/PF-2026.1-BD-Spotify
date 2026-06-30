import { useState, useEffect } from 'react'
import './../assets/styles/stat.css'
import DataTable from '../components/DataTable'

const CONFIG_QUERIES = {
  top10Artistas: {
    label: 'Top 10 Artistas',
    columns: [
      { key: 'rank',       label: '#',          type: 'number', width: '5%'  },
      { key: 'artista',    label: 'ARTISTA',                    width: '40%' },
      { key: 'qtdMusicas', label: 'MÚSICAS',    type: 'number', width: '15%' },
      { key: 'qtdAlbuns',  label: 'ÁLBUNS',     type: 'number', width: '15%' },
      { key: 'popMedia',   label: 'POP. MÉDIA', type: 'number', width: '25%' },
    ]
  },
  top10Generos: {
    label: 'Top 10 Gêneros',
    columns: [
      { key: 'rank',        label: '#',            type: 'number', width: '5%'  },
      { key: 'genero',      label: 'GÊNERO',                       width: '40%' },
      { key: 'qtdMusicas',  label: 'QTD. MÚSICAS', type: 'number', width: '20%' },
      { key: 'popMedia',    label: 'POP. MÉDIA',   type: 'number', width: '20%' },
      { key: 'qtdArtistas', label: 'ARTISTAS',     type: 'number', width: '15%' },
    ]
  },
  acimaMedia: {
    label: 'Artistas acima da média',
    columns: [
      { key: 'rank',         label: '#',                type: 'number', width: '5%'  },
      { key: 'artista',      label: 'ARTISTA',                          width: '60%' },
      { key: 'totalMusicas', label: 'TOTAL DE MÚSICAS', type: 'number', width: '35%' },
    ]
  },
  topPorGenero: {
    label: 'Música top/gênero',
    columns: [
      { key: 'rank',         label: '#',            type: 'number', width: '5%'  },
      { key: 'genero',       label: 'GÊNERO',                       width: '25%' },
      { key: 'musica',       label: 'MÚSICA',                       width: '50%' },
      { key: 'popularidade', label: 'POPULARIDADE', type: 'number', width: '20%' },
    ]
  },
  maisMusicas: {
    label: 'Álbuns c/ mais músicas',
    columns: [
      { key: 'rank',       label: '#',            type: 'number', width: '5%'  },
      { key: 'album',      label: 'ÁLBUM',                        width: '55%' },
      { key: 'qtdMusicas', label: 'QTD. MÚSICAS', type: 'number', width: '20%' },
      { key: 'popMedia',   label: 'POP. MÉDIA',   type: 'number', width: '20%' },
    ]
  }
}

export default function EstatisticasTab() {
  const [queryAtiva, setQueryAtiva] = useState('top10Artistas')
  const [linhasTabela, setLinhasTabela] = useState([])
  const [carregando, setCarregando] = useState(false)

  const configuracaoAtual = CONFIG_QUERIES[queryAtiva]

  useEffect(() => {
    setCarregando(true)
    fetch(`http://localhost:5000/api/estatisticas?tipo=${queryAtiva}`)
      .then(res => res.json())
      .then(data => {
        setLinhasTabela(data)
        setCarregando(false)
      })
      .catch(err => {
        console.error("Erro ao processar métricas analíticas:", err)
        setCarregando(false)
      })
  }, [queryAtiva])

  return (
    <div className="stat-body">

      <div className="stat-nav">
        {Object.entries(CONFIG_QUERIES).map(([id, q]) => (
          <button
            key={id}
            type="button"
            className={`stat-btn ${queryAtiva === id ? 'active' : ''}`}
            onClick={() => setQueryAtiva(id)}
          >
            {q.label}
          </button>
        ))}
      </div>

      <div style={{ position: 'relative' }}>
        {carregando && (
          <div style={{
            position: 'absolute', 
            top: '15px', 
            right: '20px', 
            color: '#1db954',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}>
            Executando Subqueries...
          </div>
        )}

        <DataTable
          className="stat-tbl"
          columns={configuracaoAtual.columns}
          rows={linhasTabela}
        />
      </div>

      <div className="stat-foot">
        <div className="text-light">
          {carregando ? "Computando agregados no banco..." : `Consulta ativa: ${configuracaoAtual.label} (Resultados diretos do banco de dados).`}
        </div>
      </div>

    </div>
  )
}