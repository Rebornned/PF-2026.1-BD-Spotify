import { useState } from 'react'
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
  const [abaAtiva, setAbaAtiva] = useState('musicas')
  const [generoPreSelecionado, setGeneroPreSelecionado] = useState(null)

  const irParaGenero = (nomeGenero) => {
    setGeneroPreSelecionado(nomeGenero)
    setAbaAtiva('generos')
  }

  return (
    <div className="app-page">
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