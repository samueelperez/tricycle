import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import PlasticSlider from '../components/PlasticSlider';
import MetalSlider from '../components/MetalSlider';
import PaperSlider from '../components/PaperSlider';
import ContactButton from '../components/ContactButton';
import { useTranslation } from 'react-i18next';

// Usamos la misma imagen para todos los productos
const productImage = 'https://images.unsplash.com/photo-1558389186-438424b00a32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

// Traducciones para los productos
const productTranslations = {
  es: {
    backToHome: "← Volver a inicio",
    loadingText: "Cargando información del producto...",
    aboutMaterial: "Sobre este material",
    benefits: "Beneficios",
    applications: "Aplicaciones",
    interestedIn: "¿Interesado en nuestros productos de",
    consultAbout: "Consultar sobre",
    products: {
      plastico: {
        title: 'Plástico Reciclado',
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
        ]
      },
      metal: {
        title: 'Metal Recuperado',
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
        ]
      },
      papel: {
        title: 'Papel y Cartón',
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
        ]
      }
    }
  },
  en: {
    backToHome: "← Back to home",
    loadingText: "Loading product information...",
    aboutMaterial: "About this material",
    benefits: "Benefits",
    applications: "Applications",
    interestedIn: "Interested in our products of",
    consultAbout: "Ask about",
    products: {
      plastico: {
        title: 'Recycled Plastic',
        description: 'We offer different types of high-quality recycled plastics for various industrial applications. Our process guarantees the purity and consistency of the material.',
        longDescription: 'At TRICYCLE we specialize in recycling different types of plastics, transforming them into high-quality raw material ready for use in new products. We work with PET, HDPE, PP and other types of plastics, ensuring maximum purity and consistency in each batch.',
        benefits: [
          'Reduction of waste in landfills',
          'Saving natural resources',
          'Lower carbon footprint',
          'Compliance with environmental regulations',
          'Contribution to the circular economy'
        ],
        applications: [
          'Packaging and wrapping',
          'Consumer products',
          'Industrial components',
          'Construction and urban furniture',
          'Automotive and transportation'
        ]
      },
      metal: {
        title: 'Recovered Metal',
        description: 'We recover and process metals from various sources to give them a second life, contributing to the circular economy and reducing the need for extraction of new resources.',
        longDescription: 'Our metal recovery process involves the collection, classification, processing and refining of metallic materials from various sources. We work with aluminum, copper, iron and other valuable metals.',
        benefits: [
          'Significant energy savings',
          'Reduction of mining and extraction',
          'Less air and water pollution',
          'Conservation of finite resources',
          'Economically viable solution'
        ],
        applications: [
          'Manufacturing industry',
          'Construction',
          'Home appliances',
          'Automotive',
          'Electronics'
        ]
      },
      papel: {
        title: 'Paper and Cardboard',
        description: 'We recycle paper and cardboard to create new products, saving trees, water and energy in the manufacturing process.',
        longDescription: 'Paper and cardboard recycling is one of the most efficient and beneficial processes for the environment. Each ton of recycled paper saves approximately 17 trees, 26,000 liters of water and 4,000 kWh of electricity.',
        benefits: [
          'Reduction of deforestation',
          'Water and energy savings',
          'Decrease in landfill waste',
          'Less air and water pollution',
          'More efficient production cycle'
        ],
        applications: [
          'Packaging and boxes',
          'Office supplies',
          'Toilet paper and napkins',
          'Construction materials',
          'Graphic arts'
        ]
      }
    }
  },
  fr: {
    backToHome: "← Retour à l'accueil",
    loadingText: "Chargement des informations du produit...",
    aboutMaterial: "À propos de ce matériau",
    benefits: "Avantages",
    applications: "Applications",
    interestedIn: "Intéressé par nos produits de",
    consultAbout: "Renseignez-vous sur",
    products: {
      plastico: {
        title: 'Plastique Recyclé',
        description: 'Nous proposons différents types de plastiques recyclés de haute qualité pour diverses applications industrielles. Notre processus garantit la pureté et la cohérence du matériau.',
        longDescription: 'Chez TRICYCLE, nous nous spécialisons dans le recyclage de différents types de plastiques, les transformant en matière première de haute qualité prête à être utilisée dans de nouveaux produits. Nous travaillons avec le PET, le PEHD, le PP et d\'autres types de plastiques, assurant une pureté et une consistance maximales dans chaque lot.',
        benefits: [
          'Réduction des déchets dans les décharges',
          'Économie des ressources naturelles',
          'Empreinte carbone réduite',
          'Conformité aux réglementations environnementales',
          'Contribution à l\'économie circulaire'
        ],
        applications: [
          'Emballages',
          'Produits de consommation',
          'Composants industriels',
          'Construction et mobilier urbain',
          'Automobile et transport'
        ]
      },
      metal: {
        title: 'Métal Récupéré',
        description: 'Nous récupérons et traitons les métaux de diverses sources pour leur donner une seconde vie, contribuant à l\'économie circulaire et réduisant le besoin d\'extraction de nouvelles ressources.',
        longDescription: 'Notre processus de récupération des métaux implique la collecte, la classification, le traitement et le raffinage des matériaux métalliques provenant de diverses sources. Nous travaillons avec l\'aluminium, le cuivre, le fer et d\'autres métaux précieux.',
        benefits: [
          'Économies d\'énergie significatives',
          'Réduction de l\'exploitation minière et de l\'extraction',
          'Moins de pollution de l\'air et de l\'eau',
          'Conservation des ressources finies',
          'Solution économiquement viable'
        ],
        applications: [
          'Industrie manufacturière',
          'Construction',
          'Électroménager',
          'Automobile',
          'Électronique'
        ]
      },
      papel: {
        title: 'Papier et Carton',
        description: 'Nous recyclons le papier et le carton pour créer de nouveaux produits, économisant des arbres, de l\'eau et de l\'énergie dans le processus de fabrication.',
        longDescription: 'Le recyclage du papier et du carton est l\'un des processus les plus efficaces et les plus bénéfiques pour l\'environnement. Chaque tonne de papier recyclé permet d\'économiser environ 17 arbres, 26 000 litres d\'eau et 4 000 kWh d\'électricité.',
        benefits: [
          'Réduction de la déforestation',
          'Économies d\'eau et d\'énergie',
          'Diminution des déchets dans les décharges',
          'Moins de pollution de l\'air et de l\'eau',
          'Cycle de production plus efficace'
        ],
        applications: [
          'Emballages et boîtes',
          'Fournitures de bureau',
          'Papier toilette et serviettes',
          'Matériaux de construction',
          'Arts graphiques'
        ]
      }
    }
  },
  zh: {
    backToHome: "← 返回首页",
    loadingText: "正在加载产品信息...",
    aboutMaterial: "关于这种材料",
    benefits: "优势",
    applications: "应用",
    interestedIn: "对我们的产品感兴趣",
    consultAbout: "咨询关于",
    products: {
      plastico: {
        title: '回收塑料',
        description: '我们为各种工业应用提供不同类型的高质量回收塑料。我们的工艺保证了材料的纯度和一致性。',
        longDescription: '在TRICYCLE，我们专注于回收不同类型的塑料，将它们转化为可用于新产品的高质量原材料。我们使用PET、HDPE、PP和其他类型的塑料，确保每批次的最大纯度和一致性。',
        benefits: [
          '减少垃圾填埋场的废物',
          '节约自然资源',
          '降低碳足迹',
          '符合环保法规',
          '对循环经济的贡献'
        ],
        applications: [
          '包装',
          '消费品',
          '工业组件',
          '建筑和城市家具',
          '汽车和运输'
        ]
      },
      metal: {
        title: '回收金属',
        description: '我们从各种来源回收和处理金属，赋予它们第二次生命，为循环经济做贡献，减少对新资源开采的需求。',
        longDescription: '我们的金属回收过程包括收集、分类、处理和精炼来自各种来源的金属材料。我们使用铝、铜、铁和其他贵重金属。',
        benefits: [
          '显著节约能源',
          '减少采矿和提取',
          '减少空气和水污染',
          '保护有限资源',
          '经济可行的解决方案'
        ],
        applications: [
          '制造业',
          '建筑',
          '家用电器',
          '汽车',
          '电子产品'
        ]
      },
      papel: {
        title: '纸和纸板',
        description: '我们回收纸张和纸板来创造新产品，在制造过程中节省树木、水和能源。',
        longDescription: '纸和纸板回收是对环境最有效和最有益的过程之一。每吨回收纸可节约约17棵树，26,000升水和4,000千瓦时的电力。',
        benefits: [
          '减少森林砍伐',
          '节约水和能源',
          '减少垃圾填埋场的废物',
          '减少空气和水污染',
          '更高效的生产周期'
        ],
        applications: [
          '包装和盒子',
          '办公用品',
          '卫生纸和餐巾纸',
          '建筑材料',
          '图形艺术'
        ]
      }
    }
  },
  tr: {
    backToHome: "← Ana sayfaya dön",
    loadingText: "Ürün bilgileri yükleniyor...",
    aboutMaterial: "Bu malzeme hakkında",
    benefits: "Avantajlar",
    applications: "Uygulamalar",
    interestedIn: "Ürünlerimizle ilgileniyor musunuz",
    consultAbout: "Hakkında danışın",
    products: {
      plastico: {
        title: 'Geri Dönüştürülmüş Plastik',
        description: 'Çeşitli endüstriyel uygulamalar için farklı türde yüksek kaliteli geri dönüştürülmüş plastikler sunuyoruz. Sürecimiz, malzemenin saflığını ve tutarlılığını garanti eder.',
        longDescription: 'TRICYCLE\'da, farklı plastik türlerini geri dönüştürme konusunda uzmanlaşarak, yeni ürünlerde kullanıma hazır yüksek kaliteli hammaddelere dönüştürüyoruz. PET, HDPE, PP ve diğer plastik türleriyle çalışarak, her partide maksimum saflık ve tutarlılık sağlıyoruz.',
        benefits: [
          'Çöp sahalarındaki atıkların azaltılması',
          'Doğal kaynakların korunması',
          'Daha düşük karbon ayak izi',
          'Çevre düzenlemelerine uyum',
          'Döngüsel ekonomiye katkı'
        ],
        applications: [
          'Ambalaj ve paketleme',
          'Tüketici ürünleri',
          'Endüstriyel bileşenler',
          'İnşaat ve şehir mobilyaları',
          'Otomotiv ve ulaşım'
        ]
      },
      metal: {
        title: 'Geri Kazanılmış Metal',
        description: 'Çeşitli kaynaklardan metalleri geri kazanıp işleyerek onlara ikinci bir yaşam veriyoruz, döngüsel ekonomiye katkıda bulunuyor ve yeni kaynakların çıkarılması ihtiyacını azaltıyoruz.',
        longDescription: 'Metal geri kazanım sürecimiz, çeşitli kaynaklardan gelen metalik malzemelerin toplanmasını, sınıflandırılmasını, işlenmesini ve rafine edilmesini içerir. Alüminyum, bakır, demir ve diğer değerli metallerle çalışıyoruz.',
        benefits: [
          'Önemli enerji tasarrufu',
          'Madencilik ve çıkarma işlemlerinin azaltılması',
          'Daha az hava ve su kirliliği',
          'Sınırlı kaynakların korunması',
          'Ekonomik olarak uygulanabilir çözüm'
        ],
        applications: [
          'İmalat sanayi',
          'İnşaat',
          'Ev aletleri',
          'Otomotiv',
          'Elektronik'
        ]
      },
      papel: {
        title: 'Kağıt ve Karton',
        description: 'Üretim sürecinde ağaçları, suyu ve enerjiyi koruyarak yeni ürünler yaratmak için kağıt ve kartonu geri dönüştürüyoruz.',
        longDescription: 'Kağıt ve karton geri dönüşümü, çevre için en verimli ve faydalı süreçlerden biridir. Geri dönüştürülen her ton kağıt, yaklaşık 17 ağaç, 26.000 litre su ve 4.000 kWh elektrik tasarrufu sağlar.',
        benefits: [
          'Ormansızlaşmanın azaltılması',
          'Su ve enerji tasarrufu',
          'Çöp sahalarındaki atıkların azaltılması',
          'Daha az hava ve su kirliliği',
          'Daha verimli üretim döngüsü'
        ],
        applications: [
          'Ambalaj ve kutular',
          'Ofis malzemeleri',
          'Tuvalet kağıdı ve peçeteler',
          'İnşaat malzemeleri',
          'Grafik sanatlar'
        ]
      }
    }
  }
};

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
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  // Seleccionar el idioma actual
  const [translations, setTranslations] = useState(productTranslations.es);

  // Actualizar traducciones cuando cambie el idioma
  useEffect(() => {
    const currentLang = i18n.language.split('-')[0]; // Obtener código de idioma principal (es, en, fr, etc.)
    setTranslations(productTranslations[currentLang] || productTranslations.en);
  }, [i18n.language]);

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

  // Función para manejar el clic en el botón de contacto
  const handleContactClick = (e) => {
    e.preventDefault();
    navigate('/', { replace: true });
    
    // Esperar a que la navegación se complete y luego desplazarse a la sección de contacto
    setTimeout(() => {
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Usar fullPage API si está disponible
        if (window.fullpage_api) {
          window.fullpage_api.moveTo('contacto');
        }
      }
    }, 100);
  };

  if (loading) {
    return <LoadingContainer>{translations.loadingText}</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  // Obtener el componente de slider correspondiente
  const SliderComponent = product.sliderComponent;
  
  // Obtener traducciones específicas para este producto
  const productTexts = translations.products[id] || productsData[id];

  return (
    <>
      <Navbar />
      <PageContainer>
        <BackButton to="/">{translations.backToHome}</BackButton>
        
        <HeaderSection>
          <ProductTitle
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {productTexts.title}
          </ProductTitle>
          <ProductDescription>
            {productTexts.description}
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
            <SectionTitle>{translations.aboutMaterial}</SectionTitle>
            <LongDescription>{productTexts.longDescription}</LongDescription>
          </InfoColumn>
          
          <InfoColumn
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SectionTitle>{translations.benefits}</SectionTitle>
            <BenefitsList>
              {productTexts.benefits.map((benefit, index) => (
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
          <SectionTitle>{translations.applications}</SectionTitle>
          <ApplicationsGrid>
            {productTexts.applications.map((application, index) => (
              <ApplicationItem key={index}>
                <ApplicationIcon>✓</ApplicationIcon>
                <ApplicationText>{application}</ApplicationText>
              </ApplicationItem>
            ))}
          </ApplicationsGrid>
        </ApplicationsSection>
        
        <CallToAction>
          <CTAText>{translations.interestedIn} {productTexts.title.toLowerCase()}?</CTAText>
          <StyledContactButton text={`${translations.consultAbout} ${productTexts.title}`} />
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

const StyledContactButton = styled(ContactButton)`
  padding: 14px 30px;
  font-size: 1.1rem;
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