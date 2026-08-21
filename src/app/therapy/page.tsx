import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CategoryGrid } from '@/components/sections/CategoryGrid';
import { getCategories } from '@/lib/db/catalog';
import { HeartPulse } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Therapy Specialities & Medical Indications',
  description: 'Browse pharmaceutical formulations grouped by therapeutic specialities including anti-infectives, cardiology, oncology, and CNS.',
};

export default async function TherapyPage() {
  const categories = await getCategories();

  return (
    <div className="py-8 bg-[#F4F8FB] min-h-screen">
      <Container size="lg">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Therapy Wise' }]} className="mb-4" />

        {/* Section Heading */}
        <SectionHeading
          eyebrow="Medical Speciality Index"
          title="Therapeutic Areas & Indications"
          description="Browse pharmaceutical products organized by clinical field and therapeutic classification."
          icon={<HeartPulse className="w-4 h-4 text-[#0B6E4F]" />}
        />

        {/* Category Grid Section */}
        <CategoryGrid categories={categories} />
      </Container>
    </div>
  );
}
