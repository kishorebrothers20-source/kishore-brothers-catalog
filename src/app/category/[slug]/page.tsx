import { getCategories, getCompanies, getProducts, getTherapies } from '@/lib/db/catalog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ProductsClientView } from '@/components/catalog/ProductsClientView';
import { Layers, Pill, ShieldCheck } from 'lucide-react';

interface CategorySlugPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    search?: string;
    therapy?: string;
    company?: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategorySlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find(c => c.slug === slug);
  if (!category) return {};

  return {
    title: `${category.name} - Pharmaceutical Formulations Index`,
    description: `Explore WHO-GMP certified ${category.name} formulations. Filter by company, therapy, salt composition, and pack size.`,
  };
}

export default async function CategorySlugPage({ params, searchParams }: CategorySlugPageProps) {
  const { slug } = await params;
  const sParams = await searchParams;

  const categories = await getCategories();
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    notFound();
  }

  const companies = await getCompanies();
  const therapies = await getTherapies();
  const categoryProducts = await getProducts({ category: category.slug, ...sParams });

  return (
    <div className="py-8 bg-[#F4F8FB] min-h-screen">
      <Container size="lg">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Category', href: '/category' },
            { label: category.name },
          ]}
          className="mb-4"
        />

        {/* Category Header Card */}
        <div className="bg-white border border-[#E2ECF3] rounded-3xl p-6 sm:p-10 shadow-sm mb-8 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0B6E4F] uppercase tracking-widest flex items-center gap-1.5 bg-[#E8F5F1] px-3 py-1 rounded-full border border-[#0B6E4F]/20">
              <Layers className="w-4 h-4" />
              Dosage Form Category
            </span>

            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0B6E4F]">
              <ShieldCheck className="w-4 h-4" />
              Validated Monograph
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            {category.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            Explore validated {category.name.toLowerCase()} formulations produced in ISO Class cleanroom facilities. Use the search and filter controls below to refine by company, therapy area, or active salt composition.
          </p>
        </div>

        {/* Search, Filters, Product Grid & Pagination */}
        <ProductsClientView
          initialProducts={categoryProducts}
          categories={categories}
          therapies={therapies}
          companies={companies}
        />
      </Container>
    </div>
  );
}
