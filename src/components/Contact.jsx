import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
const qrCode = '/assets/qr.png';

const ContactContainer = styled.div`
  // ... existing code ...
`;

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  
  img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 14px;
    color: ${props => props.theme.colors.text};
    text-align: center;
  }
  
  @media (max-width: 768px) {
    img {
      width: 120px;
      height: 120px;
    }
  }
`;

const Contact = () => {
  // ... existing code ...
  
  return (
    <ContactContainer id="contacto">
      <ContactTitle
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Contacto
      </ContactTitle>
      
      {/* ... existing code ... */}
      
      <ContactFormContainer>
        {/* ... existing form elements ... */}
      </ContactFormContainer>
      
      <QRCodeContainer
        as={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <img src={qrCode} alt="Código QR de contacto" />
        <p>Escanea para contactarnos directamente</p>
      </QRCodeContainer>
      
      {/* ... existing code ... */}
    </ContactContainer>
  );
};

export default Contact; 