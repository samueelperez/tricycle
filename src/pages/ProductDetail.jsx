import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import PlasticSlider from '../components/PlasticSlider';
import MetalSlider from '../components/MetalSlider';
import PaperSlider from '../components/PaperSlider';

// Usamos la misma imagen para todos los productos
const productImage = 'https://images.unsplash.com/photo-1558389186-438424b00a32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

// Datos de productos (ampliados)
const productsData = {
  plastico: {
    title: 'Plástico Reciclado',
    image: productImage,
    description: 'Ofrecemos diferentes tipos de plásticos reciclados de alta calidad para diversas aplicaciones industriales. Nuestro proceso garantiza la pureza y consistencia del material.',
    longDescription: 'En TRICYCLE nos especializamos en el reciclaje de diferentes tipos de plásticos, transformándolos en materia prima de alta calidad lista para su uso en nuevos productos. Trabajamos con PET, PEAD, PP y otros tipos de plásticos, asegurando la máxima pureza y consistencia en cada lote.',
    benefits: [
      'Reducción de residuos en vertederos',
      'Ahorro de recursos naturales',
      'Menor huella de carbono',
      'Cumplimiento de normativas ambientales',
      'Contribución a la economía circular'
    ],
    applications: [
      'Envases y embalajes',
      'Productos de consumo',
      'Componentes industriales',
      'Construcción y mobiliario urbano',
      'Automoción y transporte'
    ],
    useSlider: true,
    sliderComponent: PlasticSlider
  },
  metal: {
    title: 'Metal Recuperado',
    image: productImage,
    description: 'Recuperamos y procesamos metales de diversas fuentes para darles una segunda vida, contribuyendo a la economía circular y reduciendo la necesidad de extracción de nuevos recursos.',
    longDescription: 'Nuestro proceso de recuperación de metales implica la recolección, clasificación, procesamiento y refinamiento de materiales metálicos provenientes de diversas fuentes. Trabajamos con aluminio, cobre, hierro y otros metales valiosos.',
    benefits: [
      'Ahorro significativo de energía',
      'Reducción de la minería y extracción',
      'Menor contaminación del aire y agua',
      'Conservación de recursos finitos',
      'Solución económicamente viable'
    ],
    applications: [
      'Industria manufacturera',
      'Construcción',
      'Electrodomésticos',
      'Automoción',
      'Electrónica'
    ],
    useSlider: true,
    sliderComponent: MetalSlider
  },
  papel: {
    title: 'Papel y Cartón',
    image: productImage,
    description: 'Reciclamos papel y cartón para crear nuevos productos, ahorrando árboles, agua y energía en el proceso de fabricación.',
    longDescription: 'El reciclaje de papel y cartón es uno de los procesos más eficientes y beneficiosos para el medio ambiente. Cada tonelada de papel reciclado ahorra aproximadamente 17 árboles, 26.000 litros de agua y 4.000 kWh de electricidad.',
    benefits: [
      'Reducción de la deforestación',
      'Ahorro de agua y energía',
      'Disminución de residuos en vertederos',
      'Menor contaminación del aire y agua',
      'Ciclo de producción más eficiente'
    ],
    applications: [
      'Embalajes y cajas',
      'Material de oficina',
      'Papel higiénico y servilletas',
      'Materiales de construcción',
      'Artes gráficas'
    ],
    useSlider: true,
    sliderComponent: PaperSlider
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulamos una carga de datos
    setLoading(true);
    
    setTimeout(() => {
      if (productsData[id]) {
        setProduct(productsData[id]);
        setLoading(false);
      } else {
        setError('Producto no encontrado');
        setLoading(false);
      }
    }, 500);
  }, [id]);

  if (loading) {
    return <LoadingContainer>Cargando información del producto...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  // Obtener el componente de slider correspondiente
  const SliderComponent = product.sliderComponent;

  return (
    <>
      <Navbar />
      <PageContainer>
        <BackButton to="/">← Volver a inicio</BackButton>
        
        <HeaderSection>
          <ProductTitle
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {product.title}
          </ProductTitle>
          <ProductDescription>
            {product.description}
          </ProductDescription>
        </HeaderSection>

        {/* Slider dinámico según el tipo de producto */}
        {product.useSlider && SliderComponent && (
          <SliderSection>
            <SliderComponent />
          </SliderSection>
        )}
        
        <ContentSection>
          <InfoColumn
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionTitle>Sobre este material</SectionTitle>
            <LongDescription>{product.longDescription}</LongDescription>
          </InfoColumn>
          
          <InfoColumn
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SectionTitle>Beneficios</SectionTitle>
            <BenefitsList>
              {product.benefits.map((benefit, index) => (
                <BenefitItem key={index}>{benefit}</BenefitItem>
              ))}
            </BenefitsList>
          </InfoColumn>
        </ContentSection>
        
        <ApplicationsSection
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <SectionTitle>Aplicaciones</SectionTitle>
          <ApplicationsGrid>
            {product.applications.map((application, index) => (
              <ApplicationItem key={index}>
                <ApplicationIcon>✓</ApplicationIcon>
                <ApplicationText>{application}</ApplicationText>
              </ApplicationItem>
            ))}
          </ApplicationsGrid>
        </ApplicationsSection>
        
        <CallToAction>
          <CTAText>¿Interesado en nuestros productos de {product.title.toLowerCase()}?</CTAText>
          <CTAButton to="/contacto">Contáctanos</CTAButton>
        </CallToAction>
      </PageContainer>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  
  @media (max-width: 768px) {
    padding: 70px 15px;
  }
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.8;
    transform: translateX(-5px);
  }
`;

const HeaderSection = styled.header`
  margin-bottom: 40px;
  text-align: center;
`;

const ProductTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProductDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.darkGrey};
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SliderSection = styled.section`
  margin: 40px 0;
`;

const ContentSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const InfoColumn = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const LongDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BenefitItem = styled.li`
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  position: relative;
  padding-left: 28px;
  
  &:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const ApplicationsSection = styled(motion.section)`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 60px;
  text-align: center;
`;

const ApplicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ApplicationItem = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightGrey || '#f8f8f8'};
  padding: 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
`;

const ApplicationIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  margin-right: 10px;
  font-size: 0.9rem;
`;

const ApplicationText = styled.span`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
`;

const CallToAction = styled.div`
  text-align: center;
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.lightGrey || '#f8f8f8'};
  border-radius: 10px;
`;

const CTAText = styled.p`
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.darkGrey};
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 25px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGreen || '#1e6b47'};
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  font-size: 1.2rem;
  color: crimson;
`;

export default ProductDetail; 