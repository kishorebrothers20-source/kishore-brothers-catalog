'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-between border-t border-[#E2ECF3] pt-6 mt-8', className)}
    >
      <div className="text-xs text-slate-500 font-medium hidden sm:block">
        Page <strong className="text-slate-900 font-mono">{currentPage}</strong> of{' '}
        <strong className="text-slate-900 font-mono">{totalPages}</strong>
      </div>

      <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
        >
          Prev
        </Button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {pages.map(page => {
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(
                  'w-8 h-8 rounded-xl text-xs font-bold transition-all',
                  isActive
                    ? 'bg-[#0B6E4F] text-white shadow-sm'
                    : 'bg-white hover:bg-[#E8F5F1] hover:text-[#0B6E4F] text-slate-700 border border-[#E2ECF3]'
                )}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          rightIcon={<ChevronRight className="w-4 h-4" />}
        >
          Next
        </Button>
      </div>
    </nav>
  );
}
