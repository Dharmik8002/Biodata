import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface ExportProgressCallback {
  (status: string): void;
}

export async function exportBiodataToPdf(
  element: HTMLElement,
  filename: string,
  onProgress?: ExportProgressCallback
): Promise<boolean> {
  try {
    onProgress?.('Preparing high-resolution document...');

    // Save previous transform/zoom if any
    const originalTransform = element.style.transform;
    const originalTransformOrigin = element.style.transformOrigin;
    
    // Reset transform for accurate measurement and capture
    element.style.transform = 'none';
    element.style.transformOrigin = 'top left';

    onProgress?.('Rendering layout...');

    // Wait a brief moment for fonts and images to settle
    await new Promise((resolve) => setTimeout(resolve, 200));

    const canvas = await html2canvas(element, {
      scale: 2.5, // 2.5x high-res DPI
      useCORS: true,
      logging: false,
      backgroundColor: null,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    // Restore original transform
    element.style.transform = originalTransform;
    element.style.transformOrigin = originalTransformOrigin;

    onProgress?.('Generating PDF pages...');

    // A4 dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate height in mm corresponding to canvas aspect ratio
    const imgHeightMm = (canvasHeight * pdfWidth) / canvasWidth;

    if (imgHeightMm <= pdfHeight + 5) {
      // Single Page Fits
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, Math.min(imgHeightMm, pdfHeight), undefined, 'FAST');
    } else {
      // Multi-Page Splitting
      let remainingHeightMm = imgHeightMm;
      let positionMm = 0;
      let pageIndex = 0;

      // Create temporary canvas slice for each A4 page
      const pageHeightPx = Math.floor((canvasWidth * pdfHeight) / pdfWidth);

      while (positionMm < canvasHeight) {
        if (pageIndex > 0) {
          pdf.addPage('a4', 'portrait');
        }

        const sliceHeightPx = Math.min(pageHeightPx, canvasHeight - positionMm);
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        pageCanvas.height = pageHeightPx;
        const pageCtx = pageCanvas.getContext('2d');

        if (pageCtx) {
          // Fill background white
          pageCtx.fillStyle = '#ffffff';
          pageCtx.fillRect(0, 0, canvasWidth, pageHeightPx);

          pageCtx.drawImage(
            canvas,
            0,
            positionMm,
            canvasWidth,
            sliceHeightPx,
            0,
            0,
            canvasWidth,
            sliceHeightPx
          );

          const pageData = pageCanvas.toDataURL('image/jpeg', 0.95);
          pdf.addImage(pageData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
        }

        positionMm += pageHeightPx;
        pageIndex++;
      }
    }

    onProgress?.('Saving file...');
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}
