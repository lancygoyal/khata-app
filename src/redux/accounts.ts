import { RESET, RESTORE } from "../constants/app";

const initialState = [];

export type AccountsState = Readonly<typeof initialState>;

export const Types = {
  ADD_ACCOUNT: "ADD_ACCOUNT",
  UPDATE_ACCOUNT: "UPDATE_ACCOUNT",
};

// REDUCERS
export default (state: AccountsState = initialState, action): AccountsState => {
  switch (action.type) {
    case Types.ADD_ACCOUNT:
      return [...state, action.payload];
    case Types.UPDATE_ACCOUNT:
      return state.map((account) => {
        if (account.id === action.payload.id) {
          account = {
            ...account,
            ...action.payload.values,
            updatedAt: Date.now(),
            updatedCount: account.updatedCount ? account.updatedCount + 1 : 1,
          };
        }
        return account;
      });
    case RESET:
      return initialState;
    case RESTORE:
      return action.payload["accounts"];
    default:
      return state;
  }
};

// ACTIONS
export const addAccount = (payload) => {
  return { type: Types.ADD_ACCOUNT, payload };
};

export const updateAccount = (id, values) => {
  return { type: Types.UPDATE_ACCOUNT, payload: { id, values } };
};
