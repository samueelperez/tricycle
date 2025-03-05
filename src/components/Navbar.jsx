import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logoImage from '../assets/images/logo.png'; // Importamos la imagen del logo

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Función para manejar clics en los enlaces
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false); // Cerrar menú móvil al hacer clic
    
    // Si fullPage.js está disponible, mover a la sección correspondiente
    if (window.fullpage_api && sectionToIndex[sectionId]) {
      window.fullpage_api.moveTo(sectionToIndex[sectionId]);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <NavbarContainer $isScrolled={isScrolled}>
      <NavbarContent>
        <LogoContainer>
          <LogoImage src={logoImage} alt="Logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink 
            href="#1" 
            className={activeSection === 'inicio' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('inicio');
            }}
          >
            Inicio
          </NavLink>
          <NavLink 
            href="#2" 
            className={activeSection === 'sobre-nosotros' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('sobre-nosotros');
            }}
          >
            Sobre Nosotros
          </NavLink>
          <NavLink 
            href="#3" 
            className={activeSection === 'productos' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('productos');
            }}
          >
            Productos
          </NavLink>
          <NavLink 
            href="#4" 
            className={activeSection === 'por-que-elegirnos' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('por-que-elegirnos');
            }}
          >
            Por Qué Elegirnos
          </NavLink>
          <NavLink 
            href="#5" 
            className={activeSection === 'proceso' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('proceso');
            }}
          >
            Proceso
          </NavLink>
          <NavLink 
            href="#6" 
            className={activeSection === 'contacto' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contacto');
            }}
          >
            Contacto
          </NavLink>
        </NavLinks>
        
        {/* Botón de menú hamburguesa para móvil */}
        <MobileMenuButton onClick={toggleMobileMenu}>
          <MenuBar $open={mobileMenuOpen} />
          <MenuBar $open={mobileMenuOpen} />
          <MenuBar $open={mobileMenuOpen} />
        </MobileMenuButton>
        
        {/* Menú móvil */}
        <MobileMenu $open={mobileMenuOpen}>
          <MobileNavLink 
            href="#1"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('inicio');
            }}
            $active={activeSection === 'inicio'}
          >
            Inicio
          </MobileNavLink>
          <MobileNavLink 
            href="#2"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('sobre-nosotros');
            }}
            $active={activeSection === 'sobre-nosotros'}
          >
            Sobre Nosotros
          </MobileNavLink>
          <MobileNavLink 
            href="#3"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('productos');
            }}
            $active={activeSection === 'productos'}
          >
            Productos
          </MobileNavLink>
          <MobileNavLink 
            href="#4"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('por-que-elegirnos');
            }}
            $active={activeSection === 'por-que-elegirnos'}
          >
            Por Qué Elegirnos
          </MobileNavLink>
          <MobileNavLink 
            href="#5"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('proceso');
            }}
            $active={activeSection === 'proceso'}
          >
            Proceso
          </MobileNavLink>
          <MobileNavLink 
            href="#6"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contacto');
            }}
            $active={activeSection === 'contacto'}
          >
            Contacto
          </MobileNavLink>
        </MobileMenu>
      </NavbarContent>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
  background-color: ${({ $isScrolled, theme }) => 
    $isScrolled ? 'rgba(51, 51, 51, 0.9)' : 'rgba(51, 51, 51, 0.7)'};
  padding: ${({ $isScrolled }) => $isScrolled ? '10px 0' : '20px 0'};
  box-shadow: ${({ $isScrolled }) => 
    $isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
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

const NavLink = styled.a`
  color: white;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease;
  text-decoration: none;
  
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
    color: white;
    text-decoration: none;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  &.active {
    font-weight: 600;
    color: white;
    text-decoration: none;
  }
  
  &.active:after {
    width: 100%; /* Mantener el subrayado para el enlace activo */
  }
`;

// Nuevos estilos para el menú móvil
const MobileMenuButton = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    display: flex;
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
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(51, 51, 51, 0.95);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transform: ${({ $open }) => $open ? 'translateY(0)' : 'translateY(-100%)'};
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    display: flex;
  }
`;

const MobileNavLink = styled.a`
  color: white;
  font-size: 1.5rem;
  margin: 15px 0;
  text-decoration: none;
  font-weight: ${({ $active }) => $active ? '600' : '400'};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${({ $active }) => $active ? '100%' : '0'};
    height: 2px;
    background-color: white;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

export default Navbar; 