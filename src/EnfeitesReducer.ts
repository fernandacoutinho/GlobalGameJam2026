type Enfeite = 'penas' | 'flor' | 'gema' | 'glitter' | 'fita' | 'coroa';

export type EnfeiteState = {
    ativos: Enfeite[];
}

type EnfeitesAction = {
    type: "alternar";
    conteudo: Enfeite;
}

export function EnfeitesReducer(state: EnfeiteState, action: EnfeitesAction){
    switch(action.type){
        case "alternar":
            const existe = state.ativos.includes(action.conteudo);

            if(existe){
                return {
                    ativos: state.ativos.filter(e => e !== action.conteudo)
                };
            }

            return {
                ativos: [...state.ativos, action.conteudo]
            };

        default:
            return state;
    }
}
