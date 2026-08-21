import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-xl active:scale-[0.98] select-none';

    const variants = {
      primary:
        'bg-[#0B6E4F] hover:bg-[#074B36] text-white shadow-md shadow-[#0B6E4F]/20 focus:ring-[#0B6E4F]',
      secondary:
        'bg-[#F4F8FB] hover:bg-[#E2ECF3] text-slate-800 border border-[#E2ECF3] shadow-sm focus:ring-slate-300',
      accent:
        'bg-[#2D9CDB] hover:bg-[#1E7EBA] text-white shadow-md shadow-[#2D9CDB]/20 focus:ring-[#2D9CDB]',
      outline:
        'bg-white hover:bg-[#F4F8FB] text-[#0B6E4F] border border-[#0B6E4F]/30 hover:border-[#0B6E4F] shadow-sm focus:ring-[#0B6E4F]',
      ghost:
        'bg-transparent hover:bg-[#F4F8FB] text-slate-700 hover:text-[#0B6E4F] focus:ring-slate-300',
      danger:
        'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 focus:ring-rose-500',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs font-semibold rounded-lg gap-1.5',
      md: 'px-4.5 py-2.5 text-sm font-semibold rounded-xl gap-2',
      lg: 'px-6 py-3.5 text-base font-semibold rounded-2xl gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
