import { LANGS, RESTORE, RESET } from "../constants/app";

const initialState = {
  user: {},
  isLogin: false,
  locale: LANGS.EN,
  path: null
};

export type AppState = Readonly<typeof initialState>;

export const Types = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_LOCALE: "SET_LOCALE",
  SET_PATH: "SET_PATH"
};

// REDUCERS
export default (state: AppState = initialState, action): AppState => {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        user: { ...action.payload, loginTime: Date.now() },
        isLogin: true
      };
    case Types.LOGOUT:
      return { ...state, user: {}, isLogin: false };
    case Types.SET_LOCALE:
      return { ...state, locale: action.payload };
    case Types.SET_PATH:
      return { ...state, path: action.payload };
    case RESET:
      return initialState;
    case RESTORE:
      return initialState;
    default:
      return state;
  }
};

// ACTIONS
export const login = payload => {
  return { type: Types.LOGIN, payload };
};

export const logout = () => {
  return { type: Types.LOGOUT };
};

export const setLocale = payload => {
  return { type: Types.SET_LOCALE, payload };
};

export const setPath = payload => {
  return { type: Types.SET_PATH, payload };
};
