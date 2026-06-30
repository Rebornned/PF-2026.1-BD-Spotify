import { useState, useMemo, useEffect } from 'react'
import './../assets/styles/artista.css'
import DataTable from '../components/DataTable'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'

const TAMANHO_PAGINA = 10

const ARTISTAS_MOCK = [
  {
    id: 1, nome: 'The Weeknd', qtdMusicas: 92, qtdAlbuns: 12, popularidade: 89,
    topMusicas: [
      { nome: 'Blinding Lights', popularidade: 95 },
      { nome: 'Starboy', popularidade: 91 },
      { nome: 'Save Your Tears', popularidade: 88 },
      { nome: "Can't Feel My Face", popularidade: 87 },
      { nome: 'Heartless', popularidade: 85 },
    ],
    topAlbuns: [
      { nome: 'After Hours', popularidade: 88 },
      { nome: 'Beauty Behind the Madness', popularidade: 82 },
      { nome: 'Starboy', popularidade: 79 },
    ],
  },
  {
    id: 2, nome: 'Ed Sheeran', qtdMusicas: 147, qtdAlbuns: 8, popularidade: 82,
    topMusicas: [
      { nome: 'Shape of You', popularidade: 92 },
      { nome: 'Perfect', popularidade: 89 },
      { nome: 'Thinking Out Loud', popularidade: 87 },
      { nome: 'Photograph', popularidade: 84 },
      { nome: 'Bad Habits', popularidade: 82 },
    ],
    topAlbuns: [
      { nome: 'Divide', popularidade: 90 },
      { nome: 'X', popularidade: 85 },
      { nome: 'Plus', popularidade: 78 },
    ],
  },
  {
    id: 3, nome: 'Adele', qtdMusicas: 65, qtdAlbuns: 5, popularidade: 79,
    topMusicas: [
      { nome: 'Hello', popularidade: 91 },
      { nome: 'Someone Like You', popularidade: 90 },
      { nome: 'Rolling in the Deep', popularidade: 88 },
      { nome: 'Easy on Me', popularidade: 85 },
      { nome: 'Set Fire to the Rain', popularidade: 83 },
    ],
    topAlbuns: [
      { nome: '21', popularidade: 90 },
      { nome: '25', popularidade: 85 },
      { nome: '30', popularidade: 82 },
    ],
  },
  {
    id: 4, nome: 'Eminem', qtdMusicas: 234, qtdAlbuns: 11, popularidade: 77,
    topMusicas: [
      { nome: 'Lose Yourself', popularidade: 90 },
      { nome: 'Without Me', popularidade: 86 },
      { nome: 'Stan', popularidade: 84 },
      { nome: 'Not Afraid', popularidade: 82 },
      { nome: 'Rap God', popularidade: 80 },
    ],
    topAlbuns: [
      { nome: 'The Marshall Mathers LP', popularidade: 88 },
      { nome: 'The Eminem Show', popularidade: 85 },
      { nome: 'Encore', popularidade: 79 },
    ],
  },
  {
    id: 5, nome: 'Drake', qtdMusicas: 312, qtdAlbuns: 15, popularidade: 74,
    topMusicas: [
      { nome: "God's Plan", popularidade: 92 },
      { nome: 'In My Feelings', popularidade: 88 },
      { nome: 'One Dance', popularidade: 87 },
      { nome: 'Hotline Bling', popularidade: 85 },
      { nome: 'Started From the Bottom', popularidade: 82 },
    ],
    topAlbuns: [
      { nome: 'Scorpion', popularidade: 89 },
      { nome: 'Views', popularidade: 86 },
      { nome: 'Take Care', popularidade: 84 },
    ],
  },
  {
    id: 6, nome: 'Taylor Swift', qtdMusicas: 218, qtdAlbuns: 13, popularidade: 72,
    topMusicas: [
      { nome: 'Anti-Hero', popularidade: 91 },
      { nome: 'Shake It Off', popularidade: 89 },
      { nome: 'Blank Space', popularidade: 87 },
      { nome: 'Cruel Summer', popularidade: 85 },
      { nome: 'Love Story', popularidade: 83 },
    ],
    topAlbuns: [
      { nome: 'Midnights', popularidade: 90 },
      { nome: '1989', popularidade: 88 },
      { nome: 'Folklore', popularidade: 85 },
    ],
  },
  {
    id: 7, nome: 'Billie Eilish', qtdMusicas: 88, qtdAlbuns: 6, popularidade: 70,
    topMusicas: [
      { nome: 'Bad Guy', popularidade: 90 },
      { nome: 'Lovely', popularidade: 87 },
      { nome: 'Ocean Eyes', popularidade: 84 },
      { nome: 'Happier Than Ever', popularidade: 82 },
      { nome: 'Therefore I Am', popularidade: 80 },
    ],
    topAlbuns: [
      { nome: 'When We All Fall Asleep', popularidade: 88 },
      { nome: 'Happier Than Ever', popularidade: 85 },
      { nome: 'Lovely', popularidade: 78 },
    ],
  },
  {
    id: 8, nome: 'Coldplay', qtdMusicas: 124, qtdAlbuns: 9, popularidade: 68,
    topMusicas: [
      { nome: 'Yellow', popularidade: 87 },
      { nome: 'Fix You', popularidade: 86 },
      { nome: 'Viva La Vida', popularidade: 87 },
      { nome: 'The Scientist', popularidade: 84 },
      { nome: 'A Sky Full of Stars', popularidade: 82 },
    ],
    topAlbuns: [
      { nome: 'Viva la Vida', popularidade: 87 },
      { nome: 'Parachutes', popularidade: 84 },
      { nome: 'X&Y', popularidade: 83 },
    ],
  },
  {
    id: 9, nome: 'Beyoncé', qtdMusicas: 95, qtdAlbuns: 7, popularidade: 67,
    topMusicas: [
      { nome: 'Halo', popularidade: 86 },
      { nome: 'Crazy in Love', popularidade: 85 },
      { nome: 'Single Ladies', popularidade: 84 },
      { nome: 'Cuff It', popularidade: 82 },
      { nome: 'Drunk in Love', popularidade: 80 },
    ],
    topAlbuns: [
      { nome: 'Lemonade', popularidade: 88 },
      { nome: 'I Am... Sasha Fierce', popularidade: 86 },
      { nome: 'Renaissance', popularidade: 84 },
    ],
  },
  {
    id: 10, nome: 'Eagles', qtdMusicas: 72, qtdAlbuns: 6, popularidade: 65,
    topMusicas: [
      { nome: 'Hotel California', popularidade: 88 },
      { nome: 'Take it Easy', popularidade: 80 },
      { nome: 'Desperado', popularidade: 78 },
      { nome: "Lyin' Eyes", popularidade: 75 },
      { nome: 'New Kid in Town', popularidade: 73 },
    ],
    topAlbuns: [
      { nome: 'Hotel California', popularidade: 88 },
      { nome: 'Eagles', popularidade: 75 },
      { nome: 'Desperado', popularidade: 70 },
    ],
  },
  {
    id: 11, nome: 'Bruno Mars', qtdMusicas: 78, qtdAlbuns: 5, popularidade: 62,
    topMusicas: [
      { nome: 'Uptown Funk', popularidade: 89 },
      { nome: '24K Magic', popularidade: 84 },
      { nome: 'Just the Way You Are', popularidade: 83 },
      { nome: 'When I Was Your Man', popularidade: 81 },
      { nome: 'Locked Out of Heaven', popularidade: 80 },
    ],
    topAlbuns: [
      { nome: '24K Magic', popularidade: 85 },
      { nome: 'Doo-Wops & Hooligans', popularidade: 82 },
      { nome: 'Unorthodox Jukebox', popularidade: 78 },
    ],
  },
  {
    id: 12, nome: 'Rihanna', qtdMusicas: 156, qtdAlbuns: 9, popularidade: 60,
    topMusicas: [
      { nome: 'Love The Way You Lie', popularidade: 83 },
      { nome: 'This Is What You Came For', popularidade: 81 },
      { nome: 'Diamonds', popularidade: 80 },
      { nome: 'Umbrella', popularidade: 78 },
      { nome: 'We Found Love', popularidade: 77 },
    ],
    topAlbuns: [
      { nome: 'Anti', popularidade: 84 },
      { nome: 'Loud', popularidade: 80 },
      { nome: 'Good Girl Gone Bad', popularidade: 76 },
    ],
  },
  {
    id: 13, nome: 'Imagine Dragons', qtdMusicas: 84, qtdAlbuns: 6, popularidade: 58,
    topMusicas: [
      { nome: 'Believer', popularidade: 86 },
      { nome: 'Thunder', popularidade: 84 },
      { nome: 'Radioactive', popularidade: 82 },
      { nome: 'Demons', popularidade: 80 },
      { nome: 'Whatever It Takes', popularidade: 78 },
    ],
    topAlbuns: [
      { nome: 'Evolve', popularidade: 84 },
      { nome: 'Night Visions', popularidade: 82 },
      { nome: 'Origins', popularidade: 76 },
    ],
  },
  {
    id: 14, nome: 'Maroon 5', qtdMusicas: 102, qtdAlbuns: 7, popularidade: 55,
    topMusicas: [
      { nome: 'Sugar', popularidade: 85 },
      { nome: 'Memories', popularidade: 83 },
      { nome: 'Girls Like You', popularidade: 82 },
      { nome: 'Maps', popularidade: 78 },
      { nome: 'Animals', popularidade: 75 },
    ],
    topAlbuns: [
      { nome: 'V', popularidade: 80 },
      { nome: 'Songs About Jane', popularidade: 78 },
      { nome: 'Red Pill Blues', popularidade: 75 },
    ],
  },
  {
    id: 15, nome: 'Journey', qtdMusicas: 64, qtdAlbuns: 7, popularidade: 53,
    topMusicas: [
      { nome: "Don't Stop Believin'", popularidade: 88 },
      { nome: 'Faithfully', popularidade: 80 },
      { nome: 'Open Arms', popularidade: 78 },
      { nome: 'Any Way You Want It', popularidade: 75 },
      { nome: 'Wheel in the Sky', popularidade: 73 },
    ],
    topAlbuns: [
      { nome: 'Escape', popularidade: 86 },
      { nome: 'Frontiers', popularidade: 78 },
      { nome: 'Infinity', popularidade: 72 },
    ],
  },
]

const COLUMNS = [
  { key: 'nome',         label: 'ARTISTA',                  width: '50%' },
  { key: 'qtdMusicas',   label: 'MÚSICAS', type: 'number', width: '15%' },
  { key: 'qtdAlbuns',    label: 'ALBUNS',  type: 'number', width: '15%' },
  { key: 'popularidade', label: 'POP.',    type: 'number', width: '20%' },
]

export default function ArtistasTab() {
  const [busca, setBusca] = useState('')
  const [pagina, setPagina] = useState(1)
  const [artistaSelecionado, setArtistaSelecionado] = useState(ARTISTAS_MOCK[0])

  useEffect(() => { setPagina(1) }, [busca])

  const artistasFiltrados = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return q
      ? ARTISTAS_MOCK.filter(a => a.nome.toLowerCase().includes(q))
      : ARTISTAS_MOCK
  }, [busca])

  const totalPaginas = Math.max(1, Math.ceil(artistasFiltrados.length / TAMANHO_PAGINA))
  const inicio = (pagina - 1) * TAMANHO_PAGINA
  const artistasPagina = artistasFiltrados.slice(inicio, inicio + TAMANHO_PAGINA)

  const handleExibirPerfil = () => {
    if (artistasFiltrados.length > 0) {
      setArtistaSelecionado(artistasFiltrados[0])
    }
  }

  return (
    <div className="artista-page">

      {/* PAINEL ESQUERDO — perfil do artista */}
      <aside className="artista-aside">
        {artistaSelecionado ? (
          <>
            <div className="artista-aside-head">
              <div className="artista-aside-nome">{artistaSelecionado.nome}</div>
              <table className="artista-aside-stats">
                <tbody>
                  <tr><td>Quantidade de músicas</td><td>{artistaSelecionado.qtdMusicas}</td></tr>
                  <tr><td>Quantidade de álbuns</td><td>{artistaSelecionado.qtdAlbuns}</td></tr>
                  <tr><td>Popularidade</td><td>{artistaSelecionado.popularidade}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="line-split"></div>

            <div>
              <div className="text-light-bold">TOP 5 MÚSICAS</div>
              <table className="artista-aside-musicas">
                <tbody>
                  {artistaSelecionado.topMusicas.map((m, i) => (
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
                  {artistaSelecionado.topAlbuns.map((a, i) => (
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

      {/* PAINEL DIREITO — busca + tabela */}
      <div className="artista-body">

        <div className="artista-nav">
          <SearchBar
            value={busca}
            onChange={setBusca}
            placeholder="Pesquisar artista..."
          />
          <button type="button" className="grey-btn" onClick={() => setPagina(1)}>
            Pesquisar
          </button>
          <button type="button" className="accent-btn" onClick={handleExibirPerfil}>
            Exibir Perfil
          </button>
        </div>

        <DataTable
          className="artista-tbl"
          columns={COLUMNS}
          rows={artistasPagina}
          onRowClick={(row) => setArtistaSelecionado(row)}
          rowClassName={(row) =>
            artistaSelecionado && row.id === artistaSelecionado.id ? 'row-selected' : ''
          }
        />

        <div className="artista-foot">
          <div className="text-light">
            {artistasFiltrados.length.toLocaleString('pt-BR')} artistas
          </div>
          <Pagination current={pagina} total={totalPaginas} onChange={setPagina} />
          <div className="text-light">pg. {pagina}/{totalPaginas}</div>
        </div>

      </div>

    </div>
  )
}