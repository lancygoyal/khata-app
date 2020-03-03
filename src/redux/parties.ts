const initialState = [];

export type PartiesState = Readonly<typeof initialState>;

export const Types = {
  ADD_PARTY: "ADD_PARTY",
  RESET: "RESET"
};

// REDUCERS
export default (state: PartiesState = initialState, action): PartiesState => {
  switch (action.type) {
    case Types.ADD_PARTY:
      return [...state, action.payload];
    case Types.RESET:
      return initialState;
    default:
      return state;
  }
};

// ACTIONS
export const addParty = payload => {
  return { type: Types.ADD_PARTY, payload };
};
