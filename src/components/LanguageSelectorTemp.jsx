import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';

// Lista de idiomas disponibles
const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
];

const LanguageSelectorTemp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Recuperar el idioma guardado en localStorage, si existe
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      const lang = languages.find(l => l.code === savedLanguage);
      if (lang) {
        setSelectedLanguage(lang);
      }
    }
    
    // Manejador para cerrar el menú cuando se hace clic fuera
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    
    // Guardar la preferencia del usuario en localStorage
    localStorage.setItem('language', language.code);
    
    console.log(`Idioma cambiado a: ${language.name}`);
    // Aquí implementaremos el cambio de idioma real cuando i18next esté instalado
  };
  
  return (
    <LanguageSelectorContainer ref={dropdownRef}>
      <LanguageButton onClick={toggleDropdown}>
        <FlagContainer>{selectedLanguage.flag}</FlagContainer>
        <LanguageCode>{selectedLanguage.code.toUpperCase()}</LanguageCode>
        <DropdownIcon $isOpen={isOpen}>
          <FaChevronDown />
        </DropdownIcon>
      </LanguageButton>
      
      {isOpen && (
        <DropdownMenu>
          {languages.map((language) => (
            <DropdownItem
              key={language.code}
              onClick={() => handleSelectLanguage(language)}
              $isSelected={selectedLanguage.code === language.code}
            >
              <FlagContainer>{language.flag}</FlagContainer>
              <LanguageName>{language.name}</LanguageName>
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </LanguageSelectorContainer>
  );
};

// Animación para el menú desplegable
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LanguageSelectorContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 1rem;
  z-index: 1000;
`;

const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  color: #fff;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:focus {
    outline: none;
  }
`;

const FlagContainer = styled.span`
  font-size: 1.2rem;
  margin-right: 6px;
`;

const LanguageCode = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const DropdownIcon = styled.span`
  margin-left: 6px;
  transition: transform 0.3s ease;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  font-size: 0.8rem;
  display: flex;
  align-items: center;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 150px;
  animation: ${fadeIn} 0.3s ease forwards;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  transition: background 0.2s;
  background: ${props => props.$isSelected ? '#f0f0f0' : 'transparent'};
  color: #333;
  
  &:hover {
    background: #f8f8f8;
  }
`;

const LanguageName = styled.span`
  margin-left: 8px;
  font-size: 0.9rem;
`;

export default LanguageSelectorTemp; 