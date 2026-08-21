'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Product, Company, Category, Therapy } from '@/types/catalog';
import { Badge } from '@/components/ui/Badge';
import {
  Search,
  X,
  Pill,
  Beaker,
  Building2,
  Layers,
  HeartPulse,
  ArrowRight,
  Sparkles,
  Command,
  Loader2,
} from 'lucide-react';

export interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    products: Product[];
    companies: Company[];
    categories: Category[];
    therapies: Therapy[];
    totalMatches?: number;
  }>({
    products: [],
    companies: [],
    categories: [],
    therapies: [],
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened & setup Esc listener
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Live search debounced fetch
  useEffect(() => {
    if (!query.trim()) {
      setResults({ products: [], companies: [], categories: [], therapies: [] });
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query.trim())}`)
        .then(res => res.json())
        .then(data => {
          setResults(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Global search error:', err);
          setLoading(false);
        });
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  const handleViewAllProducts = () => {
    onClose();
    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  const SAMPLE_QUICK_SEARCHES = ['Paracetamol', 'PCM', 'Crocin', 'Dolo', 'Amlodipine', 'Cipla'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-[#E2ECF3] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden relative max-h-[80vh] flex flex-col">
        {/* Top Search Input Bar */}
        <div className="p-4 border-b border-[#E2ECF3] flex items-center gap-3 bg-[#F4F8FB]">
          <Search className="w-5 h-5 text-[#0B6E4F] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by Product Name, Salt (e.g. Para, PCM, Crocin), Company, or Therapy..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {loading ? (
            <Loader2 className="w-5 h-5 text-[#0B6E4F] animate-spin flex-shrink-0" />
          ) : query ? (
            <button onClick={() => setQuery('')} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400 bg-white border border-[#E2ECF3] px-2 py-0.5 rounded-lg shadow-2xs">
              ESC
            </kbd>
          )}
        </div>

        {/* Search Results Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-xs">
          {!query.trim() ? (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <Sparkles className="w-4 h-4 text-[#0B6E4F]" />
                <span>Popular Search Terms:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_QUICK_SEARCHES.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(term)}
                    className="bg-[#F4F8FB] hover:bg-[#0B6E4F] hover:text-white text-slate-700 font-medium px-3 py-1.5 rounded-full border border-[#E2ECF3] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.products.length === 0 &&
            results.companies.length === 0 &&
            results.categories.length === 0 &&
            results.therapies.length === 0 &&
            !loading ? (
            <div className="py-12 text-center space-y-2">
              <Pill className="w-8 h-8 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-700">No matching formulations or entities found</h4>
              <p className="text-xs text-slate-400">
                Try searching by chemical salt composition (e.g., PCM, Paracetamol, Amlodipine) or brand name.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 1. MATCHED PRODUCTS */}
              {results.products.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5 text-[#0B6E4F]" />
                    Matching Product Formulations ({results.products.length})
                  </h4>

                  <div className="space-y-1.5">
                    {results.products.map(product => (
                      <button
                        key={product.id}
                        onClick={() => handleSelect(`/products/${product.slug}`)}
                        className="w-full text-left p-3 rounded-2xl bg-white hover:bg-[#E8F5F1] border border-[#E2ECF3] hover:border-[#0B6E4F]/30 transition-colors flex items-center justify-between group"
                      >
                        <div className="space-y-1">
                          <h5 className="font-bold text-slate-900 group-hover:text-[#0B6E4F] transition-colors">
                            {product.name}
                          </h5>
                          {product.salt && (
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[#0B6E4F] bg-[#E8F5F1] px-2 py-0.5 rounded text-[10px] font-semibold border border-[#0B6E4F]/20">
                                Salt: {product.salt}
                              </span>
                              {product.strength && (
                                <span className="text-[10px] text-slate-500 font-mono font-bold">
                                  {product.strength}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge variant="primary">{product.company.name}</Badge>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0B6E4F] group-hover:translate-x-1 transition-all" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. MATCHED COMPANIES */}
              {results.companies.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#0B6E4F]" />
                    Companies ({results.companies.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.companies.map(company => (
                      <button
                        key={company.id}
                        onClick={() => handleSelect(`/products?company=${company.slug}`)}
                        className="text-left p-2.5 rounded-xl bg-[#F4F8FB] hover:bg-[#E8F5F1] border border-[#E2ECF3] flex items-center justify-between font-semibold text-slate-800 hover:text-[#0B6E4F] transition-colors"
                      >
                        <span>{company.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. MATCHED CATEGORIES & THERAPIES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.categories.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#0B6E4F]" />
                      Categories
                    </h4>
                    <div className="space-y-1">
                      {results.categories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => handleSelect(`/category/${cat.slug}`)}
                          className="w-full text-left p-2.5 rounded-xl bg-[#F4F8FB] hover:bg-[#E8F5F1] border border-[#E2ECF3] flex items-center justify-between font-semibold text-slate-800 hover:text-[#0B6E4F] transition-colors"
                        >
                          <span>{cat.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {results.therapies.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <HeartPulse className="w-3.5 h-3.5 text-[#2D9CDB]" />
                      Therapy Areas
                    </h4>
                    <div className="space-y-1">
                      {results.therapies.map(ther => (
                        <button
                          key={ther.id}
                          onClick={() => handleSelect(`/therapy/${ther.slug}`)}
                          className="w-full text-left p-2.5 rounded-xl bg-[#EBF5FB] hover:bg-[#2D9CDB] hover:text-white border border-[#E2ECF3] flex items-center justify-between font-semibold text-slate-800 transition-colors"
                        >
                          <span>{ther.name}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        {query.trim() && (
          <div className="p-3 bg-[#F4F8FB] border-t border-[#E2ECF3] flex items-center justify-between text-xs">
            <span className="text-slate-500 font-semibold">
              Showing top results for <strong className="text-slate-900">"{query}"</strong>
            </span>
            <button
              onClick={handleViewAllProducts}
              className="text-[#0B6E4F] font-bold hover:underline flex items-center gap-1"
            >
              View Full Catalog Results <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
