import { useEffect, useRef, useState } from "react";
import "./Historia.css";

import finalImg from "./assets/historia5.png";

type FinalProps = {
  terminar: () => void;
};

const finalTela = [
  {
    img: finalImg,
    texto: "Com a máscara finalmente pronta, Mirabell sentiu seu coração pulsar de emoção, pronta para brilhar no Baile Encantado!",
  },
  {
    img: null,
    texto: "Obrigada por jogar! Esperamos que tenha gostado de ajudar Mirabell a criar sua máscara mágica para o Baile Encantado. Até a próxima aventura!",
  },
];

export default function Final({ terminar }: FinalProps) {
  const [indice, setIndice] = useState(0);
  const [textoAtual, setTextoAtual] = useState("");
  const intervaloRef = useRef<number | null>(null);

  useEffect(() => {
    setTextoAtual("");

    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }

    let i = 0;
    const textoCompleto = finalTela[indice].texto;

    intervaloRef.current = window.setInterval(() => {
      setTextoAtual(textoCompleto.slice(0, i + 1));
      i++;

      if (i === textoCompleto.length) {
        clearInterval(intervaloRef.current!);
        intervaloRef.current = null;

        if (indice < finalTela.length - 1) {
          setTimeout(() => setIndice(indice + 1), 2500);
        } else {
          setTimeout(terminar, 4000);
        }
      }
    }, 40);

    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, [indice, terminar]);

  return (
    <div className={`historia ${!finalTela[indice].img ? "final" : ""}`}>
      <div className="historia-caixa">
        <div className="historia-imagem">
          {finalTela[indice].img && <img src={finalTela[indice].img!} alt="" />}
        </div>

        <div className="historia-texto">
          <p className={!finalTela[indice].img ? "texto-final" : ""}>
            {textoAtual}
          </p>
        </div>
      </div>
    </div>
  );
}
