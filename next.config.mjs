/** @type {import('next').NextConfig} */
const nextConfig = {
  // Every public URL on balibliss.net ends in a slash; keep them identical.
  trailingSlash: true,
  images: {
    // WebP only: the AVIF encoder hung indefinitely on the transparent logo PNG during
    // local QA (2026-10-12), which left the header logo blank.
    formats: ['image/webp'],
    qualities: [70, 80],
  },
};

export default nextConfig;
