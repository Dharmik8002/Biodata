import React from 'react';

interface ExportFieldRowProps {
  label: string;
  value?: React.ReactNode;
  labelColor?: string;
  valueColor?: string;
  labelWidth?: string;
  className?: string;
  fullWidth?: boolean;
}

/**
 * Stable, non-responsive field row component for A4 biodata templates and export documents.
 * Uses an explicit CSS Grid (default 135px 1fr) to guarantee that:
 * 1. Labels and values NEVER overlap under any screen size or html2canvas metric calculation.
 * 2. Long text values wrap properly without overflowing or colliding.
 * 3. Empty or null values are automatically omitted (rendering nothing).
 */
export const ExportFieldRow: React.FC<ExportFieldRowProps> = ({
  label,
  value,
  labelColor = '#78350f',
  valueColor = '#1f2937',
  labelWidth = '135px',
  className = '',
  fullWidth = false,
}) => {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  return (
    <div
      className={`export-field-row ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: fullWidth ? '135px 1fr' : `${labelWidth} 1fr`,
        columnGap: '8px',
        alignItems: 'baseline',
        minWidth: 0,
        gridColumn: fullWidth ? '1 / -1' : undefined,
        fontSize: '12px',
        lineHeight: '1.6',
      }}
    >
      <span
        style={{
          fontWeight: 600,
          color: labelColor,
          wordBreak: 'normal',
          whiteSpace: 'nowrap',
          overflow: 'visible',
          lineHeight: '1.6',
        }}
      >
        {label}:
      </span>
      <span
        style={{
          color: valueColor,
          minWidth: 0,
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          overflow: 'visible',
          lineHeight: '1.6',
        }}
      >
        {value}
      </span>
    </div>
  );
};
