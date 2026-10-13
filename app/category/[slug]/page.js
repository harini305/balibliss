import { notFound } from 'next/navigation';
import InsightsListing from '@/components/insights/InsightsListing';
import { getCategories, getPostIndex } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = getCategories().find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.name} — Insights`,
    description: cat.description || `Bali Bliss Insights articles about ${cat.name}.`,
    alternates: { canonical: `/category/${slug}/` },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const cat = getCategories().find((c) => c.slug === slug);
  if (!cat) notFound();
  // Fixes the live archive bug: only posts in this category are listed.
  const posts = getPostIndex().filter((p) => p.categories.includes(slug));
  return (
    <InsightsListing
      posts={posts}
      page={1}
      title={cat.name}
      intro={cat.description || null}
      basePath={`/category/${slug}/`}
      activeCategory={slug}
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Insights', href: '/insights/' }, { label: cat.name }]}
    />
  );
}
