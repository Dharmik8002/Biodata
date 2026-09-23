import React from 'react';
import { BiodataData } from '../../types/biodata';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { ABOUT_ME_SUGGESTIONS, HOBBIES_LIST } from '../../data/options';
import { MessageSquare, Sparkles, Languages, Smile } from 'lucide-react';

interface StepProps {
  data: BiodataData;
  onChange: (updates: Partial<BiodataData>) => void;
  errors?: Record<string, string>;
}

export const Step6AboutMe: React.FC<StepProps> = ({ data, onChange }) => {
  const toggleHobby = (hobby: string) => {
    const current = data.hobbies || [];
    if (current.includes(hobby)) {
      onChange({ hobbies: current.filter((h) => h !== hobby) });
    } else {
      onChange({ hobbies: [...current, hobby] });
    }
  };

  const handleApplySuggestion = (text: string) => {
    onChange({ aboutMe: text });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <Smile className="w-5 h-5 text-amber-700" /> About Me & Lifestyle
        </h3>
        <p className="text-xs text-slate-500">
          Share your personality, passions, lifestyle preferences, and languages spoken.
        </p>
      </div>

      <div className="space-y-4">
        {/* About Me with Character Counter & Suggestions */}
        <div className="space-y-2">
          <Textarea
            label="About Me / Personal Introduction"
            optional
            rows={4}
            maxLength={450}
            placeholder="Introduce yourself, your values, your perspective on life and marriage..."
            value={data.aboutMe || ''}
            onChange={(e) => onChange({ aboutMe: e.target.value })}
            currentLength={data.aboutMe?.length || 0}
          />

          {/* Sample Suggestions */}
          <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200/60 space-y-2">
            <span className="text-[11px] font-semibold text-amber-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Click to load sample wording (you can edit anytime):
            </span>
            <div className="space-y-1.5">
              {ABOUT_ME_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleApplySuggestion(sug)}
                  className="w-full text-left text-[11px] text-slate-600 hover:text-amber-950 hover:bg-amber-100/70 p-2 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-amber-200/60 line-clamp-2"
                >
                  "{sug}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hobbies & Interests */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-2">
            Hobbies & Interests (Select or click to toggle)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {HOBBIES_LIST.map((hobby) => {
              const isSelected = (data.hobbies || []).includes(hobby);
              return (
                <button
                  key={hobby}
                  type="button"
                  onClick={() => toggleHobby(hobby)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-red-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isSelected ? `✓ ${hobby}` : `+ ${hobby}`}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Personality Description */}
          <div>
            <Input
              label="Personality Description"
              optional
              placeholder="e.g. Grounded, cheerful, ambitious, empathetic"
              value={data.personality || ''}
              onChange={(e) => onChange({ personality: e.target.value })}
            />
          </div>

          {/* Lifestyle Preferences */}
          <div>
            <Input
              label="Lifestyle Preferences"
              optional
              placeholder="e.g. Health conscious, non-smoker, teetotaler"
              value={data.lifestyle || ''}
              onChange={(e) => onChange({ lifestyle: e.target.value })}
            />
          </div>

          {/* Languages Known */}
          <div className="col-span-1 sm:col-span-2">
            <Input
              label="Languages Known"
              optional
              placeholder="e.g. English, Hindi, Gujarati, Basic German"
              value={(data.languagesKnown || []).join(', ')}
              onChange={(e) =>
                onChange({
                  languagesKnown: e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              leftAddon={<Languages className="w-4 h-4 text-slate-400" />}
              helperText="Separate multiple languages with commas"
            />
          </div>

          {/* Additional Info */}
          <div className="col-span-1 sm:col-span-2">
            <Input
              label="Additional Information (Optional)"
              optional
              placeholder="e.g. Open to relocating domestically or internationally for career"
              value={data.additionalInfo || ''}
              onChange={(e) => onChange({ additionalInfo: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
