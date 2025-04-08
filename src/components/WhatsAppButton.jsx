import React from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  // Nuevo número de WhatsApp
  const phoneNumber = '+34653212870';
  
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=Hola, estoy interesado en sus servicios de reciclaje.`, '_blank');
  };

  return (
    <WhatsAppButtonContainer onClick={handleWhatsAppClick}>
      <WhatsAppIcon />
      <Pulse />
    </WhatsAppButtonContainer>
  );
};

const WhatsAppButtonContainer = styled.button`
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #25D366;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.5);
  z-index: 999;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(37, 211, 102, 0.6);
    background-color: #22c15e;
  }
  
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 20px;
    right: 20px;
  }
`;

const WhatsAppIcon = styled(FaWhatsapp)`
  color: white;
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Pulse = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #25D366;
  opacity: 0.5;
  animation: pulse 2s infinite;
  pointer-events: none;

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    70% {
      transform: scale(1.3);
      opacity: 0;
    }
    100% {
      transform: scale(1.3);
      opacity: 0;
    }
  }
`;

export default WhatsAppButton; 