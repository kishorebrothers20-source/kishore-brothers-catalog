import { Product } from '@/types/catalog';
import { Package, Info, Building2, Beaker, Layers, HeartPulse } from 'lucide-react';

interface SpecificationTableProps {
  product: Product;
}

export function SpecificationTable({ product }: SpecificationTableProps) {
  return (
    <div className="bg-white border border-[#E2ECF3] rounded-3xl overflow-hidden shadow-sm">
      <div className="bg-[#E8F5F1] px-6 py-4 border-b border-[#0B6E4F]/20 flex items-center justify-between">
        <h3 className="text-xs sm:text-sm font-bold text-[#0B6E4F] uppercase tracking-wider flex items-center gap-2">
          <Info className="w-4 h-4 text-[#0B6E4F]" />
          <span>Product Specifications</span>
        </h3>
      </div>

      <div className="divide-y divide-[#E2ECF3] text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-[#F4F8FB]">
          <span className="font-semibold text-slate-500">Product Name</span>
          <span className="sm:col-span-2 font-bold text-slate-900">
            {product.name}
          </span>
        </div>

        {product.salt && (
          <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-[#F4F8FB]">
            <span className="font-semibold text-slate-500 flex items-center gap-1.5">
              <Beaker className="w-3.5 h-3.5 text-[#0B6E4F]" />
              Salt Composition
            </span>
            <span className="sm:col-span-2 font-mono text-[#0B6E4F] font-bold">
              {product.salt}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-[#F4F8FB]">
          <span className="font-semibold text-slate-500 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            Company
          </span>
          <span className="sm:col-span-2 font-semibold text-slate-800">
            {product.company.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-[#F4F8FB]">
          <span className="font-semibold text-slate-500 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            Category
          </span>
          <span className="sm:col-span-2 text-slate-900 font-medium">
            {product.category.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-[#F4F8FB]">
          <span className="font-semibold text-slate-500 flex items-center gap-1.5">
            <HeartPulse className="w-3.5 h-3.5 text-[#2D9CDB]" />
            Therapy Area
          </span>
          <span className="sm:col-span-2 text-[#2D9CDB] font-semibold">
            {product.therapy.name}
          </span>
        </div>

        {product.strength && (
          <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-[#F4F8FB]">
            <span className="font-semibold text-slate-500">Formulation Strength</span>
            <span className="sm:col-span-2 font-mono text-slate-900 font-bold">
              {product.strength}
            </span>
          </div>
        )}

        {product.pack && (
          <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-[#F4F8FB]">
            <span className="font-semibold text-slate-500 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-slate-400" />
              Packaging Specification
            </span>
            <span className="sm:col-span-2 text-slate-900 font-medium">
              {product.pack}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
