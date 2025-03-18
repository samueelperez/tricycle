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
    </WhatsAppButtonContainer>
  );
};

const WhatsAppButtonContainer = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #25D366;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }
  
  &:focus {
    outline: none;
  }
`;

const WhatsAppIcon = styled(FaWhatsapp)`
  color: white;
  font-size: 2rem;
`;

export default WhatsAppButton; 