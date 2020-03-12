import { RESET, RESTORE } from "../constants/app";

const initialState = [];

export type UsersState = Readonly<typeof initialState>;

export const Types = {
  CREATE_ACCOUNT: "CREATE_ACCOUNT",
  CHANGE_PASSWORD: "CHANGE_PASSWORD"
};

// REDUCERS
export default (state: UsersState = initialState, action): UsersState => {
  switch (action.type) {
    case Types.CREATE_ACCOUNT:
      return [...state, action.payload];
    case Types.CHANGE_PASSWORD:
      return state.map(user => {
        if (user.id === action.payload.id) {
          user.password = action.payload.newPwd;
        }
        return user;
      });
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

export const changePassword = payload => {
  return { type: Types.CHANGE_PASSWORD, payload };
};
