import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

const HideNavigationDots = createGlobalStyle`
  #fp-nav,
  .fp-slidesNav {
    display: none !important;
  }
`;

const MobileStyles = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return isMobile ? <HideNavigationDots /> : null;
};

export default MobileStyles; 