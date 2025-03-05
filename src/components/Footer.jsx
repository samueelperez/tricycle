import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>© {new Date().getFullYear()} TRICYCLE PRODUCTOS SL. Todos los derechos reservados.</Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #333;
  padding: 20px 0;
  position: relative;
  z-index: 10;
  width: 100%;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Copyright = styled.p`
  color: #fff;
  font-size: 0.9rem;
  text-align: center;
`;

export default Footer; 