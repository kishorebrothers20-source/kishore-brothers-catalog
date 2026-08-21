import { getCategories, getCompanies, getTherapies } from '@/lib/db/catalog';
import { SearchMedicinesSection } from '@/components/sections/SearchMedicinesSection';
import { BrowseByCompany } from '@/components/sections/BrowseByCompany';
import { CategoryGrid } from '@/components/sections/CategoryGrid';
import { BrowseByTherapy } from '@/components/sections/BrowseByTherapy';

export const revalidate = 3600;

export default async function HomePage() {
  const companies = await getCompanies();
  const categories = await getCategories();
  const therapies = await getTherapies();

  return (
    <div className="bg-[#F4F8FB] min-h-screen">
      {/* 1. Search Medicines & Salt Compositions Section */}
      <SearchMedicinesSection />

      {/* 2. Browse by Company */}
      <BrowseByCompany companies={companies} />

      {/* 3. Browse By Category */}
      <CategoryGrid categories={categories} />

      {/* 4. Browse by Therapy */}
      <BrowseByTherapy therapies={therapies} />
    </div>
  );
}
