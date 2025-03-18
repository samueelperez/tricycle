import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <NotFoundContainer>
      <Navbar />
      
      <ContentContainer>
        <ErrorCode>404</ErrorCode>
        <Title>{t('notFound.title')}</Title>
        <Description>{t('notFound.description')}</Description>
        <BackButton to="/">{t('notFound.backButton')}</BackButton>
      </ContentContainer>
      
      <Footer />
    </NotFoundContainer>
  );
};

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  color: #1946ba;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const BackButton = styled(Link)`
  padding: 12px 30px;
  background-color: #1946ba;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #0d347d;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export default NotFound; 