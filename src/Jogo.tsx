import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { EnfeitesReducer, type EnfeiteState, type EnfeiteTipo } from "./EnfeitesReducer";
import "./Jogo.css";

import mascarabranca from "./assets/mascaraP.png";
import mascaraGrande from "./assets/mascaraG.png";

import penas from "./assets/pena.png";
import flor from "./assets/flor.png";
import gema from "./assets/gema.png";
import glitter2 from "./assets/glitter2.png";
import fita from "./assets/fita.png";
import coroa from "./assets/coroa.png";

import { MascaraReducer, type MascaraState } from "./MascaraReducer";

type JogoProps = {
  voltar: () => void;
};

type DragInfo = {
  id: string;
  offsetX: number;
  offsetY: number;
};

export default function Jogo({ voltar }: JogoProps) {
  const enfeitesInicial: EnfeiteState = { ativos: [], zTop: 0 };
  const mascaraPadrao: MascaraState = { type: "branca" };

  const [state, dispatch] = useReducer(EnfeitesReducer, enfeitesInicial);
  const [stateMascara, dispatchMascara] = useReducer(MascaraReducer, mascaraPadrao);

  const srcMascara = stateMascara.type === "branca" ? mascarabranca : mascaraGrande;

  const maskImgRef = useRef<HTMLImageElement | null>(null);
  const [drag, setDrag] = useState<DragInfo | null>(null);

  const assets = useMemo(() => {
    return {
      penas,
      flor,
      gema,
      glitter: glitter2,
      fita,
      coroa,
    } satisfies Record<EnfeiteTipo, string>;
  }, []);

  const TAM = 48;
  const MARGEM = 48;

  function getMaskRect() {
    const el = maskImgRef.current;
    if (!el) return null;
    return el.getBoundingClientRect();
  }

  function itemDentroDoRect(clientX: number, clientY: number, rect: DOMRect, offsetX: number, offsetY: number) {
    const left = rect.left + MARGEM;
    const right = rect.right - MARGEM;
    const top = rect.top + MARGEM + 50;
    const bottom = rect.bottom - MARGEM - 50;

    const itemLeft = clientX - offsetX;
    const itemTop = clientY - offsetY;
    const itemRight = itemLeft + TAM;
    const itemBottom = itemTop + TAM;

    return itemLeft >= left && itemRight <= right && itemTop >= top && itemBottom <= bottom;
  }

  function clientToMaskXY(clientX: number, clientY: number, offsetX = 0, offsetY = 0) {
    const rect = getMaskRect();
    if (!rect) return null;

    const x = clientX - rect.left - offsetX;
    const y = clientY - rect.top - offsetY;

    return { x, y };
  }

  function adicionarEnfeite(tipo: EnfeiteTipo) {
    const rect = getMaskRect();
    if (!rect) return;

    const x = rect.width / 2 - TAM / 2;
    const y = rect.height / 2 - TAM / 2;

    dispatch({ type: "adicionar", tipo, x, y });
  }

  function onMouseDownEnfeite(e: React.MouseEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "trazerPraFrente", id });

    const target = e.currentTarget as HTMLImageElement;
    const rect = target.getBoundingClientRect();

    setDrag({
      id,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    });
  }

  useEffect(() => {
    function onMove(ev: MouseEvent) {
      if (!drag) return;

      const pos = clientToMaskXY(ev.clientX, ev.clientY, drag.offsetX, drag.offsetY);
      if (!pos) return;

      dispatch({ type: "mover", id: drag.id, x: pos.x, y: pos.y });
    }

    function onUp(ev: MouseEvent) {
      if (!drag) return;

      const rect = getMaskRect();
      if (!rect) {
        setDrag(null);
        return;
      }

      if (!itemDentroDoRect(ev.clientX, ev.clientY, rect, drag.offsetX, drag.offsetY)) {
        dispatch({ type: "remover", id: drag.id });
      }

      setDrag(null);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [drag]);

  return (
    <>
      <button className="botao-voltar" onClick={voltar}>
        ⭯
      </button>

      <h1 id="titulo-montagem">Monte sua máscara e conquiste a coroa!</h1>

      <div className="mascara-palco">
        <img
          ref={maskImgRef}
          className="mascara-img"
          src={srcMascara}
          alt={`Máscara ${stateMascara.type}`}
          draggable={false}
        />

        {state.ativos.map((it) => (
          <img
            key={it.id}
            src={assets[it.tipo]}
            alt={it.tipo}
            className={`enfeite ${drag?.id === it.id ? "arrastando" : ""}`}
            style={{ left: it.x, top: it.y, zIndex: it.z }}
            onMouseDown={(e) => onMouseDownEnfeite(e, it.id)}
            draggable={false}
          />
        ))}
      </div>

      <div className="lado-esquerdo">
        <button className="botao-item" onClick={() => adicionarEnfeite("penas")} title="Penas" aria-label="Penas">
          <img src={penas} alt="" />
        </button>

        <button className="botao-item" onClick={() => adicionarEnfeite("flor")} title="Flor" aria-label="Flor">
          <img src={flor} alt="" />
        </button>

        <button className="botao-item" onClick={() => adicionarEnfeite("gema")} title="Gema" aria-label="Gema">
          <img src={gema} alt="" />
        </button>
      </div>

      <div className="lado-direito">
        <button className="botao-item" onClick={() => adicionarEnfeite("glitter")} title="Glitter" aria-label="Glitter">
          <img src={glitter2} alt="" />
        </button>

        <button className="botao-item" onClick={() => adicionarEnfeite("fita")} title="Fita" aria-label="Fita">
          <img src={fita} alt="" />
        </button>

        <button className="botao-item" onClick={() => adicionarEnfeite("coroa")} title="Coroa" aria-label="Coroa">
          <img src={coroa} alt="" />
        </button>
      </div>

      <button className="altera-mascara" onClick={() => dispatchMascara({ type: "alternar" })}>
        Alterar
      </button>

      <button className="botao-finalizar">Finalizar</button>
    </>
  );
}
