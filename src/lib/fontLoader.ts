/**
 * Robust web font loader for VivahBio biodata export.
 * Actively loads and warms all Google Web Fonts and weights
 * used across the 12 templates before html2canvas captures the DOM.
 */
export async function ensureAllFontsLoaded(): Promise<void> {
  if (typeof document === 'undefined' || !document.fonts) {
    return;
  }

  const fontSpecs = [
    // Gujarati fonts
    '400 12px "Noto Sans Gujarati"',
    '500 12px "Noto Sans Gujarati"',
    '600 12px "Noto Sans Gujarati"',
    '700 12px "Noto Sans Gujarati"',
    '400 16px "Noto Sans Gujarati"',
    '600 16px "Noto Sans Gujarati"',
    '700 16px "Noto Sans Gujarati"',

    // Devanagari fonts
    '400 12px "Noto Sans Devanagari"',
    '500 12px "Noto Sans Devanagari"',
    '600 12px "Noto Sans Devanagari"',
    '700 12px "Noto Sans Devanagari"',
    '400 16px "Noto Sans Devanagari"',
    '600 16px "Noto Sans Devanagari"',
    '700 16px "Noto Sans Devanagari"',

    // Inter
    '300 12px Inter',
    '400 12px Inter',
    '500 12px Inter',
    '600 12px Inter',
    '700 12px Inter',

    // Cinzel
    '500 16px Cinzel',
    '600 16px Cinzel',
    '700 16px Cinzel',
    '800 24px Cinzel',

    // Playfair Display
    '400 14px "Playfair Display"',
    '500 16px "Playfair Display"',
    '600 16px "Playfair Display"',
    '700 20px "Playfair Display"',

    // Decorative fonts
    '400 12px Marcellus',
    '400 14px Marcellus',
    '400 14px "Rozha One"',
  ];

  try {
    await Promise.all(
      fontSpecs.map(async (spec) => {
        try {
          await document.fonts.load(spec);
        } catch {
          // Non-blocking fallback
        }
      })
    );

    if (document.fonts.ready) {
      await document.fonts.ready;
    }
  } catch (err) {
    console.warn('[fontLoader] Error loading fonts:', err);
  }
}
