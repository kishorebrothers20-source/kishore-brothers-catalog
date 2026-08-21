export interface Company {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  productCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount?: number;
}

export interface Therapy {
  id: string;
  name: string;
  slug: string;
  productCount?: number;
}

export interface Product {
  id: string; // UUID
  name: string;
  slug: string;
  image?: string;
  salt?: string; // Active Pharmaceutical Ingredient / Salt Composition
  description: string;
  strength?: string;
  pack?: string;
  companyId: string;
  company: Company;
  categoryId: string;
  category: Category;
  therapyId: string;
  therapy: Therapy;
  isFeatured?: boolean;
}

export interface CatalogFilterParams {
  search?: string;
  category?: string;
  therapy?: string;
  company?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface B2BInquiryInput {
  name: string;
  email: string;
  company: string;
  country: string;
  phone?: string;
  subject: string;
  message: string;
  productSlug?: string;
}
