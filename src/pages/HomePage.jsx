import React, { useState, useEffect } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Importamos los componentes de sección
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProductsSection from '../components/ProductsSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import ProcessSection from '../components/ProcessSection';
import ContactSection from '../components/ContactSection';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';

// Licencia de fullpage.js - Reemplaza con tu licencia si la tienes
const licenseKey = ''; // Modo de desarrollo/evaluación

const HomePage = () => {
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
    <>
      <Navbar />
      <FullPageContainer>
        <ReactFullpage
          licenseKey={licenseKey}
          scrollingSpeed={1000}
          navigation={!isMobile} // Desactivar navegación en móvil
          navigationPosition="right"
          anchors={['inicio', 'sobre-nosotros', 'productos', 'por-que-elegirnos', 'proceso', 'contacto']}
          menu="#menu"
          sectionsColor={['transparent', 'white', 'white', '#f8f8f8', 'white', '#f5f5f5']}
          render={({ state, fullpageApi }) => {
            return (
              <ReactFullpage.Wrapper>
                <div className="section" data-anchor="inicio">
                  <HeroSection fullpageApi={fullpageApi} />
                </div>
                <CenteredSection className="section" data-anchor="sobre-nosotros" style={{backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <AboutSection />
                </CenteredSection>
                <CenteredSection className="section" data-anchor="productos" style={{backgroundColor: 'white', overflow: 'auto'}}>
                  <ProductsSection />
                </CenteredSection>
                <CenteredSection className="section" data-anchor="por-que-elegirnos">
                  <WhyChooseUsSection />
                </CenteredSection>
                <CenteredSection className="section" data-anchor="proceso">
                  <ProcessSection />
                </CenteredSection>
                <CenteredSection className="section" data-anchor="contacto">
                  <ContactSection />
                  <Footer />
                </CenteredSection>
              </ReactFullpage.Wrapper>
            );
          }}
        />
      </FullPageContainer>
      <WhatsAppButton />
    </>
  );
};

const FullPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const CenteredSection = styled.div`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  height: 100vh !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  position: relative !important;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export default HomePage; 