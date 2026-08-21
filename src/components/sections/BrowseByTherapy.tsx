import Link from 'next/link';
import { Therapy } from '@/types/catalog';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { HeartPulse, ArrowRight, ShieldAlert, Dna, Activity, Brain } from 'lucide-react';

interface BrowseByTherapyProps {
  therapies: Therapy[];
}

export function BrowseByTherapy({ therapies }: BrowseByTherapyProps) {
  const getTherapyIcon = (slug: string) => {
    if (slug.includes('anti-infectives')) return <ShieldAlert className="w-6 h-6 text-[#0B6E4F]" />;
    if (slug.includes('oncology')) return <Dna className="w-6 h-6 text-purple-600" />;
    if (slug.includes('gastro')) return <Activity className="w-6 h-6 text-amber-600" />;
    if (slug.includes('nervous')) return <Brain className="w-6 h-6 text-sky-600" />;
    return <HeartPulse className="w-6 h-6 text-[#2D9CDB]" />;
  };

  return (
    <section className="py-16 bg-white border-b border-[#E2ECF3]">
      <Container size="lg">
        <SectionHeading
          title="Browse by Therapy Area"
          icon={<HeartPulse className="w-4 h-4 text-[#0B6E4F]" />}
          action={
            <Link href="/therapy" className="text-xs font-bold text-[#0B6E4F] hover:underline inline-flex items-center gap-1">
              <span>All Therapy Specialities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {therapies.map(ther => (
            <Link key={ther.id} href={`/products?therapy=${ther.slug}`}>
              <Card hoverable variant="flat" className="h-full flex flex-col justify-between p-6">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#E2ECF3] flex items-center justify-center mb-4 shadow-sm">
                    {getTherapyIcon(ther.slug)}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0B6E4F] transition-colors">
                    {ther.name}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2ECF3] flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono text-slate-600">{ther.productCount || 8}+ Formulations</span>
                  <span className="font-semibold text-[#0B6E4F] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Index <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
