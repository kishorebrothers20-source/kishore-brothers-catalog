import { getCategories, getCompanies, getProducts, getTherapies } from '@/lib/db/catalog';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProductsClientView } from '@/components/catalog/ProductsClientView';
import { Layers, ArrowRight, ShieldCheck, Pill, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Category Wise Search | Pharmaceutical Dosage Categories',
  description: 'Search and filter products by dosage delivery category including Oral Tablets, Sterile Injectables, IV Solutions, and Respiratory Inhalers.',
};

interface CategorySearchPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    company?: string;
    therapy?: string;
  }>;
}

export default async function CategoryWiseSearchPage({ searchParams }: CategorySearchPageProps) {
  const sParams = await searchParams;
  const categories = await getCategories();
  const companies = await getCompanies();
  const therapies = await getTherapies();
  const products = await getProducts(sParams);

  return (
    <div className="py-8 bg-[#F4F8FB] min-h-screen">
      <Container size="lg">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Category Wise Search' }]} className="mb-4" />

        {/* Section Heading */}
        <SectionHeading
          eyebrow="Targeted Dosage Search"
          title="Category Wise Formulation Search"
          description="Explore finished dosage forms grouped by delivery administration system. Filter by oral solids, parenterals, inhalers, or dietary supplements."
          icon={<Layers className="w-4 h-4 text-[#0B6E4F]" />}
        />

        {/* Visual Category Selector Cards Bar */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map(cat => {
            const isSelected = sParams.category === cat.slug;
            return (
              <Link key={cat.id} href={isSelected ? '/search/category' : `/search/category?category=${cat.slug}`}>
                <Card
                  hoverable
                  className={`p-4 h-full flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'bg-[#0B6E4F] text-white border-[#0B6E4F] shadow-lg shadow-[#0B6E4F]/20'
                      : 'bg-white hover:border-[#0B6E4F]/40'
                  }`}
                >
                  <div>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 font-bold text-sm ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#E8F5F1] text-[#0B6E4F]'
                    }`}>
                      <Layers className="w-4.5 h-4.5" />
                    </div>
                    <h3 className={`text-xs font-bold leading-snug ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {cat.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-200/40 flex items-center justify-between text-[11px]">
                    <span className={`font-mono font-bold ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                      {cat.productCount || 8}+ Items
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#0B6E4F]'}`} />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Interactive Search, Filters, Product Grid & Pagination */}
        <ProductsClientView
          initialProducts={products}
          categories={categories}
          therapies={therapies}
          companies={companies}
        />
      </Container>
    </div>
  );
}
