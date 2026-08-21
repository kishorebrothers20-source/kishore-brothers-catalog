'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { SearchBar } from '@/components/ui/SearchBar';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Skeleton, SkeletonCard, SkeletonGrid } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Pill,
  ShieldCheck,
  Award,
  Search,
  Mail,
  User,
  Building2,
  Send,
  Sparkles,
  Layers,
  Activity,
  Beaker,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
} from 'lucide-react';

export default function DesignSystemShowcasePage() {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'buttons' | 'cards' | 'inputs' | 'feedback'>('all');

  const triggerButtonLoading = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 2000);
  };

  const triggerSearchLoading = (val: string) => {
    setSearchValue(val);
    if (val) {
      setIsSearchLoading(true);
      setTimeout(() => setIsSearchLoading(false), 800);
    }
  };

  return (
    <div className="bg-[#F4F8FB] min-h-screen pb-16">
      {/* Design System Header Banner */}
      <div className="bg-[#091E16] text-white py-12 border-b border-[#0F3A2B] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0B6E4F]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#2D9CDB]/15 rounded-full blur-3xl pointer-events-none" />

        <Container size="lg" className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B6E4F] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>UI Design System v1.0</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                BioPharma <span className="text-[#2D9CDB]">Design System</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                A clean, modern, medical design system built with primary emerald <code className="text-emerald-300 font-mono bg-emerald-950 px-1.5 py-0.5 rounded">#0B6E4F</code>, clinical background <code className="text-sky-300 font-mono bg-sky-950 px-1.5 py-0.5 rounded">#F4F8FB</code>, and azure accent <code className="text-sky-300 font-mono bg-sky-950 px-1.5 py-0.5 rounded">#2D9CDB</code>.
              </p>
            </div>

            {/* Color Palette Chips */}
            <div className="bg-[#0D2B20] border border-[#144735] rounded-2xl p-4 space-y-2 flex-shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Color Palette Tokens:
              </span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-[#0B6E4F] text-white text-[11px] font-mono px-2.5 py-1 rounded-lg shadow">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  #0B6E4F
                </div>
                <div className="flex items-center gap-1.5 bg-[#F4F8FB] text-slate-900 text-[11px] font-mono px-2.5 py-1 rounded-lg border border-slate-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0B6E4F]" />
                  #F4F8FB
                </div>
                <div className="flex items-center gap-1.5 bg-[#2D9CDB] text-white text-[11px] font-mono px-2.5 py-1 rounded-lg shadow">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  #2D9CDB
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container size="lg" className="py-12 space-y-16">
        {/* Navigation / Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E2ECF3]">
          {(['all', 'buttons', 'cards', 'inputs', 'feedback'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#0B6E4F] text-white shadow-md shadow-[#0B6E4F]/20'
                  : 'bg-white text-slate-600 hover:bg-[#E8F5F1] hover:text-[#0B6E4F] border border-[#E2ECF3]'
              }`}
            >
              {tab === 'all' ? 'All Components' : tab}
            </button>
          ))}
        </div>

        {/* SECTION 1: BUTTONS */}
        {(activeTab === 'all' || activeTab === 'buttons') && (
          <section className="space-y-6">
            <SectionHeading
              eyebrow="Interactive Primitives"
              title="Button Component"
              description="Primary (#0B6E4F), Secondary (#F4F8FB), Accent (#2D9CDB), Outline, Ghost, and Danger variants with icons and loading states."
              icon={<Layers className="w-4 h-4" />}
            />

            <div className="bg-white border border-[#E2ECF3] rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm">
              {/* Variants */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Button Variants
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary (#0B6E4F)</Button>
                  <Button variant="secondary">Secondary (#F4F8FB)</Button>
                  <Button variant="accent">Accent (#2D9CDB)</Button>
                  <Button variant="outline">Outline Variant</Button>
                  <Button variant="ghost">Ghost Variant</Button>
                  <Button variant="danger">Danger Variant</Button>
                </div>
              </div>

              {/* Sizes & Icons */}
              <div className="space-y-3 pt-4 border-t border-[#E2ECF3]">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Sizes & Icon Extensions
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="sm" leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}>
                    Small (sm)
                  </Button>
                  <Button variant="primary" size="md" leftIcon={<Beaker className="w-4 h-4" />}>
                    Medium Default (md)
                  </Button>
                  <Button variant="primary" size="lg" rightIcon={<Send className="w-4 h-4" />}>
                    Large CTA (lg)
                  </Button>
                  <Button
                    variant="accent"
                    size="md"
                    isLoading={buttonLoading}
                    onClick={triggerButtonLoading}
                  >
                    {buttonLoading ? 'Processing Request' : 'Click to Test Loading State'}
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: CARDS */}
        {(activeTab === 'all' || activeTab === 'cards') && (
          <section className="space-y-6">
            <SectionHeading
              eyebrow="Content Layout"
              title="Card Component System"
              description="Rounded corners (rounded-2xl / rounded-3xl), soft clinical shadows, and hover elevation micro-animations."
              icon={<Layers className="w-4 h-4" />}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Default Card */}
              <Card hoverable>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="primary">Rx Only</Badge>
                    <span className="text-[10px] font-mono text-slate-400">CAS: 61336-70-7</span>
                  </div>
                  <CardTitle className="pt-2">Amoxicillin & Clavulanate 625mg</CardTitle>
                  <CardDescription>Broad-spectrum antibacterial formulation for upper respiratory tract infections.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-[#F4F8FB] rounded-xl border border-[#E2ECF3] text-xs space-y-1">
                    <div className="flex justify-between text-slate-700">
                      <span className="font-semibold">Amoxicillin Trihydrate</span>
                      <span className="font-mono text-[#0B6E4F] font-bold">500 mg</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span className="font-semibold">Potassium Clavulanate</span>
                      <span className="font-mono text-[#0B6E4F] font-bold">125 mg</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <span className="text-xs text-slate-400">Packaging: Alu-Alu Strip</span>
                  <Button variant="outline" size="sm">
                    View Specs
                  </Button>
                </CardFooter>
              </Card>

              {/* Accent Gradient Card */}
              <Card variant="accent" hoverable>
                <CardHeader>
                  <Badge variant="accent">Hospital / ICU Only</Badge>
                  <CardTitle className="pt-2">Paracetamol Ready-IV 100ml</CardTitle>
                  <CardDescription>Iso-osmotic sterile infusion solution for rapid pain & fever reduction.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-white/80 rounded-xl border border-[#2D9CDB]/20 text-xs">
                    <span className="block text-[10px] uppercase font-bold text-[#2D9CDB]">Concentration:</span>
                    <span className="font-mono text-slate-800 font-bold">10 mg / ml (1000 mg total)</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <span className="text-xs text-slate-500">Ph. Eur. Monograph</span>
                  <Button variant="accent" size="sm">
                    Request Dossier
                  </Button>
                </CardFooter>
              </Card>

              {/* Primary Gradient Card */}
              <Card variant="primary" hoverable>
                <CardHeader>
                  <Badge variant="success" icon={<ShieldCheck className="w-3 h-3" />}>
                    WHO-GMP Certified
                  </Badge>
                  <CardTitle className="pt-2">Quality & Audit Credential</CardTitle>
                  <CardDescription>Certified sterile parenteral facility meeting EU-GMP & WHO guidelines.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Batch analysis reports with complete HPLC purity chromatograms and 24-month stability data.
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="text-xs font-bold text-[#0B6E4F]">Validated 2026</span>
                  <Button variant="primary" size="sm">
                    Audit Report
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>
        )}

        {/* SECTION 3: INPUTS & SEARCH BAR */}
        {(activeTab === 'all' || activeTab === 'inputs') && (
          <section className="space-y-6">
            <SectionHeading
              eyebrow="Form Controls"
              title="Input & Search Bar Components"
              description="Clean input fields with medical green focus rings, icon slots, error states, and responsive search bars."
              icon={<Search className="w-4 h-4" />}
            />

            <div className="bg-white border border-[#E2ECF3] rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm">
              {/* Search Bar Variants */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  SearchBar Sizes & States
                </h4>
                <div className="space-y-4 max-w-2xl">
                  <SearchBar
                    size="lg"
                    placeholder="Search by INN generic name, CAS number, or therapeutic area (Large)"
                    value={searchValue}
                    onChange={triggerSearchLoading}
                    isLoading={isSearchLoading}
                  />
                  <SearchBar
                    size="md"
                    placeholder="Standard medium search bar..."
                  />
                </div>
              </div>

              {/* Form Input Primitives */}
              <div className="space-y-4 pt-6 border-t border-[#E2ECF3]">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Input Variants & States
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Contact Full Name"
                    placeholder="Dr. Sarah Jenkins"
                    required
                    leftIcon={<User className="w-4 h-4" />}
                  />
                  <Input
                    label="Corporate Email Address"
                    type="email"
                    placeholder="s.jenkins@pharma.com"
                    required
                    leftIcon={<Mail className="w-4 h-4" />}
                  />
                  <Input
                    label="Organization Name"
                    placeholder="BioHealth Global Inc."
                    leftIcon={<Building2 className="w-4 h-4" />}
                    helperText="Specify licensed medical distributor or hospital name"
                  />
                  <Input
                    label="Import Registration ID"
                    placeholder="REG-8891-EU"
                    error="Registration ID format is required for verification"
                    leftIcon={<AlertCircle className="w-4 h-4" />}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: BADGES, SKELETONS & EMPTY STATES */}
        {(activeTab === 'all' || activeTab === 'feedback') && (
          <section className="space-y-6">
            <SectionHeading
              eyebrow="Feedback & Indicators"
              title="Badge, Skeleton & Empty State"
              description="Status pills, pulse skeleton shimmer loaders, and clinical empty states."
              icon={<Activity className="w-4 h-4" />}
            />

            {/* Badges Grid */}
            <div className="bg-white border border-[#E2ECF3] rounded-3xl p-6 space-y-4 shadow-sm">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Badge Variants & Pulsing Indicators
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary" dot>Primary (#0B6E4F)</Badge>
                <Badge variant="secondary">Secondary (#F4F8FB)</Badge>
                <Badge variant="accent" dot>Accent (#2D9CDB)</Badge>
                <Badge variant="success" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>WHO-GMP Verified</Badge>
                <Badge variant="warning" icon={<Clock className="w-3.5 h-3.5" />}>Dossier Pending</Badge>
                <Badge variant="danger" icon={<AlertCircle className="w-3.5 h-3.5" />}>Prescription Only</Badge>
                <Badge variant="outline">Monograph USP</Badge>
              </div>
            </div>

            {/* Loading Skeletons */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Loading Skeleton Component Shimmer
              </h4>
              <SkeletonGrid count={3} />
            </div>

            {/* Empty States */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Empty State Component
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EmptyState
                  type="search"
                  actionLabel="Reset Search Parameters"
                  onAction={() => alert('Search filters reset!')}
                />
                <EmptyState
                  type="products"
                  title="No Oncology Products Listed"
                  description="There are currently no active formulations registered in this therapeutic category."
                  actionLabel="Browse All Categories"
                  onAction={() => alert('Redirecting to categories...')}
                />
              </div>
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
