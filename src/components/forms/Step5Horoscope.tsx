import React from 'react';
import { BiodataData } from '../../types/biodata';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { Textarea } from '../ui/Textarea';
import { RASHIS, NAKSHATRAS, MANGLIK_OPTIONS } from '../../data/options';
import { Moon, Sparkles, Clock, MapPin, Compass } from 'lucide-react';

interface StepProps {
  data: BiodataData;
  onChange: (updates: Partial<BiodataData>) => void;
  errors?: Record<string, string>;
}

export const Step5Horoscope: React.FC<StepProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <Moon className="w-5 h-5 text-amber-700" /> Horoscope & Astrological Details
        </h3>
        <p className="text-xs text-slate-500">
          All horoscope fields are completely optional. You can include or omit this section based on your preference.
        </p>
      </div>

      {/* Main Horoscope Toggle */}
      <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/70 flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-slate-900 block">
            Include Horoscope Details in Biodata
          </span>
          <span className="text-xs text-slate-500 block mt-0.5">
            When enabled, Kundali, Rashi, and birth time details will be displayed in the document.
          </span>
        </div>
        <Switch
          checked={data.includeHoroscope}
          onChange={(checked) => onChange({ includeHoroscope: checked })}
        />
      </div>

      {data.includeHoroscope && (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Time of Birth */}
            <div>
              <Input
                label="Time of Birth"
                optional
                placeholder="e.g. 07:45 AM or 14:30 hrs"
                value={data.timeOfBirth || ''}
                onChange={(e) => onChange({ timeOfBirth: e.target.value })}
                leftAddon={<Clock className="w-4 h-4 text-slate-400" />}
              />
            </div>

            {/* Place of Birth */}
            <div>
              <Input
                label="Place of Birth"
                optional
                placeholder="e.g. Jaipur, Rajasthan"
                value={data.placeOfBirth || ''}
                onChange={(e) => onChange({ placeOfBirth: e.target.value })}
                leftAddon={<MapPin className="w-4 h-4 text-slate-400" />}
              />
            </div>

            {/* Rashi (Moon Sign) */}
            <div>
              <Select
                label="Rashi (Moon Sign)"
                optional
                value={data.rashi || ''}
                onChange={(e) => onChange({ rashi: e.target.value })}
                options={['Select Rashi', ...RASHIS]}
              />
            </div>

            {/* Nakshatra */}
            <div>
              <Select
                label="Nakshatra"
                optional
                value={data.nakshatra || ''}
                onChange={(e) => onChange({ nakshatra: e.target.value })}
                options={['Select Nakshatra', ...NAKSHATRAS]}
              />
            </div>

            {/* Gotra */}
            <div>
              <Input
                label="Gotra / Kul"
                optional
                placeholder="e.g. Kashyap, Bharadwaj, Vatsa, Gautam"
                value={data.gotra || ''}
                onChange={(e) => onChange({ gotra: e.target.value })}
              />
            </div>

            {/* Manglik Status */}
            <div>
              <Select
                label="Manglik Status"
                optional
                value={data.manglikStatus || 'no'}
                onChange={(e) => onChange({ manglikStatus: e.target.value as any })}
                options={MANGLIK_OPTIONS}
              />
            </div>

            {/* Kundali / Horoscope Notes */}
            <div className="col-span-1 sm:col-span-2">
              <Input
                label="Kundali Information / Nadi / Gana (Optional)"
                optional
                placeholder="e.g. Kundali can be matched upon request. Nadi: Madhya, Gana: Manushya"
                value={data.horoscopeNotes || ''}
                onChange={(e) => onChange({ horoscopeNotes: e.target.value })}
              />
            </div>

            {/* Additional Religious Details */}
            <div className="col-span-1 sm:col-span-2">
              <Input
                label="Additional Traditional / Religious Beliefs"
                optional
                placeholder="e.g. Believer in daily prayers, regular visit to family deity temple"
                value={data.additionalReligiousDetails || ''}
                onChange={(e) => onChange({ additionalReligiousDetails: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
