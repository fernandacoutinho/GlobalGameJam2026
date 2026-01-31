type TutorialProps = {
  voltar: () => void;
}

export default function Tutorial({voltar} : TutorialProps) {
    return (
        <>
            <button className='bVoltar' onClick={voltar}>Tela inicial</button>
            <h2>Tutorial</h2>
        </>
    )
}