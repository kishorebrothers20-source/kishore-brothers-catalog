'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search, X, Loader2 } from 'lucide-react';

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showKbdShortcut?: boolean;
}

export function SearchBar({
  placeholder = 'Search formulations by INN name, active ingredient, or CAS number...',
  value: controlledValue,
  onChange,
  onSearch,
  isLoading = false,
  size = 'md',
  className,
  showKbdShortcut = true,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('');
  const isControlled = controlledValue !== undefined;
  const searchTerm = isControlled ? controlledValue : internalValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isControlled) setInternalValue(val);
    if (onChange) onChange(val);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    if (onChange) onChange('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchTerm);
    }
  };

  const sizes = {
    sm: 'py-2 pl-9 pr-8 text-xs rounded-xl',
    md: 'py-2.5 pl-10 pr-10 text-xs sm:text-sm rounded-xl',
    lg: 'py-3.5 pl-12 pr-12 text-sm sm:text-base rounded-2xl shadow-md shadow-slate-200/50',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5 left-3',
    md: 'w-4 h-4 left-3.5',
    lg: 'w-5 h-5 left-4',
  };

  return (
    <div className={cn('relative w-full flex items-center group', className)}>
      <div className={cn('absolute text-slate-400 pointer-events-none flex items-center', iconSizes[size])}>
        {isLoading ? (
          <Loader2 className={cn('animate-spin text-[#0B6E4F]', iconSizes[size])} />
        ) : (
          <Search className={cn('group-focus-within:text-[#0B6E4F] transition-colors', iconSizes[size])} />
        )}
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          'w-full bg-white border border-[#E2ECF3] text-slate-900 placeholder:text-slate-400 font-medium transition-all duration-200 focus:outline-none focus:border-[#0B6E4F] focus:ring-2 focus:ring-[#0B6E4F]/20 shadow-sm',
          sizes[size]
        )}
      />

      {searchTerm ? (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Clear search query"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : showKbdShortcut ? (
        <kbd className="hidden sm:inline-flex items-center gap-0.5 absolute right-3 px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded-md">
          <span>⌘</span>K
        </kbd>
      ) : null}
    </div>
  );
}
