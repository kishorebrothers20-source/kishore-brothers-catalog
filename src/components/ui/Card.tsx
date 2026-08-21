import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'bordered' | 'accent' | 'primary';
  hoverable?: boolean;
}

export function Card({
  children,
  variant = 'default',
  hoverable = false,
  className,
  ...props
}: CardProps) {
  const variants = {
    default:
      'bg-white border border-[#E2ECF3] shadow-[0_8px_24px_-4px_rgba(11,110,79,0.06)]',
    flat:
      'bg-[#F4F8FB] border border-[#E2ECF3]',
    bordered:
      'bg-white border-2 border-[#E2ECF3]',
    accent:
      'bg-gradient-to-br from-white to-[#EBF5FB] border border-[#2D9CDB]/20 shadow-[0_8px_24px_-4px_rgba(45,156,219,0.12)]',
    primary:
      'bg-gradient-to-br from-white to-[#E8F5F1] border border-[#0B6E4F]/20 shadow-[0_8px_24px_-4px_rgba(11,110,79,0.12)]',
  };

  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300 relative overflow-hidden',
        variants[variant],
        hoverable &&
          'hover:-translate-y-1 hover:shadow-[0_20px_40px_-6px_rgba(11,110,79,0.12)] hover:border-[#0B6E4F]/40 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4 space-y-1.5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-lg font-bold text-slate-900 tracking-tight leading-snug', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-xs text-slate-500 leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mt-6 pt-4 border-t border-[#E2ECF3] flex items-center justify-between', className)}
      {...props}
    >
      {children}
    </div>
  );
}
