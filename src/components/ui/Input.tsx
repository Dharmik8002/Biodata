import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  optional?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftAddon,
      rightAddon,
      optional,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full text-left space-y-1.5">
        {label && (
          <div className="flex justify-between items-center text-xs font-medium text-slate-700">
            <label htmlFor={inputId}>
              {label}
              {!optional && props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {optional && <span className="text-slate-400 font-normal text-[11px]">(Optional)</span>}
          </div>
        )}

        <div className="relative flex items-center">
          {leftAddon && (
            <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center">
              {leftAddon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder:text-slate-400',
              'focus:outline-none focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition-colors',
              'disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              leftAddon && 'pl-9',
              rightAddon && 'pr-9',
              className
            )}
            {...props}
          />
          {rightAddon && (
            <div className="absolute right-3 text-slate-400 pointer-events-none flex items-center">
              {rightAddon}
            </div>
          )}
        </div>

        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-slate-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
