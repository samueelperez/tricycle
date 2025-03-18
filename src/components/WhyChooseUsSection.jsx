import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { useTranslation } from 'react-i18next';

// Versión reducida de las razones para móvil
const mobileReasons = [
  {
    icon: '🔍',
    title: 'Transparencia Total',
    description: 'Trazabilidad completa desde el origen hasta el producto final.'
  },
  {
    icon: '🤝',
    title: 'Alianzas Estratégicas',
    description: 'Colaboraciones estratégicas con empresas líderes en diversos sectores.'
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
    icon: '🔍',
    title: 'Transparencia Total',
    description: 'Ofrecemos trazabilidad completa de nuestros materiales reciclados, desde su origen hasta el producto final.'
  },
  {
    icon: '🤝',
    title: 'Alianzas Estratégicas',
    description: 'Colaboramos con empresas líderes en diversos sectores para maximizar el alcance y el impacto de nuestras soluciones de reciclaje.'
  },
  {
    icon: '🏆',
    title: 'Calidad Certificada',
    description: 'Nuestros productos y procesos cumplen con los más altos estándares de calidad y sostenibilidad, respaldados por certificaciones internacionales.'
  }
];

// Textos predefinidos para cada idioma
const reasonsTranslations = {
  es: {
    title: "¿Por Qué Elegirnos?",
    subtitle: "Nuestras ventajas competitivas",
    mobileReasons: [
      {
        icon: '🔍',
        title: 'Transparencia Total',
        description: 'Trazabilidad completa desde el origen hasta el producto final.'
      },
      {
        icon: '🤝',
        title: 'Alianzas Estratégicas',
        description: 'Colaboraciones estratégicas con empresas líderes en diversos sectores.'
      },
      {
        icon: '🏆',
        title: 'Calidad Certificada',
        description: 'Altos estándares con certificaciones internacionales.'
      }
    ],
    desktopReasons: [
      {
        icon: '🔍',
        title: 'Transparencia Total',
        description: 'Ofrecemos trazabilidad completa de nuestros materiales reciclados, desde su origen hasta el producto final.'
      },
      {
        icon: '🤝',
        title: 'Alianzas Estratégicas',
        description: 'Colaboramos con empresas líderes en diversos sectores para maximizar el alcance y el impacto de nuestras soluciones de reciclaje.'
      },
      {
        icon: '🏆',
        title: 'Calidad Certificada',
        description: 'Nuestros productos y procesos cumplen con los más altos estándares de calidad y sostenibilidad, respaldados por certificaciones internacionales.'
      }
    ]
  },
  en: {
    title: "Why Choose Us?",
    subtitle: "Our competitive advantages",
    mobileReasons: [
      {
        icon: '🔍',
        title: 'Total Transparency',
        description: 'Complete traceability from origin to final product.'
      },
      {
        icon: '🤝',
        title: 'Strategic Alliances',
        description: 'Strategic collaborations with leading companies in various sectors.'
      },
      {
        icon: '🏆',
        title: 'Certified Quality',
        description: 'High standards with international certifications.'
      }
    ],
    desktopReasons: [
      {
        icon: '🔍',
        title: 'Total Transparency',
        description: 'We offer complete traceability of our recycled materials, from their origin to the final product.'
      },
      {
        icon: '🤝',
        title: 'Strategic Alliances',
        description: 'We collaborate with leading companies in various sectors to maximize the reach and impact of our recycling solutions.'
      },
      {
        icon: '🏆',
        title: 'Certified Quality',
        description: 'Our products and processes meet the highest quality and sustainability standards, backed by international certifications.'
      }
    ]
  },
  fr: {
    title: "Pourquoi Nous Choisir?",
    subtitle: "Nos avantages concurrentiels",
    mobileReasons: [
      {
        icon: '🔍',
        title: 'Transparence Totale',
        description: "Traçabilité complète de l'origine au produit final."
      },
      {
        icon: '🤝',
        title: 'Alliances Stratégiques',
        description: "Collaborations stratégiques avec des entreprises leaders dans divers secteurs."
      },
      {
        icon: '🏆',
        title: 'Qualité Certifiée',
        description: "Normes élevées avec certifications internationales."
      }
    ],
    desktopReasons: [
      {
        icon: '🔍',
        title: 'Transparence Totale',
        description: "Nous offrons une traçabilité complète de nos matériaux recyclés, de leur origine au produit final."
      },
      {
        icon: '🤝',
        title: 'Alliances Stratégiques',
        description: "Nous collaborons avec des entreprises leaders dans divers secteurs pour maximiser la portée et l'impact de nos solutions de recyclage."
      },
      {
        icon: '🏆',
        title: 'Qualité Certifiée',
        description: "Nos produits et processus répondent aux normes de qualité et de durabilité les plus élevées, soutenus par des certifications internationales."
      }
    ]
  },
  zh: {
    title: "为什么选择我们？",
    subtitle: "我们的竞争优势",
    mobileReasons: [
      {
        icon: '🔍',
        title: '完全透明',
        description: '从原产地到最终产品的完整可追溯性。'
      },
      {
        icon: '🤝',
        title: '战略联盟',
        description: '与各个领域的领先企业进行战略合作。'
      },
      {
        icon: '🏆',
        title: '认证质量',
        description: '具有国际认证的高标准。'
      }
    ],
    desktopReasons: [
      {
        icon: '🔍',
        title: '完全透明',
        description: '我们提供回收材料的完整可追溯性，从其原产地到最终产品。'
      },
      {
        icon: '🤝',
        title: '战略联盟',
        description: '我们与各个领域的领先企业合作，最大限度地扩大我们回收解决方案的覆盖范围和影响力。'
      },
      {
        icon: '🏆',
        title: '认证质量',
        description: '我们的产品和工艺符合最高的质量和可持续性标准，并获得国际认证的支持。'
      }
    ]
  },
  tr: {
    title: "Neden Bizi Seçmelisiniz?",
    subtitle: "Rekabet avantajlarımız",
    mobileReasons: [
      {
        icon: '🔍',
        title: 'Tam Şeffaflık',
        description: 'Kaynaktan nihai ürüne kadar tam izlenebilirlik.'
      },
      {
        icon: '🤝',
        title: 'Stratejik İttifaklar',
        description: 'Çeşitli sektörlerdeki lider şirketlerle stratejik işbirlikleri.'
      },
      {
        icon: '🏆',
        title: 'Sertifikalı Kalite',
        description: 'Uluslararası sertifikalarla yüksek standartlar.'
      }
    ],
    desktopReasons: [
      {
        icon: '🔍',
        title: 'Tam Şeffaflık',
        description: 'Geri dönüştürülmüş malzemelerimizin kökeninden nihai ürüne kadar tam izlenebilirlik sunuyoruz.'
      },
      {
        icon: '🤝',
        title: 'Stratejik İttifaklar',
        description: 'Geri dönüşüm çözümlerimizin erişimini ve etkisini en üst düzeye çıkarmak için çeşitli sektörlerdeki lider şirketlerle işbirliği yapıyoruz.'
      },
      {
        icon: '🏆',
        title: 'Sertifikalı Kalite',
        description: 'Ürünlerimiz ve süreçlerimiz, uluslararası sertifikalarla desteklenen en yüksek kalite ve sürdürülebilirlik standartlarını karşılar.'
      }
    ]
  }
};

const WhyChooseUsSection = () => {
  const { i18n } = useTranslation();
  const [isMobile, setIsMobile] = React.useState(false);
  const [texts, setTexts] = useState(reasonsTranslations.es);
  
  // Actualizar textos cuando cambie el idioma
  useEffect(() => {
    const lang = i18n.language.split('-')[0];
    setTexts(reasonsTranslations[lang] || reasonsTranslations.es);
  }, [i18n.language]);
  
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
      <SectionTitle>{texts.title}</SectionTitle>
      <Subtitle>{texts.subtitle}</Subtitle>
      
      {isMobile ? (
        <MobileReasonsContainer>
          {texts.mobileReasons.map((reason, index) => (
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
          {texts.desktopReasons.map((reason, index) => (
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

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;

export default WhyChooseUsSection;