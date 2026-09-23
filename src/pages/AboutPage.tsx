import React from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ShieldCheck, Heart, Sparkles, Award, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <Badge variant="gold">Our Story & Mission</Badge>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 font-cinzel">
          About VivahBio
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Honoring sacred matrimonial traditions with world-class digital craftsmanship and uncompromising privacy.
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-xs space-y-8 text-slate-700 leading-relaxed text-sm">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-cinzel">
            The Tradition of the Indian Marriage Biodata
          </h2>
          <p>
            In Indian culture, marriage is not merely a union between two individuals—it is a sacred joining of two families, lineages, and shared values. For generations, the matrimonial biodata has served as the dignified introductory bridge between families, capturing one's ancestral roots, educational milestones, career endeavors, family background, and personal aspirations.
          </p>
          <p>
            Yet for years, creating an Indian marriage biodata meant struggling with dated word processors, distorted photo formats, misaligned columns, or sketchy websites that required login accounts and captured private family data.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-cinzel">
            Why We Built VivahBio
          </h2>
          <p>
            VivahBio was born out of a clear vision: to empower Indian families worldwide to create breathtaking, culturally sensitive, and print-ready marriage biodatas in minutes, without technical hurdles and without sacrificing their privacy.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60 space-y-1">
              <span className="font-bold text-amber-950 text-xs block">1. 100% Client-Side Privacy</span>
              <p className="text-xs text-slate-600">
                Your photos, salary, and home address are processed locally in your browser. We never upload your data to a remote server.
              </p>
            </div>
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60 space-y-1">
              <span className="font-bold text-amber-950 text-xs block">2. Cultural Nuance & Precision</span>
              <p className="text-xs text-slate-600">
                From Vedic Gotra and Manglik fields to Gujarati bandhani motifs and Sikh Anand Karaj styling, our designs reflect our diverse heritage.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-cinzel">
            Free For Everyone
          </h2>
          <p>
            Marriage is a sacred life milestone. VivahBio is provided completely free of charge. No payment gateways, no locked features, and no unwanted watermarks on your downloaded documents.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Built with care for families across India and the global diaspora.</span>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate('/create')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create Your Biodata Now
          </Button>
        </div>
      </div>
    </div>
  );
};
