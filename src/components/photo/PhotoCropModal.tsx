import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { PhotoStyle } from '../../types/biodata';
import { ZoomIn, ZoomOut, RotateCcw, Check, Sparkles } from 'lucide-react';

interface PhotoCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawImageSrc: string;
  initialStyle?: PhotoStyle;
  onSaveCrop: (croppedDataUrl: string, style: PhotoStyle) => void;
}

export const PhotoCropModal: React.FC<PhotoCropModalProps> = ({
  isOpen,
  onClose,
  rawImageSrc,
  initialStyle = 'rounded',
  onSaveCrop,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [style, setStyle] = useState<PhotoStyle>(initialStyle);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Load the source image
  useEffect(() => {
    if (!rawImageSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = rawImageSrc;
    img.onload = () => {
      imgRef.current = img;
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      drawCanvas();
    };
  }, [rawImageSrc]);

  // Redraw canvas whenever zoom, offset, or style changes
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 320;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    // Save state
    ctx.save();

    // Clip according to selected style
    ctx.beginPath();
    if (style === 'circle') {
      ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
    } else if (style === 'rounded') {
      const radius = 24;
      const x = 4;
      const y = 4;
      const w = size - 8;
      const h = size - 8;
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      ctx.lineTo(x + radius, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
    } else {
      // Rectangle (subtle rounded 8px)
      ctx.rect(4, 4, size - 8, size - 8);
    }
    ctx.closePath();
    ctx.clip();

    // Draw background placeholder
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, size, size);

    // Calculate scaling to cover
    const scale = Math.max(size / img.width, size / img.height) * zoom;
    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;

    const centerX = size / 2 + offset.x;
    const centerY = size / 2 + offset.y;

    const drawX = centerX - drawWidth / 2;
    const drawY = centerY - drawHeight / 2;

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

    // Restore and draw border
    ctx.restore();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#D4AF37'; // Elegant gold accent
    ctx.stroke();
  }, [zoom, offset, style]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Drag handling (mouse & touch)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - offset.x,
        y: e.touches[0].clientY - offset.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setOffset({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    onSaveCrop(dataUrl, style);
    onClose();
  };

  const handleReset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adjust Profile Photo"
      description="Drag to reposition and use zoom to frame your portrait perfectly."
      maxWidth="md"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Frame Style Selector */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setStyle('circle')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              style === 'circle' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Circular
          </button>
          <button
            type="button"
            onClick={() => setStyle('rounded')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              style === 'rounded' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rounded Square
          </button>
          <button
            type="button"
            onClick={() => setStyle('rectangle')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              style === 'rectangle' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rectangle
          </button>
        </div>

        {/* Interactive Canvas */}
        <div
          className="relative w-[320px] h-[320px] bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner cursor-grab active:cursor-grabbing border-2 border-dashed border-amber-300"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <canvas ref={canvasRef} className="w-[320px] h-[320px]" />
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full pointer-events-none flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" /> Drag to Pan
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="w-full space-y-3 px-4">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1 font-medium">
              <ZoomIn className="w-3.5 h-3.5 text-amber-600" /> Zoom Level
            </span>
            <span>{Math.round(zoom * 100)}%</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setZoom((prev) => Math.max(0.6, prev - 0.1))}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <input
              type="range"
              min="0.6"
              max="2.5"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-900"
            />
            <button
              type="button"
              onClick={() => setZoom((prev) => Math.min(2.5, prev + 0.1))}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              title="Reset position & zoom"
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 w-full border-t border-slate-100 pt-4">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            size="sm"
            leftIcon={<Check className="w-4 h-4" />}
          >
            Apply & Save Photo
          </Button>
        </div>
      </div>
    </Modal>
  );
};
