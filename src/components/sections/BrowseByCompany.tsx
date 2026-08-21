import Link from 'next/link';
import { Company } from '@/types/catalog';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Building2, ArrowRight } from 'lucide-react';

interface BrowseByCompanyProps {
  companies: Company[];
}

export function BrowseByCompany({ companies }: BrowseByCompanyProps) {
  return (
    <section className="py-16 bg-[#F4F8FB] border-b border-[#E2ECF3]">
      <Container size="lg">
        <SectionHeading
          title="Browse By Company"
          icon={<Building2 className="w-4 h-4 text-[#0B6E4F]" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.map(comp => (
            <Link key={comp.id} href={`/products?company=${comp.slug}`}>
              <Card hoverable className="p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#E8F5F1] text-[#0B6E4F] flex items-center justify-center font-extrabold text-xl shadow-sm border border-[#0B6E4F]/20 flex-shrink-0">
                    {comp.name[0]}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0B6E4F] transition-colors">
                      {comp.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-mono text-slate-400">
                        {comp.productCount || 12}+ Formulations
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-bold text-[#0B6E4F] flex items-center gap-1 group-hover:translate-x-1 transition-transform self-end sm:self-center">
                  <span>Explore Index</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
