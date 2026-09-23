import React from 'react';
import { BiodataData } from '../../types/biodata';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { EMPLOYMENT_OPTIONS, CURRENCIES } from '../../data/options';
import { Briefcase, GraduationCap, Building2, EyeOff } from 'lucide-react';

interface StepProps {
  data: BiodataData;
  onChange: (updates: Partial<BiodataData>) => void;
  errors?: Record<string, string>;
}

export const Step3EducationCareer: React.FC<StepProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-amber-700" /> Education & Career
        </h3>
        <p className="text-xs text-slate-500">
          Highlight your academic credentials, profession, and career achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Highest Qualification */}
        <div>
          <Input
            label="Highest Qualification"
            placeholder="e.g. Master of Technology (M.Tech), MBA, MBBS"
            value={data.highestQualification}
            onChange={(e) => onChange({ highestQualification: e.target.value })}
            leftAddon={<GraduationCap className="w-4 h-4 text-slate-400" />}
          />
        </div>

        {/* Degree / Course */}
        <div>
          <Input
            label="Degree / Major"
            optional
            placeholder="e.g. Computer Science, Finance, Architecture"
            value={data.degree || ''}
            onChange={(e) => onChange({ degree: e.target.value })}
          />
        </div>

        {/* College / University */}
        <div className="col-span-1 sm:col-span-2">
          <Input
            label="College / University"
            optional
            placeholder="e.g. Indian Institute of Technology (IIT) Delhi"
            value={data.collegeUniversity || ''}
            onChange={(e) => onChange({ collegeUniversity: e.target.value })}
            leftAddon={<Building2 className="w-4 h-4 text-slate-400" />}
          />
        </div>

        {/* Additional Qualifications */}
        <div className="col-span-1 sm:col-span-2">
          <Input
            label="Additional Qualifications / Certifications"
            optional
            placeholder="e.g. CFA Level 2, PMP, B.Tech from NIT Surathkal"
            value={data.additionalQualifications || ''}
            onChange={(e) => onChange({ additionalQualifications: e.target.value })}
          />
        </div>

        {/* Occupation */}
        <div>
          <Input
            label="Occupation / Sector"
            placeholder="e.g. Software Professional, Civil Services, Doctor"
            value={data.occupation}
            onChange={(e) => onChange({ occupation: e.target.value })}
            leftAddon={<Briefcase className="w-4 h-4 text-slate-400" />}
          />
        </div>

        {/* Job Title / Designation */}
        <div>
          <Input
            label="Job Title / Designation"
            optional
            placeholder="e.g. Senior Software Architect, Branch Manager"
            value={data.jobTitle || ''}
            onChange={(e) => onChange({ jobTitle: e.target.value })}
          />
        </div>

        {/* Company / Organization */}
        <div>
          <Input
            label="Company / Organization"
            optional
            placeholder="e.g. Microsoft Corporation, Tata Consultancy"
            value={data.companyName || ''}
            onChange={(e) => onChange({ companyName: e.target.value })}
            disabled={data.hideEmployer}
          />
        </div>

        {/* Employment Type */}
        <div>
          <Select
            label="Employment Type"
            value={data.employmentType}
            onChange={(e) => onChange({ employmentType: e.target.value as any })}
            options={EMPLOYMENT_OPTIONS}
          />
        </div>

        {/* Work Location */}
        <div>
          <Input
            label="Work Location"
            optional
            placeholder="e.g. Bengaluru, India or London, UK"
            value={data.workLocation || ''}
            onChange={(e) => onChange({ workLocation: e.target.value })}
          />
        </div>

        {/* Annual Income & Currency */}
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1">
            <Select
              label="Currency"
              value={data.incomeCurrency || 'INR'}
              onChange={(e) => onChange({ incomeCurrency: e.target.value })}
              options={CURRENCIES.map((c) => ({ value: c.code, label: c.code }))}
              disabled={data.hideIncome}
            />
          </div>
          <div className="col-span-2">
            <Input
              label="Annual Income"
              optional
              placeholder="e.g. 25 - 30 LPA"
              value={data.annualIncome || ''}
              onChange={(e) => onChange({ annualIncome: e.target.value })}
              disabled={data.hideIncome}
            />
          </div>
        </div>

        {/* Business Details (If applicable) */}
        <div className="col-span-1 sm:col-span-2">
          <Input
            label="Business Details (If applicable)"
            optional
            placeholder="e.g. Family owned manufacturing unit in Ahmedabad (Est. 1995)"
            value={data.businessDetails || ''}
            onChange={(e) => onChange({ businessDetails: e.target.value })}
          />
        </div>
      </div>

      {/* Privacy Controls for Career */}
      <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/70 space-y-3">
        <h4 className="text-xs font-semibold text-amber-900 flex items-center gap-1.5">
          <EyeOff className="w-4 h-4 text-amber-700" /> Career Privacy Settings
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Switch
            checked={data.hideIncome}
            onChange={(checked) => onChange({ hideIncome: checked })}
            label="Hide Annual Income"
            description="Do not display income figure on the biodata"
          />
          <Switch
            checked={data.hideEmployer}
            onChange={(checked) => onChange({ hideEmployer: checked })}
            label="Hide Employer / Company Name"
            description="Display job title only, keeping company private"
          />
        </div>
      </div>
    </div>
  );
};
