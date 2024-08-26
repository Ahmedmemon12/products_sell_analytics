import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from "../public/locales/en/translation.json"
import translationIT from "../public/locales/it/translation.json"


const resources = {
  en: {
    translation: translationEN
  },
  it: {
    translation: translationIT
  }
};
i18n
  .use(HttpBackend) // Load translations using HTTP
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
    },
  });

export default i18n;

