import Link from 'next/link';
import { Pill, ShieldCheck, Search } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Pill className="w-5 h-5 rotate-45" />
          </div>
          <div>
            <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              Aegis <span className="text-emerald-600 dark:text-emerald-400 font-normal">BioPharma</span>
            </span>
            <span className="block text-[10px] text-slate-500 dark:text-slate-400 tracking-wider uppercase font-semibold">
              Product Catalog & Regulatory Index
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <Link href="/products" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Search className="w-4 h-4" />
            Product Catalog
          </Link>
          <Link href="/category" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Dosage Categories
          </Link>
          <Link href="/therapy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Therapy Specialities
          </Link>
          <Link href="/company" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Companies
          </Link>
        </nav>
      </div>
    </header>
  );
}
