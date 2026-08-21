import Link from 'next/link';
import { Category } from '@/types/catalog';
import { ShieldAlert, HeartPulse, Dna, Activity, Brain, Wind, ArrowRight, Layers, Pill, Syringe, Droplet } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  const getCategoryIcon = (slug: string) => {
    if (slug.includes('injectable') || slug.includes('vials')) return <Syringe className="w-6 h-6 text-[#2D9CDB]" />;
    if (slug.includes('infusion') || slug.includes('suspension')) return <Droplet className="w-6 h-6 text-teal-600" />;
    return <Pill className="w-6 h-6 text-[#0B6E4F]" />;
  };

  return (
    <section className="py-16 bg-white border-b border-[#E2ECF3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Browse By Category
            </h2>
          </div>
          <Link
            href="/category"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B6E4F] hover:underline"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group bg-[#F4F8FB] border border-[#E2ECF3] rounded-2xl p-6 hover:shadow-xl hover:border-[#0B6E4F]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E2ECF3] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {getCategoryIcon(cat.slug)}
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0B6E4F] transition-colors">
                  {cat.name}
                </h3>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2ECF3] flex items-center justify-between text-xs text-slate-500">
                <span>{cat.productCount || 10}+ Formulations</span>
                <span className="font-semibold text-[#0B6E4F] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Catalog <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
