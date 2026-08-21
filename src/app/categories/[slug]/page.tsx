import { redirect } from 'next/navigation';

interface CategoriesSlugProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoriesSlugRedirect({ params }: CategoriesSlugProps) {
  const { slug } = await params;
  redirect(`/category/${slug}`);
}
