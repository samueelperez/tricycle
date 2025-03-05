import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    font-family: ${({ theme }) => theme.fonts.main};
    scroll-behavior: smooth;
    overflow-x: hidden;
    width: 100%;
    max-width: 100%;
  }

  body {
    line-height: 1.6;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.darkGrey};
    background-color: white;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
    font-family: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .section {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: white;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Ocultar puntos de navegación en móvil */
  @media (max-width: 768px) {
    #fp-nav,
    .fp-slidesNav {
      display: none !important;
    }
  }
`; 