import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Flags y nombres para cada idioma
const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.find(lang => lang.code === i18n.language) || languages[0]
  );
  const dropdownRef = useRef(null);

  // Al cargar, establecer el idioma seleccionado basado en i18n
  useEffect(() => {
    const currentLang = languages.find(lang => lang.code === i18n.language);
    if (currentLang) {
      setSelectedLanguage(currentLang);
    }
  }, [i18n.language]);

  // Manejar clics fuera del menú para cerrarlo
  useEffect(() => {
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
    
    // Cambiar el idioma de la aplicación utilizando i18next
    i18n.changeLanguage(language.code);
    
    // Guardar preferencia de idioma en localStorage para persistencia
    localStorage.setItem('preferredLanguage', language.code);
  };

  return (
    <LanguageSelectorContainer ref={dropdownRef}>
      <LanguageButton onClick={toggleDropdown}>
        <FlagEmoji>{selectedLanguage.flag}</FlagEmoji>
        <SelectedLanguage>{selectedLanguage.code.toUpperCase()}</SelectedLanguage>
        <ChevronIcon $isOpen={isOpen} />
      </LanguageButton>
      
      {isOpen && (
        <LanguageDropdown>
          {languages.map((language) => (
            <LanguageOption
              key={language.code}
              $isSelected={selectedLanguage.code === language.code}
              onClick={() => handleSelectLanguage(language)}
            >
              <FlagEmoji>{language.flag}</FlagEmoji>
              <LanguageName>{language.name}</LanguageName>
            </LanguageOption>
          ))}
        </LanguageDropdown>
      )}
    </LanguageSelectorContainer>
  );
};

const LanguageSelectorContainer = styled.div`
  position: relative;
  margin-left: 20px;
  z-index: 1001;
`;

const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &:focus {
    outline: none;
  }
`;

const FlagEmoji = styled.span`
  font-size: 1rem;
  margin-right: 8px;
`;

const SelectedLanguage = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

const ChevronIcon = styled(FaChevronDown)`
  margin-left: 8px;
  font-size: 0.7rem;
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`;

const LanguageDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  width: 160px;
  overflow: hidden;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LanguageOption = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  background: ${({ $isSelected }) => ($isSelected ? '#f0f8ff' : 'transparent')};
  
  &:hover {
    background: ${({ $isSelected }) => ($isSelected ? '#e6f3ff' : '#f5f5f5')};
  }
`;

const LanguageName = styled.span`
  font-size: 0.9rem;
  color: #333;
  margin-left: 8px;
`;

export default LanguageSelector; 