'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { SearchBar } from '@/components/ui/SearchBar';
import { Badge } from '@/components/ui/Badge';
import { ProductFormModal } from '@/components/admin/ProductFormModal';
import { BulkImportModal } from '@/components/admin/BulkImportModal';
import { MOCK_PRODUCTS, MOCK_COMPANIES, MOCK_CATEGORIES, MOCK_THERAPIES } from '@/lib/db/catalog';
import { Product, Company, Category, Therapy } from '@/types/catalog';
import {
  LayoutDashboard,
  Pill,
  Building2,
  Layers,
  HeartPulse,
  Image as ImageIcon,
  Settings,
  Plus,
  Search,
  Edit,
  Trash2,
  ShieldCheck,
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  Database,
  ArrowUpRight,
  TrendingUp,
  Mail,
  User,
  Globe,
  Sliders,
  Save,
  X,
  LogOut,
  Lock,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    setHasMounted(true);
    if (typeof window !== 'undefined' && localStorage.getItem('kb_admin_authed') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    // Validate admin credentials (accepts Kishorebrother20@gmail.com / admin or any valid password input)
    if (
      (loginEmail.trim().toLowerCase() === 'kishorebrothers20@gmail.com' || loginEmail.trim().length > 3) &&
      loginPassword.trim().length >= 3
    ) {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('kb_admin_authed', 'true');
      }
    } else {
      setLoginError('Invalid email or password. Please use authorized admin credentials.');
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kb_admin_authed');
    }
  };

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'companies' | 'categories' | 'therapies' | 'media' | 'settings'
  >('dashboard');

  const [productsList, setProductsList] = useState<Product[]>(MOCK_PRODUCTS);
  const [companiesList, setCompaniesList] = useState(MOCK_COMPANIES);
  const [categoriesList, setCategoriesList] = useState(MOCK_CATEGORIES);
  const [therapiesList, setTherapiesList] = useState(MOCK_THERAPIES);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isBulkImportModalOpen, setIsBulkImportModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isTherapyModalOpen, setIsTherapyModalOpen] = useState(false);
  const [newTherapyName, setNewTherapyName] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingTherapy, setEditingTherapy] = useState<Therapy | null>(null);

  const handleOpenAddCompany = () => {
    setEditingCompany(null);
    setNewCompanyName('');
    setIsCompanyModalOpen(true);
  };

  const handleOpenEditCompany = (comp: Company) => {
    setEditingCompany(comp);
    setNewCompanyName(comp.name);
    setIsCompanyModalOpen(true);
  };

  const handleDeleteCompany = (companyId: string) => {
    if (confirm('Are you sure you want to delete this company?')) {
      setCompaniesList(prev => prev.filter(c => c.id !== companyId));
    }
  };

  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setNewCategoryName('');
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setNewCategoryName(cat.name);
    setIsCategoryModalOpen(true);
  };

  const handleDeleteCategory = (catId: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategoriesList(prev => prev.filter(c => c.id !== catId));
    }
  };

  const handleOpenAddTherapy = () => {
    setEditingTherapy(null);
    setNewTherapyName('');
    setIsTherapyModalOpen(true);
  };

  const handleOpenEditTherapy = (ther: Therapy) => {
    setEditingTherapy(ther);
    setNewTherapyName(ther.name);
    setIsTherapyModalOpen(true);
  };

  const handleDeleteTherapy = (therId: string) => {
    if (confirm('Are you sure you want to delete this therapy area?')) {
      setTherapiesList(prev => prev.filter(t => t.id !== therId));
    }
  };

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({
    siteName: 'Kishore Brothers Trading Firm',
    contactEmail: 'kishorebrothers20@gmail.com',
    contactPhone: '+91 9317604151',
    gmpLicense: 'KB-WHOLESALE-CHD-2026',
    exportDbStatus: 'PostgreSQL Ready',
  });

  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (editingProduct) {
      setProductsList(prev =>
        prev.map(p =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...productData,
                company: companiesList.find(c => c.id === productData.companyId) || p.company,
                category: categoriesList.find(c => c.id === productData.categoryId) || p.category,
                therapy: therapiesList.find(t => t.id === productData.therapyId) || p.therapy,
              }
            : p
        )
      );
    } else {
      const company = companiesList.find(c => c.id === productData.companyId) || companiesList[0];
      const category = categoriesList.find(c => c.id === productData.categoryId) || categoriesList[0];
      const therapy = therapiesList.find(t => t.id === productData.therapyId) || therapiesList[0];

      const newProd: Product = {
        id: productData.id || `prod-${Date.now()}`,
        name: productData.name || 'New Formulation',
        slug: productData.slug || `new-formulation-${Date.now()}`,
        image: productData.image,
        salt: productData.salt,
        description: productData.description || '',
        strength: productData.strength,
        pack: productData.pack,
        companyId: company.id,
        company,
        categoryId: category.id,
        category,
        therapyId: therapy.id,
        therapy,
        isFeatured: true,
      };

      setProductsList(prev => [newProd, ...prev]);
    }
  };

  const handleBulkImportComplete = (importedProducts: Product[]) => {
    setProductsList(prev => [...importedProducts, ...prev]);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to remove this formulation from the catalog?')) {
      setProductsList(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const navTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'products', label: 'Products', icon: <Pill className="w-4 h-4" />, count: productsList.length },
    { id: 'companies', label: 'Companies', icon: <Building2 className="w-4 h-4" />, count: companiesList.length },
    { id: 'categories', label: 'Categories', icon: <Layers className="w-4 h-4" />, count: categoriesList.length },
    { id: 'therapies', label: 'Therapies', icon: <HeartPulse className="w-4 h-4" />, count: therapiesList.length },
    { id: 'media', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-[#F4F8FB] flex items-center justify-center p-4">
        <div className="flex items-center gap-2 text-slate-500 font-medium text-xs">
          <Loader2 className="w-5 h-5 animate-spin text-[#0B6E4F]" />
          <span>Loading Admin Portal...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4F8FB] flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6">
          <Card className="p-8 shadow-xl bg-white rounded-3xl border border-[#E2ECF3]">
            <div className="text-center space-y-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F5F1] text-[#0B6E4F] flex items-center justify-center mx-auto shadow-sm border border-[#0B6E4F]/20">
                <Pill className="w-8 h-8 rotate-45" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Kishore <span className="text-[#0B6E4F]">Brothers</span>
                </h1>
                <p className="text-xs text-slate-500 font-semibold mt-1 uppercase tracking-wider">
                  Admin Panel Sign In
                </p>
              </div>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4 text-xs">
              {loginError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <Input
                label="Admin Email Address"
                type="email"
                placeholder="kishorebrothers20@gmail.com"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                leftIcon={<Lock className="w-4 h-4" />}
                className="mt-2"
              >
                Sign In to Admin Portal
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-[#E2ECF3] text-center text-[11px] text-slate-400">
              <span className="block font-mono bg-[#F4F8FB] p-2 rounded-xl text-slate-600 border border-[#E2ECF3]">
                Demo Admin: <strong>kishorebrothers20@gmail.com</strong> | Pass: <strong>admin</strong>
              </span>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F8FB] pb-16">
      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        initialData={editingProduct}
        companies={companiesList}
        categories={categoriesList}
        therapies={therapiesList}
      />

      {/* Bulk Import Excel / CSV Modal */}
      <BulkImportModal
        isOpen={isBulkImportModalOpen}
        onClose={() => setIsBulkImportModalOpen(false)}
        onImportComplete={handleBulkImportComplete}
        companies={companiesList}
        categories={categoriesList}
        therapies={therapiesList}
      />

      <Container size="lg" className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SIDEBAR NAVIGATION */}
          <aside className="lg:col-span-3 bg-white border border-[#E2ECF3] rounded-3xl p-4 shadow-sm space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-[#E2ECF3] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Management Portal
                </span>
                <span className="text-xs font-bold text-[#0B6E4F]">Kishore Brothers Admin</span>
              </div>
            </div>

            <nav className="space-y-1">
              {navTabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#0B6E4F] text-white shadow-md shadow-[#0B6E4F]/20'
                        : 'text-slate-700 hover:bg-[#F4F8FB] hover:text-[#0B6E4F]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {tab.icon}
                      {tab.label}
                    </span>
                    {tab.count !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-[#F4F8FB] text-slate-600 border border-[#E2ECF3]'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Sign Out Button */}
            <div className="pt-3 border-t border-[#E2ECF3]">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors border border-rose-100"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out Admin</span>
              </button>
            </div>
          </aside>

          {/* MAIN DASHBOARD CONTENT AREA */}
          <main className="lg:col-span-9 space-y-8">
            {/* 1. DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">Dashboard Overview</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      System summary metrics, active catalog listings, and recent B2B inquiry logs.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Building2 className="w-3.5 h-3.5 text-[#0B6E4F]" />}
                      onClick={() => setIsCompanyModalOpen(true)}
                    >
                      Add Company
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Layers className="w-3.5 h-3.5 text-[#0B6E4F]" />}
                      onClick={() => setIsCategoryModalOpen(true)}
                    >
                      Add Category
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<HeartPulse className="w-3.5 h-3.5 text-[#0B6E4F]" />}
                      onClick={() => setIsTherapyModalOpen(true)}
                    >
                      Add Therapy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<FileSpreadsheet className="w-3.5 h-3.5 text-[#0B6E4F]" />}
                      onClick={() => setIsBulkImportModalOpen(true)}
                    >
                      Bulk Import
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<Plus className="w-3.5 h-3.5" />}
                      onClick={handleOpenAddProduct}
                    >
                      Add Product
                    </Button>
                  </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card variant="primary" className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Products</span>
                      <Pill className="w-5 h-5 text-[#0B6E4F]" />
                    </div>
                    <span className="block text-3xl font-extrabold text-slate-900 font-mono mt-2">
                      {productsList.length}
                    </span>
                    <span className="text-[11px] text-[#0B6E4F] font-semibold flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3.5 h-3.5" /> +3 Added This Week
                    </span>
                  </Card>

                  <Card variant="accent" className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Companies</span>
                      <Building2 className="w-5 h-5 text-[#2D9CDB]" />
                    </div>
                    <span className="block text-3xl font-extrabold text-slate-900 font-mono mt-2">
                      {companiesList.length}
                    </span>
                    <span className="text-[11px] text-[#2D9CDB] font-semibold flex items-center gap-1 mt-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> All Certified Suppliers
                    </span>
                  </Card>

                  <Card variant="default" className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Categories</span>
                      <Layers className="w-5 h-5 text-slate-600" />
                    </div>
                    <span className="block text-3xl font-extrabold text-slate-900 font-mono mt-2">
                      {categoriesList.length}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium mt-1">Dosage Formulations</span>
                  </Card>

                  <Card variant="flat" className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Therapies</span>
                      <HeartPulse className="w-5 h-5 text-[#0B6E4F]" />
                    </div>
                    <span className="block text-3xl font-extrabold text-slate-900 font-mono mt-2">
                      {therapiesList.length}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium mt-1">Clinical Indications</span>
                  </Card>
                </div>

                {/* Recent Products Overview Table */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4 border-b border-[#E2ECF3] pb-3">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Recent Products Index
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('products')}>
                      View All
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#E2ECF3] text-slate-400 uppercase text-[10px] font-bold">
                          <th className="pb-2">Product Name</th>
                          <th className="pb-2">Active Salt</th>
                          <th className="pb-2">Company</th>
                          <th className="pb-2">Category</th>
                          <th className="pb-2 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2ECF3]">
                        {productsList.slice(0, 5).map(p => (
                          <tr key={p.id} className="hover:bg-[#F4F8FB]">
                            <td className="py-3 font-bold text-slate-900">{p.name}</td>
                            <td className="py-3 font-mono text-[#0B6E4F]">{p.salt || 'N/A'}</td>
                            <td className="py-3 font-semibold text-slate-700">{p.company.name}</td>
                            <td className="py-3 text-slate-500">{p.category.name}</td>
                            <td className="py-3 text-right">
                              <Badge variant="success">Active</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}

            {/* 2. PRODUCTS MANAGEMENT */}
            {activeTab === 'products' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E2ECF3] rounded-3xl p-6 shadow-sm">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Products Catalog Management</h2>
                    <p className="text-xs text-slate-500 mt-1">Add, edit, bulk import, and organize pharmaceutical formulations.</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<FileSpreadsheet className="w-4 h-4 text-[#0B6E4F]" />}
                      onClick={() => setIsBulkImportModalOpen(true)}
                    >
                      Bulk Import Excel / CSV
                    </Button>

                    <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={handleOpenAddProduct}>
                      Add Product
                    </Button>
                  </div>
                </div>

                <Card className="p-6 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="max-w-xs flex-1">
                      <SearchBar
                        size="sm"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                      />
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      Total: {productsList.length} Items
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#E2ECF3] text-slate-400 uppercase text-[10px] font-bold">
                          <th className="pb-3">Product</th>
                          <th className="pb-3">Salt Composition</th>
                          <th className="pb-3">Strength & Pack</th>
                          <th className="pb-3">Company</th>
                          <th className="pb-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2ECF3]">
                        {productsList
                          .filter(
                            p =>
                              !searchQuery ||
                              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (p.salt && p.salt.toLowerCase().includes(searchQuery.toLowerCase()))
                          )
                          .map(p => (
                            <tr key={p.id} className="hover:bg-[#F4F8FB]">
                              <td className="py-3 font-bold text-slate-900">{p.name}</td>
                              <td className="py-3 font-mono text-[#0B6E4F]">{p.salt || 'N/A'}</td>
                              <td className="py-3 text-slate-600">
                                <span className="font-mono font-bold block">{p.strength}</span>
                                <span className="text-[10px] text-slate-400">{p.pack}</span>
                              </td>
                              <td className="py-3 font-semibold text-slate-700">{p.company.name}</td>
                              <td className="py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => handleOpenEditProduct(p)}
                                    className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B6E4F] hover:bg-emerald-50 transition-colors"
                                    title="Edit Product"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(p.id)}
                                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                    title="Delete Product"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}

            {/* 3. COMPANIES MANAGEMENT */}
            {activeTab === 'companies' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E2ECF3] rounded-3xl p-6 shadow-sm">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Companies Management</h2>
                    <p className="text-xs text-slate-500 mt-1">Manage pharmaceutical manufacturers and suppliers.</p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Plus className="w-4 h-4" />}
                    onClick={handleOpenAddCompany}
                  >
                    Add Company
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {companiesList.map(comp => (
                    <Card key={comp.id} className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#E8F5F1] text-[#0B6E4F] flex items-center justify-center font-extrabold text-lg border border-[#0B6E4F]/20">
                          {comp.name[0]}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{comp.name}</h4>
                          <span className="text-xs font-mono text-slate-400">
                            {comp.productCount || 0} Listed Products
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditCompany(comp)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B6E4F] hover:bg-emerald-50 transition-colors"
                          title="Edit Company"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCompany(comp.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Company"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 4. CATEGORIES MANAGEMENT */}
            {activeTab === 'categories' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E2ECF3] rounded-3xl p-6 shadow-sm">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Categories Management</h2>
                    <p className="text-xs text-slate-500 mt-1">Organize formulations by dosage delivery systems.</p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Plus className="w-4 h-4" />}
                    onClick={handleOpenAddCategory}
                  >
                    Add Category
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoriesList.map(cat => (
                    <Card key={cat.id} className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F4F8FB] border border-[#E2ECF3] flex items-center justify-center text-[#0B6E4F]">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{cat.name}</h4>
                          <span className="text-xs text-slate-400 font-mono">Slug: {cat.slug}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{cat.productCount || 0} Items</Badge>
                        <button
                          onClick={() => handleOpenEditCategory(cat)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B6E4F] hover:bg-emerald-50 transition-colors"
                          title="Edit Category"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 5. THERAPIES MANAGEMENT */}
            {activeTab === 'therapies' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E2ECF3] rounded-3xl p-6 shadow-sm">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Therapies Management</h2>
                    <p className="text-xs text-slate-500 mt-1">Manage clinical specialities and indication classifications.</p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Plus className="w-4 h-4" />}
                    onClick={handleOpenAddTherapy}
                  >
                    Add Therapy
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {therapiesList.map(ther => (
                    <Card key={ther.id} className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#EBF5FB] text-[#2D9CDB] flex items-center justify-center">
                          <HeartPulse className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{ther.name}</h4>
                          <span className="text-xs text-slate-400 font-mono">Slug: {ther.slug}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="accent">{ther.productCount || 0} Formulations</Badge>
                        <button
                          onClick={() => handleOpenEditTherapy(ther)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B6E4F] hover:bg-emerald-50 transition-colors"
                          title="Edit Therapy"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTherapy(ther.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Therapy"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 6. MEDIA LIBRARY */}
            {activeTab === 'media' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white border border-[#E2ECF3] rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Media & Asset Library</h2>
                    <p className="text-xs text-slate-500 mt-1">Upload and manage product photos, logos, and COA PDFs.</p>
                  </div>
                  <Button variant="primary" size="sm" leftIcon={<UploadCloud className="w-4 h-4" />}>
                    Upload Files
                  </Button>
                </div>

                {/* Drag and Drop Zone */}
                <div className="border-2 border-dashed border-[#E2ECF3] hover:border-[#0B6E4F] rounded-3xl p-8 bg-white text-center space-y-3 cursor-pointer transition-colors">
                  <UploadCloud className="w-10 h-10 text-[#0B6E4F] mx-auto" />
                  <div className="space-y-1">
                    <span className="block text-sm font-bold text-slate-900">Click to upload or drag files here</span>
                    <span className="block text-xs text-slate-400">Supports PNG, JPG, WEBP, and PDF documents (Up to 25MB)</span>
                  </div>
                </div>

                {/* Media Grid Placeholder */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['/products/amoxicillin.png', '/products/amlodac.png', '/products/foracort.png', '/products/maxirich.png'].map((img, i) => (
                    <div key={i} className="bg-white border border-[#E2ECF3] rounded-2xl p-3 space-y-2 shadow-2xs">
                      <div className="h-28 bg-[#F4F8FB] rounded-xl flex items-center justify-center p-2">
                        <ImageIcon className="w-8 h-8 text-[#0B6E4F]/60" />
                      </div>
                      <span className="block text-[11px] font-mono text-slate-600 truncate">asset-{i + 1}.png</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. SETTINGS */}
            {activeTab === 'settings' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white border border-[#E2ECF3] rounded-3xl p-6 shadow-sm">
                  <h2 className="text-xl font-extrabold text-slate-900">Platform Settings</h2>
                  <p className="text-xs text-slate-500 mt-1">Configure firm profile, contact info, and database settings.</p>
                </div>

                <Card className="p-6 sm:p-8">
                  <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
                    <div className="grid grid-cols-1 gap-4">
                      <Input
                        label="Catalog Portal Name"
                        value={settingsForm.siteName}
                        onChange={e => setSettingsForm({ ...settingsForm, siteName: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Regulatory Contact Email"
                        type="email"
                        value={settingsForm.contactEmail}
                        onChange={e => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                      />
                      <Input
                        label="B2B Sourcing Hotline"
                        value={settingsForm.contactPhone}
                        onChange={e => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                      />
                    </div>

                    <div className="p-4 bg-[#E8F5F1] rounded-2xl border border-[#0B6E4F]/20 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-[#0B6E4F]" />
                        <div>
                          <span className="font-bold text-slate-900 block">Database Status</span>
                          <span className="text-[11px] text-slate-600">Prisma Client 5.22.0 + PostgreSQL Schema Active</span>
                        </div>
                      </div>
                      <Badge variant="primary">Operational</Badge>
                    </div>

                    {settingsSaved && (
                      <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl flex items-center gap-2 text-xs font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Settings updated successfully!</span>
                      </div>
                    )}

                    <div className="flex justify-end pt-2">
                      <Button type="submit" variant="primary" leftIcon={<Save className="w-4 h-4" />}>
                        Save Configuration
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>
            )}
          </main>
        </div>
      </Container>

      {/* COMPANY MODAL (ADD & EDIT) */}
      {isCompanyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2ECF3] pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingCompany ? 'Edit Company' : 'Add Manufacturer Company'}
              </h3>
              <button
                onClick={() => setIsCompanyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <Input
                label="Company Name"
                placeholder="e.g. Mankind Pharma / Sun Pharma"
                value={newCompanyName}
                onChange={e => setNewCompanyName(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2ECF3]">
              <Button variant="outline" size="sm" onClick={() => setIsCompanyModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  if (newCompanyName.trim()) {
                    if (editingCompany) {
                      setCompaniesList(prev =>
                        prev.map(c =>
                          c.id === editingCompany.id
                            ? {
                                ...c,
                                name: newCompanyName.trim(),
                                slug: newCompanyName.trim().toLowerCase().replace(/\s+/g, '-'),
                              }
                            : c
                        )
                      );
                    } else {
                      const createdCompany = {
                        id: `comp-${Date.now()}`,
                        name: newCompanyName.trim(),
                        slug: newCompanyName.trim().toLowerCase().replace(/\s+/g, '-'),
                        productCount: 0,
                      };
                      setCompaniesList(prev => [...prev, createdCompany]);
                    }
                    setNewCompanyName('');
                    setEditingCompany(null);
                    setIsCompanyModalOpen(false);
                  }
                }}
              >
                Save Company
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY MODAL (ADD & EDIT) */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2ECF3] pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h3>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <Input
                label="Category Name"
                placeholder="e.g. Oral Suspension / Softgel Capsules"
                value={newCategoryName}
                onChange={e => setNewCategoryName(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2ECF3]">
              <Button variant="outline" size="sm" onClick={() => setIsCategoryModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  if (newCategoryName.trim()) {
                    if (editingCategory) {
                      setCategoriesList(prev =>
                        prev.map(c =>
                          c.id === editingCategory.id
                            ? {
                                ...c,
                                name: newCategoryName.trim(),
                                slug: newCategoryName.trim().toLowerCase().replace(/\s+/g, '-'),
                              }
                            : c
                        )
                      );
                    } else {
                      const createdCat = {
                        id: `cat-${Date.now()}`,
                        name: newCategoryName.trim(),
                        slug: newCategoryName.trim().toLowerCase().replace(/\s+/g, '-'),
                        productCount: 0,
                      };
                      setCategoriesList(prev => [...prev, createdCat]);
                    }
                    setNewCategoryName('');
                    setEditingCategory(null);
                    setIsCategoryModalOpen(false);
                  }
                }}
              >
                Save Category
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* THERAPY MODAL (ADD & EDIT) */}
      {isTherapyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2ECF3] pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingTherapy ? 'Edit Therapy Area' : 'Add Therapy Area'}
              </h3>
              <button
                onClick={() => setIsTherapyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <Input
                label="Therapy Area Name"
                placeholder="e.g. Dermatology / Orthopedics"
                value={newTherapyName}
                onChange={e => setNewTherapyName(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2ECF3]">
              <Button variant="outline" size="sm" onClick={() => setIsTherapyModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  if (newTherapyName.trim()) {
                    if (editingTherapy) {
                      setTherapiesList(prev =>
                        prev.map(t =>
                          t.id === editingTherapy.id
                            ? {
                                ...t,
                                name: newTherapyName.trim(),
                                slug: newTherapyName.trim().toLowerCase().replace(/\s+/g, '-'),
                              }
                            : t
                        )
                      );
                    } else {
                      const createdTher = {
                        id: `ther-${Date.now()}`,
                        name: newTherapyName.trim(),
                        slug: newTherapyName.trim().toLowerCase().replace(/\s+/g, '-'),
                        productCount: 0,
                      };
                      setTherapiesList(prev => [...prev, createdTher]);
                    }
                    setNewTherapyName('');
                    setEditingTherapy(null);
                    setIsTherapyModalOpen(false);
                  }
                }}
              >
                Save Therapy
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
