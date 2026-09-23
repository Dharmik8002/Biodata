import React, { useState, useMemo } from 'react';
import { TEMPLATES, TEMPLATE_CATEGORIES } from '../data/templates';
import { SAMPLE_BIODATA } from '../data/sampleData';
import { BiodataData } from '../types/biodata';
import { BiodataDocument } from '../components/preview/BiodataDocument';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Search, Eye, Sparkles, Filter, Check, ArrowRight } from 'lucide-react';

interface TemplatesPageProps {
  currentTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  onNavigate: (path: string) => void;
  biodata: BiodataData;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({
  currentTemplateId,
  onSelectTemplate,
  onNavigate,
  biodata,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((t) => {
      const matchesCategory =
        selectedCategory === 'all' || t.category === selectedCategory;
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleUseTemplate = (templateId: string) => {
    onSelectTemplate(templateId);
    onNavigate('/create');
  };

  const previewData = previewTemplateId
    ? { ...(biodata.fullName ? biodata : SAMPLE_BIODATA), templateId: previewTemplateId }
    : SAMPLE_BIODATA;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="gold">12 Professional Designs</Badge>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 font-cinzel">
          Marriage Biodata Templates
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Choose from royal traditional, clean modern, graceful floral, and community-inspired designs. You can switch templates anytime without re-typing your details.
        </p>
      </div>

      {/* Filter Toolbar (Search + Category Tabs) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {TEMPLATE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-red-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-900/20 focus:border-red-900"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((tmpl) => {
          const isSelected = currentTemplateId === tmpl.id;
          return (
            <div
              key={tmpl.id}
              className={`bg-white rounded-2xl border overflow-hidden transition-all flex flex-col justify-between shadow-xs hover:shadow-xl ${
                isSelected
                  ? 'border-red-900 ring-2 ring-red-900/20'
                  : 'border-slate-200 hover:border-amber-300'
              }`}
            >
              {/* Card Banner */}
              <div
                className="h-44 p-5 relative flex flex-col justify-between overflow-hidden"
                style={{ backgroundColor: tmpl.accentColor }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: tmpl.secondaryColor, color: tmpl.accentColor }}
                  >
                    {tmpl.category}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-bold bg-white text-red-950 px-2.5 py-0.5 rounded-full shadow-xs">
                      ✓ Active Selection
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

                {/* Decorative Pill Bar */}
                <div className="flex justify-center">
                  <div
                    className="h-1 w-20 rounded-full"
                    style={{ backgroundColor: tmpl.secondaryColor }}
                  />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">{tmpl.name}</h4>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {tmpl.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {tmpl.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setPreviewTemplateId(tmpl.id)}
                    leftIcon={<Eye className="w-3.5 h-3.5 text-slate-600" />}
                  >
                    Full Preview
                  </Button>
                  <Button
                    variant={isSelected ? 'gold' : 'primary'}
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => handleUseTemplate(tmpl.id)}
                  >
                    {isSelected ? 'Continue' : 'Use Template'}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <p className="text-sm font-semibold text-slate-700">No templates match your search criteria.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Full Preview Modal */}
      {previewTemplateId && (
        <Modal
          isOpen={!!previewTemplateId}
          onClose={() => setPreviewTemplateId(null)}
          title={`Template Preview: ${TEMPLATES.find((t) => t.id === previewTemplateId)?.name}`}
          maxWidth="4xl"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs text-slate-500">
                {biodata.fullName ? 'Rendered with your personal details' : 'Rendered with sample data'}
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  handleUseTemplate(previewTemplateId);
                  setPreviewTemplateId(null);
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Customize with This Template
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
