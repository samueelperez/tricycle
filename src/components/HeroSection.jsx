import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
// Usaremos la imagen de los cubos de reciclaje que proporcionaste
import heroImage from '../assets/images/recycling-bins.jpg'; 
// Importamos las imágenes para el slider
import heroImage1 from '../assets/images/recycling-bins.jpg'; 
// Añade más imágenes según sea necesario
// import heroImage2 from '../assets/images/otra-imagen.jpg';
// import heroImage3 from '../assets/images/tercera-imagen.jpg';

// Array de imágenes para el slider
const sliderImages = [
  heroImage1,
  // Puedes añadir URLs externas si no tienes suficientes imágenes locales
  'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
];

const HeroSection = ({ fullpageApi }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Efecto para cambiar automáticamente las diapositivas
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length);
    }, 5000); // Cambia cada 5 segundos
    
    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = () => {
    if (fullpageApi) {
      fullpageApi.moveSectionDown();
    }
  };

  return (
    <HeroContainer>
      {sliderImages.map((image, index) => (
        <BackgroundSlide 
          key={index} 
          style={{ backgroundImage: `url(${image})` }}
          $active={currentSlide === index}
        />
      ))}
      <HeroOverlay />
      <NavbarSpace />
      <HeroContent>
        <Title>Transformamos desechos en recursos sostenibles</Title>
        <Subtitle>
          Soluciones innovadoras de reciclaje para plásticos, metales y papeles
          <br />que contribuyen a un futuro más verde
        </Subtitle>
        <ButtonGroup>
          <PrimaryButton onClick={() => fullpageApi.moveTo(3)}>
            Ver Productos
          </PrimaryButton>
          <SecondaryButton onClick={() => fullpageApi.moveTo(2)}>
            Más Sobre Nosotros
          </SecondaryButton>
        </ButtonGroup>
      </HeroContent>
      <ScrollDown onClick={handleScrollDown}>↓</ScrollDown>
      <SliderDots>
        {sliderImages.map((_, index) => (
          <SliderDot 
            key={index} 
            $active={currentSlide === index}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </SliderDots>
    </HeroContainer>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const NavbarSpace = styled.div`
  height: 80px; // Espacio para el navbar
`;

const HeroContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
`;

const BackgroundSlide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 1.5s ease-in-out;
  z-index: 0;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  max-width: 850px;
  padding: 0 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  margin-bottom: 1rem;
  font-weight: 700;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  font-weight: 300;
  line-height: 1.6;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    br {
      display: none;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  transition: ${({ theme }) => theme.transition};
  letter-spacing: 0.5px;
  cursor: pointer;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    max-width: 250px;
    padding: 12px 20px;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #2E8B57; // Verde que combina con la temática de reciclaje
  color: ${({ theme }) => theme.colors.white};
  
  &:hover {
    background-color: #246e45;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.white};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const ScrollDown = styled.button`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 3;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translate(-50%, 0);
    }
    40% {
      transform: translate(-50%, -20px);
    }
    60% {
      transform: translate(-50%, -10px);
    }
  }
`;

const SliderDots = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: none;
  gap: 10px;
  z-index: 2;
`;

const SliderDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $active }) => $active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: white;
  }
`;

const Header = styled.header`
  background-color: ${({ $isScrolled }) => $isScrolled ? 'white' : 'transparent'};
  // otros estilos...
`;

export default HeroSection; 