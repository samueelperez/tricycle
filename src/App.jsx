import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

// Importamos los componentes de página
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';

// Estilo global para ocultar el mensaje de fullPage.js
const GlobalStyle = createGlobalStyle`
  /* Ocultar el mensaje "Made with fullPage.js" */
  .fp-watermark {
    display: none !important;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
