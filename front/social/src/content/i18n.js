import i18n from "i18next";
import Backend from "i18next-xhr-backend"
import LanguageDetector from "i18next-browser-languagedetector";

i18n
.use(Backend)
.use(LanguageDetector)
.init({
  fallbackLng: "ua",

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;
