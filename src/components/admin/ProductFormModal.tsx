'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Company, Category, Therapy, Product } from '@/types/catalog';
import {
  X,
  UploadCloud,
  CheckCircle2,
  Pill,
  Beaker,
  Building2,
  Layers,
  HeartPulse,
  Package,
  FileText,
  Sparkles,
} from 'lucide-react';

export interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Partial<Product>) => void;
  initialData?: Product | null;
  companies: Company[];
  categories: Category[];
  therapies: Therapy[];
}

export function ProductFormModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  companies,
  categories,
  therapies,
}: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    image: initialData?.image || '',
    salt: initialData?.salt || '',
    description: initialData?.description || '',
    strength: initialData?.strength || '',
    pack: initialData?.pack || '',
    companyId: initialData?.companyId || companies[0]?.id || '',
    categoryId: initialData?.categoryId || categories[0]?.id || '',
    therapyId: initialData?.therapyId || therapies[0]?.id || '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onSave({
        ...formData,
        id: initialData?.id || `prod-${Date.now()}`,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      });
      setIsSubmitting(false);
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-[#E2ECF3] rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-[#F4F8FB] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E2ECF3]">
          <div className="w-10 h-10 rounded-xl bg-[#0B6E4F] text-white flex items-center justify-center shadow-md">
            <Pill className="w-5 h-5 rotate-45" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              {initialData ? 'Edit Pharmaceutical Formulation' : 'Add New Product Formulation'}
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Specify product details, INN salt composition, packaging, and regulatory classification.
            </span>
          </div>
        </div>

        {successMsg ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#0B6E4F] mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-slate-900">Product Form Saved!</h4>
            <p className="text-xs text-slate-500">
              The product formulation has been registered in the database catalog.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* 1. Product Name */}
            <Input
              label="Product Name *"
              placeholder="e.g. Amoxicillin & Clavulanate Potassium Tablets 625mg"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              leftIcon={<Pill className="w-4 h-4" />}
            />

            {/* 2. Image Upload Field */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Product Image Upload</label>
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-2 border-dashed border-[#E2ECF3] hover:border-[#0B6E4F] rounded-2xl bg-[#F4F8FB] transition-colors">
                <div className="w-24 h-24 rounded-xl bg-white border border-[#E2ECF3] flex items-center justify-center p-2 overflow-hidden flex-shrink-0">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full object-contain" />
                  ) : (
                    <UploadCloud className="w-8 h-8 text-slate-400" />
                  )}
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <label className="inline-flex items-center gap-2 px-3 py-2 bg-white hover:bg-[#E8F5F1] text-[#0B6E4F] border border-[#0B6E4F]/30 rounded-xl font-semibold text-xs cursor-pointer shadow-2xs transition-colors">
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Choose Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <span className="block text-[11px] text-slate-400">
                    Supports PNG, JPG, WEBP formats (Max 5MB)
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Salt Composition */}
            <Input
              label="Active Salt Composition (INN) *"
              placeholder="e.g. Amoxicillin Trihydrate (500mg) + Potassium Clavulanate (125mg)"
              required
              value={formData.salt}
              onChange={e => setFormData({ ...formData, salt: e.target.value })}
              leftIcon={<Beaker className="w-4 h-4" />}
              helperText="Active Pharmaceutical Ingredient (API) composition & chemical salt"
            />

            {/* 4. Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Description & Clinical Indications *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Specify therapeutic indications, mechanism of action, and clinical usage..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-white border border-[#E2ECF3] rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B6E4F] focus:ring-2 focus:ring-[#0B6E4F]/20 shadow-sm"
              />
            </div>

            {/* 5. Strength & Pack Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Formulation Strength *"
                placeholder="e.g. 625 mg / 10 mg/ml"
                required
                value={formData.strength}
                onChange={e => setFormData({ ...formData, strength: e.target.value })}
                leftIcon={<Sparkles className="w-4 h-4" />}
              />

              <Input
                label="Packaging Specifications (Pack) *"
                placeholder="e.g. Alu-Alu Blister Strip of 10 Tablets"
                required
                value={formData.pack}
                onChange={e => setFormData({ ...formData, pack: e.target.value })}
                leftIcon={<Package className="w-4 h-4" />}
              />
            </div>

            {/* 6. Company, Category & Therapy Select Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Company Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#0B6E4F]" />
                  Company *
                </label>
                <select
                  required
                  value={formData.companyId}
                  onChange={e => setFormData({ ...formData, companyId: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#F4F8FB] border border-[#E2ECF3] rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0B6E4F]"
                >
                  {companies.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-[#0B6E4F]" />
                  Category *
                </label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#F4F8FB] border border-[#E2ECF3] rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0B6E4F]"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Therapy Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <HeartPulse className="w-3.5 h-3.5 text-[#2D9CDB]" />
                  Therapy *
                </label>
                <select
                  required
                  value={formData.therapyId}
                  onChange={e => setFormData({ ...formData, therapyId: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#F4F8FB] border border-[#E2ECF3] rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0B6E4F]"
                >
                  {therapies.map(ther => (
                    <option key={ther.id} value={ther.id}>
                      {ther.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#E2ECF3]">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting}>
                {initialData ? 'Update Product' : 'Save & Register Product'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
