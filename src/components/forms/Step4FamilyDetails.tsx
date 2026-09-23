import React from 'react';
import { BiodataData, FamilyMemberItem } from '../../types/biodata';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { FAMILY_TYPE_OPTIONS } from '../../data/options';
import { Users, Plus, Trash2, Home } from 'lucide-react';

interface StepProps {
  data: BiodataData;
  onChange: (updates: Partial<BiodataData>) => void;
  errors?: Record<string, string>;
}

export const Step4FamilyDetails: React.FC<StepProps> = ({ data, onChange }) => {
  const handleAddMember = () => {
    const newMember: FamilyMemberItem = {
      id: `fam-${Date.now()}`,
      relation: 'Paternal Uncle (Chacha)',
      name: '',
      details: '',
    };
    onChange({
      additionalFamilyMembers: [...(data.additionalFamilyMembers || []), newMember],
    });
  };

  const handleUpdateMember = (id: string, updates: Partial<FamilyMemberItem>) => {
    const updated = (data.additionalFamilyMembers || []).map((m) =>
      m.id === id ? { ...m, ...updates } : m
    );
    onChange({ additionalFamilyMembers: updated });
  };

  const handleRemoveMember = (id: string) => {
    const filtered = (data.additionalFamilyMembers || []).filter((m) => m.id !== id);
    onChange({ additionalFamilyMembers: filtered });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-700" /> Family Details
        </h3>
        <p className="text-xs text-slate-500">
          Indian matrimonial biodatas place great importance on family background and relationships.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Father's Name */}
        <div>
          <Input
            label="Father's Name"
            placeholder="e.g. Dr. Rajesh Kumar Sharma"
            value={data.fatherName}
            onChange={(e) => onChange({ fatherName: e.target.value })}
          />
        </div>

        {/* Father's Occupation */}
        <div>
          <Input
            label="Father's Occupation"
            optional
            placeholder="e.g. Professor & HOD (Govt. University) / Retired"
            value={data.fatherOccupation || ''}
            onChange={(e) => onChange({ fatherOccupation: e.target.value })}
          />
        </div>

        {/* Mother's Name */}
        <div>
          <Input
            label="Mother's Name"
            placeholder="e.g. Mrs. Sunita Sharma"
            value={data.motherName}
            onChange={(e) => onChange({ motherName: e.target.value })}
          />
        </div>

        {/* Mother's Occupation */}
        <div>
          <Input
            label="Mother's Occupation"
            optional
            placeholder="e.g. Homemaker / School Principal"
            value={data.motherOccupation || ''}
            onChange={(e) => onChange({ motherOccupation: e.target.value })}
          />
        </div>

        {/* Brothers Count */}
        <div>
          <Select
            label="Number of Brothers"
            value={String(data.brothersCount)}
            onChange={(e) => onChange({ brothersCount: parseInt(e.target.value) || 0 })}
            options={['0', '1', '2', '3', '4', '5+']}
          />
        </div>

        {/* Sisters Count */}
        <div>
          <Select
            label="Number of Sisters"
            value={String(data.sistersCount)}
            onChange={(e) => onChange({ sistersCount: parseInt(e.target.value) || 0 })}
            options={['0', '1', '2', '3', '4', '5+']}
          />
        </div>

        {/* Brothers Details */}
        {data.brothersCount > 0 && (
          <div className="col-span-1 sm:col-span-2">
            <Input
              label="Brothers' Details (Profession & Marital Status)"
              optional
              placeholder="e.g. 1 Younger Brother — Software Engineer at Amazon (Unmarried)"
              value={data.brothersDetails || ''}
              onChange={(e) => onChange({ brothersDetails: e.target.value })}
            />
          </div>
        )}

        {/* Sisters Details */}
        {data.sistersCount > 0 && (
          <div className="col-span-1 sm:col-span-2">
            <Input
              label="Sisters' Details (Profession & Marital Status)"
              optional
              placeholder="e.g. 1 Elder Sister — M.Sc Biotech, Married & settled in Pune"
              value={data.sistersDetails || ''}
              onChange={(e) => onChange({ sistersDetails: e.target.value })}
            />
          </div>
        )}

        {/* Family Type */}
        <div>
          <Select
            label="Family Type"
            value={data.familyType}
            onChange={(e) => onChange({ familyType: e.target.value as any })}
            options={FAMILY_TYPE_OPTIONS}
          />
        </div>

        {/* Family Status */}
        <div>
          <Select
            label="Family Status"
            optional
            value={data.familyStatus || 'Middle Class'}
            onChange={(e) => onChange({ familyStatus: e.target.value })}
            options={[
              'Middle Class',
              'Upper Middle Class',
              'Affluent / High Net Worth',
              'Rich / Industrialist',
            ]}
          />
        </div>

        {/* Family Native Place */}
        <div>
          <Input
            label="Family Native Place"
            optional
            placeholder="e.g. Jaipur, Rajasthan or Surat, Gujarat"
            value={data.familyNativePlace || ''}
            onChange={(e) => onChange({ familyNativePlace: e.target.value })}
          />
        </div>

        {/* Family Values */}
        <div>
          <Select
            label="Family Values"
            optional
            value={data.familyValues || 'Moderate'}
            onChange={(e) => onChange({ familyValues: e.target.value })}
            options={['Traditional', 'Moderate / Blend', 'Modern / Progressive']}
          />
        </div>

        {/* Family Residence */}
        <div className="col-span-1 sm:col-span-2">
          <Input
            label="Family Residence"
            optional
            placeholder="e.g. Own 3BHK flat in Indiranagar, Bengaluru & Ancestral House in Jaipur"
            value={data.familyResidence || ''}
            onChange={(e) => onChange({ familyResidence: e.target.value })}
            leftAddon={<Home className="w-4 h-4 text-slate-400" />}
          />
        </div>

        {/* Family Introduction */}
        <div className="col-span-1 sm:col-span-2">
          <Textarea
            label="Family Introduction / About Family"
            optional
            placeholder="e.g. We are an educated, cultured family with modern thinking rooted in spiritual and moral principles..."
            value={data.familyIntroduction || ''}
            onChange={(e) => onChange({ familyIntroduction: e.target.value })}
            maxLength={350}
          />
        </div>
      </div>

      {/* Additional Family Members Feature */}
      <div className="border-t border-slate-200 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-semibold text-slate-800">
              Additional Family Members (Optional)
            </h4>
            <p className="text-[11px] text-slate-500">
              Add prominent relatives like Chacha, Mama, Dada/Dadi, Nana/Nani.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddMember}
            leftIcon={<Plus className="w-3.5 h-3.5 text-amber-700" />}
          >
            Add Member
          </Button>
        </div>

        {data.additionalFamilyMembers && data.additionalFamilyMembers.length > 0 && (
          <div className="space-y-3 pt-2">
            {data.additionalFamilyMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200"
              >
                <div className="w-full sm:w-1/3">
                  <Input
                    placeholder="Relation (e.g. Paternal Uncle)"
                    value={member.relation}
                    onChange={(e) => handleUpdateMember(member.id, { relation: e.target.value })}
                  />
                </div>
                <div className="w-full sm:w-1/3">
                  <Input
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) => handleUpdateMember(member.id, { name: e.target.value })}
                  />
                </div>
                <div className="w-full sm:w-1/3 flex items-center gap-2">
                  <Input
                    placeholder="Details (e.g. Govt Officer)"
                    value={member.details || ''}
                    onChange={(e) => handleUpdateMember(member.id, { details: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(member.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
