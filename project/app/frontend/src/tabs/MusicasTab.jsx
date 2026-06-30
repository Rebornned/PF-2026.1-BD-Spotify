import { useState, useMemo, useEffect } from 'react'
import './../assets/styles/musica.css'
import DataTable from '../components/DataTable'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import Dropdown from '../components/Dropdown'
import SortButton from '../components/SortButton'

const TAMANHO_PAGINA = 10

const MUSICAS_MOCK = [
  { id: 1,  musica: 'Blinding Lights',       artista: 'The Weeknd',    album: 'After Hours',                  genero: 'R&B',     duracaoSeg: 200, popularidade: 95 },
  { id: 2,  musica: 'Shape of You',          artista: 'Ed Sheeran',    album: 'Divide',                       genero: 'Pop',     duracaoSeg: 233, popularidade: 92 },
  { id: 3,  musica: 'Hotel California',      artista: 'Eagles',        album: 'Hotel California',             genero: 'Rock',    duracaoSeg: 390, popularidade: 88 },
  { id: 4,  musica: 'Lose Yourself',         artista: 'Eminem',        album: '8 Mile',                       genero: 'Hip-Hop', duracaoSeg: 326, popularidade: 85 },
  { id: 5,  musica: 'Someone Like You',      artista: 'Adele',         album: '21',                           genero: 'Soul',    duracaoSeg: 285, popularidade: 82 },
  { id: 6,  musica: "God's Plan",            artista: 'Drake',         album: 'Scorpion',                     genero: 'Hip-Hop', duracaoSeg: 198, popularidade: 90 },
  { id: 7,  musica: 'Anti-Hero',             artista: 'Taylor Swift',  album: 'Midnights',                    genero: 'Pop',     duracaoSeg: 200, popularidade: 89 },
  { id: 8,  musica: 'Bad Guy',               artista: 'Billie Eilish', album: 'When We All Fall Asleep',      genero: 'Pop',     duracaoSeg: 194, popularidade: 88 },
  { id: 9,  musica: 'Yellow',                artista: 'Coldplay',      album: 'Parachutes',                   genero: 'Rock',    duracaoSeg: 269, popularidade: 87 },
  { id: 10, musica: 'Halo',                  artista: 'Beyoncé',       album: 'I Am... Sasha Fierce',         genero: 'R&B',     duracaoSeg: 261, popularidade: 86 },
  { id: 11, musica: 'Save Your Tears',       artista: 'The Weeknd',    album: 'After Hours',                  genero: 'R&B',     duracaoSeg: 215, popularidade: 84 },
  { id: 12, musica: 'Perfect',               artista: 'Ed Sheeran',    album: 'Divide',                       genero: 'Pop',     duracaoSeg: 263, popularidade: 83 },
  { id: 13, musica: 'Take It Easy',          artista: 'Eagles',        album: 'Eagles',                       genero: 'Rock',    duracaoSeg: 213, popularidade: 80 },
  { id: 14, musica: 'Without Me',            artista: 'Eminem',        album: 'The Eminem Show',              genero: 'Hip-Hop', duracaoSeg: 290, popularidade: 82 },
  { id: 15, musica: 'Rolling in the Deep',   artista: 'Adele',         album: '21',                           genero: 'Soul',    duracaoSeg: 228, popularidade: 91 },
  { id: 16, musica: 'In My Feelings',        artista: 'Drake',         album: 'Scorpion',                     genero: 'Hip-Hop', duracaoSeg: 218, popularidade: 81 },
  { id: 17, musica: 'Shake It Off',          artista: 'Taylor Swift',  album: '1989',                         genero: 'Pop',     duracaoSeg: 219, popularidade: 86 },
  { id: 18, musica: 'Ocean Eyes',            artista: 'Billie Eilish', album: "Don't Smile at Me",            genero: 'Pop',     duracaoSeg: 200, popularidade: 79 },
  { id: 19, musica: 'Fix You',               artista: 'Coldplay',      album: 'X&Y',                          genero: 'Rock',    duracaoSeg: 295, popularidade: 85 },
  { id: 20, musica: 'Crazy in Love',         artista: 'Beyoncé',       album: 'Dangerously in Love',          genero: 'R&B',     duracaoSeg: 236, popularidade: 84 },
  { id: 21, musica: 'Starboy',               artista: 'The Weeknd',    album: 'Starboy',                      genero: 'R&B',     duracaoSeg: 230, popularidade: 90 },
  { id: 22, musica: 'Thinking Out Loud',     artista: 'Ed Sheeran',    album: 'X',                            genero: 'Pop',     duracaoSeg: 281, popularidade: 86 },
  { id: 23, musica: "Don't Stop Believin'",  artista: 'Journey',       album: 'Escape',                       genero: 'Rock',    duracaoSeg: 251, popularidade: 88 },
  { id: 24, musica: 'Stan',                  artista: 'Eminem',        album: 'The Marshall Mathers LP',      genero: 'Hip-Hop', duracaoSeg: 404, popularidade: 78 },
  { id: 25, musica: 'Hello',                 artista: 'Adele',         album: '25',                           genero: 'Soul',    duracaoSeg: 295, popularidade: 89 },
  { id: 26, musica: 'One Dance',             artista: 'Drake',         album: 'Views',                        genero: 'Hip-Hop', duracaoSeg: 173, popularidade: 87 },
  { id: 27, musica: 'Blank Space',           artista: 'Taylor Swift',  album: '1989',                         genero: 'Pop',     duracaoSeg: 231, popularidade: 85 },
  { id: 28, musica: 'Lovely',                artista: 'Billie Eilish', album: 'Lovely',                       genero: 'Pop',     duracaoSeg: 200, popularidade: 83 },
  { id: 29, musica: 'Viva La Vida',          artista: 'Coldplay',      album: 'Viva la Vida',                 genero: 'Rock',    duracaoSeg: 242, popularidade: 86 },
  { id: 30, musica: 'Single Ladies',         artista: 'Beyoncé',       album: 'I Am... Sasha Fierce',         genero: 'R&B',     duracaoSeg: 193, popularidade: 82 },
]

const COLUMNS = [
  { key: 'idx',          label: '#',       type: 'number', width: '5%'  },
  { key: 'musica',       label: 'MÚSICA',                  width: '25%' },
  { key: 'artista',      label: 'ARTISTA',                 width: '20%' },
  { key: 'album',        label: 'ALBUM',                   width: '23%' },
  { key: 'genero',       label: 'GÊNERO',                  width: '10%' },
  { key: 'duracao',      label: 'DUR.',    type: 'number', width: '9%'  },
  { key: 'popularidade', label: 'POP.',    type: 'number', width: '8%'  },
]

const OPCOES_BUSCA = [
  { value: 'musica',  label: 'música' },
  { value: 'artista', label: 'artista' },
  { value: 'album',   label: 'álbum' },
  { value: 'genero',  label: 'gênero' },
]

const OPCOES_ORDEM = [
  { value: 'musica',       label: 'nome' },
  { value: 'popularidade', label: 'popularidade' },
  { value: 'duracao',      label: 'duração' },
  { value: 'artista',      label: 'artista' },
  { value: 'album',        label: 'álbum' },
  { value: 'genero',       label: 'gênero' },
]

function formatarDuracao(seg) {
  const m = Math.floor(seg / 60)
  const s = String(seg % 60).padStart(2, '0')
  return `${m}m${s}`
}

export default function MusicasTab({ onSelecionarGenero }) {
  const [busca, setBusca] = useState('')
  const [campoBusca, setCampoBusca] = useState('musica')
  const [ordem, setOrdem] = useState('popularidade')
  const [direcao, setDirecao] = useState('desc')
  const [pagina, setPagina] = useState(1)

  // Reseta pra página 1 sempre que filtro/ordem muda
  useEffect(() => { setPagina(1) }, [busca, campoBusca, ordem, direcao])

  const musicasFiltradas = useMemo(() => {
    const q = busca.trim().toLowerCase()
    const filtrado = q
      ? MUSICAS_MOCK.filter(m => String(m[campoBusca] ?? '').toLowerCase().includes(q))
      : MUSICAS_MOCK

    const chaveOrdem = ordem === 'duracao' ? 'duracaoSeg' : ordem
    return [...filtrado].sort((a, b) => {
      const va = a[chaveOrdem]
      const vb = b[chaveOrdem]
      if (typeof va === 'number' && typeof vb === 'number') {
        return direcao === 'asc' ? va - vb : vb - va
      }
      return direcao === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va))
    })
  }, [busca, campoBusca, ordem, direcao])

  const totalPaginas = Math.max(1, Math.ceil(musicasFiltradas.length / TAMANHO_PAGINA))
  const inicio = (pagina - 1) * TAMANHO_PAGINA
  const musicasPagina = musicasFiltradas.slice(inicio, inicio + TAMANHO_PAGINA)

  const renderCell = (row, col, i) => {
    if (col.key === 'idx') return inicio + i + 1
    if (col.key === 'duracao') return formatarDuracao(row.duracaoSeg)
    if (col.key === 'genero') return (
        <button
            type="button"
            className="musica-tbl-genero"
            onClick={() => onSelecionarGenero(row.genero)}
            aria-label={`Ver detalhes do gênero ${row.genero}`}
        >
            {row.genero}
        </button>
        )
    return row[col.key]
    }

  return (
    <div className="musica-body">

      <div className="musica-nav">
        <div className="musica-nav-left">
          <SearchBar value={busca} onChange={setBusca} />
          <div className="text-light">por</div>
          <Dropdown
            value={campoBusca}
            onChange={setCampoBusca}
            options={OPCOES_BUSCA}
            ariaLabel="Pesquisar por"
          />
        </div>

        <div className="musica-nav-center"></div>

        <div className="musica-nav-right">
          <div className="text-light">ordenar</div>
          <Dropdown
            value={ordem}
            onChange={setOrdem}
            options={OPCOES_ORDEM}
            ariaLabel="Ordenar por"
          />
          <SortButton
            direction={direcao}
            onToggle={() => setDirecao(d => d === 'asc' ? 'desc' : 'asc')}
          />
        </div>
      </div>

      <DataTable
        className="musica-tbl"
        columns={COLUMNS}
        rows={musicasPagina}
        renderCell={renderCell}
      />

      <div className="musica-foot">
        <div className="text-light">
          {musicasFiltradas.length.toLocaleString('pt-BR')} músicas
        </div>
        <Pagination current={pagina} total={totalPaginas} onChange={setPagina} />
        <div className="text-light">pg. {pagina}/{totalPaginas}</div>
      </div>

    </div>
  )
}