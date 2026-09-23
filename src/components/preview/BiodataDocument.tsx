import React, { forwardRef } from 'react';
import { BiodataData } from '../../types/biodata';
import { TemplateRenderer } from '../templates/TemplateRenderer';

interface BiodataDocumentProps {
  data: BiodataData;
  className?: string;
}

export const BiodataDocument = forwardRef<HTMLDivElement, BiodataDocumentProps>(
  ({ data, className }, ref) => {
    return (
      <div
        id="biodata-print-document"
        ref={ref}
        className={`w-[794px] min-h-[1123px] bg-white text-slate-800 shadow-xl print-page ${className || ''}`}
        style={{
          boxSizing: 'border-box',
        }}
      >
        <TemplateRenderer data={data} />
      </div>
    );
  }
);

BiodataDocument.displayName = 'BiodataDocument';
