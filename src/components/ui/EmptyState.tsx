import React from 'react';
import { cn } from '@/lib/utils';
import { Pill, FileQuestion, SearchX, AlertCircle } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/Button';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionVariant?: ButtonProps['variant'];
  type?: 'search' | 'products' | 'general' | 'error';
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionVariant = 'primary',
  type = 'general',
  className,
  ...props
}: EmptyStateProps) {
  const defaults = {
    search: {
      icon: <SearchX className="w-8 h-8 text-[#2D9CDB]" />,
      title: 'No Matching Formulations Found',
      description: 'We could not find any active pharmaceutical products matching your search criteria or filter selections.',
    },
    products: {
      icon: <Pill className="w-8 h-8 text-[#0B6E4F]" />,
      title: 'No Products Available',
      description: 'There are currently no products listed in this therapeutic section.',
    },
    general: {
      icon: <FileQuestion className="w-8 h-8 text-slate-400" />,
      title: 'No Data Available',
      description: 'The requested information or records are currently unavailable.',
    },
    error: {
      icon: <AlertCircle className="w-8 h-8 text-rose-500" />,
      title: 'Unable to Load Data',
      description: 'An unexpected error occurred while loading this section. Please try again.',
    },
  };

  const currentIcon = icon || defaults[type].icon;
  const currentTitle = title || defaults[type].title;
  const currentDescription = description || defaults[type].description;

  return (
    <div
      className={cn(
        'bg-white border border-[#E2ECF3] rounded-3xl p-8 sm:p-12 text-center shadow-sm max-w-lg mx-auto flex flex-col items-center justify-center space-y-4 my-6',
        className
      )}
      {...props}
    >
      <div className="w-16 h-16 rounded-2xl bg-[#F4F8FB] border border-[#E2ECF3] flex items-center justify-center shadow-inner">
        {currentIcon}
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          {currentTitle}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          {currentDescription}
        </p>
      </div>

      {actionLabel && onAction && (
        <div className="pt-2">
          <Button variant={actionVariant} size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
