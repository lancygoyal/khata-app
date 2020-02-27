const initialState = {
  user: {},
  isLogin: false,
  locale: "en"
};

export type AppState = Readonly<typeof initialState>;

export const Types = {
  SET_USER: "SET_USER",
  SET_LOCALE: "SET_LOCALE",
  RESET: "RESET"
};

// REDUCERS
export default (state: AppState = initialState, action): AppState => {
  switch (action.type) {
    case Types.SET_USER:
      return { ...state, user: action.payload, isLogin: true };
    case Types.SET_LOCALE:
      return { ...state, locale: action.payload };
    case Types.RESET:
      return initialState;
    default:
      return state;
  }
};

// ACTIONS
export const setUser = payload => {
  return { type: Types.SET_USER, payload };
};

export const setLocale = payload => {
  return { type: Types.SET_LOCALE, payload };
};
