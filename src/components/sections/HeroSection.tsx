import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pill, ShieldCheck, Award, ArrowRight, Search, FileSpreadsheet, Globe2, Beaker, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#091E16] text-white pt-16 pb-24 border-b border-[#0F3A2B]">
      {/* Soft Ambient Radial Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0B6E4F]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2D9CDB]/20 rounded-full blur-3xl pointer-events-none" />

      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B6E4F]/40 border border-[#0B6E4F]/60 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>WHO-GMP & EU-GMP Certified Manufacturing Catalog</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Precision Formulations & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-[#2D9CDB] to-cyan-300">Pharmaceutical Index</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Explore our validated catalog of finished dosage forms (FDFs), sterile parenterals, oral film-coated solids, and active pharmaceutical ingredients (APIs) built for international procurement.
            </p>

            {/* Quick Search Bar Trigger */}
            <div className="pt-2 max-w-xl">
              <Link href="/products">
                <SearchBar
                  size="lg"
                  placeholder="Search 250+ INN formulations by generic name or CAS number..."
                  showKbdShortcut
                />
              </Link>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/products">
                <Button variant="primary" size="lg" className="shadow-lg shadow-[#0B6E4F]/30" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Browse Product Index
                </Button>
              </Link>

              <Link href="/contact">
                <Button variant="secondary" size="lg" className="bg-[#F4F8FB] text-slate-900 hover:bg-white" leftIcon={<FileSpreadsheet className="w-4 h-4" />}>
                  Request Full Catalog PDF
                </Button>
              </Link>
            </div>

            {/* Key Metrics Bar */}
            <div className="pt-8 border-t border-[#0F3A2B] grid grid-cols-3 gap-4">
              <div>
                <span className="block text-2xl font-extrabold text-white font-mono">250+</span>
                <span className="text-xs text-slate-400">Validated Formulations</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-[#2D9CDB] font-mono">60+</span>
                <span className="text-xs text-slate-400">Export Markets</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-emerald-400 font-mono">100%</span>
                <span className="text-xs text-slate-400">GMP & ISO Audited</span>
              </div>
            </div>
          </div>

          {/* Right Hero Graphic Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0D2B20] border border-[#144735] rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-[#144735] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono text-emerald-300 bg-[#0B6E4F]/40 px-2.5 py-0.5 rounded border border-[#0B6E4F]/60">
                  eCTD Index: 2026.Q3
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-[#091E16] rounded-2xl border border-[#144735] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0B6E4F] flex items-center justify-center text-white">
                      <Pill className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-white block">Amoxicillin & Clavulanate</span>
                      <span className="text-[10px] text-slate-400">625mg Film-Coated | Rx Only</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#0B6E4F]/30 text-emerald-300 px-2 py-0.5 rounded font-mono">USP Monograph</span>
                </div>

                <div className="p-3.5 bg-[#091E16] rounded-2xl border border-[#144735] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#2D9CDB] flex items-center justify-center text-white">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-white block">Paracetamol Ready-IV</span>
                      <span className="text-[10px] text-slate-400">10mg/ml (100ml) | Hospital</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#2D9CDB]/30 text-sky-300 px-2 py-0.5 rounded font-mono">Ph. Eur. Grade</span>
                </div>

                <div className="p-3.5 bg-[#091E16] rounded-2xl border border-[#144735] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white">
                      <Beaker className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-white block">Paclitaxel Injection 300mg</span>
                      <span className="text-[10px] text-slate-400">Oncology Infusion | Sterile</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded font-mono">Module 3 Ready</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#144735] flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-300 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  CTD Module 1-5 Available
                </span>
                <Link href="/products" className="text-[#2D9CDB] font-semibold hover:underline flex items-center gap-1">
                  <span>Explore Index</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
