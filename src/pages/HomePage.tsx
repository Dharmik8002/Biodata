import React, { useState } from 'react';
import { TEMPLATES } from '../data/templates';
import { SAMPLE_BIODATA } from '../data/sampleData';
import { BiodataDocument } from '../components/preview/BiodataDocument';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  Palette,
  Eye,
  Languages,
  CheckCircle,
  Download,
  Share2,
  Users,
  Camera,
  Star,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectTemplate: (templateId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectTemplate }) => {
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);

  const previewData = previewTemplateId
    ? { ...SAMPLE_BIODATA, templateId: previewTemplateId }
    : SAMPLE_BIODATA;

  const handleUseTemplate = (templateId: string) => {
    onSelectTemplate(templateId);
    onNavigate('/create');
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-amber-200/50 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-semibold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>#1 Indian Marriage Biodata Maker • 100% Free & Private</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 font-cinzel leading-tight sm:leading-tight">
                Create a Beautiful <br />
                <span className="text-red-950 underline decoration-amber-500/60 decoration-wavy decoration-2">
                  Marriage Biodata
                </span>{' '}
                in Minutes
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Design your perfect matrimonial profile with elegant traditional and modern templates, personalized family details, and instant print-ready PDF downloads.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onNavigate('/create')}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="w-full sm:w-auto shadow-md"
                >
                  Create My Biodata
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('/templates')}
                  leftIcon={<Palette className="w-5 h-5 text-amber-700" />}
                  className="w-full sm:w-auto"
                >
                  Explore 12 Templates
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-left">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>No Account</span>
                  </div>
                  <p className="text-[11px] text-slate-500">100% browser private</p>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Languages className="w-4 h-4 text-amber-600" />
                    <span>3 Languages</span>
                  </div>
                  <p className="text-[11px] text-slate-500">English, Hindi, Gujarati</p>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Download className="w-4 h-4 text-red-900" />
                    <span>Print Ready</span>
                  </div>
                  <p className="text-[11px] text-slate-500">High-DPI A4 PDF export</p>
                </div>
              </div>
            </div>

            {/* Right Mockup Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group cursor-pointer" onClick={() => onNavigate('/create')}>
                {/* Decorative Background Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-red-800 to-amber-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />

                {/* Scaled Realistic Mockup */}
                <div className="relative w-[340px] sm:w-[380px] h-[480px] sm:h-[530px] overflow-hidden rounded-2xl shadow-2xl border-4 border-white bg-white transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="transform scale-[0.45] sm:scale-[0.48] origin-top-left pointer-events-none select-none">
                    <BiodataDocument data={SAMPLE_BIODATA} />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-center flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[11px] text-amber-300 font-semibold block">Interactive Sample</span>
                      <span className="text-xs font-bold">Royal Maroon & Gold</span>
                    </div>
                    <Button variant="gold" size="sm" className="text-xs">
                      Customize This
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (4 Simple Steps) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <Badge variant="gold">Simple & Effortless</Badge>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-cinzel">
            How VivahBio Works
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Create and download your matrimonial profile in four easy, transparent steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Fill in Details',
              desc: 'Enter your personal, educational, family, and optional horoscope information in our step-by-step form.',
              icon: FileText,
            },
            {
              step: '02',
              title: 'Choose Template',
              desc: 'Select from 12 culturally tailored, elegant traditional or modern biodata designs.',
              icon: Palette,
            },
            {
              step: '03',
              title: 'Live Preview',
              desc: 'Watch the A4 document update in real time with your photo, formatting, and visibility settings.',
              icon: Eye,
            },
            {
              step: '04',
              title: 'Download & Share',
              desc: 'Instantly download as an A4 PDF for printing or high-res PNG image for WhatsApp sharing.',
              icon: Download,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative"
              >
                <span className="font-cinzel text-3xl font-bold text-amber-500/30 absolute top-4 right-4">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-amber-100/70 text-amber-900 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED TEMPLATES GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <Badge variant="primary">Design Collection</Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-cinzel mt-2">
              Featured Biodata Templates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Carefully designed with Indian cultural heritage and modern aesthetics in mind.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => onNavigate('/templates')}
            rightIcon={<ChevronRight className="w-4 h-4" />}
          >
            View All 12 Templates
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.slice(0, 6).map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              {/* Template Color Banner & Preview Thumbnail */}
              <div
                className="h-44 p-6 relative flex flex-col justify-between overflow-hidden"
                style={{ backgroundColor: tmpl.accentColor }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: tmpl.secondaryColor, color: tmpl.accentColor }}
                  >
                    {tmpl.category}
                  </span>
                  {tmpl.isPopular && (
                    <span className="text-[10px] font-bold bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full">
                      ★ Popular
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <h3
                    className="font-cinzel text-xl font-bold tracking-wider"
                    style={{ color: tmpl.secondaryColor }}
                  >
                    {tmpl.name}
                  </h3>
                </div>

                <div className="flex justify-center">
                  <div className="h-1 w-16 rounded-full" style={{ backgroundColor: tmpl.secondaryColor }} />
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{tmpl.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {tmpl.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setPreviewTemplateId(tmpl.id)}
                    leftIcon={<Eye className="w-3.5 h-3.5 text-slate-600" />}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => handleUseTemplate(tmpl.id)}
                  >
                    Use Template
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. KEY FEATURES SECTION */}
      <section className="bg-amber-50/50 py-16 border-y border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <Badge variant="gold">Why Choose VivahBio</Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-cinzel">
              Engineered for Indian Matrimonial Needs
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Everything you need to create a dignified, trustworthy, and impressive marriage profile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Professional Biodata Designs',
                desc: '12 distinct layouts crafted by designers with harmonious typography and borders.',
                icon: Palette,
              },
              {
                title: 'Live Real-Time Preview',
                desc: 'See instant changes as you type, with exact A4 proportions and zoom controls.',
                icon: Eye,
              },
              {
                title: 'Integrated Photo Cropper',
                desc: 'Upload portrait, pan, zoom, and choose circular, rounded, or rectangular frames.',
                icon: Camera,
              },
              {
                title: 'Horoscope & Family Fields',
                desc: 'Vedic Kundali, Rashi, Nakshatra, Gotra, Manglik, and dynamic family member rows.',
                icon: Users,
              },
              {
                title: 'Gujarati, Hindi & English Support',
                desc: 'Document labels and religious headers rendered in native Indian Unicode fonts.',
                icon: Languages,
              },
              {
                title: 'Print-Ready PDF & WhatsApp Image',
                desc: 'Download clean vector-like A4 PDFs or optimized JPEG/PNG images with dynamic names.',
                icon: Share2,
              },
              {
                title: 'No Account or Signup Required',
                desc: 'Get straight to building. No passwords, no email verification, no paywalls.',
                icon: CheckCircle,
              },
              {
                title: '100% Client-Side Privacy',
                desc: 'Your photos and details stay strictly inside your browser. Zero server tracking.',
                icon: ShieldCheck,
              },
              {
                title: 'Local Draft Recovery',
                desc: 'Save drafts safely on your device. Restore or permanently delete them anytime.',
                icon: FileText,
              },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-2 hover:border-amber-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-red-900 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. PRIVACY GUARANTEE BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-red-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-amber-500/30 flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div className="space-y-2 text-center md:text-left flex-1">
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-200">
              Your Personal Data Never Leaves Your Browser
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We understand the sensitive nature of marriage biodatas. VivahBio processes photos, contact details, and family history 100% client-side. We do not store, view, or sell your personal information.
            </p>
          </div>
          <Button
            variant="gold"
            onClick={() => onNavigate('/privacy')}
            className="shrink-0 text-xs font-semibold"
          >
            Read Privacy Guarantee
          </Button>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <Badge variant="secondary">Common Questions</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-cinzel">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Is VivahBio completely free to use?',
              a: 'Yes, VivahBio is 100% free with no hidden charges, subscriptions, or watermarks on downloaded PDFs.',
            },
            {
              q: 'Do I need to create an account to download my biodata?',
              a: 'No. You do not need an account or email address. You can fill your details and download your PDF instantly.',
            },
            {
              q: 'Are my photo and personal details stored on your server?',
              a: 'No. All processing occurs locally in your web browser. Nothing is uploaded to any server or cloud database.',
            },
            {
              q: 'Can I create a biodata in Gujarati or Hindi?',
              a: 'Yes. You can choose Gujarati or Hindi as the document language. Field labels and religious headings will be rendered in authentic Indian script fonts.',
            },
            {
              q: 'What if I do not want to enter horoscope or partner preference details?',
              a: 'Both horoscope and partner preferences are completely optional and can be turned off with a single toggle switch.',
            },
            {
              q: 'Can I print the downloaded PDF directly?',
              a: 'Yes! The PDF is formatted specifically for standard A4 paper dimensions and is ready for high-resolution printing.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-1.5"
            >
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
                {item.q}
              </h3>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="bg-gradient-to-r from-red-950 via-amber-900 to-red-950 text-white py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-amber-200">
            Ready to Create Your Marriage Biodata?
          </h2>
          <p className="text-xs sm:text-sm text-amber-100/80 max-w-lg mx-auto">
            Join thousands of prospective brides and grooms who have designed their matrimonial biodata with VivahBio.
          </p>
          <div className="pt-2">
            <Button
              variant="gold"
              size="lg"
              onClick={() => onNavigate('/create')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="font-bold shadow-lg"
            >
              Start Creating Now — It's Free
            </Button>
          </div>
        </div>
      </section>

      {/* Full Preview Modal for Template Cards */}
      {previewTemplateId && (
        <Modal
          isOpen={!!previewTemplateId}
          onClose={() => setPreviewTemplateId(null)}
          title={`Template Preview: ${TEMPLATES.find((t) => t.id === previewTemplateId)?.name}`}
          maxWidth="4xl"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-full flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  handleUseTemplate(previewTemplateId);
                  setPreviewTemplateId(null);
                }}
              >
                Use This Template
              </Button>
            </div>

            <div className="overflow-auto max-h-[65vh] w-full flex justify-center p-4 bg-slate-100 rounded-xl">
              <div className="transform scale-[0.65] origin-top">
                <BiodataDocument data={previewData} />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
