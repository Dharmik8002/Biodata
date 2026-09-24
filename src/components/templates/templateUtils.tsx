import React from 'react';
import { en } from '../../i18n/en';
import { hi } from '../../i18n/hi';
import { gu } from '../../i18n/gu';
import { LanguageCode } from '../../types/biodata';

export function getDocLabels(lang: LanguageCode = 'en') {
  if (lang === 'hi') return hi.doc;
  if (lang === 'gu') return gu.doc;
  return en.doc;
}

// Auspicious Decorative SVGs
export const GaneshaIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-8 h-8',
  color = '#800020',
}) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 15 C38 15 32 25 32 36 C32 48 38 52 42 56 C46 60 48 65 48 72 C48 78 44 82 40 82 C36 82 34 78 34 74"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M50 20 C62 20 68 28 68 38 C68 46 62 52 56 55"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle cx="50" cy="28" r="4" fill={color} />
    <path
      d="M38 32 C38 32 45 35 50 35 C55 35 62 32 62 32"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M30 42 C24 42 22 48 24 54 C26 60 32 60 36 57"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="60" cy="54" r="3" fill="#D4AF37" />
  </svg>
);

export const KalashIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#D4AF37',
}) => (
  <svg
    viewBox="0 0 64 64"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M32 10 C32 10 24 20 20 26 L44 26 C40 20 32 10 32 10 Z"
      fill={color}
      opacity="0.8"
    />
    <ellipse cx="32" cy="12" rx="4" ry="4" fill="#800020" />
    <path
      d="M20 26 C16 32 14 42 18 50 C22 56 42 56 46 50 C50 42 48 32 44 26 Z"
      stroke={color}
      strokeWidth="3"
      fill="#FAF5EE"
    />
    <path d="M22 38 H42 M20 46 H44" stroke={color} strokeWidth="2" />
    <path
      d="M28 26 C26 20 20 18 16 22 M36 26 C38 20 44 18 48 22"
      stroke="#15803D"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const OmIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-7 h-7',
  color = '#800020',
}) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M46.8,42.5 C44.5,41.2 41.7,40.5 38.6,40.5 C34.2,40.5 30.4,41.9 27.2,44.7 C24.1,47.5 22.5,51.2 22.5,55.9 C22.5,60.8 24.3,64.8 27.8,67.8 C31.3,70.9 35.8,72.4 41.2,72.4 C47.4,72.4 52.4,70.4 56.2,66.4 C60,62.4 61.9,57.1 61.9,50.7 C61.9,46.9 61.2,43.4 59.7,40.2 C58.2,36.9 56.1,34.2 53.4,32 C58.2,28.7 60.6,24.2 60.6,18.5 C60.6,14.6 59.2,11.4 56.4,8.8 C53.6,6.3 49.9,5 45.4,5 C41.2,5 37.6,6.2 34.6,8.6 C31.6,11 29.8,14.1 29.3,18 L36.2,18.9 C36.5,16.8 37.6,15 39.4,13.7 C41.1,12.3 43.1,11.6 45.4,11.6 C47.7,11.6 49.7,12.3 51.2,13.8 C52.7,15.2 53.5,17 53.5,19.2 C53.5,21.8 52.5,23.9 50.6,25.4 C48.7,26.9 46.1,27.7 42.8,27.7 L39.7,27.7 L39.7,34.1 L43.7,34.1 C47.7,34.1 50.8,35.2 53,37.3 C55.1,39.4 56.2,42.4 56.2,46.3 C56.2,51.8 54.4,56.3 50.9,59.8 C47.4,63.2 42.7,65 36.9,65 C33.1,65 29.9,64 27.5,61.9 C25,59.8 23.8,57.1 23.8,53.7 C23.8,50.5 24.9,47.9 27.1,45.9 C29.3,43.9 32.2,42.9 35.8,42.9 C38.5,42.9 41.1,43.6 43.6,44.9 L46.8,42.5 Z M78.5,27.1 C73.7,27.1 69.3,28.8 65.8,31.7 L69.5,36.5 C72.2,34.4 75.3,33.3 78.7,33.3 C82.8,33.3 86.1,34.8 88.5,37.8 C91,40.8 92.2,44.9 92.2,50 C92.2,55.9 90.7,60.6 87.7,64.2 C84.7,67.7 80.6,69.5 75.3,69.5 C70.6,69.5 66.5,67.8 63,64.4 L58.7,69.5 C63.2,74 68.7,76.3 75.3,76.3 C82.8,76.3 88.8,73.7 93.3,68.6 C97.8,63.5 100,56.7 100,48.2 C100,41.5 98.2,36.2 94.7,32.3 C90.8,28.8 85.4,27.1 78.5,27.1 Z" />
    <path d="M78.5,7.5 C75,7.5 72,10.5 72,14 C72,17.5 75,20.5 78.5,20.5 C82,20.5 85,17.5 85,14 C85,10.5 82,7.5 78.5,7.5 Z" />
  </svg>
);

export const EkOnkarIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-7 h-7',
  color = '#1E3A8A',
}) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30 40 C30 25 45 20 55 30 C65 40 55 55 45 60 C35 65 30 75 35 85 C40 95 60 95 65 85"
      stroke={color}
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M55 30 C70 15 85 25 85 45 C85 65 70 70 70 70"
      stroke="#EA580C"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <circle cx="75" cy="20" r="5" fill="#EA580C" />
  </svg>
);

export const BismillahIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-16 h-8',
  color = '#065F46',
}) => (
  <svg
    viewBox="0 0 200 60"
    className={className}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="100"
      y="38"
      textAnchor="middle"
      fontFamily="'Cinzel', serif"
      fontSize="20"
      fontWeight="bold"
      letterSpacing="2"
    >
      بِسْمِ اللَّهِ
    </text>
  </svg>
);

export const FloralCorner: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-12 h-12',
  color = '#D4AF37',
}) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 10 L45 10 C35 15 25 25 25 40 C25 60 50 70 80 75"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M10 10 L10 45 C15 35 25 25 40 25 C60 25 70 50 75 80"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="10" cy="10" r="4" fill={color} />
    <circle cx="35" cy="35" r="3" fill={color} />
    <path
      d="M20 15 C25 20 28 28 25 35 M15 20 C20 25 28 28 35 25"
      stroke={color}
      strokeWidth="1.5"
    />
  </svg>
);

export const GoldDivider: React.FC<{ color?: string }> = ({ color = '#D4AF37' }) => (
  <div className="flex items-center justify-center gap-2 my-2 w-full opacity-85">
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
    <div className="w-2 h-2 rotate-45 border border-amber-500 bg-amber-200" />
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
  </div>
);

export function getTemplateFonts(lang: LanguageCode = 'en') {
  if (lang === 'gu') {
    return {
      cinzel: "'Cinzel', 'Noto Sans Gujarati', 'Noto Sans Devanagari', Georgia, serif",
      playfair: "'Playfair Display', 'Noto Sans Gujarati', 'Noto Sans Devanagari', Georgia, serif",
      marcellus: "'Marcellus', 'Noto Sans Gujarati', 'Noto Sans Devanagari', Georgia, serif",
      sans: "'Noto Sans Gujarati', 'Inter', 'Noto Sans Devanagari', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    };
  }
  if (lang === 'hi') {
    return {
      cinzel: "'Cinzel', 'Noto Sans Devanagari', 'Noto Sans Gujarati', Georgia, serif",
      playfair: "'Playfair Display', 'Noto Sans Devanagari', 'Noto Sans Gujarati', Georgia, serif",
      marcellus: "'Marcellus', 'Noto Sans Devanagari', 'Noto Sans Gujarati', Georgia, serif",
      sans: "'Noto Sans Devanagari', 'Inter', 'Noto Sans Gujarati', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    };
  }
  return {
    cinzel: "'Cinzel', 'Noto Sans Devanagari', 'Noto Sans Gujarati', Georgia, serif",
    playfair: "'Playfair Display', 'Noto Sans Devanagari', 'Noto Sans Gujarati', Georgia, serif",
    marcellus: "'Marcellus', 'Noto Sans Devanagari', 'Noto Sans Gujarati', Georgia, serif",
    sans: "'Inter', 'Noto Sans Devanagari', 'Noto Sans Gujarati', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };
}

export const FONTS = {
  cinzel: "'Cinzel', 'Noto Sans Gujarati', 'Noto Sans Devanagari', Georgia, serif",
  playfair: "'Playfair Display', 'Noto Sans Gujarati', 'Noto Sans Devanagari', Georgia, serif",
  marcellus: "'Marcellus', 'Noto Sans Gujarati', 'Noto Sans Devanagari', Georgia, serif",
  sans: "'Noto Sans Gujarati', 'Noto Sans Devanagari', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};


