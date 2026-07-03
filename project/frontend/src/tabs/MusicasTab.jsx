import { useState, useEffect } from 'react'
import './../assets/styles/musica.css'
import DataTable from '../components/DataTable'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import Dropdown from '../components/Dropdown'
import SortButton from '../components/SortButton'

const TAMANHO_PAGINA = 10

const COLUMNS = [
  { key: 'idx',          label: '#',        type: 'number', width: '5%'  },
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
  if (!seg) return "0m00"
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
  const [termoDebounced, setTermoDebounced] = useState(busca)

  const [musicas, setMusicas] = useState([])
  const [totalMusicas, setTotalMusicas] = useState(0)
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    const cronometro = setTimeout(() => {
      setTermoDebounced(busca)
    }, 0) 
    return () => clearTimeout(cronometro)
  }, [busca])

  useEffect(() => { 
    setPagina(1) 
  }, [termoDebounced, campoBusca, ordem, direcao])

  useEffect(() => {
    setCarregando(true)
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const url = `${API_URL}/api/musicas?busca=${encodeURIComponent(termoDebounced)}&campoBusca=${campoBusca}&ordem=${ordem}&direcao=${direcao}&pagina=${pagina}`

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const dadosFormatados = data.musicas.map((row, index) => ({
        id: index + 1, 
        musica: row.ms_name,     
        artista: row.art_name,    
        album: row.alb_name,     
        genero: row.gen_name,    
        duracaoSeg: row.duracao,  
        popularidade: row.popularidade 
      }))

        setMusicas(dadosFormatados)
        setTotalMusicas(data.total)
        setCarregando(false)
      })
      .catch(error => {
        console.error("Erro na integração:", error)
        setCarregando(false)
      })
  }, [busca, campoBusca, ordem, direcao, pagina]) 

  const totalPaginas = Math.max(1, Math.ceil(totalMusicas / TAMANHO_PAGINA))
  const inicio = (pagina - 1) * TAMANHO_PAGINA

  const renderCell = (row, col, i) => {
    if (col.key === 'idx') return inicio + i + 1
    if (col.key === 'duracao') return `${row.duracaoSeg}`
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
        rows={musicas}
        renderCell={renderCell}
        loading={carregando && musicas.length === 0}
      />

      <div className="musica-foot">
        <div className="text-light">
          {totalMusicas.toLocaleString('pt-BR')} músicas encontradas
        </div>
        <Pagination current={pagina} total={totalPaginas} onChange={setPagina} />
        <div className="text-light">pg. {pagina}/{totalPaginas}</div>
      </div>
    </div>
  )
}