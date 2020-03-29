import { RESTORE, RESET } from "../constants/app";

const initialState = {
  user: {},
  isLogin: false
};

export type AppState = Readonly<typeof initialState>;

export const Types = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT"
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
