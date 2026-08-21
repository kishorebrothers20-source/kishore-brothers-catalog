import { ShieldCheck, Award, FileCheck, CheckCircle2, Globe2, Building } from 'lucide-react';

export function QualityCertifications() {
  const certifications = [
    {
      title: 'c-GMP Quality Certification',
      body: 'Good Manufacturing Practices validation for sterile & non-sterile production facilities.',
      authority: 'Regulatory Health Authority',
      code: 'cGMP-2026-REG',
    },
    {
      title: 'EU-GMP Compliance',
      body: 'European Union EudraGMDP certified manufacturing lines ensuring regulatory approval across EU member states.',
      authority: 'European Medicines Agency (EMA)',
      code: 'EU-GMP-DE-8821',
    },
    {
      title: 'ISO 9001:2015 Quality Management',
      body: 'Internationally recognized quality management standards across analytical testing, storage, and supply chain.',
      authority: 'TÜV SÜD International',
      code: 'ISO-9001-QUAL-99',
    },
    {
      title: 'US-FDA Establishment Inspection',
      body: 'Registered facility for active pharmaceutical ingredient (API) and finished drug product exports.',
      authority: 'US Food and Drug Administration',
      code: 'FDA-FEI-30099812',
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Quality Assurance & Global Regulatory Compliance
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Audited & Certified Manufacturing Facilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every batch produced undergoes rigorous chromatographic testing (HPLC, GC-MS), microbial limit testing, and stability testing according to ICH guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6 relative flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{cert.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{cert.body}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/60 space-y-1">
                <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Issuing Authority:
                </span>
                <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {cert.authority}
                </span>
                <span className="inline-block text-[10px] font-mono bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 mt-1">
                  Ref: {cert.code}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
