import { LANGS, RESTORE, RESET } from "../constants/app";

const initialState = {
  locale: LANGS.EN,
  path: null
};

export type SettingState = Readonly<typeof initialState>;

export const Types = {
  SET_LOCALE: "SET_LOCALE",
  SET_PATH: "SET_PATH"
};

// REDUCERS
export default (state: SettingState = initialState, action): SettingState => {
  switch (action.type) {
    case Types.SET_LOCALE:
      return { ...state, locale: action.payload };
    case Types.SET_PATH:
      return { ...state, path: action.payload };
    case RESET:
      return initialState;
    case RESTORE:
      return action.payload["setting"];
    default:
      return state;
  }
};

// ACTIONS
export const setLocale = payload => {
  return { type: Types.SET_LOCALE, payload };
};

export const setPath = payload => {
  return { type: Types.SET_PATH, payload };
};
