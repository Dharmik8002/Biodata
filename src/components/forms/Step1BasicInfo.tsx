import React from 'react';
import { BiodataData } from '../../types/biodata';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { calculateAge } from '../../lib/utils';
import { COMMON_RELIGIOUS_HEADINGS } from '../../data/options';
import { User, Calendar, Languages, HeartHandshake } from 'lucide-react';

interface StepProps {
  data: BiodataData;
  onChange: (updates: Partial<BiodataData>) => void;
  errors?: Record<string, string>;
}

export const Step1BasicInfo: React.FC<StepProps> = ({ data, onChange, errors }) => {
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dob = e.target.value;
    const age = calculateAge(dob);
    onChange({ dateOfBirth: dob, age });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-amber-700" /> Basic Information
        </h3>
        <p className="text-xs text-slate-500">
          Set up the main profile details and religious heading for your biodata.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="col-span-1 sm:col-span-2">
          <Input
            label="Full Name"
            required
            placeholder="e.g. Aarav Rajesh Sharma"
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            error={errors?.fullName}
            leftAddon={<User className="w-4 h-4" />}
          />
        </div>

        {/* Gender */}
        <div>
          <Select
            label="Gender"
            required
            value={data.gender}
            onChange={(e) => onChange({ gender: e.target.value as any })}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
              { value: 'prefer_not_to_say', label: 'Prefer not to say' },
            ]}
          />
        </div>

        {/* Date of Birth & Auto Age */}
        <div>
          <Input
            label="Date of Birth"
            type="date"
            required
            value={data.dateOfBirth}
            onChange={handleDobChange}
            error={errors?.dateOfBirth}
            leftAddon={<Calendar className="w-4 h-4" />}
            helperText={data.age > 0 ? `Calculated Age: ${data.age} years` : undefined}
          />
        </div>

        {/* Biodata Document Title */}
        <div>
          <Input
            label="Biodata Document Title"
            value={data.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Marriage Biodata"
            helperText="Appears as the main heading of the biodata"
          />
        </div>

        {/* Document Language */}
        <div>
          <Select
            label="Biodata Document Language"
            value={data.language}
            onChange={(e) => onChange({ language: e.target.value as any })}
            options={[
              { value: 'en', label: 'English' },
              { value: 'hi', label: 'Hindi (हिंदी)' },
              { value: 'gu', label: 'Gujarati (ગુજરાતી)' },
            ]}
            helperText="Labels on the downloaded PDF will appear in this language"
          />
        </div>

        {/* Religious / Auspicious Heading */}
        <div className="col-span-1 sm:col-span-2 space-y-2">
          <Input
            label="Religious / Auspicious Heading"
            optional
            placeholder="e.g. || श्री गणेशाय नमः || or || શ્રી ગણેશાય નમઃ ||"
            value={data.religiousHeading || ''}
            onChange={(e) => onChange({ religiousHeading: e.target.value })}
            leftAddon={<HeartHandshake className="w-4 h-4 text-amber-600" />}
          />
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-medium text-slate-500">Quick Suggestions:</span>
            {COMMON_RELIGIOUS_HEADINGS.slice(0, 5).map((heading) => (
              <button
                key={heading}
                type="button"
                onClick={() => onChange({ religiousHeading: heading })}
                className="text-[10px] bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
              >
                {heading}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Headline */}
        <div className="col-span-1 sm:col-span-2">
          <Input
            label="Profile Headline"
            optional
            placeholder="e.g. Senior Software Architect with strong cultural and family values"
            value={data.profileHeadline || ''}
            onChange={(e) => onChange({ profileHeadline: e.target.value })}
            maxLength={100}
            helperText="A short one-line summary displayed beneath your name"
          />
        </div>
      </div>
    </div>
  );
};
