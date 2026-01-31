import './App.css'
import { useState } from "react";
import Jogo from './Jogo'
import Tutorial from './Tutorial'

type Tela = 'menu' | 'jogo' | 'tutorial';

function App() {
  const [tela, setTela] = useState<Tela>('menu');
  
  function jogar() {
    setTela('jogo');
  }

  function tutorial() {
    setTela('tutorial');
  }

  return (
    <div className="app">
      {tela === 'menu' && (
        <>
          <h1>B.E.L.L.</h1>
          <div className = "botoes">
            <button onClick={jogar}>Jogar</button>
            <button onClick={tutorial}>Tutorial</button>
          </div>
        </>
      )}

      {tela === 'jogo' && <Jogo voltar={() => setTela('menu')} />}
      {tela === 'tutorial' && <Tutorial voltar={() => setTela('menu')}/>}
    </div>
  )
}

export default App