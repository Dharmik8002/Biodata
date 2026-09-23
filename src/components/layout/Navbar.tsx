import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageCode } from '../../types/biodata';
import { Button } from '../ui/Button';
import {
  Menu,
  X,
  Languages,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.templates, path: '/templates' },
    { label: t.nav.howItWorks, path: '/#how-it-works' },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.contact, path: '/contact' },
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const handleLanguageSelect = (lang: LanguageCode) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/50 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Tagline */}
          <div
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-red-950 via-red-900 to-amber-600 flex items-center justify-center text-amber-200 shadow-md group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 100 100" className="w-6 h-6 fill-current">
                <circle cx="50" cy="50" r="35" fill="none" stroke="#D4AF37" strokeWidth="6" />
                <path d="M50 20 L60 45 L50 70 L40 45 Z" fill="#D4AF37" />
                <circle cx="50" cy="45" r="8" fill="#FFFDF9" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-red-950">
                  Vivah<span className="text-amber-600">Bio</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded-sm">
                  Free
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium tracking-wide hidden sm:block">
                Create Your Perfect Marriage Biodata
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-red-900 font-semibold'
                      : 'text-slate-600 hover:text-red-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language Selector + CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-amber-50/60 hover:bg-amber-100/60 border border-amber-200/60 rounded-lg transition-colors cursor-pointer"
              >
                <Languages className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {language === 'en' ? 'English' : language === 'hi' ? 'हिंदी' : 'ગુજરાતી'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <button
                    type="button"
                    onClick={() => handleLanguageSelect('en')}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-amber-50 ${
                      language === 'en' ? 'text-red-900 font-bold bg-amber-50/50' : 'text-slate-700'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageSelect('hi')}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-amber-50 ${
                      language === 'hi' ? 'text-red-900 font-bold bg-amber-50/50' : 'text-slate-700'
                    }`}
                  >
                    हिंदी (Hindi)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageSelect('gu')}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-amber-50 ${
                      language === 'gu' ? 'text-red-900 font-bold bg-amber-50/50' : 'text-slate-700'
                    }`}
                  >
                    ગુજરાતી (Gujarati)
                  </button>
                </div>
              )}
            </div>

            {/* Create Biodata CTA */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleNav('/create')}
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />}
            >
              {t.nav.createBiodata}
            </Button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleNav('/create')}
              className="text-xs px-2.5 py-1"
            >
              Create
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  currentPath === item.path
                    ? 'bg-amber-100/60 text-red-950 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Language Selector */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-amber-700" /> Language:
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs rounded-md ${
                  language === 'en' ? 'bg-red-900 text-white font-bold' : 'bg-slate-100 text-slate-700'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 text-xs rounded-md ${
                  language === 'hi' ? 'bg-red-900 text-white font-bold' : 'bg-slate-100 text-slate-700'
                }`}
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('gu')}
                className={`px-2 py-1 text-xs rounded-md ${
                  language === 'gu' ? 'bg-red-900 text-white font-bold' : 'bg-slate-100 text-slate-700'
                }`}
              >
                ગુજ
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
