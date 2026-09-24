import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import html2canvas from 'html2canvas';
import { BiodataData } from '../types/biodata';
import { TemplateRenderer } from './templates/TemplateRenderer';
import { Button } from './ui/Button';
import { X, ZoomIn, ZoomOut, Eye, Sparkles, Layers } from 'lucide-react';
import { ensureCanvasPatternSafety } from '../lib/canvasPolyfill';
import { ensureAllFontsLoaded } from '../lib/fontLoader';

interface ExportInspectorModalProps {
  data: BiodataData;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportInspectorModal: React.FC<ExportInspectorModalProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const [zoom, setZoom] = useState(0.8);
  const [activeTab, setActiveTab] = useState<'dom' | 'canvas' | 'compare'>('dom');
  const [isRenderingCanvas, setIsRenderingCanvas] = useState(false);
  const [canvasDataUrl, setCanvasDataUrl] = useState<string | null>(null);
  const [canvasInfo, setCanvasInfo] = useState<string | null>(null);

  const domContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleRenderCanvas = async () => {
    setIsRenderingCanvas(true);
    setCanvasInfo('Loading fonts & rendering canvas with html2canvas...');

    // Mount an isolated unscaled 794px container free of modal transforms
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '0px';
    container.style.top = '0px';
    container.style.width = '794px';
    container.style.minHeight = '1123px';
    container.style.zIndex = '-9999';
    container.style.backgroundColor = '#ffffff';
    container.style.boxSizing = 'border-box';
    container.style.overflow = 'visible';
    container.style.pointerEvents = 'none';
    container.style.opacity = '1';

    document.body.appendChild(container);
    const root = createRoot(container);

    try {
      ensureCanvasPatternSafety();
      await ensureAllFontsLoaded();

      await new Promise<void>((resolve) => {
        root.render(
          React.createElement(
            'div',
            {
              style: {
                width: '794px',
                minHeight: '1123px',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
                position: 'relative',
              },
            },
            React.createElement(TemplateRenderer, { data })
          )
        );
        setTimeout(resolve, 150);
      });

      const totalHeight = Math.max(container.scrollHeight, 1123);

      const canvas = await html2canvas(container, {
        scale: 2.0,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794,
        height: totalHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        windowHeight: totalHeight,
        onclone: async (clonedDoc, clonedElement) => {
          ensureCanvasPatternSafety(clonedDoc.defaultView || window);
          clonedElement.style.position = 'static';
          clonedElement.style.margin = '0px';

          const headStyles = document.querySelectorAll('style, link[rel="stylesheet"]');
          headStyles.forEach((el) => {
            clonedDoc.head.appendChild(el.cloneNode(true));
          });

          // Transfer pre-loaded FontFaces directly to clonedDoc.fonts
          try {
            if (document.fonts && clonedDoc.fonts) {
              document.fonts.forEach((fontFace: any) => {
                try {
                  clonedDoc.fonts.add(fontFace);
                } catch (e) {}
              });
            }
          } catch (e) {}

          if (clonedDoc.fonts && clonedDoc.fonts.ready) {
            try {
              await clonedDoc.fonts.ready;
            } catch (e) {}
          }

          await new Promise((resolve) => setTimeout(resolve, 100));
        },
      });

      const url = canvas.toDataURL('image/png');
      setCanvasDataUrl(url);
      setCanvasInfo(`Rendered: ${canvas.width}×${canvas.height}px (Scale: 2x, DOM: 794×${totalHeight}px)`);
      setActiveTab('canvas');
    } catch (err: any) {
      setCanvasInfo(`Render Error: ${err.message}`);
    } finally {
      try {
        root.unmount();
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      } catch (e) {}
      setIsRenderingCanvas(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/90 backdrop-blur-xs text-slate-100">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
            DEV INSPECTOR
          </span>
          <h2 className="text-sm font-semibold text-white">
            Export DOM & Canvas Inspector — Requirement 16
          </h2>
          <span className="text-xs text-slate-400">
            (Fixed 794px width • A4 1123px boundaries)
          </span>
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
            <button
              onClick={() => setActiveTab('dom')}
              className={`px-3 py-1 rounded font-medium transition ${
                activeTab === 'dom'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Export DOM (794px)
            </button>
            <button
              onClick={() => setActiveTab('canvas')}
              className={`px-3 py-1 rounded font-medium transition ${
                activeTab === 'canvas'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Rendered Canvas
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-3 py-1 rounded font-medium transition ${
                activeTab === 'compare'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Side-by-Side Compare
            </button>
          </div>

          <Button
            size="sm"
            variant="gold"
            onClick={handleRenderCanvas}
            isLoading={isRenderingCanvas}
            leftIcon={<Sparkles className="w-3.5 h-3.5" />}
          >
            {canvasDataUrl ? 'Re-render Canvas' : 'Render Canvas Now'}
          </Button>

          {/* Zoom */}
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setZoom((z) => Math.max(0.4, Number((z - 0.1).toFixed(1))))}
              className="p-1 hover:text-amber-400"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="w-12 text-center font-mono">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(1.5, Number((z + 0.1).toFixed(1))))}
              className="p-1 hover:text-amber-400"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Info strip */}
      {canvasInfo && (
        <div className="px-6 py-1 bg-slate-950 border-b border-slate-800 text-xs text-amber-300 font-mono flex items-center justify-between">
          <span>{canvasInfo}</span>
          <span className="text-slate-400">Template: {data.templateId} | Language: {data.language}</span>
        </div>
      )}

      {/* Inspector Workspace Viewport */}
      <div className="flex-1 overflow-auto p-8 flex justify-center items-start bg-slate-950/60">
        <div
          className="flex gap-8 transition-transform origin-top"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* 1. DOM Container View */}
          {(activeTab === 'dom' || activeTab === 'compare') && (
            <div className="flex flex-col items-center">
              <div className="mb-2 text-xs font-mono text-slate-400 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>EXACT EXPORT DOM CONTAINER (794px fixed)</span>
              </div>
              <div
                className="relative bg-white text-slate-900 shadow-2xl rounded-sm"
                style={{
                  width: '794px',
                  minHeight: '1123px',
                  outline: '2px dashed #3b82f6',
                  outlineOffset: '4px',
                }}
              >
                {/* Visual A4 Page 1 boundary line at 1123px */}
                <div
                  className="absolute left-0 right-0 pointer-events-none z-30"
                  style={{
                    top: '1123px',
                    borderTop: '2px dashed #ef4444',
                  }}
                >
                  <span className="absolute -top-5 right-2 bg-red-600 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                    A4 Page 1 End (1123px)
                  </span>
                </div>

                <div ref={domContainerRef} style={{ width: '794px', minHeight: '1123px' }}>
                  <TemplateRenderer data={data} />
                </div>
              </div>
            </div>
          )}

          {/* 2. Rendered Canvas View */}
          {(activeTab === 'canvas' || activeTab === 'compare') && (
            <div className="flex flex-col items-center">
              <div className="mb-2 text-xs font-mono text-slate-400 flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span>HTML2CANVAS RASTER OUTPUT (What user downloads)</span>
              </div>
              {canvasDataUrl ? (
                <div
                  className="bg-white shadow-2xl rounded-sm"
                  style={{
                    width: '794px',
                    outline: '2px dashed #10b981',
                    outlineOffset: '4px',
                  }}
                >
                  <img
                    src={canvasDataUrl}
                    alt="Exported Canvas Preview"
                    style={{ width: '794px', display: 'block' }}
                  />
                </div>
              ) : (
                <div
                  className="w-[794px] h-[1123px] flex flex-col items-center justify-center border-2 border-dashed border-slate-700 bg-slate-900/50 rounded-lg text-slate-400 text-sm gap-3"
                >
                  <Sparkles className="w-8 h-8 text-amber-500/70" />
                  <p>Click "Render Canvas Now" above to capture live raster output.</p>
                  <Button size="sm" variant="gold" onClick={handleRenderCanvas} isLoading={isRenderingCanvas}>
                    Render Canvas Now
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
