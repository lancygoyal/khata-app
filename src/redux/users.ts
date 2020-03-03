const initialState = [];

export type UsersState = Readonly<typeof initialState>;

export const Types = {
  CREATE_ACCOUNT: "CREATE_ACCOUNT",
  RESET: "RESET"
};

// REDUCERS
export default (state: UsersState = initialState, action): UsersState => {
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
