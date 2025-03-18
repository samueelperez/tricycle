import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar archivos de traducción
import es from './locales/es.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import zh from './locales/zh.json';
import tr from './locales/tr.json';

// Para depuración
console.log("Cargando traducciones ES:", es);
console.log("about.additionalInfo en ES:", es.about?.additionalInfo);

i18n
  // Detectar el idioma del navegador
  .use(LanguageDetector)
  // Integración con React
  .use(initReactI18next)
  // Inicializar i18next
  .init({
    resources: {
      es: {
        translation: es
      },
      en: {
        translation: en
      },
      fr: {
        translation: fr
      },
      zh: {
        translation: zh
      },
      tr: {
        translation: tr
      }
    },
    fallbackLng: 'es', // Idioma por defecto si no se detecta ninguno
    debug: true, // Activar modo debug para ver qué está pasando
    interpolation: {
      escapeValue: false // No es necesario para React
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    }
  });

export default i18n; 