import { useState } from 'react'
import './../assets/styles/stat.css'
import DataTable from '../components/DataTable'

const QUERIES = {
  top10Artistas: {
    label: 'Top 10 Artistas',
    columns: [
      { key: 'rank',       label: '#',          type: 'number', width: '5%'  },
      { key: 'artista',    label: 'ARTISTA',                    width: '40%' },
      { key: 'qtdMusicas', label: 'MÚSICAS',    type: 'number', width: '15%' },
      { key: 'qtdAlbuns',  label: 'ÁLBUNS',     type: 'number', width: '15%' },
      { key: 'popMedia',   label: 'POP. MÉDIA', type: 'number', width: '25%' },
    ],
    rows: [
      { id: 1,  rank: 1,  artista: 'The Weeknd',    qtdMusicas: 92,  qtdAlbuns: 12, popMedia: 89 },
      { id: 2,  rank: 2,  artista: 'Ed Sheeran',    qtdMusicas: 147, qtdAlbuns: 8,  popMedia: 82 },
      { id: 3,  rank: 3,  artista: 'Adele',         qtdMusicas: 65,  qtdAlbuns: 5,  popMedia: 79 },
      { id: 4,  rank: 4,  artista: 'Eminem',        qtdMusicas: 234, qtdAlbuns: 11, popMedia: 77 },
      { id: 5,  rank: 5,  artista: 'Drake',         qtdMusicas: 312, qtdAlbuns: 15, popMedia: 74 },
      { id: 6,  rank: 6,  artista: 'Taylor Swift',  qtdMusicas: 218, qtdAlbuns: 13, popMedia: 72 },
      { id: 7,  rank: 7,  artista: 'Billie Eilish', qtdMusicas: 88,  qtdAlbuns: 6,  popMedia: 70 },
      { id: 8,  rank: 8,  artista: 'Coldplay',      qtdMusicas: 124, qtdAlbuns: 9,  popMedia: 68 },
      { id: 9,  rank: 9,  artista: 'Beyoncé',       qtdMusicas: 95,  qtdAlbuns: 7,  popMedia: 67 },
      { id: 10, rank: 10, artista: 'Eagles',        qtdMusicas: 72,  qtdAlbuns: 6,  popMedia: 65 },
    ],
  },

  top10Generos: {
    label: 'Top 10 Gêneros',
    columns: [
      { key: 'rank',        label: '#',            type: 'number', width: '5%'  },
      { key: 'genero',      label: 'GÊNERO',                       width: '40%' },
      { key: 'qtdMusicas',  label: 'QTD. MÚSICAS', type: 'number', width: '20%' },
      { key: 'popMedia',    label: 'POP. MÉDIA',   type: 'number', width: '20%' },
      { key: 'qtdArtistas', label: 'ARTISTAS',     type: 'number', width: '15%' },
    ],
    rows: [
      { id: 1,  rank: 1,  genero: 'Pop',       qtdMusicas: 12450, popMedia: 82.3, qtdArtistas: 2840 },
      { id: 2,  rank: 2,  genero: 'Hip-Hop',   qtdMusicas: 9820,  popMedia: 78.1, qtdArtistas: 1920 },
      { id: 3,  rank: 3,  genero: 'Rock',      qtdMusicas: 8340,  popMedia: 71.5, qtdArtistas: 2100 },
      { id: 4,  rank: 4,  genero: 'R&B',       qtdMusicas: 6180,  popMedia: 74.9, qtdArtistas: 980  },
      { id: 5,  rank: 5,  genero: 'EDM',       qtdMusicas: 5640,  popMedia: 69.2, qtdArtistas: 760  },
      { id: 6,  rank: 6,  genero: 'Soul',      qtdMusicas: 4320,  popMedia: 70.4, qtdArtistas: 540  },
      { id: 7,  rank: 7,  genero: 'Jazz',      qtdMusicas: 3950,  popMedia: 62.8, qtdArtistas: 480  },
      { id: 8,  rank: 8,  genero: 'Country',   qtdMusicas: 3620,  popMedia: 65.1, qtdArtistas: 520  },
      { id: 9,  rank: 9,  genero: 'Indie',     qtdMusicas: 3210,  popMedia: 63.5, qtdArtistas: 410  },
      { id: 10, rank: 10, genero: 'Classical', qtdMusicas: 2890,  popMedia: 58.2, qtdArtistas: 380  },
    ],
  },

  acimaMedia: {
    label: 'Artistas acima da média',
    columns: [
      { key: 'rank',         label: '#',                type: 'number', width: '5%'  },
      { key: 'artista',      label: 'ARTISTA',                          width: '60%' },
      { key: 'totalMusicas', label: 'TOTAL DE MÚSICAS', type: 'number', width: '35%' },
    ],
    rows: [
      { id: 1, rank: 1, artista: 'George Jones',            totalMusicas: 332 },
      { id: 2, rank: 2, artista: 'Pritam',                  totalMusicas: 323 },
      { id: 3, rank: 3, artista: 'Wolfgang Amadeus Mozart', totalMusicas: 305 },
      { id: 4, rank: 4, artista: 'Arijit Singh',            totalMusicas: 259 },
      { id: 5, rank: 5, artista: 'Hank Williams',           totalMusicas: 243 },
    ],
  },

  topPorGenero: {
    label: 'Música top/gênero',
    columns: [
      { key: 'rank',         label: '#',            type: 'number', width: '5%'  },
      { key: 'genero',       label: 'GÊNERO',                       width: '25%' },
      { key: 'musica',       label: 'MÚSICA',                       width: '50%' },
      { key: 'popularidade', label: 'POPULARIDADE', type: 'number', width: '20%' },
    ],
    rows: [
      { id: 1, rank: 1, genero: 'acoustic',    musica: 'Hold On',         popularidade: 82 },
      { id: 2, rank: 2, genero: 'afrobeat',    musica: 'Atrévete-Te-Te',  popularidade: 75 },
      { id: 3, rank: 3, genero: 'alt-rock',    musica: 'Sweater Weather', popularidade: 93 },
      { id: 4, rank: 4, genero: 'alternative', musica: 'Miss You',        popularidade: 87 },
      { id: 5, rank: 5, genero: 'ambient',     musica: 'Apocalypse',      popularidade: 84 },
    ],
  },

  maisMusicas: {
    label: 'Álbuns c/ mais músicas',
    columns: [
      { key: 'rank',       label: '#',            type: 'number', width: '5%'  },
      { key: 'album',      label: 'ÁLBUM',                        width: '55%' },
      { key: 'qtdMusicas', label: 'QTD. MÚSICAS', type: 'number', width: '20%' },
      { key: 'popMedia',   label: 'POP. MÉDIA',   type: 'number', width: '20%' },
    ],
    rows: [
      { id: 1, rank: 1, album: 'The Complete Hank Williams',  qtdMusicas: 110, popMedia: 16.3 },
      { id: 2, rank: 2, album: 'Greatest Hits',               qtdMusicas: 77,  popMedia: 40.9 },
      { id: 3, rank: 3, album: 'Mozart: A Night of Classics', qtdMusicas: 75,  popMedia: 15.2 },
      { id: 4, rank: 4, album: 'Alternative Christmas 2022',  qtdMusicas: 73,  popMedia: 0.0  },
      { id: 5, rank: 5, album: 'Mozart - All Day Classics',   qtdMusicas: 68,  popMedia: 12.3 },
    ],
  },
}

export default function EstatisticasTab() {
  const [queryAtiva, setQueryAtiva] = useState('top10Artistas')
  const query = QUERIES[queryAtiva]

  return (
    <div className="stat-body">

      <div className="stat-nav">
        {Object.entries(QUERIES).map(([id, q]) => (
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

      <DataTable
        className="stat-tbl"
        columns={query.columns}
        rows={query.rows}
      />

      <div className="stat-foot">
        <div className="text-light">Consultas fixas - sem paginação.</div>
      </div>

    </div>
  )
}