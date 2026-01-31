import './Jogo.css'
import mascara from './assets/mascara.png'

type JogoProps = {
  voltar: () => void;
}

export default function Jogo({voltar} : JogoProps) {
  return (
    <>
      <button className='bVoltar' onClick={voltar}>⭯</button>

      <h1 id='tMontagem'>Monte sua máscara e conquiste a coroa!</h1>

      <div className='mascara'>
        <img src={mascara} alt="Máscara" /> 
      </div>

      <button className='bFinalizar'>Finalizar</button>
    </>
  )
}