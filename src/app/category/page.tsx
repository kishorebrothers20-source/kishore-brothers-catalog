import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getCategories } from '@/lib/db/catalog';
import Link from 'next/link';
import { Layers, Pill, Syringe, Droplet, ArrowRight, ShieldCheck } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dosage Form Categories & Formulations',
  description: 'Explore pharmaceutical formulations organized by dosage forms: film-coated tablets, parenterals, syrups, and capsules.',
};

export default async function CategoryPage() {
  const categories = await getCategories();

  const getDosageIcon = (slug: string) => {
    if (slug.includes('injectable') || slug.includes('vials')) return <Syringe className="w-6 h-6 text-[#2D9CDB]" />;
    if (slug.includes('infusion') || slug.includes('suspension')) return <Droplet className="w-6 h-6 text-teal-600" />;
    return <Pill className="w-6 h-6 text-[#0B6E4F]" />;
  };

  return (
    <div className="py-8 bg-[#F4F8FB] min-h-screen">
      <Container size="lg">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Category' }]} className="mb-4" />

        {/* Header */}
        <SectionHeading
          eyebrow="Formulation Delivery Methods"
          title="Category"
          description="Explore our validated formulations categorized by dosage delivery system and pharmaceutical release profile."
          icon={<Layers className="w-4 h-4 text-[#0B6E4F]" />}
        />

        {/* Dosage Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((cat: any) => (
            <Card key={cat.id} hoverable className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F4F8FB] border border-[#E2ECF3] flex items-center justify-center mb-4">
                  {getDosageIcon(cat.slug)}
                </div>
                <CardHeader>
                  <CardTitle>{cat.name}</CardTitle>
                  <CardDescription>Pharmacopoeial monograph validated delivery form.</CardDescription>
                </CardHeader>
              </div>

              <CardFooter className="pt-4 border-t border-[#E2ECF3]">
                <Badge variant="primary" icon={<ShieldCheck className="w-3 h-3" />}>
                  Monograph Validated
                </Badge>
                <Link href={`/products?category=${cat.slug}`}>
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    View Catalog
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
