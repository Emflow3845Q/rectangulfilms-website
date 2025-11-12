import React, { createContext, useContext, useState } from 'react';
import translations from '../data/translations.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  const t = (path) => {
    const keys = path.split('.');
    let value = translations[currentLanguage];
    
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) {
        console.warn(`Translation not found for: ${path}`);
        return path;
      }
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};