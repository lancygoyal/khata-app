const initialState = [];

export type BillsState = Readonly<typeof initialState>;

export const Types = {
    ADD_BILL: "ADD_BILL",
  RESET: "RESET"
};

// REDUCERS
export default (state: BillsState = initialState, action): BillsState => {
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
