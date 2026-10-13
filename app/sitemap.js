import { getPage, getPageSlugs, getPostIndex, getCategories } from '@/lib/content';
import { PER_PAGE } from '@/components/insights/InsightsListing';
import { COMBINED, isMerged } from '@/lib/routes.mjs';
import { SITE } from '@/content/site';

// Every public, indexable route. Former sub-pages are sections of their menu page (they redirect),
// so only the menu pages are listed. Pages marked `noindex` (thank-you) and /styleguide/ are left out.
export default async function sitemap() {
  const url = (path) => `${SITE.url}${path}`;
  const posts = getPostIndex();
  const standalone = (await Promise.all(getPageSlugs().filter((s) => !isMerged(s)).map(getPage))).filter((p) => !p.noindex && !COMBINED.some((c) => c.hub === p.slug));
  const insightPages = Math.ceil(posts.length / PER_PAGE);

  return [
    { url: url('/'), changeFrequency: 'monthly', priority: 1 },
    ...COMBINED.map((c) => ({ url: url(c.path), changeFrequency: 'monthly', priority: 0.9 })),
    { url: url('/contact/'), changeFrequency: 'monthly', priority: 0.8 },
    ...standalone.map((p) => ({ url: url(`/${p.slug}/`), changeFrequency: 'monthly', priority: p.kind === 'legal' ? 0.3 : 0.6 })),
    { url: url('/insights/'), changeFrequency: 'weekly', priority: 0.6 },
    ...Array.from({ length: Math.max(0, insightPages - 1) }, (_, i) => ({ url: url(`/insights/page/${i + 2}/`), priority: 0.3 })),
    ...getCategories().map((c) => ({ url: url(`/category/${c.slug}/`), priority: 0.4 })),
    ...posts.map((p) => ({ url: url(`/${p.slug}/`), lastModified: p.modified, priority: 0.5 })),
  ];
}
