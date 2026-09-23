import React from 'react';
import { BiodataData } from '../../types/biodata';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { Phone, Mail, MapPin, Eye, ShieldCheck, UserCheck } from 'lucide-react';

interface StepProps {
  data: BiodataData;
  onChange: (updates: Partial<BiodataData>) => void;
  errors?: Record<string, string>;
}

export const Step8ContactDetails: React.FC<StepProps> = ({ data, onChange, errors }) => {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <Phone className="w-5 h-5 text-amber-700" /> Contact Details & Privacy Controls
        </h3>
        <p className="text-xs text-slate-500">
          Provide contact details for matrimonial inquiries. You control exactly what is visible on the downloaded biodata.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Contact Person Name */}
        <div>
          <Input
            label="Contact Person Name"
            placeholder="e.g. Dr. Rajesh Kumar Sharma (Father)"
            value={data.contactPersonName}
            onChange={(e) => onChange({ contactPersonName: e.target.value })}
            leftAddon={<UserCheck className="w-4 h-4 text-slate-400" />}
          />
        </div>

        {/* Relationship */}
        <div>
          <Select
            label="Relationship to Profile Owner"
            value={data.relationship}
            onChange={(e) => onChange({ relationship: e.target.value })}
            options={['Father', 'Mother', 'Self', 'Brother', 'Sister', 'Uncle', 'Guardian', 'Other']}
          />
        </div>

        {/* Primary Phone */}
        <div>
          <Input
            label="Primary Mobile Number"
            type="tel"
            placeholder="e.g. +91 98765 43210"
            value={data.primaryPhone}
            onChange={(e) => onChange({ primaryPhone: e.target.value })}
            error={errors?.primaryPhone}
            leftAddon={<Phone className="w-4 h-4 text-slate-400" />}
          />
        </div>

        {/* Alternate Phone */}
        <div>
          <Input
            label="Alternate Mobile Number"
            optional
            type="tel"
            placeholder="e.g. +91 91234 56789"
            value={data.alternatePhone || ''}
            onChange={(e) => onChange({ alternatePhone: e.target.value })}
            leftAddon={<Phone className="w-4 h-4 text-slate-400" />}
          />
        </div>

        {/* Email */}
        <div className="col-span-1 sm:col-span-2">
          <Input
            label="Email Address"
            optional
            type="email"
            placeholder="e.g. sharma.family.biodata@example.com"
            value={data.email || ''}
            onChange={(e) => onChange({ email: e.target.value })}
            error={errors?.email}
            leftAddon={<Mail className="w-4 h-4 text-slate-400" />}
          />
        </div>

        {/* Full Residential Address */}
        <div className="col-span-1 sm:col-span-2">
          <Input
            label="Residential Address"
            optional
            placeholder="e.g. Flat 402, Royal Palms Residency, 12th Main, Indiranagar, Bengaluru - 560008"
            value={data.residentialAddress || ''}
            onChange={(e) => onChange({ residentialAddress: e.target.value })}
            leftAddon={<MapPin className="w-4 h-4 text-slate-400" />}
          />
        </div>
      </div>

      {/* Visibility Privacy Toggles */}
      <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
            Privacy Visibility Settings
          </h4>
        </div>
        <p className="text-xs text-slate-600">
          Choose whether sensitive contact fields should appear on the exported document.
        </p>

        <div className="space-y-3 pt-1 border-t border-amber-200/60">
          <Switch
            checked={data.showPhone}
            onChange={(checked) => onChange({ showPhone: checked })}
            label="Show Mobile Number on Biodata"
            description="Display primary & alternate phone numbers in the contact section"
          />

          <Switch
            checked={data.showEmail}
            onChange={(checked) => onChange({ showEmail: checked })}
            label="Show Email Address on Biodata"
            description="Include email address on the biodata document"
          />

          <Switch
            checked={data.showAddress}
            onChange={(checked) => onChange({ showAddress: checked })}
            label="Show Full Residential Address"
            description="By default off for privacy. Turn on only if you want full address printed"
          />
        </div>
      </div>
    </div>
  );
};
