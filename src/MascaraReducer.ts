export type Mascara = "pequena" | "grande";

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
        type: state.type === "pequena" ? "grande" : "pequena",
      };

    default:
      return state;
  }
}
