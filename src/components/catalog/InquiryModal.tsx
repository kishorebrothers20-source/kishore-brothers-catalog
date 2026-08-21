'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { FileText, Send, CheckCircle2, AlertCircle, Building2, MapPin, Mail, User } from 'lucide-react';

interface InquiryModalProps {
  productTitle?: string;
  productSlug?: string;
}

export function InquiryModal({ productTitle, productSlug }: InquiryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    phone: '',
    subject: productTitle ? `Wholesale Quotation Request for ${productTitle}` : 'General Wholesale Trade Inquiry',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, productSlug }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Button variant="primary" size="lg" onClick={() => setIsOpen(true)} className="w-full sm:w-auto">
        <FileText className="w-4 h-4" />
        <span>Request Bulk Quotation</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  B2B Wholesale Product Inquiry
                </h3>
                <p className="text-xs text-slate-500">
                  {productTitle ? `Inquiry for ${productTitle}` : 'Kishore Brothers Trading Department'}
                </p>
              </div>
            </div>

            {status === 'success' ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Inquiry Received</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
                  Thanks for Submitting your response, our team will get in touch with you shortly
                </p>
                <Button variant="outline" size="sm" onClick={() => setIsOpen(false)} className="mt-4">
                  Close Window
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Contact Name *</label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        required
                        type="text"
                        placeholder="Chemist / Distributor Name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/40"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        required
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/40"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Firm / Shop Name *</label>
                    <div className="relative">
                      <Building2 className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        required
                        type="text"
                        placeholder="Kishore Medicos / Hospital"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/40"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">State / City of Delivery *</label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        required
                        type="text"
                        placeholder="Chandigarh / Punjab / Haryana"
                        value={formData.country}
                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/40"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Inquiry Details & Quantity Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Specify batch quantity requirements, box counts, or delivery notes..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>

                {status === 'error' && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 rounded-lg flex items-center gap-2 text-xs">
                    <AlertCircle className="w-4 h-4" />
                    <span>Failed to submit inquiry. Please retry.</span>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" disabled={status === 'submitting'}>
                    <Send className="w-3.5 h-3.5" />
                    <span>{status === 'submitting' ? 'Submitting Request...' : 'Submit Inquiry'}</span>
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
