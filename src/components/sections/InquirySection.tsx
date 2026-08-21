import { InquiryModal } from '@/components/catalog/InquiryModal';
import { Mail, PhoneCall, Globe2, Building2, FileCheck2, Lock } from 'lucide-react';

export function InquirySection() {
  return (
    <section className="py-20 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <FileCheck2 className="w-4 h-4" />
              B2B Sourcing & Regulatory Dossiers
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Request Technical Specifications, COA & eCTD Dossiers
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Are you a pharmaceutical importer, hospital procurement board, or generic drug distributor? Submit your inquiry to access complete Certificate of Analysis (COA), stability data, and registration dossier assistance.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">Regulatory Email</span>
                  <span className="font-mono text-white">regulatory@aegisbiopharma.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-teal-400 flex items-center justify-center">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] uppercase font-bold">B2B Procurement Hotline</span>
                  <span className="font-mono text-white">+1 (800) 555-PHARMA / +49 89 2018 4400</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <Building2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Instant B2B Dossier Request</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Fill out our secure procurement form to receive formal batch quotes, stability protocols, and sample availability.
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <InquiryModal />
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Strictly confidential B2B healthcare inquiries only</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
