import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SectionTitle from './SectionTitle';
import { useTranslation } from 'react-i18next';

// Textos predefinidos para cada idioma como fallback
const additionalTexts = {
  es: "Con años de experiencia en el sector, nos hemos convertido en referentes en la transformación y comercialización de materiales reciclables, manteniendo siempre los más altos estándares de calidad y compromiso ambiental.",
  en: "With years of experience in the sector, we have become leaders in the transformation and commercialization of recyclable materials, always maintaining the highest standards of quality and environmental commitment.",
  fr: "Avec des années d'expérience dans le secteur, nous sommes devenus une référence dans la transformation et la commercialisation de matériaux recyclables, en maintenant toujours les normes les plus élevées de qualité et d'engagement environnemental.",
  zh: "凭借多年的行业经验，我们已成为可回收材料转化和商业化的领导者，始终保持最高的质量标准和环保承诺。",
  tr: "Sektördeki yılların deneyimiyle, geri dönüştürülebilir malzemelerin dönüşümünde ve ticarileştirilmesinde lider haline geldik, her zaman en yüksek kalite standartlarını ve çevresel bağlılığı koruyoruz."
};

const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const [secondText, setSecondText] = useState('');
  
  // Actualizar el texto cuando cambie el idioma
  useEffect(() => {
    const currentLang = i18n.language.split('-')[0]; // Tomar solo 'es', 'en', etc.
    setSecondText(additionalTexts[currentLang] || additionalTexts.en);
  }, [i18n.language]);
  
  return (
    <CenteredContainer>
      <SectionTitle>{t('about.title')}</SectionTitle>
      <ContentBox>
        <AboutText>
          {t('about.description')}
        </AboutText>
        <AboutText>
          {secondText}
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
