import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Importamos las imágenes
import PEAD from '../assets/images/plastico/PEAD.jpg';
import PET from '../assets/images/plastico/PET.jpg';
import tambores from '../assets/images/plastico/tambores.avif';
import PETFlakes from '../assets/images/plastico/PET-flakes.webp';

// Definimos las traducciones de las imágenes
const slideTranslations = {
  es: [
    {
      title: 'Recycled Pellets ( ABS-PS-PP-HDPE- PA)',
      description: 'Pellets reciclados de diversos polímeros, perfectos para la fabricación de nuevos productos plásticos sostenibles.'
    },
    {
      title: 'All tupes of Plastic Regrind ( plasticos triturados)',
      description: 'Plásticos triturados de diferentes tipos, preparados para su reprocesamiento en la industria del reciclaje.'
    },
    {
      title: 'PET Flakes',
      description: 'Escamas de PET reciclado de alta pureza, listas para ser transformadas en nuevos productos sostenibles.'
    }
  ],
  en: [
    {
      title: 'Recycled Pellets (ABS-PS-PP-HDPE-PA)',
      description: 'Recycled pellets of various polymers, perfect for manufacturing new sustainable plastic products.'
    },
    {
      title: 'All Types of Plastic Regrind',
      description: 'Ground plastics of different types, prepared for reprocessing in the recycling industry.'
    },
    {
      title: 'PET Flakes',
      description: 'High-purity recycled PET flakes, ready to be transformed into new sustainable products.'
    }
  ],
  fr: [
    {
      title: 'Granulés Recyclés (ABS-PS-PP-PEHD-PA)',
      description: 'Granulés recyclés de divers polymères, parfaits pour la fabrication de nouveaux produits plastiques durables.'
    },
    {
      title: 'Tous Types de Broyats Plastiques',
      description: 'Plastiques broyés de différents types, préparés pour leur retraitement dans l\'industrie du recyclage.'
    },
    {
      title: 'Paillettes de PET',
      description: 'Paillettes de PET recyclé de haute pureté, prêtes à être transformées en nouveaux produits durables.'
    }
  ],
  zh: [
    {
      title: '回收塑料颗粒 (ABS-PS-PP-HDPE-PA)',
      description: '各种聚合物的回收颗粒，适用于制造新的可持续塑料产品。'
    },
    {
      title: '各类塑料再研磨料',
      description: '不同类型的塑料磨碎料，可用于回收行业的再加工。'
    },
    {
      title: 'PET 薄片',
      description: '高纯度回收PET薄片，可用于制造新的可持续产品。'
    }
  ],
  tr: [
    {
      title: 'Geri Dönüştürülmüş Peletler (ABS-PS-PP-HDPE-PA)',
      description: 'Yeni sürdürülebilir plastik ürünlerin üretimi için mükemmel, çeşitli polimerlerden geri dönüştürülmüş peletler.'
    },
    {
      title: 'Her Tür Plastik Öğütme',
      description: 'Geri dönüşüm endüstrisinde yeniden işlenmek üzere hazırlanmış farklı türdeki öğütülmüş plastikler.'
    },
    {
      title: 'PET Pulları',
      description: 'Yeni sürdürülebilir ürünlere dönüştürülmeye hazır, yüksek saflıkta geri dönüştürülmüş PET pulları.'
    }
  ]
};

const images = [
  {
    src: PEAD,
    title: '',
    description: ''
  },
  {
    src: tambores,
    title: '',
    description: ''
  },
  {
    src: PETFlakes,
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