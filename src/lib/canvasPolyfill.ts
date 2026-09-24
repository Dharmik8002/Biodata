/**
 * Guards CanvasRenderingContext2D.prototype.createPattern against 0-dimension canvas arguments
 * which can occur during subpixel rounding, CSS gradient rendering, or unrendered assets in html2canvas.
 */
export function ensureCanvasPatternSafety(targetWindow: any = typeof window !== 'undefined' ? window : null) {
  try {
    const Context2D = targetWindow?.CanvasRenderingContext2D;
    if (!Context2D || (Context2D.prototype as any).__patternSafetyInstalled) {
      return;
    }

    const originalCreatePattern = Context2D.prototype.createPattern;
    let fallbackPattern: CanvasPattern | null = null;

    Context2D.prototype.createPattern = function (
      image: CanvasImageSource,
      repetition: string | null
    ): CanvasPattern | null {
      const w = (image as any)?.width;
      const h = (image as any)?.height;

      if (!image || w === 0 || h === 0 || Math.floor(w) <= 0 || Math.floor(h) <= 0) {
        if (!fallbackPattern) {
          const dummy = (targetWindow.document || document).createElement('canvas');
          dummy.width = 1;
          dummy.height = 1;
          fallbackPattern = originalCreatePattern.call(this, dummy, 'no-repeat');
        }
        return fallbackPattern;
      }

      try {
        return originalCreatePattern.call(this, image, repetition);
      } catch (err) {
        if (!fallbackPattern) {
          const dummy = (targetWindow.document || document).createElement('canvas');
          dummy.width = 1;
          dummy.height = 1;
          fallbackPattern = originalCreatePattern.call(this, dummy, 'no-repeat');
        }
        return fallbackPattern;
      }
    };

    (Context2D.prototype as any).__patternSafetyInstalled = true;
  } catch (e) {
    console.warn('Could not install canvas pattern safety guard:', e);
  }
}
