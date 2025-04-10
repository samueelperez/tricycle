import React from 'react';
import { Helmet } from 'react-helmet';

const ProductMeta = ({ product, lang }) => {
  const getMetaTitle = (productId) => {
    const titles = {
      plastico: {
        es: 'Reciclaje de Plástico Industrial | TRICYCLE Castellón',
        en: 'Industrial Plastic Recycling | TRICYCLE Castellón',
      },
      metal: {
        es: 'Reciclaje de Metal Industrial | TRICYCLE Castellón',
        en: 'Industrial Metal Recycling | TRICYCLE Castellón',
      },
      papel: {
        es: 'Reciclaje de Papel y Cartón | TRICYCLE Castellón',
        en: 'Paper and Cardboard Recycling | TRICYCLE Castellón',
      }
    };
    return titles[productId]?.[lang] || titles[productId]?.es;
  };

  const getMetaDescription = (productId) => {
    const descriptions = {
      plastico: {
        es: 'Soluciones profesionales de reciclaje de plástico industrial en Castellón. Procesamos PP, HDPE, PET y otros plásticos con máxima pureza y calidad garantizada.',
        en: 'Professional industrial plastic recycling solutions in Castellón. We process PP, HDPE, PET and other plastics with maximum purity and guaranteed quality.',
      },
      metal: {
        es: 'Expertos en recuperación y reciclaje de metales industriales en Castellón. Procesamos aluminio, cobre, hierro y otros metales con tecnología avanzada.',
        en: 'Experts in industrial metal recovery and recycling in Castellón. We process aluminum, copper, iron and other metals with advanced technology.',
      },
      papel: {
        es: 'Gestión sostenible de reciclaje de papel y cartón en Castellón. Transformamos residuos en recursos, ahorrando agua y energía en cada proceso.',
        en: 'Sustainable paper and cardboard recycling management in Castellón. We transform waste into resources, saving water and energy in every process.',
      }
    };
    return descriptions[productId]?.[lang] || descriptions[productId]?.es;
  };

  const getSchemaMarkup = (productId) => {
    const baseUrl = 'https://www.tricycle.es';
    const productUrl = `${baseUrl}/productos/${productId}`;
    
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: getMetaTitle(productId),
      description: getMetaDescription(productId),
      url: productUrl,
      brand: {
        '@type': 'Brand',
        name: 'TRICYCLE',
        url: baseUrl
      },
      manufacturer: {
        '@type': 'Organization',
        name: 'TRICYCLE PRODUCTOS SL',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Castellón',
          addressRegion: 'Comunidad Valenciana',
          addressCountry: 'ES'
        }
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        areaServed: {
          '@type': 'Country',
          name: 'España'
        }
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': baseUrl,
              name: 'Inicio'
            }
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@id': `${baseUrl}/productos`,
              name: 'Productos'
            }
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@id': productUrl,
              name: getMetaTitle(productId).split('|')[0].trim()
            }
          }
        ]
      }
    };
  };

  return (
    <Helmet>
      <title>{getMetaTitle(product)}</title>
      <meta name="description" content={getMetaDescription(product)} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://www.tricycle.es/productos/${product}`} />
      <meta property="og:title" content={getMetaTitle(product)} />
      <meta property="og:description" content={getMetaDescription(product)} />
      <meta property="og:image" content="https://www.tricycle.es/og-image.jpg" />
      <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
      <meta property="og:site_name" content="TRICYCLE" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`https://www.tricycle.es/productos/${product}`} />
      <meta name="twitter:title" content={getMetaTitle(product)} />
      <meta name="twitter:description" content={getMetaDescription(product)} />
      <meta name="twitter:image" content="https://www.tricycle.es/og-image.jpg" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={`https://www.tricycle.es/productos/${product}`} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="keywords" content={`reciclaje industrial, reciclaje ${product}, economía circular, gestión residuos, Tricycle Castellón`} />
      
      {/* Alternate Language Links */}
      <link rel="alternate" hrefLang="es" href={`https://www.tricycle.es/productos/${product}`} />
      <link rel="alternate" hrefLang="en" href={`https://www.tricycle.es/en/products/${product}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://www.tricycle.es/productos/${product}`} />

      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify(getSchemaMarkup(product))}
      </script>
    </Helmet>
  );
};

export default ProductMeta; 