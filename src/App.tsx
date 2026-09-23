import React, { useState, useEffect } from 'react';
import { BiodataData } from './types/biodata';
import { INITIAL_EMPTY_BIODATA } from './data/sampleData';
import { getDraftFromStorage } from './lib/storage';
import { LanguageProvider } from './i18n/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { BuilderPage } from './pages/BuilderPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

export const App: React.FC = () => {
  // Simple client-side routing based on window.location.hash or state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || '/';
  });

  // Central Biodata state
  const [biodata, setBiodata] = useState<BiodataData>(() => {
    const saved = getDraftFromStorage();
    return saved || INITIAL_EMPTY_BIODATA;
  });

  // Sync route with window hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPath(hash || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    if (path.startsWith('/#')) {
      // Anchor on home
      setCurrentPath('/');
      window.location.hash = '/';
      setTimeout(() => {
        const id = path.replace('/#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    setCurrentPath(path);
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTemplate = (templateId: string) => {
    setBiodata((prev) => ({ ...prev, templateId }));
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-slate-800 selection:bg-amber-200 selection:text-amber-900 font-sans">
        {/* Navigation Bar */}
        <Navbar currentPath={currentPath} onNavigate={navigate} />

        {/* Dynamic Route Content */}
        <main className="flex-1">
          {currentPath === '/' && (
            <HomePage onNavigate={navigate} onSelectTemplate={handleSelectTemplate} />
          )}

          {currentPath === '/create' && (
            <BuilderPage
              biodata={biodata}
              onBiodataChange={setBiodata}
              onNavigate={navigate}
            />
          )}

          {currentPath === '/templates' && (
            <TemplatesPage
              currentTemplateId={biodata.templateId}
              onSelectTemplate={handleSelectTemplate}
              onNavigate={navigate}
              biodata={biodata}
            />
          )}

          {currentPath === '/about' && <AboutPage onNavigate={navigate} />}

          {currentPath === '/contact' && <ContactPage />}

          {currentPath === '/privacy' && <PrivacyPage />}

          {currentPath === '/terms' && <TermsPage />}
        </main>

        {/* Global Footer */}
        <Footer onNavigate={navigate} />
      </div>
    </LanguageProvider>
  );
};

export default App;
