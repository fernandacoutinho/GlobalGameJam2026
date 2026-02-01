export type Mascara = "branca" | "preta";

export type MascaraState = {
  type: Mascara;
};

type MascaraAction =
  | { type: "alternar" };

export function MascaraReducer(
  state: MascaraState,
  action: MascaraAction
): MascaraState {
  switch (action.type) {
    case "alternar":
      return {
        type: state.type === "branca" ? "preta" : "branca",
      };

    default:
      return state;
  }
}
