'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Product, Company, Category, Therapy } from '@/types/catalog';
import { parseCSVText, downloadCSVTemplate, BulkProductImportRow } from '@/lib/csvParser';
import {
  X,
  FileSpreadsheet,
  Download,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  FileText,
  Loader2,
  Table,
  Sparkles,
} from 'lucide-react';

export interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (importedProducts: Product[]) => void;
  companies: Company[];
  categories: Category[];
  therapies: Therapy[];
}

export function BulkImportModal({
  isOpen,
  onClose,
  onImportComplete,
  companies,
  categories,
  therapies,
}: BulkImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<BulkProductImportRow[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importResult, setImportResult] = useState<{
    successCount: number;
    failedCount: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      readAndParseFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      readAndParseFile(droppedFile);
    }
  };

  const readAndParseFile = (fileToParse: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target?.result as string;
      if (content) {
        const rows = parseCSVText(content);
        setParsedRows(rows);
      }
    };
    reader.readAsText(fileToParse);
  };

  const handleExecuteImport = async () => {
    const validRows = parsedRows.filter(r => r.isValid);
    if (validRows.length === 0) return;

    setIsProcessing(true);
    setProgress(20);

    try {
      // API request
      const res = await fetch('/api/admin/bulk-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: validRows }),
      });

      setProgress(80);

      const data = await res.json();
      setProgress(100);

      // Create Products for client state
      const importedClientProducts: Product[] = validRows.map((r, i) => {
        const company =
          companies.find(c => c.slug === r.companySlug) ||
          companies[0] || { id: 'comp-1', name: 'Aegis BioPharma Systems', slug: 'aegis-biopharma' };

        const category =
          categories.find(c => c.slug === r.categorySlug) ||
          categories[0] || { id: 'cat-1', name: 'Oral Film-Coated Tablets', slug: 'oral-tablets' };

        const therapy =
          therapies.find(t => t.slug === r.therapySlug) ||
          therapies[0] || { id: 'ther-1', name: 'Anti-Infectives & Antibiotics', slug: 'anti-infectives' };

        return {
          id: `bulk-${Date.now()}-${i}`,
          name: r.name,
          slug: r.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
          salt: r.salt,
          strength: r.strength,
          pack: r.pack,
          description: r.description,
          image: r.image,
          companyId: company.id,
          company,
          categoryId: category.id,
          category,
          therapyId: therapy.id,
          therapy,
          isFeatured: true,
        };
      });

      setImportResult({
        successCount: data.importedCount || importedClientProducts.length,
        failedCount: data.failedCount || 0,
      });

      setTimeout(() => {
        onImportComplete(importedClientProducts);
        setIsProcessing(false);
      }, 1500);
    } catch (err) {
      console.error('Bulk import error:', err);
      setIsProcessing(false);
    }
  };

  const validCount = parsedRows.filter(r => r.isValid).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-[#E2ECF3] rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-[#F4F8FB] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E2ECF3]">
          <div className="w-10 h-10 rounded-xl bg-[#0B6E4F] text-white flex items-center justify-center shadow-md">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Bulk Product Importer (Excel / CSV)
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Upload hundreds or thousands of formulations at once using standardized spreadsheets.
            </span>
          </div>
        </div>

        {/* Result Screen */}
        {importResult ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-[#0B6E4F] mx-auto animate-bounce" />
            <h4 className="text-2xl font-extrabold text-slate-900">Bulk Import Complete!</h4>
            <p className="text-xs text-slate-600">
              Successfully imported{' '}
              <strong className="text-[#0B6E4F] font-mono text-sm">{importResult.successCount}</strong> product formulations into the catalog.
            </p>
            <div className="pt-4">
              <Button variant="primary" onClick={onClose}>
                Done & Return to Dashboard
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-xs">
            {/* Template Download Banner */}
            <div className="p-4 bg-[#E8F5F1] rounded-2xl border border-[#0B6E4F]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#0B6E4F]" />
                  Need the Importer Format Template?
                </span>
                <span className="text-slate-600 block text-[11px]">
                  Download pre-formatted CSV/Excel template with column headers (Name, Salt, Strength, Pack, CompanySlug, CategorySlug, TherapySlug).
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={downloadCSVTemplate}
                leftIcon={<Download className="w-3.5 h-3.5" />}
                className="bg-white hover:bg-[#0B6E4F] hover:text-white transition-colors"
              >
                Download Template
              </Button>
            </div>

            {/* Drag and Drop Zone */}
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-[#E2ECF3] hover:border-[#0B6E4F] rounded-2xl p-8 bg-[#F4F8FB] text-center space-y-3 transition-colors cursor-pointer"
            >
              <UploadCloud className="w-10 h-10 text-[#0B6E4F] mx-auto" />
              <div className="space-y-1">
                <span className="block font-bold text-slate-900 text-sm">
                  {file ? file.name : 'Click to select or drag CSV / Excel file here'}
                </span>
                <span className="block text-[11px] text-slate-400">
                  {file
                    ? `${(file.size / 1024).toFixed(1)} KB — Parsed ${parsedRows.length} rows`
                    : 'Upload file containing product names, salt compositions, and packaging specs'}
                </span>
              </div>

              <label className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0B6E4F] border border-[#0B6E4F]/30 rounded-xl font-bold text-xs cursor-pointer hover:bg-[#E8F5F1] shadow-2xs transition-colors">
                <span>Select File</span>
                <input
                  type="file"
                  accept=".csv, .xlsx, .xls"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Live Data Preview Table */}
            {parsedRows.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Table className="w-4 h-4 text-[#0B6E4F]" />
                    Parsed Rows Preview ({validCount} Valid / {parsedRows.length - validCount} Issues)
                  </span>
                  <Badge variant={validCount > 0 ? 'success' : 'danger'}>
                    {validCount} Ready to Import
                  </Badge>
                </div>

                <div className="max-h-56 overflow-y-auto border border-[#E2ECF3] rounded-2xl">
                  <table className="w-full text-left text-[11px]">
                    <thead className="sticky top-0 bg-[#F4F8FB] border-b border-[#E2ECF3] text-slate-500 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">Status</th>
                        <th className="p-2.5">Product Name</th>
                        <th className="p-2.5">Salt</th>
                        <th className="p-2.5">Strength</th>
                        <th className="p-2.5">Company</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2ECF3]">
                      {parsedRows.map((r, idx) => (
                        <tr key={idx} className={r.isValid ? 'hover:bg-[#E8F5F1]/50' : 'bg-rose-50/50'}>
                          <td className="p-2.5">
                            {r.isValid ? (
                              <span className="text-emerald-600 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                              </span>
                            ) : (
                              <span className="text-rose-600 font-bold flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" /> {r.errorMsg}
                              </span>
                            )}
                          </td>
                          <td className="p-2.5 font-bold text-slate-900">{r.name || '—'}</td>
                          <td className="p-2.5 font-mono text-[#0B6E4F]">{r.salt || '—'}</td>
                          <td className="p-2.5 font-mono">{r.strength || '—'}</td>
                          <td className="p-2.5 font-semibold text-slate-700">{r.companySlug}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            {isProcessing && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600 font-bold">
                  <span>Importing formulations into database...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-[#E2ECF3] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0B6E4F] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-[#E2ECF3]">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                disabled={validCount === 0 || isProcessing}
                isLoading={isProcessing}
                onClick={handleExecuteImport}
                leftIcon={<UploadCloud className="w-4 h-4" />}
              >
                {isProcessing ? 'Processing Import...' : `Import ${validCount} Products`}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
