'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { SearchBar } from '@/components/ui/SearchBar';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Search, Sparkles, Beaker } from 'lucide-react';

export function SearchMedicinesSection() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (term: string) => {
    if (term.trim()) {
      router.push(`/products?search=${encodeURIComponent(term.trim())}`);
    }
  };

  const POPULAR_SEARCHES = [
    'Amoxicillin Trihydrate',
    'Paracetamol Ready-IV',
    'Paclitaxel Injection',
    'Atorvastatin Calcium',
    'Pantoprazole Sodium',
    'Azithromycin Dihydrate',
  ];

  return (
    <section className="py-14 bg-white border-b border-[#E2ECF3]">
      <Container size="lg">
        <div className="bg-gradient-to-br from-[#E8F5F1] to-[#EBF5FB] border border-[#0B6E4F]/20 rounded-3xl p-8 sm:p-12 shadow-sm">
          <SectionHeading
            eyebrow="Instant Formulations Lookup"
            title="Search Medicines & Salt Compositions"
            icon={<Search className="w-4 h-4 text-[#0B6E4F]" />}
            align="center"
          />

          <div className="max-w-2xl mx-auto space-y-4 pt-2">
            <SearchBar
              size="lg"
              placeholder="Search by INN salt (e.g. Amoxicillin Trihydrate, Paracetamol)..."
              value={query}
              onChange={setQuery}
              onSearch={handleSearch}
              showKbdShortcut
            />

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <Beaker className="w-3.5 h-3.5 text-[#0B6E4F]" />
                Frequent INN Searches:
              </span>
              {POPULAR_SEARCHES.map((term, i) => (
                <button
                  key={i}
                  onClick={() => handleSearch(term)}
                  className="bg-white hover:bg-[#0B6E4F] hover:text-white text-slate-700 font-medium px-3 py-1 rounded-full border border-[#E2ECF3] shadow-2xs transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
