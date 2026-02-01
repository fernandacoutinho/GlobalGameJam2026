import './App.css'
import { useState } from "react";
import Jogo from './Jogo'

type Tela = 'menu' | 'jogo' | 'tutorial';

function App() {
  const [tela, setTela] = useState<Tela>('menu');
  
  function jogar() {
    setTela('jogo');
  }

  return (
    <div className="app">
      {tela === 'menu' && (
        <>
          <h1>B.E.L.L.</h1>
          <div className = "botoes">
            <button onClick={jogar}>Jogar</button>
          </div>
        </>
      )}

      {tela === 'jogo' && <Jogo voltar={() => setTela('menu')} />}
    </div>
  )
}

export default App