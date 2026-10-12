import { SITE } from '@/content/site';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/styleguide/'] }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
