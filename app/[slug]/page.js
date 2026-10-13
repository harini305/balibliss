import { notFound } from 'next/navigation';
import PageTemplate from '@/components/page/PageTemplate';
import CombinedPage from '@/components/page/CombinedPage';
import Blocks from '@/components/page/Blocks';
import BookingInfo from '@/components/page/BookingInfo';
import RetreatEnquiry from '@/components/page/RetreatEnquiry';
import Article from '@/components/insights/Article';
import { getPage, getPageSlugs, getPost, getPostIndex } from '@/lib/content';
import { COMBINED, isMerged } from '@/lib/routes.mjs';
import { resolveAction } from '@/lib/actions';

// Every public URL on balibliss.net sits at the root (/bookings/, /<post-slug>/), so one dynamic
// segment serves the remaining standalone pages, the Day Retreats menu page and Insights articles.
// Former sub-pages are sections of their menu page now; their URLs redirect (next.config.mjs).
export const dynamicParams = false;

const HUB = 'one-day-healing-retreats-in-bali';
const HUB_CONFIG = COMBINED.find((c) => c.hub === HUB);

export function generateStaticParams() {
  return [...getPageSlugs().filter((s) => !isMerged(s)), ...getPostIndex().map((p) => p.slug)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (page) {
    const image = page.hero?.image;
    return {
      title: page.seo?.title ?? page.title,
      description: page.seo?.description,
      alternates: { canonical: `/${slug}/` },
      robots: page.noindex ? { index: false, follow: true } : undefined,
      openGraph: {
        url: `/${slug}/`,
        title: page.seo?.title ?? page.title,
        description: page.seo?.description,
        images: image ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] : undefined,
      },
    };
  }
  const post = getPost(slug);
  if (!post) return {};
  const img = post.featuredImage;
  return {
    title: post.title,
    description: post.excerpt.length > 160 ? `${post.excerpt.slice(0, 157).replace(/\s+\S*$/, '')}…` : post.excerpt,
    alternates: { canonical: `/${slug}/` },
    openGraph: {
      type: 'article',
      url: `/${slug}/`,
      title: post.title,
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author],
      images: img ? [{ url: img.src, width: img.width, height: img.height, alt: img.alt }] : undefined,
    },
  };
}

/** Day Retreats menu page: the hub's own sections around every retreat, shown in full. */
async function DayRetreats({ hub }) {
  const blocks = hub.blocks.filter((b) => b.type !== 'cards' && b.type !== 'cta');
  const timelineAt = blocks.findIndex((b) => b.type === 'timeline');
  const before = blocks.slice(0, timelineAt + 1);
  const after = blocks.slice(timelineAt + 1);
  const cta = hub.blocks.find((b) => b.type === 'cta');
  const target = cta && resolveAction(cta.action, { href: cta.href, title: hub.title });
  return (
    <CombinedPage
      config={HUB_CONFIG}
      title={hub.title}
      tagline={hub.tagline}
      bannerImage={hub.hero?.image}
      before={<Blocks blocks={before} page={hub} />}
      after={
        <>
          {/* The live Weekend Mini Retreats page had a date-request form; it now follows the retreats. */}
          <RetreatEnquiry />
          <Blocks blocks={after} page={hub} />
        </>
      }
      closing={target ? { heading: cta.heading, text: cta.text, buttonLabel: cta.label, href: target.href } : null}
    />
  );
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (page) {
    if (slug === HUB) return <DayRetreats hub={page} />;
    return <PageTemplate page={page}>{slug === 'bookings' && <BookingInfo page={page} />}</PageTemplate>;
  }
  const post = getPost(slug);
  if (!post) notFound();
  return <Article post={post} />;
}
