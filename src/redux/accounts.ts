import { RESET, RESTORE } from "../constants/app";

const initialState = [];

export type AccountsState = Readonly<typeof initialState>;

export const Types = {
  ADD_ACCOUNT: "ADD_ACCOUNT"
};

// REDUCERS
export default (state: AccountsState = initialState, action): AccountsState => {
  switch (action.type) {
    case Types.ADD_ACCOUNT:
      return [...state, action.payload];
    case RESET:
      return initialState;
    case RESTORE:
      return action.payload["accounts"];
    default:
      return state;
  }
};

// ACTIONS
export const addAccount = payload => {
  return { type: Types.ADD_ACCOUNT, payload };
};
