const initialState = [];

export type LedgerState = Readonly<typeof initialState>;

export const Types = {
  ADD_INVOICE: "ADD_INVOICE",
  RESET: "RESET"
};

// REDUCERS
export default (state: LedgerState = initialState, action): LedgerState => {
  switch (action.type) {
    case Types.ADD_INVOICE:
      return [...state, action.payload];
    case Types.RESET:
      return initialState;
    default:
      return state;
  }
};

// ACTIONS
export const addInvoice = payload => {
  return { type: Types.ADD_INVOICE, payload };
};
