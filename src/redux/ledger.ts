import reject from "lodash/reject";
import { RESET, RESTORE } from "../constants/app";

const initialState = [];

export type LedgerState = Readonly<typeof initialState>;

export const Types = {
  ADD_INVOICE: "ADD_INVOICE",
  REMOVE_INVOICE: "REMOVE_INVOICE"
};

// REDUCERS
export default (state: LedgerState = initialState, action): LedgerState => {
  switch (action.type) {
    case Types.ADD_INVOICE:
      return [...state, action.payload];
    case Types.REMOVE_INVOICE:
      return reject(state, ["id", action.payload.id]);
    case RESET:
      return initialState;
    case RESTORE:
      return action.payload["ledger"];
    default:
      return state;
  }
};

// ACTIONS
export const addInvoice = payload => {
  return { type: Types.ADD_INVOICE, payload };
};

export const removeInvoice = id => {
  return { type: Types.REMOVE_INVOICE, payload: { id } };
};
