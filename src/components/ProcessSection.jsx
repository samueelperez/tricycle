import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { useTranslation } from 'react-i18next';

// Traducciones para todos los idiomas
const processTranslations = {
  es: {
    title: "Nuestro Proceso de Reciclaje",
    titleMobile: "Proceso de Reciclaje",
    desktopSteps: [
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
    ],
    mobileSteps: [
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
    ]
  },
  en: {
    title: "Our Recycling Process",
    titleMobile: "Recycling Process",
    desktopSteps: [
      {
        icon: '♻️',
        title: 'Collection',
        description: 'We collect recyclable materials from companies, institutions and community collection points, ensuring efficient and environmentally-friendly logistics.'
      },
      {
        icon: '🔍',
        title: 'Sorting',
        description: 'We meticulously separate materials by type and quality, using advanced technology and manual quality control to ensure the purity of each category.'
      },
      {
        icon: '⚙️',
        title: 'Processing',
        description: 'We transform the sorted materials through specific industrial processes for each type, converting them into raw materials ready for reuse.'
      },
      {
        icon: '🌱',
        title: 'Distribution',
        description: 'We supply recycled materials to manufacturers and companies committed to sustainability, closing the cycle of the circular economy.'
      }
    ],
    mobileSteps: [
      {
        icon: '♻️',
        title: 'Collection',
        description: 'Efficient and sustainable collection'
      },
      {
        icon: '🔍',
        title: 'Sorting',
        description: 'Precise categorization'
      },
      {
        icon: '⚙️',
        title: 'Processing',
        description: 'Advanced industrial transformation'
      },
      {
        icon: '🌱',
        title: 'Distribution',
        description: 'Circular economy integration'
      }
    ]
  },
  fr: {
    title: "Notre Processus de Recyclage",
    titleMobile: "Processus de Recyclage",
    desktopSteps: [
      {
        icon: '♻️',
        title: 'Collecte',
        description: "Nous collectons les matériaux recyclables auprès des entreprises, des institutions et des points de collecte communautaires, assurant une logistique efficace et respectueuse de l'environnement."
      },
      {
        icon: '🔍',
        title: 'Tri',
        description: "Nous séparons méticuleusement les matériaux par type et qualité, en utilisant une technologie avancée et un contrôle de qualité manuel pour garantir la pureté de chaque catégorie."
      },
      {
        icon: '⚙️',
        title: 'Traitement',
        description: "Nous transformons les matériaux triés par des processus industriels spécifiques à chaque type, les convertissant en matières premières prêtes à être réutilisées."
      },
      {
        icon: '🌱',
        title: 'Distribution',
        description: "Nous fournissons des matériaux recyclés aux fabricants et aux entreprises engagées dans le développement durable, fermant ainsi le cycle de l'économie circulaire."
      }
    ],
    mobileSteps: [
      {
        icon: '♻️',
        title: 'Collecte',
        description: 'Collecte efficace et durable'
      },
      {
        icon: '🔍',
        title: 'Tri',
        description: 'Catégorisation précise'
      },
      {
        icon: '⚙️',
        title: 'Traitement',
        description: 'Transformation industrielle avancée'
      },
      {
        icon: '🌱',
        title: 'Distribution',
        description: "Intégration à l'économie circulaire"
      }
    ]
  },
  zh: {
    title: "我们的回收流程",
    titleMobile: "回收流程",
    desktopSteps: [
      {
        icon: '♻️',
        title: '收集',
        description: '我们从公司、机构和社区收集点收集可回收材料，确保高效和环保的物流。'
      },
      {
        icon: '🔍',
        title: '分类',
        description: '我们按类型和质量精心分离材料，使用先进技术和人工质量控制，确保每个类别的纯度。'
      },
      {
        icon: '⚙️',
        title: '处理',
        description: '我们通过适用于每种类型的特定工业流程转化分类材料，将它们转变为可重复使用的原材料。'
      },
      {
        icon: '🌱',
        title: '分配',
        description: '我们向致力于可持续发展的制造商和公司提供回收材料，完成循环经济周期。'
      }
    ],
    mobileSteps: [
      {
        icon: '♻️',
        title: '收集',
        description: '高效可持续的收集'
      },
      {
        icon: '🔍',
        title: '分类',
        description: '精确分类'
      },
      {
        icon: '⚙️',
        title: '处理',
        description: '先进工业转型'
      },
      {
        icon: '🌱',
        title: '分配',
        description: '循环经济整合'
      }
    ]
  },
  tr: {
    title: "Geri Dönüşüm Sürecimiz",
    titleMobile: "Geri Dönüşüm Süreci",
    desktopSteps: [
      {
        icon: '♻️',
        title: 'Toplama',
        description: 'Şirketlerden, kurumlardan ve topluluk toplama noktalarından geri dönüştürülebilir malzemeleri topluyoruz, verimli ve çevre dostu lojistik sağlıyoruz.'
      },
      {
        icon: '🔍',
        title: 'Ayırma',
        description: 'Malzemeleri türüne ve kalitesine göre titizlikle ayırıyoruz, her kategorinin saflığını sağlamak için gelişmiş teknoloji ve manuel kalite kontrolü kullanıyoruz.'
      },
      {
        icon: '⚙️',
        title: 'İşleme',
        description: 'Ayrıştırılmış malzemeleri her tür için özel endüstriyel süreçlerle dönüştürüyor, yeniden kullanıma hazır hammaddelere dönüştürüyoruz.'
      },
      {
        icon: '🌱',
        title: 'Dağıtım',
        description: 'Sürdürülebilirliğe bağlı üreticilere ve şirketlere geri dönüştürülmüş malzemeler tedarik ederek döngüsel ekonomi döngüsünü kapatıyoruz.'
      }
    ],
    mobileSteps: [
      {
        icon: '♻️',
        title: 'Toplama',
        description: 'Verimli ve sürdürülebilir toplama'
      },
      {
        icon: '🔍',
        title: 'Ayırma',
        description: 'Hassas kategorizasyon'
      },
      {
        icon: '⚙️',
        title: 'İşleme',
        description: 'Gelişmiş endüstriyel dönüşüm'
      },
      {
        icon: '🌱',
        title: 'Dağıtım',
        description: 'Döngüsel ekonomi entegrasyonu'
      }
    ]
  }
};

// Datos de los pasos del proceso con iconos - Mantener los arrays originales para no alterar estructura
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

// Versión compacta para móvil - Mantener el array original
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
  const { i18n } = useTranslation();
  const [texts, setTexts] = useState(processTranslations.es);
  
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
  
  // Actualizar textos cuando cambie el idioma
  useEffect(() => {
    const lang = i18n.language.split('-')[0];
    setTexts(processTranslations[lang] || processTranslations.es);
  }, [i18n.language]);

  // Usar los arrays originales para la estructura, pero reemplazar textos
  const currentDesktopSteps = texts.desktopSteps || processSteps;
  const currentMobileSteps = texts.mobileSteps || mobileSteps;

  return (
    <SectionContainer>
      <SectionTitle>
        {isMobile ? texts.titleMobile : texts.title}
      </SectionTitle>
      
      {isMobile ? (
        // Diseño para móvil en grid
        <MobileProcessGrid>
          {currentMobileSteps.map((step, index) => (
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
          {currentDesktopSteps.map((step, index) => (
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