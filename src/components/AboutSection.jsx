import React from 'react';
import styled from 'styled-components';
import SectionTitle from './SectionTitle';

const AboutSection = () => {
  return (
    <CenteredContainer>
      <SectionTitle>Sobre Nosotros</SectionTitle>
      <ContentBox>
        <AboutText>
          En TRICYCLE PRODUCTOS SL nos dedicamos a dar una segunda vida a los desechos, transformándolos en recursos valiosos. Nuestra misión es contribuir a un futuro más sostenible a través del reciclaje efectivo de plásticos, metales y papeles.
        </AboutText>
        <AboutText>
          Con años de experiencia en el sector, nos hemos convertido en referentes en la transformación y comercialización de materiales reciclables, manteniendo siempre los más altos estándares de calidad y compromiso ambiental.
        </AboutText>
      </ContentBox>
    </CenteredContainer>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const ContentBox = styled.div`
  max-width: 800px;
  width: 100%;
`;

const AboutText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.8;
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1rem;
  }
`;

export default AboutSection; 
