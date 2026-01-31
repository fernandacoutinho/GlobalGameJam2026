type Mascara = "pequena" | "grande";

export type MascaraState = {
    type: Mascara;
}

type MascaraAction = {
    type: "alternar";
    conteudo: Mascara;
}

export function MascaraReducer(state: MascaraState, action: MascaraAction){
    switch(action.type){
        case "alternar":
            return {
                type: action.conteudo
            };

        default:
            return state;
    }
}