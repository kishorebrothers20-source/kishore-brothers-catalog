import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Pill, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#091E16] text-slate-300 border-t border-[#0F3A2B] pt-10 pb-8">
      <Container size="lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-[#0F3A2B] items-start">
          {/* Brand & Address Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0B6E4F] flex items-center justify-center text-white shadow-sm">
                <Pill className="w-5 h-5 rotate-45" />
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1">
                  Kishore <span className="text-[#2D9CDB] font-normal">Brothers</span>
                </span>
                <span className="block text-[10px] text-slate-400 font-mono">Wholesale Medicines Trading Firm</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-400 pt-2 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0B6E4F] flex-shrink-0 mt-0.5" />
                <span>Shop number 226/3 Burail, Sector 45 Chandigarh, Near Oberoi Banquet</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2D9CDB] flex-shrink-0" />
                <a href="tel:9317604151" className="hover:text-white transition-colors">
                  +91 9317604151
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="mailto:kishorebrothers20@gmail.com" className="hover:text-white transition-colors">
                  kishorebrothers20@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-7 flex flex-wrap items-center justify-start md:justify-end gap-6 text-xs font-semibold text-slate-400 self-center">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/products" className="hover:text-white transition-colors">
              Products
            </Link>
            <Link href="/search/company" className="hover:text-white transition-colors">
              Companies
            </Link>
            <Link href="/search/category" className="hover:text-white transition-colors">
              Categories
            </Link>
            <Link href="/therapy" className="hover:text-white transition-colors">
              Therapies
            </Link>
            <Link href="/admin" className="hover:text-white transition-colors">
              Admin
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-3">
          <span>© {currentYear} Kishore Brothers. All rights reserved.</span>
          <span>Wholesale Medicines Trading — Chandigarh, India</span>
        </div>
      </Container>
    </footer>
  );
}
