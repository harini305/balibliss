import { SITE } from '@/content/site';

// /styleguide/ is a local QA tool and the thank-you page is a post-booking utility page.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/styleguide/', '/thank-you-for-your-booking/'] }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
