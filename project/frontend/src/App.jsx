import { useState, useEffect } from 'react'
import './assets/styles/variables.css'
import './assets/styles/style.css'
import './assets/styles/app.css'
import './assets/styles/sharedassets.css'

import TopBar from './components/TopBar'
import MusicasTab from './tabs/MusicasTab'
import ArtistasTab from './tabs/ArtistasTab'
import GenerosTab from './tabs/GenerosTab'
import EstatisticasTab from './tabs/EstatisticasTab'

export default function App() {
  const [mensagem, setMensagem] = useState("Carregando dados do Flask...");
  const [abaAtiva, setAbaAtiva] = useState('musicas')
  const [generoPreSelecionado, setGeneroPreSelecionado] = useState(null)

  useEffect(() => {
    // Testa a requisição para o servidor Flask
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/teste-spotify`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setMensagem(`Interface conectada ao servidor Flask!`);
        } else {
          setMensagem("Conectado ao Flask, mas o banco retornou uma lista vazia.");
        }
      })
      .catch(error => {
        setMensagem("Erro ao conectar no Flask: " + error.message);
      });
  }, []);

  const irParaGenero = (nomeGenero) => {
    setGeneroPreSelecionado(nomeGenero)
    setAbaAtiva('generos')
  }

  return (
    <div className="app-page">
      <div style={{ background: '#1db954', color: 'white', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
        Status da Integração: {mensagem}
      </div>

      <TopBar abaAtiva={abaAtiva} onMudarAba={setAbaAtiva} />
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
  )
}