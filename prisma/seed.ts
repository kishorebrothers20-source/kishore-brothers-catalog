import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Kishore Brothers Wholesale Database Seed...');

  // 1. Create Companies
  const kishoreCompany = await prisma.company.upsert({
    where: { slug: 'kishore-brothers' },
    update: {},
    create: {
      name: 'Kishore Brothers Trading Firm',
      slug: 'kishore-brothers',
      logo: '/logos/kishore.png',
    },
  });

  const ciplaCompany = await prisma.company.upsert({
    where: { slug: 'cipla' },
    update: {},
    create: {
      name: 'Cipla Limited',
      slug: 'cipla',
      logo: '/logos/cipla.png',
    },
  });

  const novachemLabs = await prisma.company.upsert({
    where: { slug: 'novachem-laboratories' },
    update: {},
    create: {
      name: 'NovaChem Laboratories',
      slug: 'novachem-laboratories',
      logo: '/logos/novachem.png',
    },
  });

  // 2. Create Categories
  const tabletsCategory = await prisma.category.upsert({
    where: { slug: 'oral-tablets' },
    update: {},
    create: {
      name: 'Oral Film-Coated Tablets',
      slug: 'oral-tablets',
    },
  });

  const inhalersCategory = await prisma.category.upsert({
    where: { slug: 'respiratory-inhalers' },
    update: {},
    create: {
      name: 'Inhalation & Respiratory Devices',
      slug: 'respiratory-inhalers',
    },
  });

  const nutraceuticalsCategory = await prisma.category.upsert({
    where: { slug: 'nutraceuticals' },
    update: {},
    create: {
      name: 'Nutraceuticals & Dietary Capsules',
      slug: 'nutraceuticals',
    },
  });

  // 3. Create Therapies
  const cardioTherapy = await prisma.therapy.upsert({
    where: { slug: 'cardiovascular' },
    update: {},
    create: {
      name: 'Cardiovascular & Anti-Hypertensives',
      slug: 'cardiovascular',
    },
  });

  const respiratoryTherapy = await prisma.therapy.upsert({
    where: { slug: 'respiratory' },
    update: {},
    create: {
      name: 'Respiratory & Pulmonology',
      slug: 'respiratory',
    },
  });

  const nutritionalTherapy = await prisma.therapy.upsert({
    where: { slug: 'nutritional-health' },
    update: {},
    create: {
      name: 'Nutritional & General Wellness',
      slug: 'nutritional-health',
    },
  });

  // 4. Create Kishore Brothers & Cipla Products
  await prisma.product.upsert({
    where: { slug: 'amlodac-5mg' },
    update: {},
    create: {
      name: 'Amlodac (Amlodipine Besylate Tablets 5mg / 10mg)',
      slug: 'amlodac-5mg',
      image: '/products/amlodac.png',
      salt: 'Amlodipine Besylate',
      description: 'Long-acting dihydropyridine calcium channel blocker indicated for essential hypertension and stable angina.',
      strength: '5 mg / 10 mg',
      pack: 'Blister Strip of 15 Tablets (Box of 10x15)',
      companyId: ciplaCompany.id,
      categoryId: tabletsCategory.id,
      therapyId: cardioTherapy.id,
      isFeatured: true,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'dolo-650-tablets' },
    update: {},
    create: {
      name: 'Dolo 650 Fever & Pain Relief Tablets',
      slug: 'dolo-650-tablets',
      image: '/products/dolo.png',
      salt: 'Paracetamol / PCM (650mg)',
      description: 'High-efficacy anti-pyretic formulation engineered for sustained fever control, headache, and body pain relief.',
      strength: '650 mg',
      pack: 'Blister Strip of 15 Tablets',
      companyId: kishoreCompany.id,
      categoryId: tabletsCategory.id,
      therapyId: cardioTherapy.id,
      isFeatured: true,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'foracort-200-inhaler' },
    update: {},
    create: {
      name: 'Foracort Inhaler 200 (Formoterol Fumarate + Budesonide)',
      slug: 'foracort-200-inhaler',
      image: '/products/foracort.png',
      salt: 'Formoterol Fumarate (6mcg) + Budesonide (200mcg)',
      description: 'Dual-action bronchodilator and corticosteroid combination for chronic management of asthma and COPD.',
      strength: '200 mcg / 400 mcg',
      pack: 'Pressurized Metered Dose Inhaler (120 Actuations)',
      companyId: ciplaCompany.id,
      categoryId: inhalersCategory.id,
      therapyId: respiratoryTherapy.id,
      isFeatured: true,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'maxirich-multivitamin' },
    update: {},
    create: {
      name: 'Maxirich Daily Multivitamin & Minerals Softgel Capsules',
      slug: 'maxirich-multivitamin',
      image: '/products/maxirich.png',
      salt: 'Multivitamins + Essential Minerals + Ginseng Extract',
      description: 'Daily nutritional health supplement enriched with standardized Ginseng extract and anti-oxidants for vitality.',
      strength: 'Daily Vitality Formula',
      pack: 'Blister Pack of 10 Softgel Capsules (Box of 3x10)',
      companyId: ciplaCompany.id,
      categoryId: nutraceuticalsCategory.id,
      therapyId: nutritionalTherapy.id,
      isFeatured: true,
    },
  });

  console.log('✅ Kishore Brothers Products Seeded Successfully!');
}

main()
  .catch(e => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
