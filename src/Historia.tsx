import { useState, useEffect, useRef } from "react";
import "./Historia.css";

import img1 from "./assets/historia1.png";
import img2 from "./assets/historia2.png";
import img3 from "./assets/historia3.png";
import img4 from "./assets/historia4.png";

type HistoriaProps = {
  terminar: () => void;
};

const historia = [
  { img: img1, texto: "Mirabell seguia a caminho do Baile Encantado de Lala Land. Seu longo vestido e a máscara preta faziam-na sentir-se elegante e confiante." },
  { img: img2, texto: "Mas, em meio à pressa e à empolgação, um passo em falso mudou tudo. Mirabell tropeçou e caiu ao chão." },
  { img: img3, texto: "Com a queda, sua máscara deslizou de seu rosto e se partiu em pedaços. Sem ela, Mirabell sentiu o coração apertar, estava devastada." },
  { img: img4, texto: "Então, ao erguer o olhar, algo chamou sua atenção. À sua frente, brilhava sua solução: um ateliê de máscaras." },
  { img: null, texto: "Ali, ela sabia… seu destino ainda podia ser reescrito." }
];

export default function Historia({ terminar }: HistoriaProps) {
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
    const textoCompleto = historia[indice].texto;

    intervaloRef.current = window.setInterval(() => {
      setTextoAtual(textoCompleto.slice(0, i + 1));
      i++;

      if (i === textoCompleto.length) {
        clearInterval(intervaloRef.current!);
        intervaloRef.current = null;

        if (indice < historia.length - 1) {
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
    <div className={`historia ${!historia[indice].img ? "final" : ""}`}>
      <div className="historia-caixa">
        <div className="historia-imagem">
          {historia[indice].img && <img src={historia[indice].img} alt="" />}
        </div>

        <div className="historia-texto">
          <p className={!historia[indice].img ? "texto-final" : ""}>
            {textoAtual}
          </p>
        </div>
      </div>
    </div>
  );
}
