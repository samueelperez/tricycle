import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

// Usamos la misma imagen para todos los productos
const productImage = 'https://images.unsplash.com/photo-1558389186-438424b00a32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

const productsData = {
  plastico: {
    title: 'Plástico Reciclado',
    image: productImage,
    description: `
      <p>En Tricycle, nos especializamos en la transformación de residuos plásticos en nuevos productos sostenibles, contribuyendo a la economía circular y reduciendo la contaminación ambiental.</p>
      
      <h3>Nuestro Proceso</h3>
      <p>Recolectamos, clasificamos y procesamos diferentes tipos de plásticos, incluyendo PET, HDPE, PVC, LDPE, PP y PS. Nuestro avanzado sistema de reciclaje permite convertir estos materiales en pellets de alta calidad que pueden ser utilizados en la fabricación de nuevos productos.</p>
      
      <h3>Beneficios Ambientales</h3>
      <ul>
        <li>Reducción de residuos plásticos en vertederos y océanos</li>
        <li>Disminución de la dependencia de materias primas vírgenes</li>
        <li>Ahorro significativo de energía en comparación con la producción de plástico nuevo</li>
        <li>Reducción de emisiones de CO2</li>
      </ul>
    `,
  },
  metal: {
    title: 'Metal Recuperado',
    image: productImage,
    description: `
      <p>En Tricycle, nos dedicamos a la recuperación y procesamiento de metales de diversos orígenes, contribuyendo a la conservación de recursos naturales y a la reducción del impacto ambiental de la industria metalúrgica.</p>
      
      <h3>Nuestro Proceso</h3>
      <p>Recolectamos, clasificamos y procesamos diferentes tipos de metales, incluyendo aluminio, cobre, hierro, acero inoxidable y otros metales no ferrosos. Nuestro avanzado sistema de recuperación permite obtener materiales de alta pureza que pueden ser reintroducidos en la cadena de producción.</p>
      
      <h3>Beneficios Ambientales</h3>
      <ul>
        <li>Reducción de la extracción de nuevos recursos minerales</li>
        <li>Disminución del consumo energético asociado a la producción de metales vírgenes</li>
        <li>Reducción de emisiones de gases de efecto invernadero</li>
        <li>Minimización de residuos en vertederos</li>
      </ul>
    `,
  },
  papel: {
    title: 'Papel y Cartón',
    image: productImage,
    description: `
      <p>En Tricycle, nos especializamos en el reciclaje de papel y cartón, transformando estos materiales en nuevos productos sostenibles que contribuyen a la conservación de bosques y a la reducción del impacto ambiental.</p>
      
      <h3>Nuestro Proceso</h3>
      <p>Recolectamos, clasificamos y procesamos diferentes tipos de papel y cartón, incluyendo papel de oficina, periódicos, revistas, cartón corrugado y envases. Nuestro avanzado sistema de reciclaje permite convertir estos materiales en pulpa de alta calidad que puede ser utilizada en la fabricación de nuevos productos.</p>
      
      <h3>Beneficios Ambientales</h3>
      <ul>
        <li>Conservación de bosques y biodiversidad</li>
        <li>Ahorro significativo de agua en comparación con la producción de papel virgen</li>
        <li>Reducción del consumo energético</li>
        <li>Disminución de emisiones de gases de efecto invernadero</li>
      </ul>
    `,
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = productsData[id];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!product) {
    return (
      <>
        <Navbar />
        <ErrorContainer>
          <h2>Producto no encontrado</h2>
          <p>Lo sentimos, el producto que estás buscando no existe.</p>
          <BackButton to="/">Volver a la página principal</BackButton>
        </ErrorContainer>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <PageWrapper>
        <ProductDetailContainer>
          <BackButton to="/">← Volver a la página principal</BackButton>
          
          <ProductHeader>
            <ProductImage src={product.image} alt={product.title} />
            <ProductTitleOverlay>
              <ProductTitle>{product.title}</ProductTitle>
            </ProductTitleOverlay>
          </ProductHeader>
          
          <ProductDescription dangerouslySetInnerHTML={{ __html: product.description }} />
          
          <ContactSection>
            <h3>¿Interesado en nuestros productos de {product.title.toLowerCase()}?</h3>
            <p>Contáctanos para obtener más información sobre especificaciones, precios y disponibilidad.</p>
            <ContactButton to="/#contacto">Contactar ahora</ContactButton>
          </ContactSection>
        </ProductDetailContainer>
      </PageWrapper>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

const PageWrapper = styled.div`
  padding-top: 80px;
  min-height: calc(100vh - 80px - 100px); /* Altura de la ventana menos header y footer */
  background-color: #fff;
`;

const ProductDetailContainer = styled.div`
  max-width: 800px;
  margin: 40px auto 80px;
  padding: 0 20px;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.darkGreen};
    text-decoration: none; /* Aseguramos que no aparezca subrayado */
  }
`;

const ProductHeader = styled.div`
  position: relative;
  margin-bottom: 40px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 300px;
  }
`;

const ProductTitleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent);
  padding: 60px 20px 20px;
`;

const ProductTitle = styled.h1`
  color: white;
  margin: 0;
  font-size: 2.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const ProductDescription = styled.div`
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  
  p {
    margin-bottom: 20px;
  }
  
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 40px;
    margin-bottom: 15px;
    font-size: 1.5rem;
  }
  
  ul {
    padding-left: 20px;
    margin-bottom: 30px;
  }
  
  li {
    margin-bottom: 10px;
  }
`;

const ContactSection = styled.div`
  background-color: #f8f8f8;
  padding: 30px;
  border-radius: 8px;
  margin-top: 50px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 0;
    font-size: 1.5rem;
  }
  
  p {
    margin-bottom: 20px;
  }
`;

const ContactButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 25px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGreen};
    color: white; /* Mantener el texto en color blanco al hacer hover */
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ErrorContainer = styled.div`
  max-width: 800px;
  margin: 150px auto;
  text-align: center;
  padding: 0 20px;
  
  h2 {
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  p {
    margin-bottom: 30px;
    font-size: 1.1rem;
  }
`;

export default ProductDetail; 