import { useState, useEffect, useRef } from 'react'
import './../assets/styles/genero.css'
import DataTable from '../components/DataTable'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import Dropdown from '../components/Dropdown'
import SortButton from '../components/SortButton'

const TAMANHO_PAGINA = 10

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

  const [generos, setGeneros] = useState([])
  const [totalGeneros, setTotalGeneros] = useState(0)
  const [carregando, setCarregando] = useState(false)

  const montado = useRef(false)

  const carregarDadosDoBanco = (termoBusca, paginaAtual, ordenacao, ordemDirecao) => {
    setCarregando(true)
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const url = `${API_URL}/api/generos?busca=${encodeURIComponent(termoBusca)}&ordem=${ordenacao}&direcao=${ordemDirecao}&pagina=${paginaAtual}`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const formatados = data.generos.map((row, index) => ({
          id: index + 1 + (paginaAtual - 1) * TAMANHO_PAGINA,
          genero: row.genero,
          qtdMusicas: row.qtd_musicas,
          popMedia: row.pop_media,
          qtdArtistas: row.qtd_artistas
        }))
        setGeneros(formatados)
        setTotalGeneros(data.total)
        setCarregando(false)
      })
      .catch(err => {
        console.error("Erro ao buscar gêneros:", err)
        setCarregando(false)
      })
  }

  useEffect(() => {
    if (generoPreSelecionado) {
      setBusca(generoPreSelecionado)
      setPagina(1)
      onConsumir()
      carregarDadosDoBanco(generoPreSelecionado, 1, ordem, direcao)
    } else if (!montado.current) {
      carregarDadosDoBanco(busca, pagina, ordem, direcao)
      montado.current = true
    }
  }, [generoPreSelecionado])

  useEffect(() => {
    if (generoPreSelecionado) return

    carregarDadosDoBanco(busca, pagina, ordem, direcao)
  }, [pagina, ordem, direcao])

  const handleMudancaBusca = (novoValor) => {
    setBusca(novoValor)
    setPagina(1)
    carregarDadosDoBanco(novoValor, 1, ordem, direcao)
  }

  return (
    <div className="genero-body">

      <div className="genero-nav">
        <div className="text-light">ordenar</div>
        <Dropdown
          value={ordem}
          onChange={(o) => { setOrdem(o); setPagina(1); carregarDadosDoBanco(busca, 1, o, direcao); }}
          options={OPCOES_ORDEM}
          ariaLabel="Ordenar por"
        />
        <SortButton
          direction={direcao}
          onToggle={() => {
            const d = direcao === 'asc' ? 'desc' : 'asc';
            setDirecao(d);
            setPagina(1);
            carregarDadosDoBanco(busca, 1, ordem, d);
          }}
        />
        <SearchBar
          value={busca}
          onChange={handleMudancaBusca}
          placeholder="Pesquisar gênero..."
        />
      </div>

      <DataTable
        className="genero-tbl"
        columns={COLUMNS}
        rows={generos}
        loading={carregando}
      />

      <div className="genero-foot">
        <div className="text-light">
          {totalGeneros.toLocaleString('pt-BR')} gêneros encontrados
        </div>
        <Pagination current={pagina} total={Math.max(1, Math.ceil(totalGeneros / TAMANHO_PAGINA))} onChange={setPagina} />
        <div className="text-light">pg. {pagina}/{Math.max(1, Math.ceil(totalGeneros / TAMANHO_PAGINA))}</div>
      </div>

    </div>
  )
}