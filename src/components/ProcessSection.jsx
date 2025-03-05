import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

// Datos de los pasos del proceso con iconos
const processSteps = [
  {
    icon: '♻️',
    title: 'Recolección',
    description: 'Recolectamos materiales reciclables de empresas, instituciones y puntos de acopio comunitarios, asegurando una logística eficiente y respetuosa con el medio ambiente.'
  },
  {
    icon: '🔍',
    title: 'Clasificación',
    description: 'Separamos meticulosamente los materiales por tipo y calidad, utilizando tecnología avanzada y control de calidad manual para garantizar la pureza de cada categoría.'
  },
  {
    icon: '⚙️',
    title: 'Procesamiento',
    description: 'Transformamos los materiales clasificados mediante procesos industriales específicos para cada tipo, convirtiéndolos en materia prima lista para su reutilización.'
  },
  {
    icon: '🌱',
    title: 'Distribución',
    description: 'Suministramos los materiales reciclados a fabricantes y empresas comprometidas con la sostenibilidad, cerrando el ciclo de la economía circular.'
  }
];

// Versión compacta para móvil
const mobileSteps = [
  {
    icon: '♻️',
    title: 'Recolección',
    description: 'Recolección eficiente y sostenible'
  },
  {
    icon: '🔍',
    title: 'Clasificación',
    description: 'Separación precisa por categorías'
  },
  {
    icon: '⚙️',
    title: 'Procesamiento',
    description: 'Transformación industrial avanzada'
  },
  {
    icon: '🌱',
    title: 'Distribución',
    description: 'Integración en economía circular'
  }
];

const ProcessSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Detectar si es dispositivo móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Inicializar el estado
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SectionContainer>
      <SectionTitle>
        {isMobile ? "Proceso de Reciclaje" : "Nuestro Proceso de Reciclaje"}
      </SectionTitle>
      
      {isMobile ? (
        // Diseño para móvil en grid
        <MobileProcessGrid>
          {mobileSteps.map((step, index) => (
            <ProcessCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              $isMobile={true}
            >
              <StepNumber $isMobile={true}>{index + 1}</StepNumber>
              <StepIcon $isMobile={true}>{step.icon}</StepIcon>
              <StepTitle $isMobile={true}>{step.title}</StepTitle>
              <StepDescription $isMobile={true}>{step.description}</StepDescription>
            </ProcessCard>
          ))}
        </MobileProcessGrid>
      ) : (
        // Diseño para escritorio también en grid
        <DesktopProcessGrid>
          {processSteps.map((step, index) => (
            <ProcessCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              $isMobile={false}
            >
              <StepNumber $isMobile={false}>{index + 1}</StepNumber>
              <StepIcon $isMobile={false}>{step.icon}</StepIcon>
              <StepTitle $isMobile={false}>{step.title}</StepTitle>
              <StepDescription $isMobile={false}>{step.description}</StepDescription>
            </ProcessCard>
          ))}
        </DesktopProcessGrid>
      )}
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 20px 50px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px 15px 40px;
    min-height: auto;
  }
`;

// Grid para móvil
const MobileProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  width: 100%;
  margin-top: 25px;
  padding: 0 5px;
`;

// Grid para escritorio
const DesktopProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  width: 100%;
  margin-top: 40px;
  padding: 0;
`;

// Tarjeta de proceso unificada con props para móvil/escritorio
const ProcessCard = styled(motion.div)`
  position: relative;
  background-color: white;
  border-radius: ${({ $isMobile }) => $isMobile ? '10px' : '12px'};
  padding: ${({ $isMobile }) => $isMobile ? '20px 15px' : '30px 25px'};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: ${({ $isMobile }) => 
    $isMobile ? '0 3px 10px rgba(0, 0, 0, 0.08)' : '0 5px 20px rgba(0, 0, 0, 0.05)'};
  overflow: hidden;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: ${({ $isMobile }) => $isMobile ? 'none' : 'translateY(-5px)'};
    box-shadow: ${({ $isMobile }) => 
      $isMobile ? '0 3px 10px rgba(0, 0, 0, 0.08)' : '0 8px 25px rgba(0, 0, 0, 0.1)'};
  }
`;

const StepNumber = styled.div`
  position: absolute;
  top: ${({ $isMobile }) => $isMobile ? '10px' : '15px'};
  right: ${({ $isMobile }) => $isMobile ? '10px' : '15px'};
  width: ${({ $isMobile }) => $isMobile ? '22px' : '30px'};
  height: ${({ $isMobile }) => $isMobile ? '22px' : '30px'};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: ${({ $isMobile }) => $isMobile ? '0.7rem' : '0.9rem'};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepIcon = styled.div`
  font-size: ${({ $isMobile }) => $isMobile ? '2rem' : '3.5rem'};
  margin-bottom: ${({ $isMobile }) => $isMobile ? '10px' : '15px'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepTitle = styled.h3`
  font-size: ${({ $isMobile }) => $isMobile ? '1rem' : '1.5rem'};
  color: #333;
  font-weight: 600;
  margin: 0 0 ${({ $isMobile }) => $isMobile ? '8px' : '15px'} 0;
`;

const StepDescription = styled.p`
  font-size: ${({ $isMobile }) => $isMobile ? '0.8rem' : '1rem'};
  line-height: ${({ $isMobile }) => $isMobile ? '1.3' : '1.6'};
  color: ${({ theme }) => theme.colors.darkGrey};
  margin: 0;
`;

export default ProcessSection; 