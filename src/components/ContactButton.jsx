import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ContactButton = ({ text = 'Contáctanos', className }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    
    // Si estamos en la página principal con FullPage
    if (window.location.pathname === '/' && window.fullpage_api) {
      window.fullpage_api.moveTo('contacto');
      return;
    }
    
    // Si estamos en otra página, primero navegamos a la página principal
    navigate('/');
    
    // Esperar a que la navegación se complete
    setTimeout(() => {
      // Intentar usar fullPage API
      if (window.fullpage_api) {
        window.fullpage_api.moveTo('contacto');
      } else {
        // Fallback: desplazarse al elemento con ID "contacto"
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 200);
  };

  return (
    <ButtonLink to="/#contacto" onClick={handleClick} className={className}>
      {text}
    </ButtonLink>
  );
};

const ButtonLink = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary || '#2e8b57'};
  color: white;
  padding: 12px 25px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGreen || '#1e6b47'};
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
`;

export default ContactButton; 