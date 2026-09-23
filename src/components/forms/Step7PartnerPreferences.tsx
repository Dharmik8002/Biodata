import React from 'react';
import { BiodataData } from '../../types/biodata';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { Textarea } from '../ui/Textarea';
import { HeartHandshake, Filter } from 'lucide-react';

interface StepProps {
  data: BiodataData;
  onChange: (updates: Partial<BiodataData>) => void;
  errors?: Record<string, string>;
}

export const Step7PartnerPreferences: React.FC<StepProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-amber-700" /> Partner Preferences
        </h3>
        <p className="text-xs text-slate-500">
          Share your expectations for a prospective life partner. This entire section can be hidden if desired.
        </p>
      </div>

      {/* Main Toggle */}
      <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/70 flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-slate-900 block">
            Include Partner Preferences in my Biodata
          </span>
          <span className="text-xs text-slate-500 block mt-0.5">
            When disabled, partner expectations will not appear in the preview or exported PDF.
          </span>
        </div>
        <Switch
          checked={data.includePartnerPreferences}
          onChange={(checked) => onChange({ includePartnerPreferences: checked })}
        />
      </div>

      {data.includePartnerPreferences && (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Preferred Age Range */}
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Min Preferred Age"
                type="number"
                min={18}
                max={60}
                placeholder="22"
                value={data.partnerAgeMin || ''}
                onChange={(e) => onChange({ partnerAgeMin: parseInt(e.target.value) || undefined })}
              />
              <Input
                label="Max Preferred Age"
                type="number"
                min={18}
                max={60}
                placeholder="29"
                value={data.partnerAgeMax || ''}
                onChange={(e) => onChange({ partnerAgeMax: parseInt(e.target.value) || undefined })}
              />
            </div>

            {/* Preferred Height Range */}
            <div>
              <Input
                label="Preferred Height Range"
                optional
                placeholder="e.g. 5' 2&quot; to 5' 8&quot;"
                value={data.partnerHeightRange || ''}
                onChange={(e) => onChange({ partnerHeightRange: e.target.value })}
              />
            </div>

            {/* Preferred Education */}
            <div>
              <Input
                label="Preferred Education"
                optional
                placeholder="e.g. Graduate / Post Graduate in Engineering, Medicine, MBA"
                value={data.partnerEducation || ''}
                onChange={(e) => onChange({ partnerEducation: e.target.value })}
              />
            </div>

            {/* Preferred Profession */}
            <div>
              <Input
                label="Preferred Profession"
                optional
                placeholder="e.g. Working Professional, Civil Services, Doctor, Entrepreneur"
                value={data.partnerProfession || ''}
                onChange={(e) => onChange({ partnerProfession: e.target.value })}
              />
            </div>

            {/* Preferred Location */}
            <div>
              <Input
                label="Preferred Location / Cities"
                optional
                placeholder="e.g. Bengaluru, Mumbai, Delhi-NCR, or willing to relocate"
                value={data.partnerLocation || ''}
                onChange={(e) => onChange({ partnerLocation: e.target.value })}
              />
            </div>

            {/* Preferred Mother Tongue */}
            <div>
              <Input
                label="Preferred Mother Tongue"
                optional
                placeholder="e.g. Hindi, Gujarati, Marathi"
                value={data.partnerMotherTongue || ''}
                onChange={(e) => onChange({ partnerMotherTongue: e.target.value })}
              />
            </div>

            {/* Preferred Community */}
            <div>
              <Input
                label="Preferred Community / Caste"
                optional
                placeholder="e.g. Same community or open to cultured families"
                value={data.partnerCommunity || ''}
                onChange={(e) => onChange({ partnerCommunity: e.target.value })}
              />
            </div>

            {/* Preferred Diet */}
            <div>
              <Input
                label="Dietary Preferences"
                optional
                placeholder="e.g. Vegetarian preferred"
                value={data.partnerDiet || ''}
                onChange={(e) => onChange({ partnerDiet: e.target.value })}
              />
            </div>

            {/* Expectations / Notes */}
            <div className="col-span-1 sm:col-span-2">
              <Textarea
                label="Other Expectations / Looking for"
                optional
                rows={3}
                maxLength={300}
                placeholder="e.g. Looking for a warm-hearted, educated life partner who values mutual respect and healthy family bonds..."
                value={data.partnerExpectations || ''}
                onChange={(e) => onChange({ partnerExpectations: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
