import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Usamos la misma imagen para todos los productos
const productImage = 'https://images.unsplash.com/photo-1558389186-438424b00a32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

// Textos predefinidos para cada idioma
const productTexts = {
  es: {
    title: "Nuestros Productos",
    subtitle: "Ofrecemos una amplia gama de productos reciclados de alta calidad",
    viewDetails: "Ver Detalles",
    products: [
      {
        name: "Plástico Reciclado",
        description: "Plásticos procesados y transformados listos para su reutilización industrial"
      },
      {
        name: "Metal Recuperado",
        description: "Aluminio, cobre y otros metales reciclados para uso industrial"
      },
      {
        name: "Papel y Cartón",
        description: "Fibras de celulosa recicladas para la producción de nuevos materiales"
      }
    ]
  },
  en: {
    title: "Our Products",
    subtitle: "We offer a wide range of high-quality recycled products",
    viewDetails: "View Details",
    products: [
      {
        name: "Recycled Plastic",
        description: "Processed and transformed plastics ready for industrial reuse"
      },
      {
        name: "Recovered Metal",
        description: "Aluminum, copper and other recycled metals for industrial use"
      },
      {
        name: "Paper and Cardboard",
        description: "Recycled cellulose fibers for the production of new materials"
      }
    ]
  },
  fr: {
    title: "Nos Produits",
    subtitle: "Nous proposons une large gamme de produits recyclés de haute qualité",
    viewDetails: "Voir les Détails",
    products: [
      {
        name: "Plastique Recyclé",
        description: "Plastiques transformés et traités prêts pour la réutilisation industrielle"
      },
      {
        name: "Métal Récupéré",
        description: "Aluminium, cuivre et autres métaux recyclés pour usage industriel"
      },
      {
        name: "Papier et Carton",
        description: "Fibres de cellulose recyclées pour la production de nouveaux matériaux"
      }
    ]
  },
  zh: {
    title: "我们的产品",
    subtitle: "我们提供各种高质量的再生产品",
    viewDetails: "查看详情",
    products: [
      {
        name: "回收塑料",
        description: "经过加工和转化的塑料，可供工业再利用"
      },
      {
        name: "回收金属",
        description: "铝、铜和其他回收金属用于工业用途"
      },
      {
        name: "纸和纸板",
        description: "用于生产新材料的再生纤维素纤维"
      }
    ]
  },
  tr: {
    title: "Ürünlerimiz",
    subtitle: "Yüksek kaliteli geri dönüştürülmüş ürünlerin geniş bir yelpazesini sunuyoruz",
    viewDetails: "Detayları Görüntüle",
    products: [
      {
        name: "Geri Dönüştürülmüş Plastik",
        description: "Endüstriyel yeniden kullanım için hazır işlenmiş ve dönüştürülmüş plastikler"
      },
      {
        name: "Geri Kazanılmış Metal",
        description: "Endüstriyel kullanım için alüminyum, bakır ve diğer geri dönüştürülmüş metaller"
      },
      {
        name: "Kağıt ve Karton",
        description: "Yeni malzemelerin üretimi için geri dönüştürülmüş selüloz lifleri"
      }
    ]
  }
};

const products = [
  {
    id: 'plastico',
    title: 'Plástico Reciclado',
    description: 'Transformamos residuos plásticos en nuevos productos sostenibles, reduciendo la contaminación y dando una segunda vida a estos materiales.',
    image: productImage,
    icon: '🔄'
  },
  {
    id: 'metal',
    title: 'Metal Recuperado',
    description: 'Procesamos y recuperamos metales de diversos orígenes, contribuyendo a la economía circular y reduciendo la necesidad de extracción de nuevos recursos.',
    image: productImage,
    icon: '⚙️'
  },
  {
    id: 'papel',
    title: 'Papel y Cartón',
    description: 'Reciclamos papel y cartón para crear nuevos productos, ahorrando árboles, agua y energía en el proceso de fabricación.',
    image: productImage,
    icon: '📄'
  }
];

const ProductsSection = () => {
  const { i18n } = useTranslation();
  const [texts, setTexts] = useState(productTexts.es);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(0); // -1 para izquierda, 1 para derecha
  
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

  // Cambio automático de slides en móvil
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % products.length);
      }, 4000); // Cambiar cada 4 segundos
      
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  // Actualizar textos cuando cambie el idioma
  useEffect(() => {
    const lang = i18n.language.split('-')[0];
    setTexts(productTexts[lang] || productTexts.es);
  }, [i18n.language]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 250 : -250,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 250 : -250,
        opacity: 0
      };
    }
  };

  return (
    <ProductsContainer>
      <SectionTitle>{texts.title}</SectionTitle>
      
      {isMobile ? (
        <MobileView>
          <CardContainer>
            <AnimatePresence initial={false} custom={direction}>
              <MobileProductCard
                key={currentSlide}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                <ProductIcon>{products[currentSlide].icon}</ProductIcon>
                <ProductTitle>{texts.products[currentSlide].name}</ProductTitle>
                <ProductDescription>{texts.products[currentSlide].description}</ProductDescription>
                <ButtonContainer>
                  <ProductButton to={`/productos/${products[currentSlide].id}`}>
                    {texts.viewDetails}
                  </ProductButton>
                </ButtonContainer>
              </MobileProductCard>
            </AnimatePresence>
          </CardContainer>
          
          <NavigationContainer>
            <NavButton onClick={prevSlide}>&#10094;</NavButton>
            <DotsContainer>
              {products.map((_, index) => (
                <Dot 
                  key={index} 
                  $active={index === currentSlide}
                  onClick={() => {
                    setDirection(index > currentSlide ? 1 : -1);
                    setCurrentSlide(index);
                  }}
                />
              ))}
            </DotsContainer>
            <NavButton onClick={nextSlide}>&#10095;</NavButton>
          </NavigationContainer>
        </MobileView>
      ) : (
        <ProductsGrid>
          {products.map((product, index) => (
            <ProductCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ProductIcon>{product.icon}</ProductIcon>
              <ProductTitle>{texts.products[index].name}</ProductTitle>
              <ProductDescription>{texts.products[index].description}</ProductDescription>
              <ButtonContainer>
                <ProductButton to={`/productos/${product.id}`}>
                  {texts.viewDetails}
                </ProductButton>
              </ButtonContainer>
            </ProductCard>
          ))}
        </ProductsGrid>
      )}
    </ProductsContainer>
  );
};

const ProductsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: auto;
    padding: 50px 20px;
  }
`;

const MobileView = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 30px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  overflow: visible;
  margin-bottom: 20px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  margin-top: 50px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
`;

const MobileProductCard = styled(motion.div)`
  position: absolute;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 300px;
  left: 0;
  right: 0;
  top: 0;
`;

const ProductIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
`;

const ProductTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.secondary};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.3rem;
    margin-bottom: 10px;
  }
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.darkGrey};
  margin-bottom: 20px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 15px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 15px;
`;

const ProductButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGreen};
    transform: translateY(-2px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const NavButton = styled.button`
  width: 36px;
  height: 36px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 10px;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGreen};
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $active, theme }) => $active ? theme.colors.primary : '#ddd'};
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

export default ProductsSection; 