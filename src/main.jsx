import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// Descomentamos la importación ya que las dependencias han sido instaladas
import './i18n';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from './config/emailjs';

// Inicializar EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
