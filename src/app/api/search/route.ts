import { NextResponse } from 'next/server';
import { getProducts, getCompanies, getCategories, getTherapies } from '@/lib/db/catalog';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';

  if (!q.trim()) {
    return NextResponse.json({
      products: [],
      companies: [],
      categories: [],
      therapies: [],
    });
  }

  const query = q.toLowerCase().trim();

  // 1. Products matching Name or Salt or Description
  const allProducts = await getProducts({ search: query });

  // 2. Companies matching Name
  const allCompanies = await getCompanies();
  const matchedCompanies = allCompanies.filter(
    c => c.name.toLowerCase().includes(query) || c.slug.includes(query)
  );

  // 3. Categories matching Name
  const allCategories = await getCategories();
  const matchedCategories = allCategories.filter(
    c => c.name.toLowerCase().includes(query) || c.slug.includes(query)
  );

  // 4. Therapies matching Name
  const allTherapies = await getTherapies();
  const matchedTherapies = allTherapies.filter(
    t => t.name.toLowerCase().includes(query) || t.slug.includes(query)
  );

  return NextResponse.json({
    products: allProducts.slice(0, 6),
    companies: matchedCompanies.slice(0, 3),
    categories: matchedCategories.slice(0, 3),
    therapies: matchedTherapies.slice(0, 3),
    totalMatches: allProducts.length + matchedCompanies.length + matchedCategories.length + matchedTherapies.length,
  });
}
