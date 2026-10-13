export default {
  slug: 'terms-conditions',
  kind: 'legal',
  section: null,
  title: 'Terms & Conditions',
  tagline: null,
  updated: null,
  intro: ['Please read the following terms carefully before proceeding with your booking:'],
  seo: {
    title: 'Terms & Conditions',
    description:
      'Booking terms for Bali Bliss Wellness: WhatsApp contact, healing locations, advance booking, payment, cancellation, rescheduling and health disclosure.',
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
          heading: 'WhatsApp Contact',
          paragraphs: [
            'Ensure your WhatsApp number is entered accurately, including the correct COUNTRY CODE. All booking communications will be handled via WhatsApp.',
          ],
        },
        {
          heading: 'Our Healing Locations',
          paragraphs: [
            'Bali Bliss Wellness offers sessions at two thoughtfully chosen venues in Ubud:',
            '**• Mayu House – Ubud Center** Located in the heart of Ubud, this space hosts Regular Reiki, Sound Therapy, and Massage treatments with Yuli and Yoga sessions led by Arsita.',
            '**• Wana Stay – Just Outside Ubud Center** Nestled in lush greenery and set apart from the bustle of town, Wana Stay offers a quieter, more grounding environment—ideal for deep healing work. Here, Lia offers Reiki, Sound Therapy, Qigong, Intuitive Readings, Yin Yoga, and Yoga Nidra.',
            '📍 Location details will be shared upon booking confirmation.',
            'For visits to Wana Stay, we recommend using an online motorbike taxi (approx. 10–15 minutes from Ubud Center). Alternatively, Bali Bliss can arrange bike transport for you at an additional fee, payable directly to the driver.',
          ],
        },
        {
          heading: 'Advance Booking',
          paragraphs: ['Appointments must be made at least two (2) hours in advance of your preferred session time.'],
        },
        {
          heading: 'Payment & Cancellation Policy',
          paragraphs: [],
          list: [
            'All prices shown include applicable taxes and a secure payment processing fee - no surprises at checkout.',
            'A deposit (DP) is required to confirm your booking.',
            'Once you\'ve entered your details on the booking page, just click "PLACE ORDER" to complete your reservation.',
            'The DP is non-refundable if the client cancels the appointment.',
            'The remaining balance may be paid in cash at the time of your session.',
            'If card payment isn’t working, contact us before booking.',
          ],
        },
        {
          heading: 'Rescheduling',
          paragraphs: [],
          list: [
            'Each booking may be rescheduled once only. Kindly note that any cancellation or rescheduling requests should be submitted to Bali Bliss no later than two (2) hours before the scheduled session.',
            'For Chi Nei Tsang, Somatic Experience, and Yoga Alignment & Fundamentals Workshop), we kindly request at least twenty-four (24) hours’ notice for any changes.',
          ],
        },
        {
          heading: 'Health Disclosure',
          paragraphs: [
            'If you have any health conditions—especially those that may affect or be affected by the treatment—please inform Bali Bliss in advance so that we can provide the safest and most appropriate care.',
          ],
        },
      ],
    },
  ],
  notes: [
    'Complete text, all 6 sections. An empty H3 between Rescheduling and Health Disclosure was skipped. The page states no effective date.',
    'Typo fixed: "r escheduled" → "rescheduled" (the source splits the word across two <em> tags). The source also has the split "Lia offer" + "s", which renders correctly as "offers".',
    'Kept verbatim, for review: the unmatched ")" in "…Yoga Alignment & Fundamentals Workshop)". "Somatic Experience" here differs from the service page name "Somatic Practices".',
    'The two venue lead-ins are bold in the source and kept as **bold** lead-ins. Other emphasis (bold/italic/underline on "read", "two (2) hours in advance", "non-refundable", "PLACE ORDER", "remaining balance", "cash", the service lists) is rendered as plain text.',
    'Conflicts (see content/contact-audit.json): (1) the T&C says all booking communication is via WhatsApp, but the thank-you page says confirmation is by email. (2) The T&C lists 2 venues, while Amelia offers 6 (incl. Singakerta and in-villa Kuta/Seminyak/Kerobokan). (3) "All prices shown include… a secure payment processing fee" conflicts with the retreat hub’s "online payment fees may apply". (4) "contact us before booking" gives no channel or number. (5) Wana Stay is "approx. 10–15 minutes" here but "15 min outside center" in Amelia.',
    'Cancellation by the client forfeits the DP. The page does not say what happens when Bali Bliss cancels.',
  ],
};
