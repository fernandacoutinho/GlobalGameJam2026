import { useReducer } from 'react';
import { EnfeitesReducer, type EnfeiteState } from './EnfeitesReducer';
import './Jogo.css'
import mascara from './assets/mascara.png'
import penas from './assets/penas.png'

type JogoProps = {
  voltar: () => void;
}

export default function Jogo({voltar} : JogoProps) {
  const mascaraInicial: EnfeiteState = { ativos: [] };
  const [state, dispatch] = useReducer(EnfeitesReducer, mascaraInicial);

  return (
    <>
      <button className='bVoltar' onClick={voltar}>⭯</button>

      <h1 id='tMontagem'>Monte sua máscara e conquiste a coroa!</h1>

      <div className='mascara'>
        <img src={mascara} alt="Máscara" /> 
      </div>

      <button onClick={() => dispatch({ type: "alternar", conteudo: "penas" })}>
        Penas
      </button>

      <button className='bFinalizar'>Finalizar</button>

      {state.ativos.includes("penas") && (<img src={penas} className="ePena"/>)}
    </>
  )
}