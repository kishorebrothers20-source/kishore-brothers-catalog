import { Product } from '@/types/catalog';

export function generateProductJsonLd(product: Product, siteUrl: string) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'MedicalWebPage',
    name: product.name,
    description: product.description,
    url: `${siteUrl}/products/${product.slug}`,
    medicalAudience: 'Healthcare Professional',
    about: {
      '@type': 'Drug',
      name: product.name,
      activeIngredient: product.salt || product.name,
      manufacturer: product.company.name,
      category: product.category.name,
      therapy: product.therapy.name,
    },
  };
}

export function generateOrganizationJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Aegis BioPharma Systems',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-555-PHARMA',
      contactType: 'B2B Sourcing & Regulatory Affairs',
      availableLanguage: ['English', 'Spanish', 'French'],
    },
  };
}
