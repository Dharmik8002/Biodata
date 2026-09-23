import React, { useState, useRef, useEffect } from 'react';
import { BiodataData } from '../../types/biodata';
import { BiodataDocument } from './BiodataDocument';
import { ZoomControls } from './ZoomControls';
import { TEMPLATES } from '../../data/templates';
import { Palette, Eye } from 'lucide-react';

interface LiveBiodataPreviewProps {
  data: BiodataData;
  onTemplateChange?: (templateId: string) => void;
  documentRef?: React.RefObject<HTMLDivElement | null>;
}

export const LiveBiodataPreview: React.FC<LiveBiodataPreviewProps> = ({
  data,
  onTemplateChange,
  documentRef: externalDocRef,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const localDocRef = useRef<HTMLDivElement | null>(null);
  const docRef = externalDocRef || localDocRef;

  const [zoom, setZoom] = useState<number>(0.65);

  // Auto calculate fit to container width on mount or resize
  const calculateFit = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 48; // padding
      const targetScale = Math.min(1.0, Math.max(0.35, containerWidth / 794));
      setZoom(targetScale);
    }
  };

  useEffect(() => {
    calculateFit();
    window.addEventListener('resize', calculateFit);
    return () => window.removeEventListener('resize', calculateFit);
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-100/80 rounded-2xl border border-slate-200 overflow-hidden shadow-inner">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-white/95 border-b border-slate-200 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-amber-700" /> Live A4 Document Preview
          </span>
        </div>

        {/* Zoom Controls */}
        <ZoomControls
          zoom={zoom}
          onZoomChange={setZoom}
          onFitToWidth={calculateFit}
          onReset={() => setZoom(1.0)}
        />
      </div>

      {/* Quick Template Switcher Strip */}
      {onTemplateChange && (
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50/50 border-b border-amber-200/50 overflow-x-auto text-xs shrink-0">
          <span className="text-[11px] font-semibold text-amber-900 shrink-0 flex items-center gap-1">
            <Palette className="w-3 h-3" /> Quick Template:
          </span>
          <div className="flex items-center gap-1.5">
            {TEMPLATES.slice(0, 7).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onTemplateChange(t.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
                  data.templateId === t.id
                    ? 'bg-amber-900 text-amber-100 shadow-xs ring-1 ring-amber-900'
                    : 'bg-white text-slate-700 hover:bg-amber-100/60 border border-slate-200'
                }`}
              >
                {t.name.split(' ')[0]} {t.name.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Document Viewport */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center"
      >
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
            marginBottom: `${(1123 * zoom) - 1123}px`,
          }}
          className="shrink-0 transition-transform"
        >
          <BiodataDocument ref={docRef} data={data} />
        </div>
      </div>
    </div>
  );
};
