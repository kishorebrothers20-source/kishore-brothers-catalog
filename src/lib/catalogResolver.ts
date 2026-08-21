import { Product, Company, Category, Therapy } from '@/types/catalog';

/**
 * Dynamically resolves a product's company, category, and therapy attributes
 * against live master data saved in localStorage or active state.
 * This guarantees real-time automated updates across the whole website whenever
 * a company, category, or therapy name is edited anywhere.
 */
export function getResolvedProduct(product: Product): Product {
  if (typeof window === 'undefined' || !product) return product;

  let resolvedCompany = product.company;
  let resolvedCategory = product.category;
  let resolvedTherapy = product.therapy;

  try {
    // 1. Resolve Company
    const savedComps = localStorage.getItem('kb_companies');
    if (savedComps) {
      const companies: Company[] = JSON.parse(savedComps);
      const matched = companies.find(
        c => c.id === product.company?.id || c.slug === product.company?.slug
      );
      if (matched) {
        resolvedCompany = {
          id: matched.id,
          name: matched.name,
          slug: matched.slug,
        };
      }
    }

    // 2. Resolve Category
    const savedCats = localStorage.getItem('kb_categories');
    if (savedCats) {
      const categories: Category[] = JSON.parse(savedCats);
      const matched = categories.find(
        c => c.id === product.category?.id || c.slug === product.category?.slug
      );
      if (matched) {
        resolvedCategory = {
          id: matched.id,
          name: matched.name,
          slug: matched.slug,
        };
      }
    }

    // 3. Resolve Therapy
    const savedThers = localStorage.getItem('kb_therapies');
    if (savedThers) {
      const therapies: Therapy[] = JSON.parse(savedThers);
      const matched = therapies.find(
        t => t.id === product.therapy?.id || t.slug === product.therapy?.slug
      );
      if (matched) {
        resolvedTherapy = {
          id: matched.id,
          name: matched.name,
          slug: matched.slug,
        };
      }
    }
  } catch (e) {}

  return {
    ...product,
    company: resolvedCompany,
    category: resolvedCategory,
    therapy: resolvedTherapy,
  };
}
