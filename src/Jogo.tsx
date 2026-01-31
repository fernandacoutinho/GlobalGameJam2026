import './Jogo.css'

type JogoProps = {
  voltar: () => void;
}

export default function Jogo({voltar} : JogoProps) {
  return (
    <>
      <button className='bVoltar' onClick={voltar}>Tela inicial</button>
      <h2>Jogo</h2>
    </>
  )
}