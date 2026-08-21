import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rounded' | 'card' | 'badge';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full',
    rounded: 'rounded-xl',
    card: 'h-48 w-full rounded-2xl',
    badge: 'h-6 w-20 rounded-full',
  };

  return (
    <div
      className={cn(
        'bg-slate-200/80 animate-pulse transition-opacity',
        variants[variant],
        className
      )}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white border border-[#E2ECF3] rounded-2xl p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Skeleton variant="badge" />
        <Skeleton variant="badge" className="w-16" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
      <div className="pt-4 border-t border-[#E2ECF3] flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-28 rounded-xl" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
