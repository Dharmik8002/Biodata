import React from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  optional?: boolean;
  currentLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      maxLength,
      optional,
      currentLength,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const count = currentLength ?? (typeof value === 'string' ? value.length : 0);

    return (
      <div className="w-full text-left space-y-1.5">
        <div className="flex justify-between items-center text-xs font-medium text-slate-700">
          {label && (
            <label htmlFor={textareaId}>
              {label}
              {!optional && props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {maxLength && (
            <span
              className={cn(
                'text-[11px] font-mono',
                count > maxLength ? 'text-red-500 font-semibold' : 'text-slate-400'
              )}
            >
              {count} / {maxLength}
            </span>
          )}
        </div>

        <textarea
          id={textareaId}
          ref={ref}
          value={value}
          maxLength={maxLength}
          rows={3}
          className={cn(
            'w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder:text-slate-400',
            'focus:outline-none focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition-colors resize-y',
            'disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />

        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-slate-500">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
