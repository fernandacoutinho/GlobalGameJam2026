import { useReducer } from 'react';
import { EnfeitesReducer, type EnfeiteState } from './EnfeitesReducer';
import './Jogo.css'

import mascaraPequena from "./assets/mascaraP.png";
import mascaraGrande from "./assets/mascaraG.png";

import penas from './assets/penas.png'
import { MascaraReducer, type MascaraState } from './MascaraReducer';

type JogoProps = {
  voltar: () => void;
}

export default function Jogo({voltar} : JogoProps) {
  const mascaraInicial: EnfeiteState = { ativos: [] };
  const mascaraPadrao: MascaraState = { type: "pequena" };
  const [state, dispatch] = useReducer(EnfeitesReducer, mascaraInicial);
  const [stateMascara, dispatchMascara] = useReducer(MascaraReducer, mascaraPadrao);
  const srcMascara = stateMascara.type === "pequena" ? mascaraPequena : mascaraGrande;
  
  return (
    <>
      <button className='botao-voltar' onClick={voltar}>⭯</button>

      <h1 id='titulo-montagem'>Monte sua máscara e conquiste a coroa!</h1>

      <div className="mascara">
        <img src={srcMascara} alt={`Máscara ${stateMascara.type}`} />
      </div>

      <div className='lado-esquerdo'>
        <button onClick={() => dispatch({ type: "alternar", conteudo: "penas" })}>
          Penas
        </button>
      </div>

      <div className='lado-direito'>
        <button onClick={() => dispatch({ type: "alternar", conteudo: "penas" })}>
          Penas
        </button>
      </div>

      <button className='altera-mascara' onClick={() => dispatchMascara({
        type: "alternar", conteudo: stateMascara.type === "pequena" ? "grande" : "pequena"
      })}>Alterar</button>
      <button className='botao-finalizar'>Finalizar</button>

      {state.ativos.includes("penas") && (<img src={penas} className="ePena"/>)}
    </>
  )
}