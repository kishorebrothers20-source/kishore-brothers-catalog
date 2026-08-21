# 💊 Aegis BioPharma Catalog - Modern Next.js 15 Pharmaceutical Index

A modern, high-performance **Pharmaceutical Product Catalog Website** built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and pre-configured for **PostgreSQL + Prisma** database integration.

---

## 🌟 Key Architectural Features

- **Next.js 15 App Router**: Server Components used by default for optimum speed, minimal client-side JavaScript, and instant SEO rendering.
- **Strictly B2B Catalog Scope**: Zero e-commerce overhead (no shopping cart, no checkout, no pricing logic). Designed specifically for healthcare sourcing, regulatory compliance, and WHO-GMP dossier requests.
- **Data Access & Fallback Architecture**: Includes a repository layer (`src/lib/db/catalog.ts`) that runs seamlessly out-of-the-box using high-quality medical-grade mock data, while being 100% prepared to execute live SQL queries as soon as PostgreSQL & Prisma are connected.
- **Search & Filter (URL Synchronized)**: Filter by Therapeutic Category, Dosage Formulation, and Rx Status with bookmarkable URL search params.
- **Technical Dossier & Specification Table**: CAS Index numbers, Molecular Formulas, Storage Conditions, Shelf Life, Packaging, and INN active ingredients.
- **SEO & OpenGraph Built-in**: Dynamic `sitemap.ts`, `robots.ts`, OpenGraph metadata, and schema.org `MedicalWebPage` + `MedicalOrganization` JSON-LD structured data for Google indexing.
- **Clean Component Architecture**: Decoupled UI components (`Badge`, `Button`), catalog components (`ProductCard`, `ProductGrid`, `ProductFilter`, `SpecificationTable`), and section layouts (`HeroSection`, `CategoryGrid`, `QualityCertifications`).

---

## 📁 Clean Folder Structure

```
pharma-catalog/
├── prisma/
│   ├── schema.prisma          # PostgreSQL Schema (Product, Category, DosageForm, ActiveIngredient, Inquiry)
│   └── seed.ts                # Database seed script for initial pharma formulations
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── inquiry/
│   │   │       └── route.ts   # B2B Sourcing Inquiry API endpoint
│   │   ├── categories/
│   │   │   ├── page.tsx       # All Therapeutic Categories overview (Server Component)
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Category-filtered products page (Server Component)
│   │   ├── products/
│   │   │   ├── page.tsx       # Main Catalog page with SSR search/filter (Server Component)
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Product Detail & Technical Dossier page (Server Component)
│   │   ├── quality/
│   │   │   └── page.tsx       # WHO-GMP, EU-GMP, ISO compliance page
│   │   ├── contact/
│   │   │   └── page.tsx       # B2B Inquiry page
│   │   ├── globals.css        # Tailwind CSS imports
│   │   ├── layout.tsx         # Root layout with Header, Footer & SEO JSON-LD
│   │   ├── page.tsx           # Homepage (Server Component)
│   │   ├── robots.ts          # SEO robots configuration
│   │   └── sitemap.ts         # Dynamic sitemap generator
│   ├── components/
│   │   ├── catalog/
│   │   │   ├── DosageBadge.tsx
│   │   │   ├── InquiryModal.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductFilter.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── SpecificationTable.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   ├── sections/
│   │   │   ├── CategoryGrid.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── InquirySection.tsx
│   │   │   └── QualityCertifications.tsx
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       └── Button.tsx
│   ├── lib/
│   │   ├── db/
│   │   │   └── catalog.ts     # Data Repository layer (Prisma + Fallback Data)
│   │   ├── prisma.ts          # Global PrismaClient Singleton instance
│   │   ├── seo.ts             # JSON-LD Schema generators
│   │   └── utils.ts           # Classname merger & formatters
│   └── types/
│       └── catalog.ts         # Full TypeScript interfaces for products & inquiries
├── .env.example               # Environment variables template for PostgreSQL
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies (Already completed)
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ PostgreSQL + Prisma Integration Setup (Later Step)

When you are ready to connect to a live PostgreSQL database:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Update your `DATABASE_URL` in `.env`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/pharmadb?schema=public"
   ```
3. Push schema to your PostgreSQL database:
   ```bash
   npx prisma db push
   ```
4. Seed sample pharmaceutical data:
   ```bash
   npx prisma db seed
   ```
5. The application repository (`src/lib/db/catalog.ts`) will automatically detect `DATABASE_URL` and query live PostgreSQL data!

---

## 📄 License
Designed for B2B Pharmaceutical & Healthcare Catalog Enterprise deployments.
