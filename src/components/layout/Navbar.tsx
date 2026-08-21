'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { GlobalSearchModal } from '@/components/layout/GlobalSearchModal';
import { Pill, Menu, X, Search, Layers, Building2, HeartPulse, Command } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  icon?: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products', icon: <Pill className="w-3.5 h-3.5" /> },
  { label: 'Companies', href: '/search/company', icon: <Building2 className="w-3.5 h-3.5" /> },
  { label: 'Categories', href: '/search/category', icon: <Layers className="w-3.5 h-3.5" /> },
  { label: 'Therapies', href: '/therapy', icon: <HeartPulse className="w-3.5 h-3.5" /> },
  { label: 'Admin', href: '/admin', badge: 'Control' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Global Keyboard Shortcut listener (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2ECF3] shadow-sm">
      {/* Global Search Modal Overlay */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />

      <Container size="lg">
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Brand Logo - Kishore Brothers */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#0B6E4F] flex items-center justify-center text-white shadow-md shadow-[#0B6E4F]/20 group-hover:scale-105 transition-transform duration-200">
              <Pill className="w-5 h-5 rotate-45" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight flex items-center gap-1">
                Kishore <span className="text-[#0B6E4F] font-semibold">Brothers</span>
              </span>
              <span className="block text-[9px] text-slate-500 font-semibold tracking-wider uppercase">
                Wholesale Medicines Trading Catalog
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-600">
            {NAV_ITEMS.map(item => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1 py-1 transition-colors relative ${
                    isActive ? 'text-[#0B6E4F] font-bold' : 'hover:text-[#0B6E4F]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant={isActive ? 'primary' : 'secondary'} size="sm">
                      {item.badge}
                    </Badge>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0B6E4F] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Global Search Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F4F8FB] hover:bg-[#E8F5F1] border border-[#E2ECF3] hover:border-[#0B6E4F]/30 text-slate-600 hover:text-[#0B6E4F] transition-all text-xs font-medium shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-[#0B6E4F]" />
              <span className="hidden sm:inline">Search Medicines...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono text-slate-400 font-bold bg-white px-1.5 py-0.5 rounded border border-[#E2ECF3]">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-[#F4F8FB] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2ECF3] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <nav className="grid grid-cols-2 gap-1.5">
            {NAV_ITEMS.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    isActive ? 'bg-[#E8F5F1] text-[#0B6E4F]' : 'text-slate-700 hover:bg-[#F4F8FB]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.icon}
                    {item.label}
                  </span>
                  {item.badge && <Badge variant="primary" size="sm">{item.badge}</Badge>}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
