const initialState = [];

export type AccountsState = Readonly<typeof initialState>;

export const Types = {
  ADD_ACCOUNT: "ADD_ACCOUNT",
  RESET: "RESET"
};

// REDUCERS
export default (state: AccountsState = initialState, action): AccountsState => {
  switch (action.type) {
    case Types.ADD_ACCOUNT:
      return [...state, action.payload];
    case Types.RESET:
      return initialState;
    default:
      return state;
  }
};

// ACTIONS
export const addAccount = payload => {
  return { type: Types.ADD_ACCOUNT, payload };
};
