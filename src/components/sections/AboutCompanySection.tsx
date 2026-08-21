import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Award, Factory, Microchip, ArrowRight, CheckCircle2 } from 'lucide-react';

export function AboutCompanySection() {
  return (
    <section className="py-16 bg-[#F4F8FB] border-b border-[#E2ECF3]">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              eyebrow="Corporate Quality Commitment"
              title="About Aegis BioPharma Systems"
              description="A validated pharmaceutical manufacturing enterprise producing high-purity active ingredients, film-coated tablets, and sterile parenterals for global healthcare networks."
              icon={<ShieldCheck className="w-4 h-4 text-[#0B6E4F]" />}
            />

            <ul className="space-y-3 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0B6E4F] flex-shrink-0" />
                <span>Certified Production Facilities</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0B6E4F] flex-shrink-0" />
                <span>ISO Class 5 Cleanroom Parenteral & Infusion Packaging Lines</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0B6E4F] flex-shrink-0" />
                <span>In-House HPLC, GC-MS & Dissolution Testing Control Labs</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0B6E4F] flex-shrink-0" />
                <span>Complete eCTD Module 1–5 Registration Dossiers</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link href="/about">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Learn More About Aegis BioPharma
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card variant="primary" className="p-6">
              <div className="w-10 h-10 rounded-xl bg-[#0B6E4F] text-white flex items-center justify-center mb-3">
                <Factory className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">4 Manufacturing Sites</h4>
              <p className="text-xs text-slate-600 mt-1">Specialized parenteral, tablet, and API plants across Europe.</p>
            </Card>

            <Card variant="accent" className="p-6">
              <div className="w-10 h-10 rounded-xl bg-[#2D9CDB] text-white flex items-center justify-center mb-3">
                <Microchip className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">HPLC Analytical Control</h4>
              <p className="text-xs text-slate-600 mt-1">Monograph testing ensuring 99.9% purity thresholds.</p>
            </Card>

            <Card variant="flat" className="p-6 sm:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0B6E4F] flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-slate-900">ISO 9001:2015 Quality Certified</span>
                  <span className="text-xs text-slate-500">Strict compliance with ICH Q7/Q8 regulatory quality guidelines.</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
