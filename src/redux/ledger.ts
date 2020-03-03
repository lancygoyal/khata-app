const initialState = [];

export type LedgerState = Readonly<typeof initialState>;

export const Types = {
  ADD_BILL: "ADD_BILL",
  RESET: "RESET"
};

// REDUCERS
export default (state: LedgerState = initialState, action): LedgerState => {
  switch (action.type) {
    case Types.ADD_BILL:
      return [...state, action.payload];
    case Types.RESET:
      return initialState;
    default:
      return state;
  }
};

// ACTIONS
export const addBill = payload => {
  return { type: Types.ADD_BILL, payload };
};
