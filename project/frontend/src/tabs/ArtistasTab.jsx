import { useState, useEffect } from 'react'
import './../assets/styles/artista.css'
import DataTable from '../components/DataTable'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'

const TAMANHO_PAGINA = 10

const COLUMNS = [
  { key: 'nome',         label: 'ARTISTA',                  width: '50%' },
  { key: 'qtdMusicas',   label: 'MÚSICAS', type: 'number', width: '15%' },
  { key: 'qtdAlbuns',    label: 'ALBUNS',  type: 'number', width: '15%' },
  { key: 'popularidade', label: 'POP. MÉDIA', type: 'number', width: '20%' },
]

export default function ArtistasTab() {
  const [busca, setBusca] = useState('')
  const [pagina, setPagina] = useState(1)
  
  const [artistas, setArtistas] = useState([])
  const [totalArtistas, setTotalArtistas] = useState(0)
  const [artistaSelecionado, setArtistaSelecionado] = useState(null)
  const [detalhesPerfil, setDetalhesPerfil] = useState({ topMusicas: [], topAlbuns: [] })
  const [carregandoTabela, setCarregandoTabela] = useState(false)

  const carregarListaArtistas = () => {
    setCarregandoTabela(true)
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/artistas?busca=${encodeURIComponent(busca)}&pagina=${pagina}`)
      .then(res => res.json())
      .then(data => {
        const formatados = data.artistas.map((row, index) => ({
          id: index + (pagina - 1) * TAMANHO_PAGINA,
          nome: row.artista,
          qtdMusicas: row.qtd_musicas,
          qtdAlbuns: row.qtd_album,
          popularidade: Math.round(row.pop_media) // Arredonda a média decimal vinda do SQL
        }))
        setArtistas(formatados)
        setTotalArtistas(data.total)
        setCarregandoTabela(false)
        
        // Auto-seleciona o primeiro da lista se não houver nenhum selecionado
        if (formatados.length > 0 && !artistaSelecionado) {
          setArtistaSelecionado(formatados[0])
        }
      })
      .catch(err => {
        console.error(err)
        setCarregandoTabela(false)
      })
  }

  useEffect(() => {
    carregarListaArtistas()
  }, [pagina])

  const handlePesquisa = () => {
    setPagina(1)
    carregarListaArtistas()
  }

  useEffect(() => {
    if (!artistaSelecionado) return
    // Para isto:
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/artistas/detalhes?nome=${encodeURIComponent(artistaSelecionado.nome)}`)
      .then(res => res.json())
      .then(data => {
        setDetalhesPerfil({
          topMusicas: data.topMusicas.map(m => ({ nome: m.musica, popularidade: m.popularidade })),
          topAlbuns: data.topAlbuns.map(a => ({ nome: a.album, popularidade: Math.round(a.pop_media) }))
        })
      })
      .catch(err => console.error(err))
  }, [artistaSelecionado])

  const totalPaginas = Math.max(1, Math.ceil(totalArtistas / TAMANHO_PAGINA))

  return (
    <div className="artista-page">

      {/**/}
      <aside className="artista-aside">
        {artistaSelecionado ? (
          <>
            <div className="artista-aside-head">
              <div className="artista-aside-nome">{artistaSelecionado.nome}</div>
              <table className="artista-aside-stats">
                <tbody>
                  <tr><td>Quantidade de músicas</td><td>{artistaSelecionado.qtdMusicas}</td></tr>
                  <tr><td>Quantidade de álbuns</td><td>{artistaSelecionado.qtdAlbuns}</td></tr>
                  <tr><td>Popularidade Média</td><td>{artistaSelecionado.popularidade}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="line-split"></div>

            <div>
              <div className="text-light-bold">TOP 5 MÚSICAS</div>
              <table className="artista-aside-musicas">
                <tbody>
                  {detalhesPerfil.topMusicas.map((m, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{m.nome}</td>
                      <td>{m.popularidade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="line-split"></div>

            <div>
              <div className="text-light-bold">TOP 3 ÁLBUNS</div>
              <table className="artista-aside-albuns">
                <tbody>
                  {detalhesPerfil.topAlbuns.map((a, i) => (
                    <tr key={i}>
                      <td>{a.nome}</td>
                      <td>{a.popularidade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="text-light">Selecione um artista para ver detalhes.</div>
        )}
      </aside>

      {/**/}
      <div className="artista-body">
        <div className="artista-nav">
          <SearchBar
            value={busca}
            onChange={setBusca}
            placeholder="Pesquisar artista..."
          />
          <button type="button" className="grey-btn" onClick={handlePesquisa}>
            Pesquisar
          </button>
        </div>

        {carregandoTabela ? (
          <p style={{ color: '#1db954', padding: '20px' }}>Carregando dados do banco...</p>
        ) : (
          <DataTable
            className="artista-tbl"
            columns={COLUMNS}
            rows={artistas}
            onRowClick={(row) => setArtistaSelecionado(row)}
            rowClassName={(row) =>
              artistaSelecionado && row.id === artistaSelecionado.id ? 'row-selected' : ''
            }
          />
        )}

        <div className="artista-foot">
          <div className="text-light">
            {totalArtistas.toLocaleString('pt-BR')} artistas encontrados
          </div>
          <Pagination current={pagina} total={totalPaginas} onChange={setPagina} />
          <div className="text-light">pg. {pagina}/{totalPaginas}</div>
        </div>
      </div>

    </div>
  )
}