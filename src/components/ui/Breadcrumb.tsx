import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

export function Breadcrumb({ items, showHome = true, className, ...props }: BreadcrumbProps) {
  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: 'Home', href: '/', icon: <Home className="w-3.5 h-3.5" /> }, ...items]
    : items;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center text-xs text-slate-500 font-medium py-3', className)}
      {...props}
    >
      <ol className="flex items-center flex-wrap gap-1.5">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />}

              {isLast || !item.href ? (
                <span
                  aria-current="page"
                  className="font-bold text-[#0B6E4F] flex items-center gap-1 bg-[#E8F5F1] px-2 py-0.5 rounded-md"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#0B6E4F] hover:underline flex items-center gap-1 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
