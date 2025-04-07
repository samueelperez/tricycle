import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logoImage from '../assets/images/logo.png'; // Importamos la imagen del logo
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Navbar = ({ fullpageApi }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Mapeo de índices a IDs de sección
  const indexToSection = {
    1: 'inicio',
    2: 'sobre-nosotros',
    3: 'productos',
    4: 'por-que-elegirnos',
    5: 'proceso',
    6: 'contacto'
  };

  // Mapeo inverso: de nombres de sección a índices
  const sectionToIndex = {
    'inicio': 1,
    'sobre-nosotros': 2,
    'productos': 3,
    'por-que-elegirnos': 4,
    'proceso': 5,
    'contacto': 6
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Función para manejar el evento afterLoad de fullPage.js
    const handleFullPageLoad = (origin, destination) => {
      const sectionIndex = destination.index + 1;
      const sectionId = indexToSection[sectionIndex] || 'inicio';
      setActiveSection(sectionId);
    };
    
    // Verificar si fullPage está disponible y añadir el evento
    if (window.fullpage_api) {
      window.fullpage_api.setAllowScrolling(true);
      window.fullpage_api.setKeyboardScrolling(true);
      window.fullpage_api.setRecordHistory(true);
      
      // Añadir evento afterLoad
      document.addEventListener('afterLoad', handleFullPageLoad);
    }
    
    // Función para detectar cambios en el hash de la URL
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      if (hash) {
        // Intentar interpretar el hash como un índice
        const sectionIndex = parseInt(hash);
        
        if (!isNaN(sectionIndex) && indexToSection[sectionIndex]) {
          // Si es un número válido, usar el mapeo de índice a sección
          setActiveSection(indexToSection[sectionIndex]);
        } else if (Object.values(indexToSection).includes(hash)) {
          // Si es un nombre de sección válido, usarlo directamente
          setActiveSection(hash);
        }
      } else {
        // Si no hay hash, asumir que estamos en la sección de inicio
        setActiveSection('inicio');
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    // Establecer la sección inicial basada en el hash actual
    handleHashChange();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
      
      if (window.fullpage_api) {
        document.removeEventListener('afterLoad', handleFullPageLoad);
      }
    };
  }, []);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  // Función para manejar clics en los enlaces
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false); // Cerrar menú móvil al hacer clic
    
    // Si fullPage.js está disponible, mover a la sección correspondiente
    if (fullpageApi && sectionToIndex[sectionId]) {
      fullpageApi.moveTo(sectionToIndex[sectionId]);
    } else if (window.fullpage_api && sectionToIndex[sectionId]) {
      window.fullpage_api.moveTo(sectionToIndex[sectionId]);
    } else {
      // Alternativa si no está disponible fullpage
      window.location.hash = sectionId;
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionNumber) => {
    if (fullpageApi) {
      fullpageApi.moveTo(sectionNumber);
      closeMenu();
    } else if (window.fullpage_api) {
      window.fullpage_api.moveTo(sectionNumber);
      closeMenu();
    } else {
      // Alternativa si no está disponible fullpage
      const sectionId = indexToSection[sectionNumber];
      if (sectionId) {
        window.location.hash = sectionId;
      }
      closeMenu();
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    closeMenu();
  };

  const getLanguageLabel = (code) => {
    const labels = {
      'es': 'ES',
      'en': 'EN',
      'fr': 'FR',
      'zh': 'ZH',
      'tr': 'TR'
    };
    return labels[code] || code.toUpperCase();
  };

  return (
    <NavbarContainer $isScrolled={isScrolled}>
      <NavbarContent>
        <LogoContainer onClick={() => scrollToSection(1)}>
          <Logo src={logoImage} alt="Tricycle Products Logo" />
        </LogoContainer>
        <NavLinks>
          <NavItem onClick={() => scrollToSection(1)}>{t('navbar.home')}</NavItem>
          <NavItem onClick={() => scrollToSection(2)}>{t('navbar.about')}</NavItem>
          <NavItem onClick={() => scrollToSection(3)}>{t('navbar.products')}</NavItem>
          <NavItem onClick={() => scrollToSection(4)}>{t('navbar.whyChooseUs')}</NavItem>
          <NavItem onClick={() => scrollToSection(5)}>{t('navbar.process')}</NavItem>
          <NavItem onClick={() => scrollToSection(6)}>{t('navbar.contact')}</NavItem>
        </NavLinks>
        <LanguageSelector />
        <MenuToggle onClick={toggleMenu}>
          <MenuBar $open={mobileMenuOpen} />
          <MenuBar $open={mobileMenuOpen} />
          <MenuBar $open={mobileMenuOpen} />
        </MenuToggle>
      </NavbarContent>
      
      {mobileMenuOpen && (
        <MobileMenu $open={mobileMenuOpen}>
          <MobileNavItem onClick={() => scrollToSection(1)}>{t('navbar.home')}</MobileNavItem>
          <MobileNavItem onClick={() => scrollToSection(2)}>{t('navbar.about')}</MobileNavItem>
          <MobileNavItem onClick={() => scrollToSection(3)}>{t('navbar.products')}</MobileNavItem>
          <MobileNavItem onClick={() => scrollToSection(4)}>{t('navbar.whyChooseUs')}</MobileNavItem>
          <MobileNavItem onClick={() => scrollToSection(5)}>{t('navbar.process')}</MobileNavItem>
          <MobileNavItem onClick={() => scrollToSection(6)}>{t('navbar.contact')}</MobileNavItem>
          
          <MobileLanguageContainer>
            <MobileLanguageTitle>{t('language.select')}</MobileLanguageTitle>
            <MobileLanguageOptions>
              <MobileLanguageOption onClick={() => changeLanguage('es')}>
                <FlagEmoji>🇪🇸</FlagEmoji> ES
              </MobileLanguageOption>
              <MobileLanguageOption onClick={() => changeLanguage('en')}>
                <FlagEmoji>🇬🇧</FlagEmoji> EN
              </MobileLanguageOption>
              <MobileLanguageOption onClick={() => changeLanguage('fr')}>
                <FlagEmoji>🇫🇷</FlagEmoji> FR
              </MobileLanguageOption>
              <MobileLanguageOption onClick={() => changeLanguage('zh')}>
                <FlagEmoji>🇨🇳</FlagEmoji> ZH
              </MobileLanguageOption>
              <MobileLanguageOption onClick={() => changeLanguage('tr')}>
                <FlagEmoji>🇹🇷</FlagEmoji> TR
              </MobileLanguageOption>
            </MobileLanguageOptions>
          </MobileLanguageContainer>
        </MobileMenu>
      )}
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;
  z-index: 1000;
  transition: all 0.3s ease;
  background-color: ${({ scrolled, theme }) => 
    scrolled 
      ? 'rgba(25, 70, 186, 0.9)' // Azul semitransparente cuando se hace scroll
      : 'rgba(25, 70, 186, 0.7)'}; // Azul más transparente cuando está en la parte superior
  box-shadow: ${({ scrolled }) => 
    scrolled ? '0 5px 15px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

// Reemplazamos el componente Logo por un contenedor de imagen
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 40px; // Ajusta la altura según sea necesario
  width: auto;
  transition: all 0.3s ease;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    display: none;
  }
`;

const NavItem = styled.div`
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #f0f0f0;
    
    &:after {
      width: 100%;
    }
  }
`;

// Nuevos estilos para el menú móvil
const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: white; // Cambiado a blanco para el icono
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MenuBar = styled.span`
  height: 3px;
  width: 100%;
  background-color: white;
  border-radius: 3px;
  transition: all 0.3s ease;
  
  &:nth-child(1) {
    transform: ${({ $open }) => $open ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)'};
  }
  
  &:nth-child(2) {
    opacity: ${({ $open }) => $open ? '0' : '1'};
  }
  
  &:nth-child(3) {
    transform: ${({ $open }) => $open ? 'rotate(-45deg) translate(7px, -7px)' : 'rotate(0)'};
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(25, 70, 186, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  z-index: 999;
  transition: all 0.3s ease;
  transform: ${({ $open }) => $open ? 'translateY(0)' : 'translateY(-100%)'};
`;

const MobileNavItem = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 10px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const MobileLanguageContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MobileLanguageTitle = styled.div`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 15px;
`;

const MobileLanguageOptions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const MobileLanguageOption = styled.div`
  color: white;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
  transition: all 0.3s ease;
`;

// Nuevos estilos para el contenedor del lado derecho
const RightSideContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MenuToggle = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const LanguageButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ $active }) => $active ? 'white' : 'gray'};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: white;
  }
`;

const LanguageDropdown = styled.div`
  position: relative;
`;

const LanguageOption = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: white;
  }
`;

const FlagEmoji = styled.span`
  margin-right: 5px;
`;

export default Navbar; 