import { mergedRedirects } from './lib/routes.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Every public URL on balibliss.net ends in a slash; keep them identical.
  trailingSlash: true,
  images: {
    // Image Optimization is switched off (the hosting plan's optimisation quota is nearly used up):
    // next/image serves the original files from /public as-is. They were already imported at
    // web sizes with metadata stripped.
    unoptimized: true,
  },
  // Live-site URLs that have no page of their own here (Phase 0 §5).
  async redirects() {
    const toBookings = ['/shop', '/cart', '/checkout', '/my-account', '/customer-panel', '/product/:path*'];
    return [
      { source: '/book-now', destination: '/bookings/', permanent: true },
      { source: '/tarot-card-reading', destination: '/wellness-sessions/#inner-guidance', permanent: true },
      { source: '/facial-massage', destination: '/wellness-sessions/#facial-reflexology-massage', permanent: true },
      { source: '/author/:path*', destination: '/about/#about-lia-natali', permanent: true },
      { source: '/facilitators', destination: '/about/', permanent: true },
      ...toBookings.map((source) => ({ source, destination: '/bookings/', permanent: true })),
      // Former sub-pages are now sections of one page per menu item.
      ...mergedRedirects(),
    ];
  },
};

export default nextConfig;
