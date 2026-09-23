import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ShieldCheck, Heart, Sparkles, FileText, CheckCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#2D0B12] text-amber-100/90 pt-14 pb-8 border-t-4 border-amber-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-amber-900/60">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-red-950 font-bold shadow-md">
                VB
              </div>
              <span className="font-cinzel text-xl font-bold tracking-wider text-amber-200">
                Vivah<span className="text-amber-500">Bio</span>
              </span>
            </div>
            <p className="text-xs text-amber-200/70 leading-relaxed">
              India's premier online marriage biodata creator. Designed to honor traditions while providing modern digital elegance.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Client-Side Privacy Guaranteed</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-sm font-bold text-amber-300 uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/create')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Create Marriage Biodata
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/templates')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  12 Biodata Design Templates
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/#how-it-works')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Design Themes */}
          <div>
            <h4 className="font-cinzel text-sm font-bold text-amber-300 uppercase tracking-wider mb-3">
              Popular Styles
            </h4>
            <ul className="space-y-2 text-xs text-amber-200/80">
              <li>Royal Maroon & Gold</li>
              <li>Gujarati Traditional (શ્રી ગણેશ)</li>
              <li>Hindu Traditional (Vedic)</li>
              <li>Modern Minimalist</li>
              <li>Muslim Elegant & Sikh Classic</li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div>
            <h4 className="font-cinzel text-sm font-bold text-amber-300 uppercase tracking-wider mb-3">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/privacy')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {t.nav.privacy} (Zero Tracking)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/terms')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {t.nav.terms}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/about')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-300/60">
          <p>© {new Date().getFullYear()} VivahBio. All rights reserved. Free for everyone.</p>
          <p className="flex items-center gap-1 text-[11px]">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> for Indian Matrimonial Traditions
          </p>
        </div>
      </div>
    </footer>
  );
};
