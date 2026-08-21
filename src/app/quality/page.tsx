import { QualityCertifications } from '@/components/sections/QualityCertifications';
import { ShieldCheck, Award, FileCheck2, Microchip, CheckCircle2, Factory } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quality Assurance & GMP Regulatory Compliance',
  description: 'Learn about our WHO-GMP certified facilities, HPLC analytical controls, eCTD dossier assistance, and ICH stability testing.',
};

export default function QualityPage() {
  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" />
          Regulatory Excellence & Audit Credentials
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Quality Control & Compliance Standards
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
          We maintain zero-compromise quality assurance protocols governed by cGMP, ICH guidelines, and pharmacopoeial monographs (USP, BP, Ph. Eur.).
        </p>
      </div>

      <QualityCertifications />

      {/* Quality Pillar Breakdown */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center">
                <Microchip className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Analytical Quality Control</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                State-of-the-art laboratory testing using High-Performance Liquid Chromatography (HPLC), Gas Chromatography (GC), and UV Spectrophotometry for potency validation.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-950 text-teal-400 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">eCTD Regulatory Dossiers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Complete CTD Module 1 to 5 documentation, Drug Master Files (DMF), and Certificate of Suitability (CEP) for smooth health authority approvals worldwide.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-950 text-sky-400 flex items-center justify-center">
                <Factory className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Sterile Manufacturing HVAC</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Class A laminar airflow hoods and positive-pressure cleanroom suites for sterile liquid parenteral & lyophilized powder vial production.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
