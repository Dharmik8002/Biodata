import React, { useState, useRef } from 'react';
import { PhotoStyle } from '../../types/biodata';
import { PhotoCropModal } from './PhotoCropModal';
import { validateImageFile } from '../../lib/validation';
import { Button } from '../ui/Button';
import { Upload, Crop, Trash2, Camera, ShieldCheck, AlertCircle } from 'lucide-react';

interface PhotoUploaderProps {
  photoUrl?: string;
  photoStyle: PhotoStyle;
  onPhotoChange: (url: string | undefined, style?: PhotoStyle) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photoUrl,
  photoStyle,
  onPhotoChange,
}) => {
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    setErrorMessage(null);
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Invalid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setRawImageSrc(result);
      setIsCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSaveCrop = (croppedDataUrl: string, style: PhotoStyle) => {
    onPhotoChange(croppedDataUrl, style);
  };

  const handleRemove = () => {
    onPhotoChange(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
      />

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {photoUrl ? (
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-amber-50/40 border border-amber-200/70 rounded-xl">
          {/* Current cropped preview */}
          <div className="relative group shrink-0">
            <img
              src={photoUrl}
              alt="Biodata portrait preview"
              className={`w-32 h-36 object-cover border-2 border-amber-400 shadow-md ${
                photoStyle === 'circle'
                  ? 'rounded-full'
                  : photoStyle === 'rounded'
                  ? 'rounded-2xl'
                  : 'rounded-md'
              }`}
            />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-slate-800">
              <Camera className="w-4 h-4 text-amber-700" />
              <span>Portrait Photo Attached</span>
            </div>
            <p className="text-xs text-slate-500">
              Your photo is ready for the biodata document. You can adjust the framing, change the photo, or remove it.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                leftIcon={<Crop className="w-3.5 h-3.5 text-amber-700" />}
                onClick={() => {
                  setRawImageSrc(photoUrl);
                  setIsCropModalOpen(true);
                }}
              >
                Adjust Framing
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                leftIcon={<Upload className="w-3.5 h-3.5 text-slate-600" />}
                onClick={() => fileInputRef.current?.click()}
              >
                Change Photo
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                leftIcon={<Trash2 className="w-3.5 h-3.5 text-red-600" />}
                onClick={handleRemove}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/20 hover:bg-amber-50/40 rounded-xl p-8 text-center cursor-pointer transition-colors group"
        >
          <div className="w-12 h-12 mx-auto bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Upload className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-semibold text-slate-800">
            Upload Profile Photo <span className="font-normal text-slate-500 text-xs">(Optional)</span>
          </h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Click to browse or drag and drop your portrait here. Supports JPG, PNG, or WebP up to 5MB.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            100% Private — Stays strictly inside your browser
          </div>
        </div>
      )}

      {/* Crop Modal */}
      {rawImageSrc && (
        <PhotoCropModal
          isOpen={isCropModalOpen}
          onClose={() => setIsCropModalOpen(false)}
          rawImageSrc={rawImageSrc}
          initialStyle={photoStyle}
          onSaveCrop={handleSaveCrop}
        />
      )}
    </div>
  );
};
