import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <>
      <Navbar />
      <NotFoundContainer>
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
        <HomeButton to="/">Volver al inicio</HomeButton>
      </NotFoundContainer>
      <Footer />
    </>
  );
};

const NotFoundContainer = styled.div`
  max-width: 800px;
  margin: 150px auto 100px;
  text-align: center;
  padding: 0 20px;
  
  h1 {
    font-size: 6rem;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
`;

const HomeButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 25px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGreen};
  }
`;

export default NotFound; 