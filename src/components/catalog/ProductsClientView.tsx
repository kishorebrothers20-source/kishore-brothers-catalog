'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product, Category, Therapy, Company } from '@/types/catalog';
import { SearchBar } from '@/components/ui/SearchBar';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Pagination } from '@/components/ui/Pagination';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Filter, RotateCcw, Building2, Layers, HeartPulse, ArrowUpDown, SlidersHorizontal, X, Check } from 'lucide-react';

interface ProductsClientViewProps {
  initialProducts: Product[];
  categories: Category[];
  therapies: Therapy[];
  companies: Company[];
}

export function ProductsClientView({
  initialProducts,
  categories,
  therapies,
  companies,
}: ProductsClientViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Dynamic Catalog State (Synced with localStorage when present)
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [categoriesList, setCategoriesList] = useState<Category[]>(categories);
  const [therapiesList, setTherapiesList] = useState<Therapy[]>(therapies);
  const [companiesList, setCompaniesList] = useState<Company[]>(companies);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProds = localStorage.getItem('kb_products');
      if (savedProds) {
        try {
          const parsed = JSON.parse(savedProds);
          if (Array.isArray(parsed) && parsed.length > 0) setProductsList(parsed);
        } catch (e) {}
      }
      const savedCats = localStorage.getItem('kb_categories');
      if (savedCats) {
        try {
          const parsed = JSON.parse(savedCats);
          if (Array.isArray(parsed) && parsed.length > 0) setCategoriesList(parsed);
        } catch (e) {}
      }
      const savedThers = localStorage.getItem('kb_therapies');
      if (savedThers) {
        try {
          const parsed = JSON.parse(savedThers);
          if (Array.isArray(parsed) && parsed.length > 0) setTherapiesList(parsed);
        } catch (e) {}
      }
      const savedComps = localStorage.getItem('kb_companies');
      if (savedComps) {
        try {
          const parsed = JSON.parse(savedComps);
          if (Array.isArray(parsed) && parsed.length > 0) setCompaniesList(parsed);
        } catch (e) {}
      }
    }
  }, []);

  // Search & Filter State synchronized with URL
  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || '';
  const currentTherapy = searchParams.get('therapy') || '';
  const currentCompany = searchParams.get('company') || '';

  // Local Sort & Pagination State
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'company' | 'category'>('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const ITEMS_PER_PAGE = 6;

  // Filter Update Handler
  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setCurrentPage(1);
    router.push(`/products?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setCurrentPage(1);
    router.push('/products');
  };

  // Filtered & Sorted Products
  const processedProducts = useMemo(() => {
    let result = [...productsList];

    // Search filter
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          (p.salt && p.salt.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Company filter
    if (currentCompany) {
      result = result.filter(p => p.company?.slug === currentCompany);
    }

    // Category filter
    if (currentCategory) {
      result = result.filter(p => p.category?.slug === currentCategory);
    }

    // Therapy filter
    if (currentTherapy) {
      result = result.filter(p => p.therapy?.slug === currentTherapy);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'company') return (a.company?.name || '').localeCompare(b.company?.name || '');
      if (sortBy === 'category') return (a.category?.name || '').localeCompare(b.category?.name || '');
      return 0;
    });

    return result;
  }, [productsList, currentSearch, currentCompany, currentCategory, currentTherapy, sortBy]);

  // Pagination Math
  const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [processedProducts, currentPage]);

  const activeFiltersCount = [currentCompany, currentCategory, currentTherapy].filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* 1. TOP SEARCH BAR */}
      <div className="bg-white border border-[#E2ECF3] rounded-3xl p-6 shadow-sm">
        <SearchBar
          size="lg"
          placeholder="Search formulations by product name, active salt composition, or CAS index..."
          value={currentSearch}
          onChange={val => updateQueryParam('search', val)}
          showKbdShortcut
        />
      </div>

      {/* 2. TOP CONTROL BAR (Results, Sorting, Mobile Filter Toggle) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E2ECF3] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-700">
            Showing <strong className="text-slate-900 font-mono">{processedProducts.length}</strong> Formulations
          </span>
          {activeFiltersCount > 0 && (
            <Badge variant="primary">
              {activeFiltersCount} Active Filter{activeFiltersCount > 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            leftIcon={<SlidersHorizontal className="w-4 h-4" />}
            onClick={() => setMobileFilterOpen(true)}
          >
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            <span className="text-slate-500 font-medium hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-[#F4F8FB] border border-[#E2ECF3] rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0B6E4F]"
            >
              <option value="name-asc">Product Name (A-Z)</option>
              <option value="name-desc">Product Name (Z-A)</option>
              <option value="company">Company Name</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT LAYOUT (Sidebar + Product Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white border border-[#E2ECF3] rounded-3xl p-6 shadow-sm sticky top-24">
          <div className="flex items-center justify-between border-b border-[#E2ECF3] pb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#0B6E4F]" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Catalog Filters</h3>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-bold text-rose-600 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Filter 1: Company */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#0B6E4F]" />
              Company
            </h4>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => updateQueryParam('company', '')}
                className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between font-medium ${
                  !currentCompany ? 'bg-[#E8F5F1] text-[#0B6E4F] font-bold' : 'text-slate-700 hover:bg-[#F4F8FB]'
                }`}
              >
                <span>All Companies</span>
                {!currentCompany && <Check className="w-3.5 h-3.5" />}
              </button>
              {companiesList.map(comp => {
                const isSelected = currentCompany === comp.slug;
                return (
                  <button
                    key={comp.id}
                    onClick={() => updateQueryParam('company', isSelected ? '' : comp.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between font-medium ${
                      isSelected ? 'bg-[#E8F5F1] text-[#0B6E4F] font-bold' : 'text-slate-700 hover:bg-[#F4F8FB]'
                    }`}
                  >
                    <span className="truncate pr-2">{comp.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter 2: Category */}
          <div className="space-y-2.5 pt-4 border-t border-[#E2ECF3]">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#0B6E4F]" />
              Category
            </h4>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => updateQueryParam('category', '')}
                className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between font-medium ${
                  !currentCategory ? 'bg-[#E8F5F1] text-[#0B6E4F] font-bold' : 'text-slate-700 hover:bg-[#F4F8FB]'
                }`}
              >
                <span>All Categories</span>
                {!currentCategory && <Check className="w-3.5 h-3.5" />}
              </button>
              {categoriesList.map(cat => {
                const isSelected = currentCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => updateQueryParam('category', isSelected ? '' : cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between font-medium ${
                      isSelected ? 'bg-[#E8F5F1] text-[#0B6E4F] font-bold' : 'text-slate-700 hover:bg-[#F4F8FB]'
                    }`}
                  >
                    <span className="truncate pr-2">{cat.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter 3: Therapy */}
          <div className="space-y-2.5 pt-4 border-t border-[#E2ECF3]">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-[#2D9CDB]" />
              Therapy
            </h4>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => updateQueryParam('therapy', '')}
                className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between font-medium ${
                  !currentTherapy ? 'bg-[#EBF5FB] text-[#2D9CDB] font-bold' : 'text-slate-700 hover:bg-[#F4F8FB]'
                }`}
              >
                <span>All Therapies</span>
                {!currentTherapy && <Check className="w-3.5 h-3.5" />}
              </button>
              {therapiesList.map(ther => {
                const isSelected = currentTherapy === ther.slug;
                return (
                  <button
                    key={ther.id}
                    onClick={() => updateQueryParam('therapy', isSelected ? '' : ther.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between font-medium ${
                      isSelected ? 'bg-[#EBF5FB] text-[#2D9CDB] font-bold' : 'text-slate-700 hover:bg-[#F4F8FB]'
                    }`}
                  >
                    <span className="truncate pr-2">{ther.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* PRODUCT GRID & PAGINATION */}
        <main className="lg:col-span-9 space-y-6">
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* PAGINATION */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={page => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
              />
            </>
          ) : (
            <EmptyState
              type="search"
              title="No Products Match Your Filters"
              description="Try resetting your company, category, or therapy filter selections to inspect our complete B2B catalog."
              actionLabel="Clear All Filters"
              onAction={handleResetFilters}
            />
          )}
        </main>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 space-y-6 overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-[#E2ECF3] pb-4">
              <h3 className="text-base font-bold text-slate-900">Catalog Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-[#F4F8FB]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Company */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase">Company</h4>
              <div className="space-y-1 text-xs">
                {companiesList.map(comp => (
                  <button
                    key={comp.id}
                    onClick={() => {
                      updateQueryParam('company', currentCompany === comp.slug ? '' : comp.slug);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg ${
                      currentCompany === comp.slug ? 'bg-[#E8F5F1] text-[#0B6E4F] font-bold' : 'text-slate-700'
                    }`}
                  >
                    {comp.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Category */}
            <div className="space-y-2 pt-4 border-t border-[#E2ECF3]">
              <h4 className="text-xs font-bold text-slate-700 uppercase">Category</h4>
              <div className="space-y-1 text-xs">
                {categoriesList.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      updateQueryParam('category', currentCategory === cat.slug ? '' : cat.slug);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg ${
                      currentCategory === cat.slug ? 'bg-[#E8F5F1] text-[#0B6E4F] font-bold' : 'text-slate-700'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Therapy */}
            <div className="space-y-2 pt-4 border-t border-[#E2ECF3]">
              <h4 className="text-xs font-bold text-slate-700 uppercase">Therapy</h4>
              <div className="space-y-1 text-xs">
                {therapiesList.map(ther => (
                  <button
                    key={ther.id}
                    onClick={() => {
                      updateQueryParam('therapy', currentTherapy === ther.slug ? '' : ther.slug);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg ${
                      currentTherapy === ther.slug ? 'bg-[#EBF5FB] text-[#2D9CDB] font-bold' : 'text-slate-700'
                    }`}
                  >
                    {ther.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2ECF3]">
              <Button variant="primary" fullWidth onClick={() => setMobileFilterOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
