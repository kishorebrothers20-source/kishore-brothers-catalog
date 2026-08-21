import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { products } = body;

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: 'No products provided for bulk import' },
        { status: 400 }
      );
    }

    let successCount = 0;
    let failedCount = 0;

    if (process.env.DATABASE_URL) {
      for (const p of products) {
        try {
          if (!p.name || !p.salt) {
            failedCount++;
            continue;
          }

          // Ensure Company exists
          const company = await prisma.company.upsert({
            where: { slug: p.companySlug || 'aegis-biopharma' },
            update: {},
            create: {
              name: p.companyName || (p.companySlug ? p.companySlug.replace(/-/g, ' ').toUpperCase() : 'Aegis BioPharma Systems'),
              slug: p.companySlug || 'aegis-biopharma',
            },
          });

          // Ensure Category exists
          const category = await prisma.category.upsert({
            where: { slug: p.categorySlug || 'oral-tablets' },
            update: {},
            create: {
              name: p.categoryName || (p.categorySlug ? p.categorySlug.replace(/-/g, ' ').toUpperCase() : 'Oral Film-Coated Tablets'),
              slug: p.categorySlug || 'oral-tablets',
            },
          });

          // Ensure Therapy exists
          const therapy = await prisma.therapy.upsert({
            where: { slug: p.therapySlug || 'anti-infectives' },
            update: {},
            create: {
              name: p.therapyName || (p.therapySlug ? p.therapySlug.replace(/-/g, ' ').toUpperCase() : 'Anti-Infectives & Antibiotics'),
              slug: p.therapySlug || 'anti-infectives',
            },
          });

          // Create / Upsert Product
          const slug = p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

          await prisma.product.upsert({
            where: { slug },
            update: {
              name: p.name,
              salt: p.salt,
              strength: p.strength,
              pack: p.pack,
              description: p.description || 'Pharmaceutical formulation',
              image: p.image || null,
              companyId: company.id,
              categoryId: category.id,
              therapyId: therapy.id,
            },
            create: {
              slug,
              name: p.name,
              salt: p.salt,
              strength: p.strength,
              pack: p.pack,
              description: p.description || 'Pharmaceutical formulation',
              image: p.image || null,
              companyId: company.id,
              categoryId: category.id,
              therapyId: therapy.id,
              isFeatured: true,
            },
          });

          successCount++;
        } catch (err) {
          console.error('Bulk import row error:', err);
          failedCount++;
        }
      }
    } else {
      // Mock success count
      successCount = products.filter(p => p.name && p.salt).length;
      failedCount = products.length - successCount;
    }

    return NextResponse.json({
      success: true,
      importedCount: successCount,
      failedCount,
      totalCount: products.length,
    });
  } catch (error) {
    console.error('Bulk import API error:', error);
    return NextResponse.json(
      { error: 'Failed to process bulk import' },
      { status: 500 }
    );
  }
}
