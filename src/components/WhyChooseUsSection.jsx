import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

// Versión reducida de las razones para móvil
const mobileReasons = [
  {
    icon: '♻️',
    title: 'Compromiso Ambiental',
    description: 'Reducimos la huella de carbono y conservamos recursos naturales.'
  },
  {
    icon: '🔍',
    title: 'Transparencia Total',
    description: 'Trazabilidad completa desde el origen hasta el producto final.'
  },
  {
    icon: '🌱',
    title: 'Innovación Sostenible',
    description: 'Tecnologías avanzadas para mejorar procesos y reducir impacto.'
  },
  {
    icon: '🏆',
    title: 'Calidad Certificada',
    description: 'Altos estándares con certificaciones internacionales.'
  }
];

// Versión completa para escritorio
const desktopReasons = [
  {
    icon: '♻️',
    title: 'Compromiso Ambiental',
    description: 'Nuestro proceso de reciclaje reduce significativamente la huella de carbono y contribuye a la conservación de recursos naturales.'
  },
  {
    icon: '🔍',
    title: 'Transparencia Total',
    description: 'Ofrecemos trazabilidad completa de nuestros materiales reciclados, desde su origen hasta el producto final.'
  },
  {
    icon: '🌱',
    title: 'Innovación Sostenible',
    description: 'Invertimos constantemente en tecnologías avanzadas para mejorar nuestros procesos de reciclaje y reducir el impacto ambiental.'
  },
  {
    icon: '🤝',
    title: 'Alianzas Estratégicas',
    description: 'Colaboramos con empresas líderes en diversos sectores para maximizar el alcance y el impacto de nuestras soluciones de reciclaje.'
  },
  {
    icon: '📊',
    title: 'Resultados Medibles',
    description: 'Proporcionamos informes detallados sobre el impacto ambiental positivo generado por nuestros servicios de reciclaje.'
  },
  {
    icon: '🏆',
    title: 'Calidad Certificada',
    description: 'Nuestros productos y procesos cumplen con los más altos estándares de calidad y sostenibilidad, respaldados por certificaciones internacionales.'
  }
];

const WhyChooseUsSection = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  
  // Detectar si es dispositivo móvil
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Inicializar el estado
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SectionContainer $isMobile={isMobile}>
      <SectionTitle>Ventajas Competitivas</SectionTitle>
      
      {isMobile ? (
        <MobileReasonsContainer>
          {mobileReasons.map((reason, index) => (
            <MobileReasonCard 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ReasonIconContainer>
                <ReasonIcon>{reason.icon}</ReasonIcon>
              </ReasonIconContainer>
              <ReasonContent>
                <ReasonTitle>{reason.title}</ReasonTitle>
                <ReasonDescription>{reason.description}</ReasonDescription>
              </ReasonContent>
            </MobileReasonCard>
          ))}
        </MobileReasonsContainer>
      ) : (
        <ReasonsGrid>
          {desktopReasons.map((reason, index) => (
            <ReasonCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ReasonIcon>{reason.icon}</ReasonIcon>
              <ReasonTitle>{reason.title}</ReasonTitle>
              <ReasonDescription>{reason.description}</ReasonDescription>
            </ReasonCard>
          ))}
        </ReasonsGrid>
      )}
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${({ $isMobile }) => $isMobile ? 'auto' : '100vh'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 40px 20px;
  }
`;

const ReasonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  margin-top: 50px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 30px;
  }
`;

const ReasonCard = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

// Componentes para móvil optimizados
const MobileReasonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const MobileReasonCard = styled(motion.div)`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
`;

const ReasonIconContainer = styled.div`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const ReasonContent = styled.div`
  flex: 1;
`;

const ReasonIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 0;
  }
`;

const ReasonTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 3px;
    text-align: left;
  }
`;

const ReasonDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    line-height: 1.3;
    text-align: left;
  }
`;

export default WhyChooseUsSection;