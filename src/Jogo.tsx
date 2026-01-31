import { useReducer } from 'react';
import { EnfeitesReducer, type EnfeiteState } from './EnfeitesReducer';
import './Jogo.css'

import mascaraPequena from "./assets/mascaraP.png";
import mascaraGrande from "./assets/mascaraG.png";


import penas from "./assets/pena.png";
import flor from "./assets/flor.png";
import gema from "./assets/gema.png";
import glitter from "./assets/glitter.png";
import glitter2 from "./assets/glitter2.png";
import fita from "./assets/fita.png";
import coroa from "./assets/coroa.png";

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

      <div className="lado-esquerdo">
        <button
          className="botao-item"
          onClick={() => dispatch({ type: "alternar", conteudo: "penas" })}
          title="Penas"
          aria-label="Penas"
        >
          <img src={penas} alt="" />
        </button>

        <button
          className="botao-item"
          onClick={() => dispatch({ type: "alternar", conteudo: "flor" })}
          title="Flor"
          aria-label="Flor"
        >
          <img src={flor} alt="" />
        </button>

        <button
          className="botao-item"
          onClick={() => dispatch({ type: "alternar", conteudo: "gema" })}
          title="Gema"
          aria-label="Gema"
        >
          <img src={gema} alt="" />
        </button>
      </div>

      <div className="lado-direito">
        <button
          className="botao-item"
          onClick={() => dispatch({ type: "alternar", conteudo: "glitter" })}
          title="Glitter"
          aria-label="Glitter"
        >
          <img src={glitter2} alt="" />
        </button>

        <button
          className="botao-item"
          onClick={() => dispatch({ type: "alternar", conteudo: "fita" })}
          title="Fita"
          aria-label="Fita"
        >
          <img src={fita} alt="" />
        </button>

        <button
          className="botao-item"
          onClick={() => dispatch({ type: "alternar", conteudo: "coroa" })}
          title="Coroa"
          aria-label="Coroa"
        >
          <img src={coroa} alt="" />
        </button>
      </div>

      <button className='altera-mascara' onClick={() => dispatchMascara({
        type: "alternar", conteudo: stateMascara.type === "pequena" ? "grande" : "pequena"
      })}>Alterar</button>
      <button className='botao-finalizar'>Finalizar</button>

      {state.ativos.includes("penas") && <img src={penas} className="enfeite ePenas" alt="Penas" />}
      {state.ativos.includes("flor") && <img src={flor} className="enfeite eFlor" alt="Flor" />}
      {state.ativos.includes("gema") && <img src={gema} className="enfeite eGema" alt="Gema" />}
      {state.ativos.includes("glitter") && <img src={glitter} className="enfeite eGlitter" alt="Glitter" />}
      {state.ativos.includes("fita") && <img src={fita} className="enfeite eFita" alt="Fita" />}
      {state.ativos.includes("coroa") && <img src={coroa} className="enfeite eCoroa" alt="Coroa" />}
    </>
  )
}