import { notFound } from 'next/navigation';
import InsightsListing, { PER_PAGE } from '@/components/insights/InsightsListing';
import { getPostIndex } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  const pages = Math.ceil(getPostIndex().length / PER_PAGE);
  return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }) {
  const { n } = await params;
  // Each page canonicalises to itself (the live site wrongly points page 2 at page 1).
  return { title: `Insights — Page ${n}`, alternates: { canonical: `/insights/page/${n}/` } };
}

export default async function InsightsPaged({ params }) {
  const n = Number((await params).n);
  if (!Number.isInteger(n) || n < 2) notFound();
  return (
    <InsightsListing
      posts={getPostIndex()}
      page={n}
      title="Insights"
      basePath="/insights/"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Insights', href: '/insights/' }, { label: `Page ${n}` }]}
    />
  );
}
