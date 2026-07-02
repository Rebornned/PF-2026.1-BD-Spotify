import { useState, useEffect, useCallback } from 'react'
import './assets/styles/variables.css'
import './assets/styles/style.css'
import './assets/styles/app.css'
import './assets/styles/sharedassets.css'

import TopBar from './components/TopBar'
import SplashScreen from './components/SplashScreen'
import MusicasTab from './tabs/MusicasTab'
import ArtistasTab from './tabs/ArtistasTab'
import GenerosTab from './tabs/GenerosTab'
import EstatisticasTab from './tabs/EstatisticasTab'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('musicas')
  const [generoPreSelecionado, setGeneroPreSelecionado] = useState(null)
  const [statusConexao, setStatusConexao] = useState('carregando')
  const [mensagemConexao, setMensagemConexao] = useState('Conectando ao servidor Flask...')

  const testarConexao = useCallback(() => {
    setStatusConexao('carregando')
    setMensagemConexao('Conectando ao servidor Flask...')

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000)  // 60s

    fetch(`${API_URL}/api/teste-spotify`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Servidor respondeu com status ${response.status}`)
        return response.json()
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setStatusConexao('conectado')
        } else {
          setStatusConexao('erro')
          setMensagemConexao('Conectado ao Flask, mas o banco retornou vazio.')
        }
      })
      .catch((error) => {
        setStatusConexao('erro')
        if (error.name === 'AbortError') {
          setMensagemConexao('Tempo esgotado (60s). O servidor pode estar frio ou fora do ar.')
        } else {
          setMensagemConexao(`Não foi possível conectar: ${error.message}`)
        }
      })
      .finally(() => clearTimeout(timeoutId))
  }, [])

  useEffect(() => {
    testarConexao()
  }, [testarConexao])

  const irParaGenero = (nomeGenero) => {
    setGeneroPreSelecionado(nomeGenero)
    setAbaAtiva('generos')
  }

  if (statusConexao !== 'conectado') {
    return (
      <SplashScreen
        mensagem={mensagemConexao}
        erro={statusConexao === 'erro'}
        onTentarNovamente={testarConexao}
      />
    )
  }

  return (
    <>
      <TopBar abaAtiva={abaAtiva} onMudarAba={setAbaAtiva} />
      <main className="app-container">
        <div className="app-page">
          {abaAtiva === 'musicas' && <MusicasTab onSelecionarGenero={irParaGenero} />}
          {abaAtiva === 'artistas' && <ArtistasTab />}
          {abaAtiva === 'generos' && (
            <GenerosTab
              generoPreSelecionado={generoPreSelecionado}
              onConsumir={() => setGeneroPreSelecionado(null)}
            />
          )}
          {abaAtiva === 'estatisticas' && <EstatisticasTab />}
        </div>
      </main>
    </>
  )
}