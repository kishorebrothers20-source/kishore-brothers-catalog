import { getCategories, getCompanies, getProducts, getTherapies } from '@/lib/db/catalog';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ProductsClientView } from '@/components/catalog/ProductsClientView';
import { Pill } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Full Product Catalog & Pharmaceutical Index',
  description: 'Search and filter products by company, category, therapy, salt composition, and pack specifications.',
};

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    therapy?: string;
    company?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const categories = await getCategories();
  const therapies = await getTherapies();
  const companies = await getCompanies();
  const initialProducts = await getProducts(params);

  return (
    <div className="py-8 bg-[#F4F8FB] min-h-screen">
      <Container size="lg">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Product Catalog' }]} className="mb-4" />

        {/* Section Heading */}
        <SectionHeading
          title="B2B Product Catalog"
          description="Filter by manufacturer company, active salt composition, category, or therapy area."
          icon={<Pill className="w-4 h-4 text-[#0B6E4F]" />}
        />

        {/* Interactive Products View (Search, Sidebar Filters, Sorting, Product Grid, Pagination) */}
        <ProductsClientView
          initialProducts={initialProducts}
          categories={categories}
          therapies={therapies}
          companies={companies}
        />
      </Container>
    </div>
  );
}
