'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product } from '@/types/catalog';
import { Card } from '@/components/ui/Card';
import { ArrowRight, Beaker, Building2, Pill } from 'lucide-react';
import { getResolvedProduct } from '@/lib/catalogResolver';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product: rawProduct }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  // Dynamically resolve product attributes against live company/category/therapy state
  const product = useMemo(() => getResolvedProduct(rawProduct), [rawProduct]);

  return (
    <Link href={`/products/${product.slug}`} className="block h-full group">
      <Card
        hoverable
        className="flex flex-col justify-between h-full bg-white rounded-2xl border border-[#E2ECF3] shadow-xs hover:shadow-md hover:border-[#0B6E4F]/40 transition-all duration-200 overflow-hidden p-0"
      >
        {/* Top Visual Image / Header Area */}
        <div className="relative h-40 bg-gradient-to-b from-[#F4F8FB] to-[#EBF3FA] border-b border-[#E2ECF3] flex items-center justify-center p-4">
          {/* Top Left: Company Badge */}
          <div className="absolute top-3 left-3 z-10 max-w-[55%]">
            <span className="text-[10px] font-bold text-slate-700 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#E2ECF3] shadow-2xs truncate flex items-center gap-1">
              <Building2 className="w-3 h-3 text-[#0B6E4F] flex-shrink-0" />
              <span className="truncate">{product.company?.name || 'Company'}</span>
            </span>
          </div>

          {/* Top Right: Category Tag */}
          <div className="absolute top-3 right-3 z-10 max-w-[40%]">
            <span className="text-[10px] font-bold text-[#0B6E4F] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#0B6E4F]/20 shadow-2xs truncate block">
              {product.category?.name || 'Category'}
            </span>
          </div>

          {/* Product Image or Fallback Icon */}
          {product.image && !imageError ? (
            <img
              src={product.image}
              alt=""
              onError={() => setImageError(true)}
              className="max-h-28 max-w-[80%] object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
            />
          ) : (
            <div className="flex flex-col items-center justify-center space-y-1 pt-2">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#0B6E4F] flex items-center justify-center border border-[#0B6E4F]/20 shadow-sm group-hover:scale-110 group-hover:bg-[#0B6E4F] group-hover:text-white transition-all duration-300">
                <Pill className="w-6 h-6 rotate-45" />
              </div>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            {/* Product Name */}
            <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0B6E4F] transition-colors leading-snug line-clamp-2">
              {product.name}
            </h3>

            {/* Salt Composition */}
            {product.salt && (
              <div className="p-2.5 bg-[#E8F5F1]/70 rounded-xl border border-[#0B6E4F]/15 text-xs text-[#0B6E4F] flex items-start gap-2">
                <Beaker className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#0B6E4F]" />
                <span className="line-clamp-2 font-medium leading-tight">
                  <strong className="font-semibold">Salt:</strong> {product.salt}
                </span>
              </div>
            )}

            {/* Specifications (Strength & Packaging) */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              {product.strength && (
                <span className="font-mono text-[11px] font-bold text-slate-800 bg-[#F4F8FB] px-2 py-0.5 rounded-md border border-[#E2ECF3]">
                  {product.strength}
                </span>
              )}
              {product.pack && (
                <span className="text-[11px] text-slate-500 font-medium">
                  {product.pack}
                </span>
              )}
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="pt-3 border-t border-[#E2ECF3] flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-[#2D9CDB] truncate max-w-[65%]">
              {product.therapy?.name || 'Therapy'}
            </span>

            <span className="text-xs font-bold text-[#0B6E4F] flex items-center gap-1 group-hover:translate-x-1 transition-transform flex-shrink-0">
              Details
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
