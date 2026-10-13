import { notFound } from 'next/navigation';
import InsightsListing, { PER_PAGE } from '@/components/insights/InsightsListing';
import { getCategories, getPostIndex } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().flatMap((c) => {
    const pages = Math.ceil(getPostIndex().filter((p) => p.categories.includes(c.slug)).length / PER_PAGE);
    return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ slug: c.slug, n: String(i + 2) }));
  });
}

export async function generateMetadata({ params }) {
  const { slug, n } = await params;
  const cat = getCategories().find((c) => c.slug === slug);
  return cat ? { title: `${cat.name} — Insights, Page ${n}`, alternates: { canonical: `/category/${slug}/page/${n}/` } } : {};
}

export default async function CategoryPaged({ params }) {
  const { slug, n: raw } = await params;
  const n = Number(raw);
  const cat = getCategories().find((c) => c.slug === slug);
  if (!cat || !Number.isInteger(n) || n < 2) notFound();
  return (
    <InsightsListing
      posts={getPostIndex().filter((p) => p.categories.includes(slug))}
      page={n}
      title={cat.name}
      basePath={`/category/${slug}/`}
      activeCategory={slug}
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insights', href: '/insights/' },
        { label: cat.name, href: `/category/${slug}/` },
        { label: `Page ${n}` },
      ]}
    />
  );
}
