import html2canvas from 'html2canvas';

export async function exportBiodataToImage(
  element: HTMLElement,
  filename: string,
  format: 'png' | 'jpeg' = 'png',
  quality: number = 0.95
): Promise<boolean> {
  try {
    const originalTransform = element.style.transform;
    const originalTransformOrigin = element.style.transformOrigin;
    
    element.style.transform = 'none';
    element.style.transformOrigin = 'top left';

    // Wait slightly for any font rendering settle
    await new Promise((resolve) => setTimeout(resolve, 200));

    const canvas = await html2canvas(element, {
      scale: 2.2, // crisp high resolution for WhatsApp / Mobile sharing
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    element.style.transform = originalTransform;
    element.style.transformOrigin = originalTransformOrigin;

    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const dataUrl = canvas.toDataURL(mimeType, quality);

    // Trigger download
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error('Error generating image:', error);
    return false;
  }
}
