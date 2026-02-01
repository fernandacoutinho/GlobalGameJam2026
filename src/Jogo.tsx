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
  finalizar: () => void;
};

type DragInfo = {
  id: string;
  offsetX: number;
  offsetY: number;
};

export default function Jogo({ voltar, finalizar }: JogoProps) {
  const enfeitesInicial: EnfeiteState = { ativos: [], zTop: 0 };
  const mascaraPadrao: MascaraState = { type: "branca" };

  const [state, dispatch] = useReducer(EnfeitesReducer, enfeitesInicial);
  const [stateMascara, dispatchMascara] = useReducer(MascaraReducer, mascaraPadrao);

  const srcMascara = stateMascara.type === "branca" ? mascarabranca : mascaraGrande;

  const maskImgRef = useRef<HTMLImageElement | null>(null);

  const trashRef = useRef<HTMLDivElement | null>(null);
  const [overTrash, setOverTrash] = useState(false);

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

  function getTrashRect() {
    const el = trashRef.current;
    if (!el) return null;
    return el.getBoundingClientRect();
  }

  function pointInsideRect(clientX: number, clientY: number, rect: DOMRect) {
    return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
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

      const trashRect = getTrashRect();
      if (trashRect) setOverTrash(pointInsideRect(ev.clientX, ev.clientY, trashRect));
      else setOverTrash(false);

      const pos = clientToMaskXY(ev.clientX, ev.clientY, drag.offsetX, drag.offsetY);
      if (!pos) return;

      dispatch({ type: "mover", id: drag.id, x: pos.x, y: pos.y });
    }

    function onUp(ev: MouseEvent) {
      if (!drag) return;

      const trashRect = getTrashRect();
      if (trashRect && pointInsideRect(ev.clientX, ev.clientY, trashRect)) {
        dispatch({ type: "remover", id: drag.id });
        setDrag(null);
        setOverTrash(false);
        return;
      }

      const rect = getMaskRect();
      if (!rect) {
        setDrag(null);
        setOverTrash(false);
        return;
      }

      if (!itemDentroDoRect(ev.clientX, ev.clientY, rect, drag.offsetX, drag.offsetY)) {
        dispatch({ type: "remover", id: drag.id });
      }

      setDrag(null);
      setOverTrash(false);
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

      <h1 id="titulo-montagem">Ajude Mirabell enfeitar sua nova máscara!</h1>

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
        <button className="botao-item" onClick={() => adicionarEnfeite("penas")} title="Gema 1" aria-label="Gema 1">
          <img src={penas} alt="" />
        </button>

        <button className="botao-item" onClick={() => adicionarEnfeite("flor")} title="Gema 2" aria-label="Gema 2">
          <img src={flor} alt="" />
        </button>

        <button className="botao-item" onClick={() => adicionarEnfeite("gema")} title="Gema 3" aria-label="Gema 3">
          <img src={gema} alt="" />
        </button>
      </div>

      <div className="lado-direito">
        <button className="botao-item" onClick={() => adicionarEnfeite("glitter")} title="Gema 4" aria-label="Gema 4">
          <img src={glitter2} alt="" />
        </button>

        <button className="botao-item" onClick={() => adicionarEnfeite("fita")} title="Gema 5" aria-label="Gema 5">
          <img src={fita} alt="" />
        </button>

        <button className="botao-item" onClick={() => adicionarEnfeite("coroa")} title="Gema 6" aria-label="Gema 6">
          <img src={coroa} alt="" />
        </button>
      </div>

      <button className="altera-mascara" onClick={() => dispatchMascara({ type: "alternar" })}>
        Trocar Máscara
      </button>

      <button className="botao-finalizar" onClick={finalizar}>
        Finalizar
      </button>

      <div ref={trashRef} className={`lixeira ${overTrash ? "over" : ""}`}>
        <span>🗑️</span>
      </div>
    </>
  );
}
