import React, { useState } from 'react';
import { BiodataData } from '../../types/biodata';
import { Button } from '../ui/Button';
import { generateBiodataPdf } from '../../lib/pdfGenerator';
import { exportBiodataToImage } from '../../lib/imageExport';
import { saveDraftToStorage, clearDraftFromStorage, deleteAllUserData } from '../../lib/storage';
import {
  Download,
  FileText,
  Image as ImageIcon,
  Printer,
  Save,
  Trash2,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Eye,
} from 'lucide-react';
import { ExportInspectorModal } from '../ExportInspectorModal';

interface StepProps {
  data: BiodataData;
  onChange: (updates: Partial<BiodataData>) => void;
  documentRef?: React.RefObject<HTMLDivElement | null>;
  onResetData?: () => void;
}

export const Step10PreviewDownload: React.FC<StepProps> = ({
  data,
  onResetData,
}) => {
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [isExportingJpeg, setIsExportingJpeg] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [progressStatus, setProgressStatus] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleDownloadPdf = async () => {
    if (!data.fullName || data.fullName.trim().length < 2) {
      setNotification({
        type: 'error',
        message: 'Please enter a valid Full Name in Step 1 before downloading your biodata.',
      });
      return;
    }

    setIsExportingPdf(true);
    setProgressStatus('Generating PDF...');
    setNotification(null);

    const result = await generateBiodataPdf({
      data,
      onProgress: (status) => setProgressStatus(status),
    });

    setIsExportingPdf(false);
    setProgressStatus(null);

    if (result.success) {
      setNotification({
        type: 'success',
        message: `Biodata PDF downloaded successfully as "${result.filename}".`,
      });
    } else {
      setNotification({
        type: 'error',
        message: result.error || 'Unable to generate the PDF. Please try again.',
      });
    }
  };

  const handleDownloadImage = async (format: 'png' | 'jpeg') => {
    if (!data.fullName || data.fullName.trim().length < 2) {
      setNotification({
        type: 'error',
        message: 'Please enter a valid Full Name in Step 1 before exporting image.',
      });
      return;
    }

    if (format === 'png') setIsExportingPng(true);
    if (format === 'jpeg') setIsExportingJpeg(true);
    setNotification(null);

    const result = await exportBiodataToImage({
      data,
      format,
    });

    if (format === 'png') setIsExportingPng(false);
    if (format === 'jpeg') setIsExportingJpeg(false);

    if (result.success) {
      setNotification({
        type: 'success',
        message: `Biodata image downloaded successfully as "${result.filename}".`,
      });
    } else {
      setNotification({
        type: 'error',
        message: result.error || 'Could not export image. Please try again.',
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveDraft = () => {
    const saved = saveDraftToStorage(data);
    if (saved) {
      setNotification({
        type: 'success',
        message: 'Draft saved securely in your browser! You can safely revisit or refresh anytime.',
      });
    } else {
      setNotification({
        type: 'error',
        message: 'Could not save draft. Please check if browser storage is enabled.',
      });
    }
  };

  const handleClearDraft = () => {
    clearDraftFromStorage();
    setNotification({
      type: 'success',
      message: 'Saved draft cleared from browser storage.',
    });
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to permanently erase all entered biodata and saved drafts? This cannot be undone.')) {
      deleteAllUserData();
      if (onResetData) onResetData();
      setNotification({
        type: 'success',
        message: 'All your personal data and drafts have been permanently deleted from this browser.',
      });
    }
  };

  const isAnyExportRunning = isExportingPdf || isExportingPng || isExportingJpeg;

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <Download className="w-5 h-5 text-amber-700" /> Export & Download Your Biodata
        </h3>
        <p className="text-xs text-slate-500">
          Your biodata is ready! Download as a print-ready A4 PDF or crisp WhatsApp image.
        </p>
      </div>

      {/* Notifications */}
      {notification && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          )}
          <span className="flex-1 font-medium">{notification.message}</span>
        </div>
      )}

      {/* Progress status */}
      {progressStatus && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xl flex items-center gap-2">
          <Sparkles className="w-4 h-4 animate-spin text-amber-600" />
          <span>{progressStatus}</span>
        </div>
      )}

      {/* Primary Download Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* PDF Download (Primary CTA) */}
        <div className="col-span-1 sm:col-span-2 p-5 bg-gradient-to-br from-red-950 to-red-900 rounded-2xl text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold flex items-center justify-center sm:justify-start gap-2">
              <FileText className="w-5 h-5 text-amber-300" /> Print-Ready A4 PDF
            </h4>
            <p className="text-xs text-amber-100/80">
              High resolution, crystal-clear typography, multi-page aware, standard A4 margins.
            </p>
          </div>
          <Button
            variant="gold"
            size="lg"
            isLoading={isExportingPdf}
            disabled={isAnyExportRunning}
            onClick={handleDownloadPdf}
            leftIcon={<Download className="w-4 h-4" />}
            className="w-full sm:w-auto shrink-0 shadow-lg font-bold"
          >
            {isExportingPdf ? 'Generating PDF...' : 'Download PDF'}
          </Button>
        </div>

        {/* WhatsApp Image (PNG) */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs">
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            <span>High-Res PNG (WhatsApp / Social)</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Lossless high resolution image format, perfect for sharing on mobile and WhatsApp groups.
          </p>
          <Button
            variant="outline"
            size="sm"
            isLoading={isExportingPng}
            disabled={isAnyExportRunning}
            onClick={() => handleDownloadImage('png')}
            className="w-full text-xs"
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            {isExportingPng ? 'Exporting PNG...' : 'Download as PNG'}
          </Button>
        </div>

        {/* Compressed JPEG */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs">
            <ImageIcon className="w-4 h-4 text-blue-600" />
            <span>Compressed JPEG Image</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Smaller file size for quick emails, attachments, or devices with low data bandwidth.
          </p>
          <Button
            variant="outline"
            size="sm"
            isLoading={isExportingJpeg}
            disabled={isAnyExportRunning}
            onClick={() => handleDownloadImage('jpeg')}
            className="w-full text-xs"
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            {isExportingJpeg ? 'Exporting JPEG...' : 'Download as JPEG'}
          </Button>
        </div>

        {/* Browser Print */}
        <div className="col-span-1 sm:col-span-2 p-4 bg-amber-50/50 rounded-xl border border-amber-200/60 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h5 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
              <Printer className="w-4 h-4 text-amber-700" /> Direct Browser Print
            </h5>
            <p className="text-[11px] text-slate-600">
              Opens the browser print dialog with clean document formatting (no UI buttons).
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="w-3.5 h-3.5" />}
            className="shrink-0"
          >
            Print
          </Button>
        </div>
      </div>

      {/* Local Draft & Data Privacy Controls */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Privacy & Draft Management
          </h4>
        </div>
        <p className="text-xs text-slate-600">
          VivahBio processes your biodata entirely in your web browser. No details or photos are sent to any external server. You can save your draft locally or permanently wipe it anytime.
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            leftIcon={<Save className="w-3.5 h-3.5 text-amber-700" />}
          >
            Save Draft to Browser
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClearDraft}
            className="text-slate-600 hover:text-slate-900"
          >
            Clear Saved Draft
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleDeleteAll}
            leftIcon={<Trash2 className="w-3.5 h-3.5 text-red-600" />}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-auto"
          >
            Delete All My Data
          </Button>
        </div>
      </div>

      {/* Dev Quality Inspector Tool (Requirement 16) */}
      <div className="p-4 bg-slate-100/80 rounded-2xl border border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-2xs">
        <div className="space-y-0.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 font-bold text-slate-800">
            <Eye className="w-4 h-4 text-amber-600" />
            <span>Developer Quality Inspector (Requirement 16)</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Inspect fixed 794px export DOM, A4 page margins, and live html2canvas raster output before exporting.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsInspectorOpen(true)}
          leftIcon={<Eye className="w-3.5 h-3.5" />}
          className="bg-white border-slate-300 text-slate-700 hover:text-amber-800 shrink-0 shadow-2xs font-medium"
        >
          Inspect Export DOM
        </Button>
      </div>

      {/* Inspector Modal */}
      <ExportInspectorModal
        data={data}
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />
    </div>
  );
};
