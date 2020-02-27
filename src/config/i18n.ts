import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import appEn from "../locale/en/app.json";
import appPa from "../locale/pa/app.json";

const resources = {
  en: {
    translation: {},
    app: appEn
  },
  pa: {
    translation: {},
    app: appPa
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  // keySeparator: false, // we do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
