import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  icon,
  action,
  className,
  ...props
}: SectionHeadingProps) {
  const alignment = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto max-w-2xl',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div
      className={cn('flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4', className)}
      {...props}
    >
      <div className={cn('flex flex-col space-y-2', alignment[align])}>
        {eyebrow && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#0B6E4F] bg-[#E8F5F1] border border-[#0B6E4F]/20 w-fit">
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span>{eyebrow}</span>
          </span>
        )}

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {title}
        </h2>

        {description && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>

      {action && <div className="flex-shrink-0 pt-2 md:pt-0">{action}</div>}
    </div>
  );
}
