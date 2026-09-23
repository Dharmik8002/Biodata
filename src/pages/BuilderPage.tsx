import React, { useState, useRef, useEffect } from 'react';
import { BiodataData } from '../types/biodata';
import { BiodataWizard } from '../components/forms/BiodataWizard';
import { LiveBiodataPreview } from '../components/preview/LiveBiodataPreview';
import { SAMPLE_BIODATA, INITIAL_EMPTY_BIODATA } from '../data/sampleData';
import { getDraftFromStorage, hasSavedDraft } from '../lib/storage';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Edit3, Eye, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

interface BuilderPageProps {
  biodata: BiodataData;
  onBiodataChange: (data: BiodataData) => void;
  onNavigate: (path: string) => void;
}

export const BuilderPage: React.FC<BuilderPageProps> = ({
  biodata,
  onBiodataChange,
  onNavigate,
}) => {
  // Mobile tab state: 'edit' or 'preview'
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  const [activeStep, setActiveStep] = useState(0);
  const [restoreDraftModal, setRestoreDraftModal] = useState(false);

  const documentRef = useRef<HTMLDivElement | null>(null);

  // Check if a saved draft exists on initial load
  useEffect(() => {
    if (hasSavedDraft() && !biodata.fullName) {
      setRestoreDraftModal(true);
    }
  }, []);

  const handleUpdate = (updates: Partial<BiodataData>) => {
    onBiodataChange({ ...biodata, ...updates });
  };

  const handleLoadSample = () => {
    if (window.confirm('Load sample biodata profile? This will populate the form with realistic sample information.')) {
      onBiodataChange({ ...SAMPLE_BIODATA, templateId: biodata.templateId });
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all form fields?')) {
      onBiodataChange({ ...INITIAL_EMPTY_BIODATA, templateId: biodata.templateId });
      setActiveStep(0);
    }
  };

  const handleRestoreDraft = () => {
    const saved = getDraftFromStorage();
    if (saved) {
      onBiodataChange(saved);
    }
    setRestoreDraftModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex items-center bg-slate-200/80 p-1 rounded-xl mb-4 sticky top-16 z-30 shadow-xs">
        <button
          type="button"
          onClick={() => setMobileTab('edit')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            mobileTab === 'edit'
              ? 'bg-white text-red-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Details</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            mobileTab === 'preview'
              ? 'bg-white text-red-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live A4 Preview</span>
        </button>
      </div>

      {/* Main Split Grid (Form on Left, Sticky Preview on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column */}
        <div
          className={`lg:col-span-6 xl:col-span-7 ${
            mobileTab === 'edit' ? 'block' : 'hidden lg:block'
          }`}
        >
          <BiodataWizard
            data={biodata}
            onChange={handleUpdate}
            onLoadSample={handleLoadSample}
            onReset={handleReset}
            onPreviewClick={() => setMobileTab('preview')}
            documentRef={documentRef}
            activeStep={activeStep}
            onStepChange={setActiveStep}
          />
        </div>

        {/* Right Sticky Live Preview Column */}
        <div
          className={`lg:col-span-6 xl:col-span-5 lg:sticky lg:top-24 h-[calc(100vh-7rem)] ${
            mobileTab === 'preview' ? 'block' : 'hidden lg:block'
          }`}
        >
          <LiveBiodataPreview
            data={biodata}
            onTemplateChange={(tmplId) => handleUpdate({ templateId: tmplId })}
            documentRef={documentRef}
          />
        </div>
      </div>

      {/* Restore Draft Modal */}
      <Modal
        isOpen={restoreDraftModal}
        onClose={() => setRestoreDraftModal(false)}
        title="Restore Saved Biodata Draft?"
        description="We found an existing biodata draft saved in your browser storage."
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Would you like to resume editing your previous draft, or start fresh with a new profile?
          </p>
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRestoreDraftModal(false)}
            >
              Start Fresh
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleRestoreDraft}
            >
              Restore Saved Draft
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
