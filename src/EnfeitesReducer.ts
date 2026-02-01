export type EnfeiteTipo = 'penas' | 'flor' | 'gema' | 'glitter' | 'fita' | 'coroa';

export type EnfeiteAtivo = {
  id: string;
  tipo: EnfeiteTipo;
  x: number;
  y: number;
  z: number;
};

export type EnfeiteState = {
  ativos: EnfeiteAtivo[];
  zTop: number;
};

type EnfeitesAction =
  | { type: "adicionar"; tipo: EnfeiteTipo; x: number; y: number }
  | { type: "mover"; id: string; x: number; y: number }
  | { type: "remover"; id: string }
  | { type: "trazerPraFrente"; id: string }
  | { type: "alternar"; tipo: EnfeiteTipo; x: number; y: number }; //botão de liga/desliga

function criarId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function EnfeitesReducer(state: EnfeiteState, action: EnfeitesAction): EnfeiteState {
  switch (action.type) {
    case "adicionar": {
      const novoZ = state.zTop + 1;

      return {
        zTop: novoZ,
        ativos: [
          ...state.ativos,
          {
            id: criarId(),
            tipo: action.tipo,
            x: action.x,
            y: action.y,
            z: novoZ,
          },
        ],
      };
    }

    case "mover": {
      return {
        ...state,
        ativos: state.ativos.map((it) =>
          it.id === action.id ? { ...it, x: action.x, y: action.y } : it
        ),
      };
    }

    case "remover": {
      return {
        ...state,
        ativos: state.ativos.filter((it) => it.id !== action.id),
      };
    }

    case "trazerPraFrente": {
      const novoZ = state.zTop + 1;

      return {
        zTop: novoZ,
        ativos: state.ativos.map((it) => (it.id === action.id ? { ...it, z: novoZ } : it)),
      };
    }

    case "alternar": {
      const existente = state.ativos.find((it) => it.tipo === action.tipo);

      if (existente) {
        return {
          ...state,
          ativos: state.ativos.filter((it) => it.id !== existente.id),
        };
      }

      const novoZ = state.zTop + 1;
      return {
        zTop: novoZ,
        ativos: [
          ...state.ativos,
          { id: criarId(), tipo: action.tipo, x: action.x, y: action.y, z: novoZ },
        ],
      };
    }

    default:
      return state;
  }
}
