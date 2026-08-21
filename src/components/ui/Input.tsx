import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, leftIcon, rightIcon, className, id, required, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
            {label}
            {required && <span className="text-rose-500 ml-0.5">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </span>
          )}

          <input
            id={inputId}
            ref={ref}
            required={required}
            className={cn(
              'w-full py-2.5 bg-white border border-[#E2ECF3] rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:border-[#0B6E4F] focus:ring-2 focus:ring-[#0B6E4F]/20 shadow-sm disabled:bg-[#F4F8FB] disabled:cursor-not-allowed',
              leftIcon ? 'pl-10' : 'pl-3.5',
              rightIcon ? 'pr-10' : 'pr-3.5',
              error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3.5 text-slate-400 flex items-center justify-center">
              {rightIcon}
            </span>
          )}
        </div>

        {error ? (
          <p className="text-[11px] font-medium text-rose-600 animate-in fade-in duration-150">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-[11px] text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
