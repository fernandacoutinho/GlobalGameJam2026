import "./App.css";
import { useState } from "react";
import Historia from "./Historia";
import Jogo from "./Jogo";
import Final from "./Final";
import Footer from "./Footer";

type Tela = "menu" | "historia" | "jogo" | "final";

function App() {
  const [tela, setTela] = useState<Tela>("menu");

  function jogar() {
    setTela("historia");
  }

  function voltarMenu() {
    setTela("menu");
  }

  return (
    <div className={`app ${tela === "menu" ? "menu" : ""}`}>
      {tela === "menu" && (
        <>
          <h1>B.E.L.L.</h1>
          <div className="botoes">
            <button onClick={jogar}>Jogar</button>
          </div>
          <Footer nomes="Fernanda Coutinho & Juliana Lindebeck" />
        </>
      )}

      {tela === "historia" && <Historia terminar={() => setTela("jogo")} />}

      {tela === "jogo" && (
        <Jogo
          voltar={voltarMenu}
          finalizar={() => setTela("final")}
        />
      )}

      {tela === "final" && <Final terminar={voltarMenu} />}
    </div>
  );
}

export default App;