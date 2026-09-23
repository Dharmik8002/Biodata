import React from 'react';
import { Badge } from '../components/ui/Badge';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <div className="text-center space-y-3">
        <Badge variant="secondary">Terms of Service</Badge>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 font-cinzel">
          Terms & Conditions
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Clear, simple, and transparent conditions for using the VivahBio platform.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-xs space-y-6 text-slate-700 leading-relaxed text-sm">
        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-cinzel">1. Service Description</h2>
          <p>
            VivahBio provides browser-based tools allowing users to enter personal information, select design layouts, preview documents, and export matrimonial biodatas in PDF and image formats.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-cinzel">2. User Responsibility</h2>
          <p>
            Users are solely responsible for the truthfulness, accuracy, and legality of the personal, educational, family, and astrological details they enter. VivahBio does not verify or validate user claims.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-cinzel">3. Intellectual Property</h2>
          <p>
            The layout designs, templates, SVGs, and branding of VivahBio are protected by copyright. You may freely use and distribute your generated biodata documents for personal matrimonial purposes. Commercial resale of VivahBio template assets or code is strictly prohibited.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-cinzel">4. Disclaimer of Warranty</h2>
          <p>
            VivahBio is provided on an "as-is" and "as-available" basis without warranties of any kind. We do not guarantee marriage proposals, horoscope compatibility, or matrimonial matchmaking outcomes.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
          Last revised: September 2026. For legal inquiries, contact <a href="mailto:legal@vivahbio.com" className="text-red-900 font-medium underline">legal@vivahbio.com</a>.
        </div>
      </div>
    </div>
  );
};
