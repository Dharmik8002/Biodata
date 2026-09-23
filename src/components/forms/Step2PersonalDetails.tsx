import React from 'react';
import { BiodataData } from '../../types/biodata';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import {
  RELIGIONS,
  MARITAL_STATUS_OPTIONS,
  DIET_OPTIONS,
  BLOOD_GROUPS,
  HEIGHT_OPTIONS,
} from '../../data/options';
import { Sparkles, MapPin, Heart } from 'lucide-react';

interface StepProps {
  data: BiodataData;
  onChange: (updates: Partial<BiodataData>) => void;
  errors?: Record<string, string>;
}

export const Step2PersonalDetails: React.FC<StepProps> = ({ data, onChange }) => {
  const handleHeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const feet = e.target.value;
    const match = HEIGHT_OPTIONS.find((h) => h.feet === feet);
    onChange({ heightFeet: feet, heightCm: match ? match.cm : '' });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <Heart className="w-5 h-5 text-amber-700" /> Personal Details
        </h3>
        <p className="text-xs text-slate-500">
          Share your physical attributes, cultural background, and location. Sensitive fields are strictly optional.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Height */}
        <div>
          <Select
            label="Height"
            value={data.heightFeet || ''}
            onChange={handleHeightChange}
            options={HEIGHT_OPTIONS.map((h) => ({
              value: h.feet,
              label: `${h.feet} (${h.cm})`,
            }))}
          />
        </div>

        {/* Weight */}
        <div>
          <Input
            label="Weight"
            optional
            placeholder="e.g. 68 kg"
            value={data.weight || ''}
            onChange={(e) => onChange({ weight: e.target.value })}
          />
        </div>

        {/* Marital Status */}
        <div>
          <Select
            label="Marital Status"
            value={data.maritalStatus}
            onChange={(e) => onChange({ maritalStatus: e.target.value as any })}
            options={MARITAL_STATUS_OPTIONS}
          />
        </div>

        {/* Diet */}
        <div>
          <Select
            label="Diet"
            value={data.diet}
            onChange={(e) => onChange({ diet: e.target.value as any })}
            options={DIET_OPTIONS}
          />
        </div>

        {/* Religion */}
        <div>
          <Select
            label="Religion"
            value={data.religion}
            onChange={(e) => onChange({ religion: e.target.value })}
            options={RELIGIONS}
          />
        </div>

        {/* Caste / Community */}
        <div>
          <Input
            label="Caste / Community"
            optional
            placeholder="e.g. Brahmin, Patel, Agarwal, Khatri"
            value={data.caste || ''}
            onChange={(e) => onChange({ caste: e.target.value })}
          />
        </div>

        {/* Sub-Caste */}
        <div>
          <Input
            label="Sub-Caste / Clan"
            optional
            placeholder="e.g. Gaur, Leva, Vaishnav"
            value={data.subCaste || ''}
            onChange={(e) => onChange({ subCaste: e.target.value })}
          />
        </div>

        {/* Mother Tongue */}
        <div>
          <Input
            label="Mother Tongue"
            placeholder="e.g. Hindi, Gujarati, Marathi, Punjabi"
            value={data.motherTongue}
            onChange={(e) => onChange({ motherTongue: e.target.value })}
          />
        </div>

        {/* Blood Group */}
        <div>
          <Select
            label="Blood Group"
            optional
            value={data.bloodGroup || ''}
            onChange={(e) => onChange({ bloodGroup: e.target.value })}
            options={['Select blood group', ...BLOOD_GROUPS]}
          />
        </div>

        {/* Complexion */}
        <div>
          <Input
            label="Complexion"
            optional
            placeholder="e.g. Fair, Wheatish"
            value={data.complexion || ''}
            onChange={(e) => onChange({ complexion: e.target.value })}
          />
        </div>

        {/* Current City */}
        <div>
          <Input
            label="Current City"
            placeholder="e.g. Ahmedabad, Mumbai, Bengaluru"
            value={data.currentCity}
            onChange={(e) => onChange({ currentCity: e.target.value })}
            leftAddon={<MapPin className="w-4 h-4 text-slate-400" />}
          />
        </div>

        {/* Current State & Country */}
        <div className="grid grid-cols-2 gap-2">
          <Input
            label="State"
            placeholder="Gujarat"
            value={data.currentState}
            onChange={(e) => onChange({ currentState: e.target.value })}
          />
          <Input
            label="Country"
            placeholder="India"
            value={data.currentCountry}
            onChange={(e) => onChange({ currentCountry: e.target.value })}
          />
        </div>

        {/* Native Place */}
        <div className="col-span-1 sm:col-span-2">
          <Input
            label="Native Place / Ancestral Town"
            optional
            placeholder="e.g. Rajkot, Gujarat or Jaipur, Rajasthan"
            value={data.nativePlace || ''}
            onChange={(e) => onChange({ nativePlace: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};
