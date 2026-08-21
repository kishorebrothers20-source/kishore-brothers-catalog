import { getCategories, getCompanies, getProducts, getTherapies } from '@/lib/db/catalog';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { ProductsClientView } from '@/components/catalog/ProductsClientView';
import { Building2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Company Wise Search | Pharmaceutical Manufacturer Index',
  description: 'Search products by pharmaceutical manufacturer company including Cipla Limited, Aegis BioPharma, and NovaChem Laboratories.',
};

interface CompanySearchPageProps {
  searchParams: Promise<{
    company?: string;
    search?: string;
    category?: string;
    therapy?: string;
  }>;
}

export default async function CompanyWiseSearchPage({ searchParams }: CompanySearchPageProps) {
  const sParams = await searchParams;
  const companies = await getCompanies();
  const categories = await getCategories();
  const therapies = await getTherapies();
  const products = await getProducts(sParams);

  return (
    <div className="py-8 bg-[#F4F8FB] min-h-screen">
      <Container size="lg">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Company Wise Search' }]} className="mb-4" />

        {/* Section Heading */}
        <SectionHeading
          title="Company Wise Formulation Search"
          description="Browse and search formulations by pharmaceutical manufacturing enterprise."
          icon={<Building2 className="w-4 h-4 text-[#0B6E4F]" />}
        />

        {/* Visual Company Selector Cards */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {companies.map(comp => {
            const isSelected = sParams.company === comp.slug;
            return (
              <Link key={comp.id} href={isSelected ? '/search/company' : `/search/company?company=${comp.slug}`}>
                <Card
                  hoverable
                  className={`p-6 flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-[#0B6E4F] text-white border-[#0B6E4F] shadow-lg shadow-[#0B6E4F]/20'
                      : 'bg-white hover:border-[#0B6E4F]/40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-sm border flex-shrink-0 ${
                        isSelected
                          ? 'bg-white text-[#0B6E4F] border-white'
                          : 'bg-[#E8F5F1] text-[#0B6E4F] border-[#0B6E4F]/20'
                      }`}
                    >
                      {comp.name[0]}
                    </div>
                    <div>
                      <h3 className={`text-base font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {comp.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-mono ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                          {comp.productCount || 12}+ Products
                        </span>
                      </div>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#0B6E4F]'}`} />
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
