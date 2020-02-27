const initialState = [];

export type UserState = Readonly<typeof initialState>;

export const Types = {
  CREATE_ACCOUNT: "CREATE_ACCOUNT",
  RESET: "RESET"
};

// REDUCERS
export default (state: UserState = initialState, action): UserState => {
  switch (action.type) {
    case Types.CREATE_ACCOUNT:
      return [...state, action.payload];
    case Types.RESET:
      return initialState;
    default:
      return state;
  }
};

// ACTIONS
export const createAccount = payload => {
  return { type: Types.CREATE_ACCOUNT, payload };
};
