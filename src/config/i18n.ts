import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import appEn from "../locale/en/app.json";
import appPa from "../locale/pa/app.json";
import { LANGS } from "../constants/app";

const resources = {
  [LANGS.EN]: {
    translation: {},
    app: appEn
  },
  [LANGS.PA]: {
    translation: {},
    app: appPa
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: LANGS.PA,
  // keySeparator: false, // we do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
