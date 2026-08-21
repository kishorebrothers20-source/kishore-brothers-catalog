import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  icon,
  className,
  ...props
}: BadgeProps) {
  const variants = {
    primary:
      'bg-[#E8F5F1] text-[#0B6E4F] border-[#0B6E4F]/25',
    secondary:
      'bg-[#F4F8FB] text-slate-700 border-[#E2ECF3]',
    accent:
      'bg-[#EBF5FB] text-[#2D9CDB] border-[#2D9CDB]/30',
    info:
      'bg-[#EBF5FB] text-[#2D9CDB] border-[#2D9CDB]/30',
    success:
      'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning:
      'bg-amber-50 text-amber-900 border-amber-200',
    danger:
      'bg-rose-50 text-rose-800 border-rose-200',
    outline:
      'bg-white text-slate-700 border-slate-300',
  };

  const dotColors = {
    primary: 'bg-[#0B6E4F]',
    secondary: 'bg-slate-400',
    accent: 'bg-[#2D9CDB]',
    info: 'bg-[#2D9CDB]',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    outline: 'bg-slate-400',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] font-semibold rounded-md gap-1',
    md: 'px-2.5 py-1 text-xs font-semibold rounded-full gap-1.5',
    lg: 'px-3 py-1.5 text-xs font-bold rounded-full gap-2',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center border transition-colors select-none w-fit',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse', dotColors[variant])} />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
