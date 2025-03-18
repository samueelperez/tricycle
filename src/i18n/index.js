import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importamos las traducciones
import translationES from './locales/es.json';
import translationEN from './locales/en.json';
import translationFR from './locales/fr.json';
import translationZH from './locales/zh.json';
import translationTR from './locales/tr.json';

// Los recursos contienen las traducciones para cada idioma
const resources = {
  es: {
    translation: translationES
  },
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  },
  zh: {
    translation: translationZH
  },
  tr: {
    translation: translationTR
  }
};

i18n
  .use(initReactI18next) // Pasamos i18n a react-i18next
  .init({
    resources,
    lng: 'es', // Idioma inicial
    fallbackLng: 'es', // Idioma de respaldo
    interpolation: {
      escapeValue: false // React ya escapa los valores por defecto
    }
  });

export default i18n; 