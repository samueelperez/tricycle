import React, { useState, useEffect } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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

  // Configuración para fullpage.js (ajustar según necesidad)
  const fullpageOptions = {
    licenseKey: 'YOUR_KEY_HERE',
    anchors: ['inicio', 'sobre-nosotros', 'productos', 'por-que-elegirnos', 'proceso', 'contacto'],
    menu: '#menu',
    scrollingSpeed: 1000,
    navigation: true,
    navigationPosition: 'right',
    responsiveWidth: 900,
    afterLoad: (origin, destination, direction) => {
      console.log('Section loaded:', destination.index);
    }
  };

  return (
    <>
      <Navbar />
      <FullPageContainer>
        <ReactFullpage
          {...fullpageOptions}
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

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SectionText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button`
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  @media (max-width: 576px) {
    width: 100%;
    max-width: 250px;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: white;
  color: #1946ba;
  border: none;
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-3px);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: white;
  border: 2px solid white;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const FeatureItem = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #1946ba;
`;

const FeatureText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const ProductItem = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductName = styled.h3`
  padding: 20px;
  font-size: 1.2rem;
  color: #333;
`;

const ProductButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #1946ba;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #0d347d;
  }
`;

const ProcessSteps = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
`;

const ProcessStep = styled.div`
  flex: 1;
  min-width: 200px;
  max-width: 300px;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background-color: #1946ba;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  margin: 0 auto 20px;
`;

const StepTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #1946ba;
  text-align: center;
`;

const StepText = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: #555;
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormInput = styled.input`
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
  
  &:focus {
    border-color: #1946ba;
    outline: none;
  }
`;

const FormTextarea = styled.textarea`
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
  resize: vertical;
  
  &:focus {
    border-color: #1946ba;
    outline: none;
  }
`;

const FormButton = styled.button`
  padding: 15px;
  background-color: #1946ba;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #0d347d;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
`;

const ContactInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContactInfoTitle = styled.h3`
  font-size: 1.2rem;
  color: #1946ba;
`;

const ContactInfoText = styled.p`
  font-size: 1rem;
  color: #555;
`;

export default HomePage; 