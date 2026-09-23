import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from './en';
import { hi } from './hi';
import { gu } from './gu';
import { LanguageCode } from '../types/biodata';

type TranslationType = typeof en;

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationType;
  getDocT: (langCode?: LanguageCode) => typeof en.doc;
}

const translations: Record<LanguageCode, TranslationType> = {
  en,
  hi,
  gu,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('vivahbio_ui_lang') as LanguageCode;
    return saved === 'hi' || saved === 'gu' ? saved : 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('vivahbio_ui_lang', lang);
  };

  const t = translations[language] || en;

  const getDocT = (docLang?: LanguageCode) => {
    const target = docLang || language;
    return (translations[target] || en).doc;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getDocT }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
