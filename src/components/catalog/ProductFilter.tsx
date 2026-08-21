'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Category, Therapy, Company } from '@/types/catalog';
import { SearchBar } from '@/components/ui/SearchBar';
import { Filter, RotateCcw, Building2, HeartPulse, Layers } from 'lucide-react';

interface ProductFilterProps {
  categories: Category[];
  therapies: Therapy[];
  companies: Company[];
}

export function ProductFilter({ categories, therapies, companies }: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || '';
  const currentTherapy = searchParams.get('therapy') || '';
  const currentCompany = searchParams.get('company') || '';

  const updateQueryParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/products?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleReset = () => {
    router.push('/products');
  };

  return (
    <div className="bg-white border border-[#E2ECF3] rounded-3xl p-6 mb-8 shadow-sm space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <SearchBar
            size="md"
            placeholder="Search by product name, active salt composition, or description..."
            value={currentSearch}
            onChange={val => updateQueryParams('search', val)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Company Filter */}
          <select
            value={currentCompany}
            onChange={e => updateQueryParams('company', e.target.value)}
            className="px-3 py-2.5 bg-[#F4F8FB] border border-[#E2ECF3] rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#0B6E4F] focus:ring-2 focus:ring-[#0B6E4F]/20"
          >
            <option value="">All Companies</option>
            {companies.map(comp => (
              <option key={comp.id} value={comp.slug}>
                {comp.name}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={currentCategory}
            onChange={e => updateQueryParams('category', e.target.value)}
            className="px-3 py-2.5 bg-[#F4F8FB] border border-[#E2ECF3] rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#0B6E4F] focus:ring-2 focus:ring-[#0B6E4F]/20"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Therapy Filter */}
          <select
            value={currentTherapy}
            onChange={e => updateQueryParams('therapy', e.target.value)}
            className="px-3 py-2.5 bg-[#F4F8FB] border border-[#E2ECF3] rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#0B6E4F] focus:ring-2 focus:ring-[#0B6E4F]/20"
          >
            <option value="">All Therapies</option>
            {therapies.map(ther => (
              <option key={ther.id} value={ther.slug}>
                {ther.name}
              </option>
            ))}
          </select>

          {/* Reset Filters */}
          {(currentSearch || currentCategory || currentTherapy || currentCompany) && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
