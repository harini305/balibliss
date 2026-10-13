export default {
  slug: 'privacy-policy',
  kind: 'legal',
  section: null,
  title: 'Privacy Policy',
  tagline: null,
  updated: 'April 10, 2025',
  intro: [
    '**Effective Date:** April 10, 2025',
    '**Website:** www.balibliss.net',
    'At Bali Bliss, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website and services.',
  ],
  seo: {
    title: 'Privacy Policy',
    description:
      'This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website and services.',
  },
  hero: { variant: 'plain', image: null },
  cta: 'none',
  ctaLabel: null,
  facts: [],
  blocks: [
    {
      type: 'legal',
      sections: [
        {
          heading: '1. Information We Collect',
          paragraphs: [
            'We may collect the following information when you book a session or contact us:',
            'We do not collect or store any sensitive personal data unless explicitly required for service delivery and only with your consent.',
          ],
          list: ['Your name', 'Email address', 'Phone number', 'Payment details (processed securely via our payment provider)'],
        },
        {
          heading: '2. How We Use Your Information',
          paragraphs: [
            'We use your information to:',
            'We do not share, sell, or rent your personal information to third parties.',
          ],
          list: [
            'Confirm and manage bookings',
            'Send booking confirmations and service-related updates',
            'Respond to your inquiries',
            'Improve our services',
          ],
        },
        {
          heading: '3. Payment Processing',
          paragraphs: [
            'All payments are securely processed through trusted third-party payment gateways. Bali Bliss does not store your credit card or payment information on our servers.',
          ],
        },
        {
          heading: '4. Data Security',
          paragraphs: ['We take appropriate measures to protect your data against unauthorized access, loss, misuse, or disclosure.'],
        },
        {
          heading: '5. Your Rights',
          paragraphs: ['You have the right to:', 'To make such a request, please email us at info@balibliss.net.'],
          list: [
            'Access the personal data we hold about you',
            'Request corrections to any inaccuracies',
            'Request that we delete your information',
          ],
        },
        {
          heading: '6. Cookies',
          paragraphs: [
            'Our website may use cookies for basic site functionality. We do not use cookies for advertising or tracking beyond essential purposes.',
          ],
        },
        {
          heading: '7. Changes to This Policy',
          paragraphs: [
            'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.',
          ],
        },
      ],
    },
  ],
  notes: [
    'Complete text, all 7 sections. Where a section has a bullet list, the source order is: first paragraph, list, then second paragraph. The legal block stores the list separately, so the renderer must place `list` after paragraphs[0] (sections 1, 2 and 5).',
    'The source bolds "not" in "We do not share…" and "does not store…"; rendered as plain text.',
    'The email in section 5 is Cloudflare-obfuscated on the live page; decoded to info@balibliss.net. This is the only place info@ appears. Bookings use bookings@ and partnerships use lia@ (see content/contact-audit.json).',
    'The policy mentions no third-party processors by name, but the live site uses WooCommerce/DOKU payments, Amelia, Google review widgets (Trustindex), a Google Maps embed and a WhatsApp widget. Section 6 says cookies are essential-only. The new site should not add analytics without an owner decision and an updated policy.',
    'The effective date is April 10, 2025, with no later revision date.',
  ],
};
