import React from 'react';
import { BiodataData } from '../../types/biodata';
import { PhotoUploader } from '../photo/PhotoUploader';
import { TEMPLATES } from '../../data/templates';
import { Camera, Palette, CheckCircle2 } from 'lucide-react';

interface StepProps {
  data: BiodataData;
  onChange: (updates: Partial<BiodataData>) => void;
  errors?: Record<string, string>;
}

export const Step9PhotoDesign: React.FC<StepProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <Camera className="w-5 h-5 text-amber-700" /> Photo & Design Template
        </h3>
        <p className="text-xs text-slate-500">
          Upload a formal portrait, adjust the crop, and choose your favorite professional design template.
        </p>
      </div>

      {/* Photo Uploader */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-800">
          Profile Photo (Optional)
        </label>
        <PhotoUploader
          photoUrl={data.photoUrl}
          photoStyle={data.photoStyle}
          onPhotoChange={(url, style) =>
            onChange({
              photoUrl: url,
              ...(style ? { photoStyle: style } : {}),
            })
          }
        />
      </div>

      {/* Frame Style Selector */}
      {data.photoUrl && (
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-semibold text-slate-800">
            Photo Frame Style
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'rounded', label: 'Rounded Square' },
              { id: 'circle', label: 'Circular' },
              { id: 'rectangle', label: 'Rectangle' },
            ].map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => onChange({ photoStyle: style.id as any })}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  data.photoStyle === style.id
                    ? 'border-red-900 bg-red-50/50 text-red-950 font-semibold ring-2 ring-red-900/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="text-xs">{style.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Template Selection Grid */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-slate-800 flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-amber-700" /> Choose Design Template (12 Styles)
          </label>
          <span className="text-[11px] text-slate-500">
            Switch anytime without losing your entered data
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1">
          {TEMPLATES.map((tmpl) => {
            const isSelected = data.templateId === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => onChange({ templateId: tmpl.id })}
                className={`relative p-3 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                  isSelected
                    ? 'border-red-900 bg-red-50/30 ring-2 ring-red-900/20 shadow-xs'
                    : 'border-slate-200 hover:border-amber-300 bg-white hover:bg-slate-50'
                }`}
              >
                {/* Visual Color Swatch Banner */}
                <div
                  className="h-10 w-full rounded-lg mb-2 flex items-center justify-center font-cinzel text-[10px] font-bold tracking-widest uppercase shadow-2xs"
                  style={{
                    backgroundColor: tmpl.accentColor,
                    color: tmpl.secondaryColor,
                  }}
                >
                  {tmpl.name.split(' ')[0]}
                </div>

                <div>
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900 line-clamp-1">
                      {tmpl.name}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-red-900 shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 line-clamp-2 mt-1">
                    {tmpl.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
