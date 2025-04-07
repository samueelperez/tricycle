import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Importamos las imágenes
import chatarraFerrosa from '../assets/images/metal/chatarra ferrosa.jpg';
import latasAluminio from '../assets/images/metal/latas de aluminio.jpg';
import chatarraAlambre from '../assets/images/metal/chatarra-de-alambre.jpg';

// Definimos las traducciones para cada slide
const slideTranslations = {
  es: [
    {
      title: 'Chatarra Ferrosa y no Ferrosa',
      description: 'Recuperamos hierro y acero de diversas fuentes para su reutilización en nuevos productos industriales.'
    },
    {
      title: 'Chatarra de aluminio',
      description: 'Procesamos latas y otros materiales de aluminio, ahorrando hasta un 95% de energía respecto a la producción primaria.'
    },
    {
      title: 'Chatarra UBC',
      description: 'Reciclamos latas de bebidas usadas para su transformación en nuevos productos de aluminio, reduciendo la necesidad de extracción de materias primas.'
    }
  ],
  en: [
    {
      title: 'Ferrous and non ferrous scrap',
      description: 'We recover iron and steel from various sources for reuse in new industrial products.'
    },
    {
      title: 'Aluminum Scrap',
      description: 'We process cans and other aluminum materials, saving up to 95% energy compared to primary production.'
    },
    {
      title: 'UBC SCRAP',
      description: 'We recycle used beverage cans for transformation into new aluminum products, reducing the need for raw material extraction.'
    }
  ],
  fr: [
    {
      title: 'Ferraille Ferreuse et non Ferreuse',
      description: 'Nous récupérons le fer et l\'acier de diverses sources pour leur réutilisation dans de nouveaux produits industriels.'
    },
    {
      title: 'Ferraille d\'Aluminium',
      description: 'Nous transformons les canettes et autres matériaux en aluminium, économisant jusqu\'à 95% d\'énergie par rapport à la production primaire.'
    },
    {
      title: 'FERRAILLE UBC',
      description: 'Nous recyclons des canettes de boisson usagées pour les transformer en nouveaux produits d\'aluminium, réduisant le besoin d\'extraction de matières premières.'
    }
  ],
  zh: [
    {
      title: '黑色和有色金属废料',
      description: '我们从各种来源回收铁和钢，用于新工业产品的再利用。'
    },
    {
      title: '铝废料',
      description: '我们处理罐头和其他铝材料，与原生产相比节省高达95%的能源。'
    },
    {
      title: 'UBC废料',
      description: '我们回收废弃饮料罐，用于制造新的铝产品，减少原材料开采的需求。'
    }
  ],
  tr: [
    {
      title: 'Demir ve Demir Dışı Hurda',
      description: 'Çeşitli kaynaklardan demir ve çeliği geri kazanarak yeni endüstriyel ürünlerde yeniden kullanıyoruz.'
    },
    {
      title: 'Alüminyum Hurdası',
      description: 'Teneke kutular ve diğer alüminyum malzemeleri işliyoruz, birincil üretime kıyasla %95\'e kadar enerji tasarrufu sağlıyoruz.'
    },
    {
      title: 'UBC HURDA',
      description: 'Kullanılmış içecek kutularını yeni alüminyum ürünlere dönüştürmek için geri dönüştürüyor, hammadde çıkarma ihtiyacını azaltıyoruz.'
    }
  ]
};

const images = [
  {
    src: chatarraFerrosa,
    title: 'Chatarra Ferrosa y no Ferrosa',
    description: 'Recuperamos hierro y acero de diversas fuentes para su reutilización en nuevos productos industriales.'
  },
  {
    src: latasAluminio,
    title: 'Chatarra de aluminio',
    description: 'Procesamos latas y otros materiales de aluminio, ahorrando hasta un 95% de energía respecto a la producción primaria.'
  },
  {
    src: chatarraAlambre,
    title: 'Chatarra UBC',
    description: 'Reciclamos latas de bebidas usadas para su transformación en nuevos productos de aluminio, reduciendo la necesidad de extracción de materias primas.'
  }
];

const MetalSlider = () => {
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

  // Variantes para las animaciones
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

export default MetalSlider; 