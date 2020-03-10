import { RESET, RESTORE } from "../constants/app";

const initialState = [];

export type UsersState = Readonly<typeof initialState>;

export const Types = {
  CREATE_ACCOUNT: "CREATE_ACCOUNT"
};

// REDUCERS
export default (state: UsersState = initialState, action): UsersState => {
  switch (action.type) {
    case Types.CREATE_ACCOUNT:
      return [...state, action.payload];
    case RESET:
      return initialState;
    case RESTORE:
      return action.payload["users"];
    default:
      return state;
  }
};

// ACTIONS
export const createAccount = payload => {
  return { type: Types.CREATE_ACCOUNT, payload };
};
