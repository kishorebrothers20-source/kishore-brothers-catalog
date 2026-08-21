import { getProductBySlug, getProducts, getRelatedProducts } from '@/lib/db/catalog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import { SpecificationTable } from '@/components/catalog/SpecificationTable';
import { InquiryModal } from '@/components/catalog/InquiryModal';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ProductCard } from '@/components/catalog/ProductCard';
import { generateProductJsonLd } from '@/lib/seo';
import { ArrowLeft, Beaker, ShieldCheck, Activity, AlertTriangle, Layers, Building2, HeartPulse, Package, Pill } from 'lucide-react';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} (${product.strength || ''}) - Specification & Technical Dossier`,
    description: `${product.name}. Active Salt: ${product.salt || 'Pharmaceutical Grade'}. Company: ${product.company.name}. Category: ${product.category.name}. Therapy: ${product.therapy.name}`,
    openGraph: {
      title: `${product.name} | Aegis BioPharma Catalog`,
      description: product.description,
      type: 'article',
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const jsonLd = generateProductJsonLd(product, siteUrl);

  return (
    <div className="py-8 bg-[#F4F8FB] min-h-screen">
      {/* SEO Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container size="lg">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Products', href: '/products' },
            { label: product.category.name, href: `/products?category=${product.category.slug}` },
            { label: product.name },
          ]}
          className="mb-4"
        />

        {/* Product Details Header Card */}
        <div className="bg-white border border-[#E2ECF3] rounded-3xl p-6 sm:p-10 shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Product Image Container */}
            <div className="lg:col-span-4 bg-[#F4F8FB] border border-[#E2ECF3] rounded-2xl p-6 flex flex-col items-center justify-center min-h-[280px] relative">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-64 object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-20 h-20 rounded-3xl bg-[#E8F5F1] text-[#0B6E4F] flex items-center justify-center border border-[#0B6E4F]/20 shadow-sm">
                    <Pill className="w-10 h-10 rotate-45" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                    {product.company.name}
                  </span>
                </div>
              )}

              <div className="absolute top-3 left-3">
                <Badge variant="primary" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                  Quality Validated
                </Badge>
              </div>
            </div>

            {/* Right: Product Details & Specs */}
            <div className="lg:col-span-8 space-y-5">
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary" icon={<Building2 className="w-3.5 h-3.5" />}>
                  Company: {product.company.name}
                </Badge>

                <Badge variant="outline" icon={<Layers className="w-3.5 h-3.5" />}>
                  Category: {product.category.name}
                </Badge>

                <Badge variant="accent" icon={<HeartPulse className="w-3.5 h-3.5" />}>
                  Therapy: {product.therapy.name}
                </Badge>
              </div>

              {/* Product Name */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                {product.name}
              </h1>

              {/* Salt Composition */}
              {product.salt && (
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#0B6E4F] bg-[#E8F5F1] px-4 py-2.5 rounded-xl border border-[#0B6E4F]/25 font-bold">
                  <Beaker className="w-4.5 h-4.5 flex-shrink-0" />
                  <span>Salt Composition: {product.salt}</span>
                </div>
              )}

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Strength & Pack Size Pills */}
              <div className="flex flex-wrap gap-4 pt-2">
                {product.strength && (
                  <div className="bg-[#F4F8FB] px-4 py-2.5 rounded-xl border border-[#E2ECF3] text-xs">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Formulation Strength:</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">{product.strength}</span>
                  </div>
                )}

                {product.pack && (
                  <div className="bg-[#F4F8FB] px-4 py-2.5 rounded-xl border border-[#E2ECF3] text-xs">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Pack Size / Packaging:</span>
                    <span className="font-semibold text-slate-900 text-sm">{product.pack}</span>
                  </div>
                )}
              </div>

              {/* Enquire CTAs (WhatsApp + Formal Inquiry Modal) */}
              <div className="pt-6 border-t border-[#E2ECF3] flex flex-wrap items-center gap-4">
                <WhatsAppButton productName={product.name} productSlug={product.slug} size="md" />

                <InquiryModal productTitle={product.name} productSlug={product.slug} />
              </div>
            </div>
          </div>
        </div>

        {/* Indications & Technical Specification Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-[#E2ECF3] rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#0B6E4F]" />
                <span>Description & Clinical Profile</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <SpecificationTable product={product} />
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 border-t border-[#E2ECF3]">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#0B6E4F]" />
              <span>Related Formulations in {product.category.name}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
