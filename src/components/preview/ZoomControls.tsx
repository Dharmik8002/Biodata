import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react';

interface ZoomControlsProps {
  zoom: number;
  onZoomChange: (newZoom: number) => void;
  onFitToWidth: () => void;
  onReset: () => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoom,
  onZoomChange,
  onFitToWidth,
  onReset,
}) => {
  return (
    <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs text-xs text-slate-700">
      <button
        type="button"
        title="Zoom Out"
        onClick={() => onZoomChange(Math.max(0.35, zoom - 0.1))}
        className="p-1 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
      >
        <ZoomOut className="w-3.5 h-3.5" />
      </button>

      <span className="font-mono text-[11px] min-w-[40px] text-center font-medium">
        {Math.round(zoom * 100)}%
      </span>

      <button
        type="button"
        title="Zoom In"
        onClick={() => onZoomChange(Math.min(1.5, zoom + 0.1))}
        className="p-1 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
      >
        <ZoomIn className="w-3.5 h-3.5" />
      </button>

      <div className="h-3.5 w-px bg-slate-200 mx-1" />

      <button
        type="button"
        title="Fit to Container"
        onClick={onFitToWidth}
        className="p-1 hover:bg-slate-100 rounded-md transition-colors cursor-pointer flex items-center gap-1"
      >
        <Maximize2 className="w-3.5 h-3.5" />
        <span className="hidden sm:inline text-[11px]">Fit</span>
      </button>

      <button
        type="button"
        title="Reset to 100%"
        onClick={onReset}
        className="p-1 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
