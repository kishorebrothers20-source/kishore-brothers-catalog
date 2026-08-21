import { getCategories, getCompanies, getProducts, getTherapies } from '@/lib/db/catalog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { ProductsClientView } from '@/components/catalog/ProductsClientView';
import { HeartPulse, ShieldCheck, ArrowRight, Activity, Dna, Brain, Wind } from 'lucide-react';

interface TherapySlugPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    search?: string;
    category?: string;
    company?: string;
  }>;
}

export async function generateStaticParams() {
  const therapies = await getTherapies();
  return therapies.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: TherapySlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const therapies = await getTherapies();
  const therapy = therapies.find(t => t.slug === slug || (slug === 'hypertension' && t.slug === 'cardiovascular'));
  if (!therapy) return {};

  return {
    title: `${therapy.name} Formulations & Anti-Hypertensives`,
    description: `Explore WHO-GMP certified ${therapy.name} formulations. Filter by company, category, active salt, and pack size.`,
  };
}

export default async function TherapySlugPage({ params, searchParams }: TherapySlugPageProps) {
  const { slug } = await params;
  const sParams = await searchParams;

  const therapies = await getTherapies();
  // Handle alias for hypertension -> cardiovascular
  const targetSlug = slug === 'hypertension' ? 'cardiovascular' : slug;
  const therapy = therapies.find(t => t.slug === targetSlug);

  if (!therapy) {
    notFound();
  }

  const companies = await getCompanies();
  const categories = await getCategories();
  const therapyProducts = await getProducts({ therapy: therapy.slug, ...sParams });

  // Related Therapies (excluding current therapy)
  const relatedTherapies = therapies.filter(t => t.id !== therapy.id);

  const getTherapyIcon = (therapySlug: string) => {
    if (therapySlug.includes('oncology')) return <Dna className="w-5 h-5 text-purple-600" />;
    if (therapySlug.includes('gastro')) return <Activity className="w-5 h-5 text-amber-600" />;
    if (therapySlug.includes('respiratory')) return <Wind className="w-5 h-5 text-teal-600" />;
    return <HeartPulse className="w-5 h-5 text-[#2D9CDB]" />;
  };

  return (
    <div className="py-8 bg-[#F4F8FB] min-h-screen">
      <Container size="lg">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Therapy Wise', href: '/therapy' },
            { label: therapy.name },
          ]}
          className="mb-4"
        />

        {/* Therapy Header Card */}
        <div className="bg-white border border-[#E2ECF3] rounded-3xl p-6 sm:p-10 shadow-sm mb-8 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2D9CDB] uppercase tracking-widest flex items-center gap-1.5 bg-[#EBF5FB] px-3 py-1 rounded-full border border-[#2D9CDB]/20">
              <HeartPulse className="w-4 h-4" />
              Clinical Therapy Indication
            </span>

            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0B6E4F]">
              <ShieldCheck className="w-4 h-4" />
              Quality Certified
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            {therapy.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            Explore validated formulations for {therapy.name.toLowerCase()} management including essential anti-hypertensives, lipid regulators, and cardiac formulations. Use the search bar and filters below to refine by company or dosage form.
          </p>
        </div>

        {/* Search, Filters, Product Grid & Pagination */}
        <ProductsClientView
          initialProducts={therapyProducts}
          categories={categories}
          therapies={therapies}
          companies={companies}
        />

        {/* Related Therapies Section */}
        <div className="mt-16 pt-10 border-t border-[#E2ECF3] space-y-6">
          <SectionHeading
            eyebrow="Speciality Portfolio"
            title="Related Therapy Specialities"
            description="Browse other pharmaceutical clinical indication categories."
            icon={<HeartPulse className="w-4 h-4 text-[#0B6E4F]" />}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedTherapies.map(relTherapy => (
              <Link key={relTherapy.id} href={`/therapy/${relTherapy.slug}`}>
                <Card hoverable variant="flat" className="p-5 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E2ECF3] flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                      {getTherapyIcon(relTherapy.slug)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0B6E4F] transition-colors line-clamp-1">
                        {relTherapy.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {relTherapy.productCount || 8}+ Formulations
                      </span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0B6E4F] group-hover:translate-x-1 transition-all" />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
