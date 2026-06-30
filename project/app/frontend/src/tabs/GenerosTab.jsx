import { useState, useMemo, useEffect } from 'react'
import './../assets/styles/genero.css'
import DataTable from '../components/DataTable'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import Dropdown from '../components/Dropdown'
import SortButton from '../components/SortButton'

const TAMANHO_PAGINA = 10

const NOMES_GENEROS = [
  'Pop', 'Hip-Hop', 'Rock', 'R&B', 'EDM', 'Soul', 'Jazz', 'Classical', 'Country',
  'Reggae', 'Blues', 'Funk', 'Metal', 'Indie', 'Latin', 'K-Pop', 'Folk', 'Punk',
  'Acoustic', 'Alternative', 'Ambient', 'Electronic', 'House', 'Techno', 'Disco',
  'Salsa', 'Samba', 'MPB', 'Sertanejo', 'Pagode', 'Forró', 'Reggaeton', 'Trap',
]

const GENEROS_MOCK = NOMES_GENEROS.map((nome, i) => ({
  id: i + 1,
  genero: nome,
  qtdMusicas: 12500 - i * 320,
  popMedia: parseFloat((85 - i * 1.5).toFixed(1)),
  qtdArtistas: 2900 - i * 60,
}))

const COLUMNS = [
  { key: 'genero',      label: 'GÊNERO',                       width: '40%' },
  { key: 'qtdMusicas',  label: 'QTD. MÚSICAS', type: 'number', width: '20%' },
  { key: 'popMedia',    label: 'POP. MÉDIA',   type: 'number', width: '20%' },
  { key: 'qtdArtistas', label: 'ARTISTAS',     type: 'number', width: '20%' },
]

const OPCOES_ORDEM = [
  { value: 'genero',      label: 'nome' },
  { value: 'qtdMusicas',  label: 'qtd. músicas' },
  { value: 'popMedia',    label: 'popularidade' },
  { value: 'qtdArtistas', label: 'qtd. artistas' },
]

export default function GenerosTab({ generoPreSelecionado, onConsumir }) {
  const [busca, setBusca] = useState('')
  const [ordem, setOrdem] = useState('qtdMusicas')
  const [direcao, setDirecao] = useState('desc')
  const [pagina, setPagina] = useState(1)

  useEffect(() => {
    if (generoPreSelecionado) {
      setBusca(generoPreSelecionado)
      onConsumir()
    }
  }, [generoPreSelecionado, onConsumir])

  useEffect(() => { setPagina(1) }, [busca, ordem, direcao])

  const generosFiltrados = useMemo(() => {
    const q = busca.trim().toLowerCase()
    const filtrado = q
      ? GENEROS_MOCK.filter(g => g.genero.toLowerCase().includes(q))
      : GENEROS_MOCK

    return [...filtrado].sort((a, b) => {
      const va = a[ordem]
      const vb = b[ordem]
      if (typeof va === 'number' && typeof vb === 'number') {
        return direcao === 'asc' ? va - vb : vb - va
      }
      return direcao === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va))
    })
  }, [busca, ordem, direcao])

  const totalPaginas = Math.max(1, Math.ceil(generosFiltrados.length / TAMANHO_PAGINA))
  const inicio = (pagina - 1) * TAMANHO_PAGINA
  const generosPagina = generosFiltrados.slice(inicio, inicio + TAMANHO_PAGINA)

  return (
    <div className="genero-body">

      <div className="genero-nav">
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
        <SearchBar
          value={busca}
          onChange={setBusca}
          placeholder="Pesquisar gênero..."
        />
      </div>

      <DataTable
        className="genero-tbl"
        columns={COLUMNS}
        rows={generosPagina}
      />

      <div className="genero-foot">
        <div className="text-light">
          {generosFiltrados.length.toLocaleString('pt-BR')} gêneros
        </div>
        <Pagination current={pagina} total={totalPaginas} onChange={setPagina} />
        <div className="text-light">pg. {pagina}/{totalPaginas}</div>
      </div>

    </div>
  )
}