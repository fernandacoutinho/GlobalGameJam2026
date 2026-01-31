type TutorialProps = {
  voltar: () => void;
}

export default function Tutorial({voltar} : TutorialProps) {
    return (
        <>
            <button className='botao-voltar' onClick={voltar}>⭯</button>
            <h2>Tutorial</h2>
        </>
    )
}