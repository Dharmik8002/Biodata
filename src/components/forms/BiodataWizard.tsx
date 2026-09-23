import React, { useState } from 'react';
import { BiodataData } from '../../types/biodata';
import { Step1BasicInfo } from './Step1BasicInfo';
import { Step2PersonalDetails } from './Step2PersonalDetails';
import { Step3EducationCareer } from './Step3EducationCareer';
import { Step4FamilyDetails } from './Step4FamilyDetails';
import { Step5Horoscope } from './Step5Horoscope';
import { Step6AboutMe } from './Step6AboutMe';
import { Step7PartnerPreferences } from './Step7PartnerPreferences';
import { Step8ContactDetails } from './Step8ContactDetails';
import { Step9PhotoDesign } from './Step9PhotoDesign';
import { Step10PreviewDownload } from './Step10PreviewDownload';
import { Button } from '../ui/Button';
import { saveDraftToStorage } from '../../lib/storage';
import {
  ChevronLeft,
  ChevronRight,
  Save,
  Check,
  RotateCcw,
  Sparkles,
  Eye,
} from 'lucide-react';

interface BiodataWizardProps {
  data: BiodataData;
  onChange: (updates: Partial<BiodataData>) => void;
  onLoadSample: () => void;
  onReset: () => void;
  onPreviewClick?: () => void;
  documentRef?: React.RefObject<HTMLDivElement | null>;
  activeStep?: number;
  onStepChange?: (step: number) => void;
}

const STEP_TITLES = [
  'Basic Info',
  'Personal',
  'Career',
  'Family',
  'Horoscope',
  'About Me',
  'Partner Prefs',
  'Contact',
  'Design & Photo',
  'Download',
];

export const BiodataWizard: React.FC<BiodataWizardProps> = ({
  data,
  onChange,
  onLoadSample,
  onReset,
  onPreviewClick,
  documentRef,
  activeStep: externalActiveStep,
  onStepChange: externalOnStepChange,
}) => {
  const [internalStep, setInternalStep] = useState(0);
  const currentStep = externalActiveStep !== undefined ? externalActiveStep : internalStep;
  const setStep = (s: number) => {
    if (externalOnStepChange) externalOnStepChange(s);
    else setInternalStep(s);
  };

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveToast, setSaveToast] = useState(false);

  const validateCurrentStep = (): boolean => {
    const errs: Record<string, string> = {};
    if (currentStep === 0) {
      if (!data.fullName || data.fullName.trim().length < 2) {
        errs.fullName = 'Full Name is required';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < 9) {
        setStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveDraft = () => {
    saveDraftToStorage(data);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col h-full">
      {/* Step Progress Navigation Bar */}
      <div className="border-b border-slate-100 bg-amber-50/30 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-red-950 uppercase tracking-wider">
              Step {currentStep + 1} of 10:
            </span>
            <span className="text-xs font-semibold text-slate-700">
              {STEP_TITLES[currentStep]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onLoadSample}
              className="text-[11px] font-medium text-amber-900 bg-amber-100/70 hover:bg-amber-200/70 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-700" />
              <span>Load Sample</span>
            </button>
            <button
              type="button"
              onClick={onReset}
              className="text-[11px] text-slate-500 hover:text-slate-800 p-1 rounded-md transition-colors cursor-pointer"
              title="Reset Form"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress Bar & Jump Chips */}
        <div className="relative">
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-red-900 to-amber-600 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / 10) * 100}%` }}
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
            {STEP_TITLES.map((title, idx) => {
              const isActive = idx === currentStep;
              const isPast = idx < currentStep;
              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => setStep(idx)}
                  className={`px-2.5 py-1 rounded-lg whitespace-nowrap font-medium transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-red-900 text-white shadow-xs font-semibold'
                      : isPast
                      ? 'bg-amber-100/80 text-amber-950 hover:bg-amber-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isPast ? `✓ ${title}` : `${idx + 1}. ${title}`}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Content Area */}
      <div className="p-6 flex-1 overflow-y-auto">
        {currentStep === 0 && (
          <Step1BasicInfo data={data} onChange={onChange} errors={errors} />
        )}
        {currentStep === 1 && (
          <Step2PersonalDetails data={data} onChange={onChange} errors={errors} />
        )}
        {currentStep === 2 && (
          <Step3EducationCareer data={data} onChange={onChange} errors={errors} />
        )}
        {currentStep === 3 && (
          <Step4FamilyDetails data={data} onChange={onChange} errors={errors} />
        )}
        {currentStep === 4 && (
          <Step5Horoscope data={data} onChange={onChange} errors={errors} />
        )}
        {currentStep === 5 && (
          <Step6AboutMe data={data} onChange={onChange} errors={errors} />
        )}
        {currentStep === 6 && (
          <Step7PartnerPreferences data={data} onChange={onChange} errors={errors} />
        )}
        {currentStep === 7 && (
          <Step8ContactDetails data={data} onChange={onChange} errors={errors} />
        )}
        {currentStep === 8 && (
          <Step9PhotoDesign data={data} onChange={onChange} errors={errors} />
        )}
        {currentStep === 9 && (
          <Step10PreviewDownload
            data={data}
            onChange={onChange}
            documentRef={documentRef}
            onResetData={onReset}
          />
        )}
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="border-t border-slate-100 bg-white p-4 flex items-center justify-between gap-3 sticky bottom-0 z-10">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentStep === 0}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
          >
            Previous
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSaveDraft}
            leftIcon={
              saveToast ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Save className="w-3.5 h-3.5 text-slate-500" />
              )
            }
            className="text-xs"
          >
            {saveToast ? 'Draft Saved!' : 'Save Draft'}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {onPreviewClick && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onPreviewClick}
              leftIcon={<Eye className="w-4 h-4 text-amber-700" />}
              className="lg:hidden"
            >
              Preview
            </Button>
          )}

          {currentStep < 9 ? (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleNext}
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Next Step
            </Button>
          ) : (
            <Button
              type="button"
              variant="gold"
              size="sm"
              onClick={() => {
                const el = document.getElementById('biodata-print-document');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ready to Download
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
