import React from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = "+34642609394"; // Número de WhatsApp actualizado
  const message = "Hola, estoy interesado en sus servicios de reciclaje.";
  
  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };
  
  return (
    <FloatingButton onClick={handleClick}>
      <FaWhatsapp size={24} />
    </FloatingButton>
  );
};

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #25D366;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    background-color: #20BA5C;
  }
`;

export default WhatsAppButton; 