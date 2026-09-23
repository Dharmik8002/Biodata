import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'success';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'secondary',
  children,
  ...props
}) => {
  const variants = {
    primary: 'bg-red-100 text-red-900 border-red-200',
    secondary: 'bg-slate-100 text-slate-700 border-slate-200',
    gold: 'bg-amber-100 text-amber-900 border-amber-300',
    outline: 'border border-slate-300 text-slate-700 bg-transparent',
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn('bg-white rounded-xl border border-slate-200/80 shadow-xs p-5', className)}
      {...props}
    >
      {children}
    </div>
  );
};
