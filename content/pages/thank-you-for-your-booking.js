export default {
  slug: 'thank-you-for-your-booking',
  kind: 'info',
  section: null,
  title: 'Thank You',
  tagline: null,
  intro: [
    'Thank you for your booking, we will confirm shortly by email once the booking details have been reviewed.',
    'We wish you well on your journey and look forward to being of service.',
  ],
  seo: {
    title: 'Booking Thank You',
    description: 'Thank you for your booking, we will confirm shortly by email once the booking details have been reviewed.',
  },
  noindex: true,
  hero: { variant: 'plain', image: null },
  cta: 'none',
  ctaLabel: null,
  facts: [],
  blocks: [],
  notes: [
    'Complete page text. The live browser title is "Booking Thank You"; the H1 is "Thank You".',
    'Conflict: this page says confirmation comes "by email", but the T&C says "All booking communications will be handled via WhatsApp". Kept verbatim; owner to decide.',
    'The page is indexable on the live site; it should be noindex (audit §3.2 #37). noindex: true is set here for the renderer.',
  ],
};
