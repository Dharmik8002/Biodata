import React from 'react';
import { BiodataData } from '../../types/biodata';
import { RoyalMaroonGold } from './RoyalMaroonGold';
import { ClassicTraditional } from './ClassicTraditional';
import { ModernMinimalist } from './ModernMinimalist';
import { ElegantFloral } from './ElegantFloral';
import { RoyalBlueGold } from './RoyalBlueGold';
import { SoftPink } from './SoftPink';
import { IvoryChampagne } from './IvoryChampagne';
import { EmeraldGreen } from './EmeraldGreen';
import { GujaratiTraditional } from './GujaratiTraditional';
import { HinduTraditional } from './HinduTraditional';
import { MuslimElegant } from './MuslimElegant';
import { SikhClassic } from './SikhClassic';

interface TemplateRendererProps {
  data: BiodataData;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ data }) => {
  switch (data.templateId) {
    case 'royal-maroon-gold':
      return <RoyalMaroonGold data={data} />;
    case 'classic-traditional':
      return <ClassicTraditional data={data} />;
    case 'modern-minimalist':
      return <ModernMinimalist data={data} />;
    case 'elegant-floral':
      return <ElegantFloral data={data} />;
    case 'royal-blue-gold':
      return <RoyalBlueGold data={data} />;
    case 'soft-pink':
      return <SoftPink data={data} />;
    case 'ivory-champagne':
      return <IvoryChampagne data={data} />;
    case 'emerald-green':
      return <EmeraldGreen data={data} />;
    case 'gujarati-traditional':
      return <GujaratiTraditional data={data} />;
    case 'hindu-traditional':
      return <HinduTraditional data={data} />;
    case 'muslim-elegant':
      return <MuslimElegant data={data} />;
    case 'sikh-classic':
      return <SikhClassic data={data} />;
    default:
      return <RoyalMaroonGold data={data} />;
  }
};
