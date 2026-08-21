import { Product } from '@/types/catalog';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Pill } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center mb-4">
          <Pill className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">No Pharmaceutical Formulations Found</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
          Try resetting your filter parameters or search terms to inspect our complete B2B therapeutic catalog.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
