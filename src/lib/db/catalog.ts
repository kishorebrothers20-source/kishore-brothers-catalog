import { Product, Category, Therapy, Company, CatalogFilterParams, B2BInquiryInput } from '@/types/catalog';
import { prisma } from '@/lib/prisma';

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    slug: 'kishore-brothers',
    name: 'Kishore Brothers Trading Firm',
    logo: '/logos/kishore.png',
    productCount: 28,
  },
  {
    id: 'comp-2',
    slug: 'cipla',
    name: 'Cipla Limited',
    logo: '/logos/cipla.png',
    productCount: 25,
  },
  {
    id: 'comp-3',
    slug: 'novachem-laboratories',
    name: 'NovaChem Laboratories',
    logo: '/logos/novachem.png',
    productCount: 12,
  },
];

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    slug: 'oral-tablets',
    name: 'Oral Film-Coated Tablets',
    productCount: 14,
  },
  {
    id: 'cat-2',
    slug: 'sterile-injectables',
    name: 'Sterile Injectable Vials',
    productCount: 9,
  },
  {
    id: 'cat-3',
    slug: 'iv-infusions',
    name: 'Ready-to-Infuse IV Solutions',
    productCount: 8,
  },
  {
    id: 'cat-4',
    slug: 'respiratory-inhalers',
    name: 'Inhalation & Respiratory Devices',
    productCount: 10,
  },
  {
    id: 'cat-5',
    slug: 'nutraceuticals',
    name: 'Nutraceuticals & Dietary Capsules',
    productCount: 7,
  },
];

export const MOCK_THERAPIES: Therapy[] = [
  {
    id: 'ther-1',
    slug: 'anti-infectives',
    name: 'Anti-Infectives & Antibiotics',
    productCount: 14,
  },
  {
    id: 'ther-2',
    slug: 'cardiovascular',
    name: 'Cardiovascular & Anti-Hypertensives',
    productCount: 9,
  },
  {
    id: 'ther-3',
    slug: 'oncology',
    name: 'Oncology & Targeted Therapeutics',
    productCount: 6,
  },
  {
    id: 'ther-4',
    slug: 'gastroenterology',
    name: 'Gastroenterology & PPIs',
    productCount: 8,
  },
  {
    id: 'ther-5',
    slug: 'respiratory',
    name: 'Respiratory & Pulmonology',
    productCount: 11,
  },
  {
    id: 'ther-6',
    slug: 'nutritional-health',
    name: 'Nutritional & General Wellness',
    productCount: 9,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'd8c5b3f2-5a92-443b-af23-4567890bcdef',
    slug: 'paracetamol-iv-infusion-1000mg',
    name: 'Paracetamol Ready-to-Infuse IV Solution 10mg/ml (100ml)',
    image: '/products/paracetamol-iv.png',
    salt: 'Paracetamol / Acetaminophen / PCM Sterile Infusion',
    description: 'Sterile, pyrogen-free iso-osmotic parenteral solution for rapid fever reduction and acute post-operative pain management.',
    strength: '10 mg / ml (1000 mg total)',
    pack: '100 ml Polypropylene Infusion Bottle with Twin Port',
    companyId: MOCK_COMPANIES[0].id, // Kishore Brothers
    company: MOCK_COMPANIES[0],
    categoryId: MOCK_CATEGORIES[2].id,
    category: MOCK_CATEGORIES[2],
    therapyId: MOCK_THERAPIES[1].id,
    therapy: MOCK_THERAPIES[1],
    isFeatured: true,
  },
  {
    id: 'p1c2m3a4-5b6c-7d8e-9f0a-123456789012',
    slug: 'crocin-650-tablets',
    name: 'Crocin 650 Fast-Release Analgesic Tablets',
    image: '/products/crocin.png',
    salt: 'Paracetamol / PCM (650mg)',
    description: 'Fast-acting anti-pyretic and analgesic formulation indicated for rapid fever reduction and mild-to-moderate muscular pain.',
    strength: '650 mg',
    pack: 'Blister Pack of 15 Film-Coated Tablets',
    companyId: MOCK_COMPANIES[1].id, // Cipla
    company: MOCK_COMPANIES[1],
    categoryId: MOCK_CATEGORIES[0].id,
    category: MOCK_CATEGORIES[0],
    therapyId: MOCK_THERAPIES[1].id,
    therapy: MOCK_THERAPIES[1],
    isFeatured: true,
  },
  {
    id: 'd0l0650a-1b2c-3d4e-5f6a-789012345678',
    slug: 'dolo-650-tablets',
    name: 'Dolo 650 Fever & Pain Relief Tablets',
    image: '/products/dolo.png',
    salt: 'Paracetamol / PCM (650mg)',
    description: 'High-efficacy anti-pyretic formulation engineered for sustained fever control, headache, and body pain relief.',
    strength: '650 mg',
    pack: 'Blister Strip of 15 Tablets',
    companyId: MOCK_COMPANIES[0].id, // Kishore Brothers
    company: MOCK_COMPANIES[0],
    categoryId: MOCK_CATEGORIES[0].id,
    category: MOCK_CATEGORIES[0],
    therapyId: MOCK_THERAPIES[1].id,
    therapy: MOCK_THERAPIES[1],
    isFeatured: true,
  },
  {
    id: 'c7b4a2e1-4f81-432a-9e12-3456789abcde',
    slug: 'amoxicillin-clavulanate-625mg',
    name: 'Amoxicillin & Clavulanate Potassium Tablets USP 625mg',
    image: '/products/amoxicillin.png',
    salt: 'Amoxicillin Trihydrate (500mg) + Potassium Clavulanate (125mg)',
    description: 'High-potency broad-spectrum antibiotic combination formulated with beta-lactamase inhibitor to combat resistant bacterial infections.',
    strength: '625 mg',
    pack: 'Alu-Alu Blister Strip of 10 Tablets (Box of 10x10)',
    companyId: MOCK_COMPANIES[0].id, // Kishore Brothers
    company: MOCK_COMPANIES[0],
    categoryId: MOCK_CATEGORIES[0].id,
    category: MOCK_CATEGORIES[0],
    therapyId: MOCK_THERAPIES[0].id,
    therapy: MOCK_THERAPIES[0],
    isFeatured: true,
  },
  {
    id: 'f1e2d3c4-5b6a-7f8e-9d0c-1234567890ab',
    slug: 'amlodac-5mg',
    name: 'Amlodac (Amlodipine Besylate Tablets 5mg / 10mg)',
    image: '/products/amlodac.png',
    salt: 'Amlodipine Besylate',
    description: 'Long-acting dihydropyridine calcium channel blocker indicated for essential hypertension and stable angina.',
    strength: '5 mg / 10 mg',
    pack: 'Blister Strip of 15 Tablets (Box of 10x15)',
    companyId: MOCK_COMPANIES[1].id, // Cipla
    company: MOCK_COMPANIES[1],
    categoryId: MOCK_CATEGORIES[0].id,
    category: MOCK_CATEGORIES[0],
    therapyId: MOCK_THERAPIES[1].id,
    therapy: MOCK_THERAPIES[1],
    isFeatured: true,
  },
  {
    id: 'a2b3c4d5-6e7f-8a9b-0c1d-234567890abc',
    slug: 'foracort-200-inhaler',
    name: 'Foracort Inhaler 200 (Formoterol Fumarate + Budesonide)',
    image: '/products/foracort.png',
    salt: 'Formoterol Fumarate (6mcg) + Budesonide (200mcg)',
    description: 'Dual-action rapid long-acting beta2-agonist and inhaled corticosteroid combination indicated for chronic management of asthma and COPD.',
    strength: '200 mcg / 400 mcg',
    pack: 'Pressurized Metered Dose Inhaler (120 Actuations)',
    companyId: MOCK_COMPANIES[1].id, // Cipla
    company: MOCK_COMPANIES[1],
    categoryId: MOCK_CATEGORIES[3].id,
    category: MOCK_CATEGORIES[3],
    therapyId: MOCK_THERAPIES[4].id,
    therapy: MOCK_THERAPIES[4],
    isFeatured: true,
  },
  {
    id: 'b3c4d5e6-7f8a-9b0c-1d2e-34567890abcd',
    slug: 'maxirich-multivitamin',
    name: 'Maxirich Daily Multivitamin & Minerals Softgel Capsules',
    image: '/products/maxirich.png',
    salt: 'Multivitamins + Essential Minerals + Ginseng Extract',
    description: 'High-potency daily health supplement enriched with standardized Ginseng extract and anti-oxidants for vitality.',
    strength: 'Daily Vitality Formula',
    pack: 'Blister Pack of 10 Softgel Capsules (Box of 3x10)',
    companyId: MOCK_COMPANIES[1].id, // Cipla
    company: MOCK_COMPANIES[1],
    categoryId: MOCK_CATEGORIES[4].id,
    category: MOCK_CATEGORIES[4],
    therapyId: MOCK_THERAPIES[5].id,
    therapy: MOCK_THERAPIES[5],
    isFeatured: true,
  },
  {
    id: 'e9d6c4a3-6b03-454c-b034-5678901cdefg',
    slug: 'paclitaxel-injection-300mg',
    name: 'Paclitaxel Concentrated Solution for Infusion 300mg/50ml',
    image: '/products/paclitaxel.png',
    salt: 'Paclitaxel USP',
    description: 'Antineoplastic agent targeting microtubule stabilization in advanced ovarian and breast carcinomas.',
    strength: '6 mg/ml (300 mg total)',
    pack: '50 ml Amber Glass Injection Vial',
    companyId: MOCK_COMPANIES[2].id, // NovaChem
    company: MOCK_COMPANIES[2],
    categoryId: MOCK_CATEGORIES[1].id,
    category: MOCK_CATEGORIES[1],
    therapyId: MOCK_THERAPIES[2].id,
    therapy: MOCK_THERAPIES[2],
    isFeatured: true,
  },
];

export async function getCompanies(): Promise<Company[]> {
  try {
    if (process.env.DATABASE_URL) {
      const companies = await prisma.company.findMany({
        include: { _count: { select: { products: true } } },
      });
      if (companies.length > 0) {
        return companies.map((c: any) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          logo: c.logo || undefined,
          productCount: c._count.products,
        }));
      }
    }
  } catch (error) {
    console.warn('Prisma companies query fallback', error);
  }
  return MOCK_COMPANIES;
}

export async function getCategories(): Promise<Category[]> {
  try {
    if (process.env.DATABASE_URL) {
      const categories = await prisma.category.findMany({
        include: { _count: { select: { products: true } } },
      });
      if (categories.length > 0) {
        return categories.map((c: any) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          productCount: c._count.products,
        }));
      }
    }
  } catch (error) {
    console.warn('Prisma categories query fallback', error);
  }
  return MOCK_CATEGORIES;
}

export async function getTherapies(): Promise<Therapy[]> {
  try {
    if (process.env.DATABASE_URL) {
      const therapies = await prisma.therapy.findMany({
        include: { _count: { select: { products: true } } },
      });
      if (therapies.length > 0) {
        return therapies.map((t: any) => ({
          id: t.id,
          name: t.name,
          slug: t.slug,
          productCount: t._count.products,
        }));
      }
    }
  } catch (error) {
    console.warn('Prisma therapies query fallback', error);
  }
  return MOCK_THERAPIES;
}

export async function getProducts(params?: CatalogFilterParams): Promise<Product[]> {
  try {
    if (process.env.DATABASE_URL) {
      const whereClause: any = {};
      if (params?.search) {
        whereClause.OR = [
          { name: { contains: params.search, mode: 'insensitive' } },
          { salt: { contains: params.search, mode: 'insensitive' } },
          { description: { contains: params.search, mode: 'insensitive' } },
          { company: { name: { contains: params.search, mode: 'insensitive' } } },
          { category: { name: { contains: params.search, mode: 'insensitive' } } },
          { therapy: { name: { contains: params.search, mode: 'insensitive' } } },
        ];
      }
      if (params?.category) {
        whereClause.category = { slug: params.category };
      }
      if (params?.therapy) {
        whereClause.therapy = { slug: params.therapy };
      }
      if (params?.company) {
        whereClause.company = { slug: params.company };
      }
      if (params?.featured) {
        whereClause.isFeatured = true;
      }

      const products = await prisma.product.findMany({
        where: whereClause,
        include: {
          company: true,
          category: true,
          therapy: true,
        },
      });

      if (products.length > 0) {
        return products.map((p: any) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          image: p.image || undefined,
          salt: p.salt || undefined,
          description: p.description,
          strength: p.strength || undefined,
          pack: p.pack || undefined,
          companyId: p.companyId,
          company: {
            id: p.company.id,
            name: p.company.name,
            slug: p.company.slug,
            logo: p.company.logo || undefined,
          },
          categoryId: p.categoryId,
          category: {
            id: p.category.id,
            name: p.category.name,
            slug: p.category.slug,
          },
          therapyId: p.therapyId,
          therapy: {
            id: p.therapy.id,
            name: p.therapy.name,
            slug: p.therapy.slug,
          },
          isFeatured: p.isFeatured,
        }));
      }
    }
  } catch (error) {
    console.warn('Prisma products query fallback', error);
  }

  // Enhanced Global Search Matching (Product Name, Salt, Company, Therapy, Category)
  let result = [...MOCK_PRODUCTS];

  if (params?.search) {
    const q = params.search.toLowerCase().trim();
    result = result.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        (p.salt && p.salt.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        p.company.name.toLowerCase().includes(q) ||
        p.category.name.toLowerCase().includes(q) ||
        p.therapy.name.toLowerCase().includes(q)
    );
  }

  if (params?.category) {
    result = result.filter(p => p.category.slug === params.category);
  }

  if (params?.therapy) {
    result = result.filter(p => p.therapy.slug === params.therapy);
  }

  if (params?.company) {
    result = result.filter(p => p.company.slug === params.company);
  }

  if (params?.featured) {
    result = result.filter(p => p.isFeatured);
  }

  return result;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.slug === slug) || null;
}

export async function getRelatedProducts(categoryId: string, currentProductId: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(p => p.categoryId === categoryId && p.id !== currentProductId).slice(0, 3);
}

export async function submitInquiry(data: B2BInquiryInput) {
  try {
    if (process.env.DATABASE_URL) {
      return await prisma.contactInquiry.create({
        data: {
          name: data.name,
          email: data.email,
          company: data.company,
          country: data.country,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
          productSlug: data.productSlug,
        },
      });
    }
  } catch (error) {
    console.warn('Prisma inquiry query fallback', error);
  }
  return { id: `inq-${Date.now()}`, ...data, createdAt: new Date() };
}
