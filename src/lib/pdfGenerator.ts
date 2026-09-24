import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BiodataData } from '../types/biodata';
import { TemplateRenderer } from '../components/templates/TemplateRenderer';
import { formatDownloadFilename } from './utils';
import { ensureCanvasPatternSafety } from './canvasPolyfill';
import { ensureAllFontsLoaded } from './fontLoader';

export interface PDFExportOptions {
  data: BiodataData;
  onProgress?: (status: string) => void;
}

export interface PDFExportResult {
  success: boolean;
  filename: string;
  error?: string;
}

/**
 * Generates and downloads a real, professional A4 Marriage Biodata PDF.
 * Uses an isolated off-screen container to guarantee:
 * - 1:1 visual match with live preview & active template
 * - Independent of current screen size or whether the user is on mobile "Edit" tab
 * - Correct Unicode rendering for English, Hindi, and Gujarati
 * - Intelligent A4 page break handling (210mm x 297mm)
 */
export async function generateBiodataPdf({
  data,
  onProgress,
}: PDFExportOptions): Promise<PDFExportResult> {
  const filename = formatDownloadFilename(data.fullName, 'pdf');
  ensureCanvasPatternSafety();

  // Basic validation
  if (!data.fullName || data.fullName.trim().length < 2) {
    return {
      success: false,
      filename,
      error: 'Please enter a valid full name before downloading the biodata.',
    };
  }

  // Create isolated off-screen container mounted at (0,0) behind viewport with fixed A4 desktop width (794px)
  // NEVER use left: -99999px because html2canvas uses bounding rect left/top which causes blank/black exports!
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
  container.className = 'biodata-pdf-offscreen-render';

  document.body.appendChild(container);

  const root = createRoot(container);

  try {
    onProgress?.('Preparing document layout...');

    // Render the active template with current user data into the isolated container
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
      // Wait for React to mount and layout
      setTimeout(resolve, 200);
    });

    onProgress?.('Loading fonts and images...');
    await ensureAllFontsLoaded();

    // 2. Ensure all images inside the container are fully loaded
    const images = Array.from(container.querySelectorAll('img'));
    if (images.length > 0) {
      await Promise.all(
        images.map((img) => {
          if (img.complete && img.naturalWidth > 0) return Promise.resolve();
          return new Promise<void>((res) => {
            img.onload = () => res();
            img.onerror = () => res();
            setTimeout(res, 2000); // 2s timeout safety
          });
        })
      );
    }

    // Additional settling time
    await new Promise((resolve) => setTimeout(resolve, 150));

    onProgress?.('Calculating A4 page breaks...');

    // Smart Section Page-Break Optimization:
    // A4 height in pixels at 794px width is ~1123px.
    // Scan sections with [data-pdf-section] to avoid awkward header splits at page bottoms.
    const a4PageHeightPx = 1123;
    const sections = Array.from(container.querySelectorAll<HTMLElement>('[data-pdf-section]'));

    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const offsetTop = rect.top - containerRect.top;
      const height = rect.height;

      // Check which page boundary this section lies near
      const pageIndex = Math.floor(offsetTop / a4PageHeightPx);
      const pageBottomPx = (pageIndex + 1) * a4PageHeightPx;
      const distanceToBottom = pageBottomPx - offsetTop;

      // If a section starts within 85px before page bottom and would be awkwardly split, push it to next page
      if (distanceToBottom < 85 && distanceToBottom > 0 && height > 60) {
        sec.style.marginTop = `${distanceToBottom + 20}px`;
      }
    });

    onProgress?.('Rendering high-DPI document...');

    const totalHeight = Math.max(container.scrollHeight, 1123);

    // Capture off-screen DOM with high scale (2.5x)
    const canvas = await html2canvas(container, {
      scale: 2.5,
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
        // Reset cloned container position so it renders cleanly at top-left of the clone canvas
        clonedElement.style.position = 'static';
        clonedElement.style.left = '0px';
        clonedElement.style.top = '0px';
        clonedElement.style.margin = '0px';
        clonedElement.style.zIndex = '1';

        // Copy styles & link tags from main document head to cloned document
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

        // Await fonts ready in cloned document
        if (clonedDoc.fonts && clonedDoc.fonts.ready) {
          try {
            await clonedDoc.fonts.ready;
          } catch (e) {}
        }

        // Small delay for layout metrics to settle
        await new Promise((resolve) => setTimeout(resolve, 200));

        // Color normalization fallback for modern CSS color formats (oklab, oklch)
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const elements = [clonedElement, ...clonedElement.querySelectorAll('*')];
            elements.forEach((el: any) => {
              if (!el.style) return;
              const computed = window.getComputedStyle(el);
              ['color', 'backgroundColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'outlineColor'].forEach((prop) => {
                const val = computed.getPropertyValue(prop);
                if (val && (val.includes('okl') || val.includes('lab') || val.includes('lch'))) {
                  try {
                    ctx.fillStyle = '#000000';
                    ctx.fillStyle = val;
                    el.style.setProperty(prop, ctx.fillStyle, 'important');
                  } catch (e) {}
                }
              });
            });
          }
        } catch (e) {}
      },
    });

    onProgress?.('Generating PDF pages...');

    // A4 dimensions in mm
    const pdfWidthMm = 210;
    const pdfHeightMm = 297;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Height of one A4 page in canvas pixels
    const a4SliceHeightPx = Math.floor((canvasWidth * pdfHeightMm) / pdfWidthMm);

    if (canvasHeight <= a4SliceHeightPx + 40) {
      // Single Page Fits
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      pdf.addImage(
        imgData,
        'JPEG',
        0,
        0,
        pdfWidthMm,
        pdfHeightMm,
        undefined,
        'FAST'
      );
    } else {
      // Multi-Page Splitting:
      // Slice canvas into A4 height slices without clipping
      let currentOffsetPx = 0;
      let pageNumber = 0;

      while (currentOffsetPx < canvasHeight) {
        if (pageNumber > 0) {
          pdf.addPage('a4', 'portrait');
        }

        const remainingPx = canvasHeight - currentOffsetPx;
        const currentSliceHeight = Math.min(a4SliceHeightPx, remainingPx);

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        pageCanvas.height = a4SliceHeightPx;
        const pageCtx = pageCanvas.getContext('2d');

        if (pageCtx) {
          pageCtx.fillStyle = '#ffffff';
          pageCtx.fillRect(0, 0, canvasWidth, a4SliceHeightPx);

          pageCtx.drawImage(
            canvas,
            0,
            currentOffsetPx,
            canvasWidth,
            currentSliceHeight,
            0,
            0,
            canvasWidth,
            currentSliceHeight
          );

          const pageData = pageCanvas.toDataURL('image/jpeg', 0.98);
          pdf.addImage(pageData, 'JPEG', 0, 0, pdfWidthMm, pdfHeightMm, undefined, 'FAST');
        }

        currentOffsetPx += a4SliceHeightPx;
        pageNumber++;
      }
    }

    onProgress?.('Saving PDF file...');
    pdf.save(filename);

    return {
      success: true,
      filename,
    };
  } catch (error: any) {
    console.error('Failed to generate PDF:', error);
    return {
      success: false,
      filename,
      error: error?.message || 'Unable to generate the PDF. Please try again.',
    };
  } finally {
    // Clean up temporary DOM element
    try {
      root.unmount();
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    } catch (cleanupError) {
      console.warn('Error during DOM cleanup:', cleanupError);
    }
  }
}
