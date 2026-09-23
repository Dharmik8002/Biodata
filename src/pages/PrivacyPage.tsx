import React from 'react';
import { Badge } from '../components/ui/Badge';
import { ShieldCheck, Lock, EyeOff, HardDrive, CheckCircle } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <div className="text-center space-y-3">
        <Badge variant="success">Zero Server Storage Guarantee</Badge>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 font-cinzel">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          We believe matrimonial biodatas are deeply private family documents. Here is our unwavering commitment to your privacy.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-xs space-y-8 text-slate-700 leading-relaxed text-sm">
        {/* Key Guarantee Box */}
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span>100% Client-Side Processing Architecture</span>
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed">
            VivahBio has no database backend that stores your name, photos, family members, or contact numbers. Every single byte you enter and every photo you upload is manipulated directly inside your device's web browser using JavaScript and Canvas technologies.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-cinzel flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-amber-700" /> 1. How Local Draft Storage Operates
          </h2>
          <p>
            When you click "Save Draft" in the builder, your data is written solely to your own browser's <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs">window.localStorage</code>. This data never traverses the internet, cannot be seen by VivahBio developers, and is never shared with third parties.
          </p>
          <p>
            You can clear your local draft anytime by clicking "Clear Saved Draft" or "Delete All My Data" in the builder or download step.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-cinzel flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-700" /> 2. Photo Handling & Security
          </h2>
          <p>
            When you select a portrait image to upload, your photo is decoded into local memory using the HTML5 FileReader API. The interactive cropping and framing tools render the image on an HTML5 canvas element inside your browser. No copy of your photo is ever sent to any remote server or third-party image hosting service.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-cinzel flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-amber-700" /> 3. Contact & Salary Visibility Controls
          </h2>
          <p>
            We provide granular visibility switches for sensitive fields:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-xs">
            <li><strong>Annual Income & Employer:</strong> Can be hidden from the final document.</li>
            <li><strong>Phone Number & Email:</strong> Can be toggled on/off independently.</li>
            <li><strong>Residential Address:</strong> Set to hidden by default so full street addresses are not inadvertently exposed.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-cinzel flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-amber-700" /> 4. No Accounts, No Spam
          </h2>
          <p>
            We do not ask for your phone number or email address to generate or download a biodata. Because we do not collect contact details, you will never receive promotional emails, marketing SMS, or unsolicited matrimonial calls from us.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
          Last updated: September 2026. For questions regarding our privacy architecture, contact <a href="mailto:privacy@vivahbio.com" className="text-red-900 font-medium underline">privacy@vivahbio.com</a>.
        </div>
      </div>
    </div>
  );
};
