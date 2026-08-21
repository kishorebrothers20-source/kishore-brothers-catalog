import { getCategories } from '@/lib/db/catalog';
import { CategoryGrid } from '@/components/sections/CategoryGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Therapeutic Categories & Medical Specialities',
  description: 'Explore pharmaceutical formulations grouped by therapeutic areas: anti-infectives, cardiovascular, oncology, and CNS.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Therapeutic Specialities Index
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
          Browse our complete pharmaceutical portfolio grouped by medical field and therapeutic classification.
        </p>
      </div>

      <CategoryGrid categories={categories} />
    </div>
  );
}
