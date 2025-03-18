import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Importamos las imágenes
import PEAD from '../assets/images/plastico/PEAD.jpg';
import PET from '../assets/images/plastico/PET.jpg';
import tambores from '../assets/images/plastico/tambores.avif';

// Definimos las traducciones de las imágenes
const slideTranslations = {
  es: [
    {
      title: 'PET Reciclado',
      description: 'Material plástico reciclado ideal para envases y aplicaciones textiles.'
    },
    {
      title: 'PEAD (Polietileno de Alta Densidad)',
      description: 'Plástico resistente y versátil para aplicaciones industriales y de consumo.'
    },
    {
      title: 'Tambores y Contenedores',
      description: 'Soluciones de almacenamiento fabricadas con plástico reciclado de alta calidad.'
    }
  ],
  en: [
    {
      title: 'Recycled PET',
      description: 'Recycled plastic material ideal for packaging and textile applications.'
    },
    {
      title: 'HDPE (High-Density Polyethylene)',
      description: 'Resistant and versatile plastic for industrial and consumer applications.'
    },
    {
      title: 'Drums and Containers',
      description: 'Storage solutions made with high-quality recycled plastic.'
    }
  ],
  fr: [
    {
      title: 'PET Recyclé',
      description: 'Matériau plastique recyclé idéal pour les emballages et les applications textiles.'
    },
    {
      title: 'PEHD (Polyéthylène Haute Densité)',
      description: 'Plastique résistant et polyvalent pour des applications industrielles et de consommation.'
    },
    {
      title: 'Fûts et Conteneurs',
      description: 'Solutions de stockage fabriquées avec du plastique recyclé de haute qualité.'
    }
  ],
  zh: [
    {
      title: '回收PET',
      description: '适用于包装和纺织应用的回收塑料材料。'
    },
    {
      title: 'HDPE（高密度聚乙烯）',
      description: '用于工业和消费者应用的耐用多功能塑料。'
    },
    {
      title: '桶和容器',
      description: '使用高质量回收塑料制成的储存解决方案。'
    }
  ],
  tr: [
    {
      title: 'Geri Dönüştürülmüş PET',
      description: 'Ambalaj ve tekstil uygulamaları için ideal geri dönüştürülmüş plastik malzeme.'
    },
    {
      title: 'HDPE (Yüksek Yoğunluklu Polietilen)',
      description: 'Endüstriyel ve tüketici uygulamaları için dayanıklı ve çok yönlü plastik.'
    },
    {
      title: 'Varil ve Konteynerler',
      description: 'Yüksek kaliteli geri dönüştürülmüş plastikten üretilmiş depolama çözümleri.'
    }
  ]
};

const images = [
  {
    src: PET,
    title: '',
    description: ''
  },
  {
    src: PEAD,
    title: '',
    description: ''
  },
  {
    src: tambores,
    title: '',
    description: ''
  }
];

const PlasticSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const { i18n } = useTranslation();
  const [texts, setTexts] = useState(slideTranslations.es);

  // Actualizar textos cuando cambie el idioma
  useEffect(() => {
    const currentLang = i18n.language.split('-')[0];
    setTexts(slideTranslations[currentLang] || slideTranslations.en);
  }, [i18n.language]);

  const nextSlide = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Autoplay
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Cambio en las variantes para las animaciones
  const variants = {
    enter: (direction) => {
      return {
        x: direction === 'right' ? 300 : -300,
        opacity: 0,
        position: 'absolute'
      };
    },
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
      position: 'relative'
    },
    exit: (direction) => {
      return {
        x: direction === 'right' ? -300 : 300,
        opacity: 0,
        zIndex: 0,
        position: 'absolute'
      };
    }
  };

  return (
    <SliderContainer>
      <SliderContent>
        <AnimatePresence initial={false} custom={direction}>
          <SlideMotion
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 200, damping: 25 },
              opacity: { duration: 0.5 }
            }}
          >
            <SlideImage src={images[currentIndex].src} alt={texts[currentIndex].title} />
            <SlideTextOverlay>
              <SlideTitle>{texts[currentIndex].title}</SlideTitle>
              <SlideDescription>{texts[currentIndex].description}</SlideDescription>
            </SlideTextOverlay>
          </SlideMotion>
        </AnimatePresence>
      </SliderContent>
      
      <SliderControls>
        <SliderButton onClick={prevSlide} aria-label="Imagen anterior">
          <FaChevronLeft />
        </SliderButton>
        <SliderDots>
          {images.map((_, index) => (
            <SliderDot 
              key={index} 
              active={index === currentIndex}
              onClick={() => {
                setDirection(index > currentIndex ? 'right' : 'left');
                setCurrentIndex(index);
              }}
            />
          ))}
        </SliderDots>
        <SliderButton onClick={nextSlide} aria-label="Imagen siguiente">
          <FaChevronRight />
        </SliderButton>
      </SliderControls>
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
`;

const SliderContent = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme.colors.lightGrey || '#f9f9f9'};
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const SlideMotion = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const SlideTextOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
`;

const SlideTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SlideDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

const SliderControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const SliderButton = styled.button`
  background-color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: ${props => props.theme.colors.primary || '#2e8b57'};
  
  &:hover {
    background-color: ${props => props.theme.colors.primary || '#2e8b57'};
    color: white;
    transform: scale(1.1);
  }
  
  &:focus {
    outline: none;
  }
`;

const SliderDots = styled.div`
  display: flex;
  gap: 10px;
`;

const SliderDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? props.theme.colors.primary || '#2e8b57' : '#ddd'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

export default PlasticSlider; 