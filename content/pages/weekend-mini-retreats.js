export default {
  slug: 'weekend-mini-retreats',
  kind: 'retreat',
  section: { label: 'Day Retreats', href: '/one-day-healing-retreats-in-bali/' },
  title: 'Private Weekend Retreat Workshops',
  tagline: 'One‑Day Private Reiki & Sound Healing Immersion',
  intro: [
    'A One‑Day intimate retreat workshop for energy, balance, and renewal in Ubud',
    'Step into a sacred day designed for both learning and renewal. This private immersion combines the structured depth of a Reiki Level 1 workshop with the soulful atmosphere of a retreat. You’ll receive your attunement, practice giving and receiving Reiki, and journey through chakra balancing sound therapy — all within an intimate setting of no more than two participants.',
    'Guided reflection, nourishing breaks, and a closing circle with certificate presentation ensure that your experience is both educational and transformative. With continued follow‑up support, this retreat workshop offers not just a skill, but a pathway to deeper healing and connection.',
  ],
  seo: {
    title: 'One-Day Private Reiki & Sound Healing Immersion in Ubud',
    description:
      'A private one-day immersion combining a Reiki Level 1 workshop with chakra balancing sound therapy, for no more than two participants.',
  },
  hero: {
    variant: 'portrait',
    image: {
      src: '/media/services/reiki/reiki-hands-crystals.jpg',
      width: 600,
      height: 800,
      alt: "A practitioner's hands resting above a client during Reiki, with crystals placed along her body",
      position: '50% 45%',
    },
  },
  cta: 'whatsapp',
  ctaLabel: 'Request Your Dates',
  facts: [
    { term: 'Location', value: 'Ubud, Bali' },
    { term: 'Maximum', value: '2 participants' },
    { term: 'Per person', value: 'IDR 5,000K' },
    { term: 'Per couple', value: 'IDR 9,600K' },
  ],
  blocks: [
    {
      type: 'timeline',
      heading: 'Schedule of the Day',
      steps: [
        { time: '10:00 – 10:15', title: 'Opening & Grounding', text: 'Gentle meditation to arrive fully and set intentions.' },
        {
          time: '10:15 – 12:00',
          title: 'Introduction to Reiki & Attunement',
          text: 'Understanding Reiki principles, followed by your Level 1 attunement.',
        },
        { time: '12:00 – 13:30', title: 'Lunch Break (included)', text: '' },
        { time: '13:30 – 16:00', title: 'Reiki Practice', text: 'Guided practice in receiving and giving Reiki.' },
        { time: '16:00 – 16:30', title: 'Reflective Moment', text: 'Journaling or a mindful walk to integrate the experience.' },
        { time: '16:30 – 17:00', title: '(Group) Discussion', text: 'Sharing insights from the Reiki sessions.' },
        {
          time: '17:00 – 18:30',
          title: 'Chakra Balancing Sound Therapy',
          text: 'Immersive sound journey with singing bowls and healing vibrations.',
        },
        {
          time: '18:30 – 19:00',
          title: 'Certificate Presentation & Closing Circle',
          text: 'Gentle closing ritual and awarding of certificates.',
        },
      ],
    },
    {
      type: 'details',
      heading: 'Investment',
      items: [
        { term: 'Per person', value: 'IDR 5,000K' },
        { term: 'Per couple', value: 'IDR 9,600K' },
      ],
    },
    {
      type: 'list',
      heading: 'Included',
      items: [
        'Reiki Level 1 module, training & attunement',
        'Chakra balancing sound therapy session',
        'Tea and snacks',
        'Certificate of completion',
        '3x follow‑up support via email (once per week)',
      ],
      style: 'check',
    },
    {
      type: 'list',
      heading: 'Why Choose This Immersion?',
      items: [
        'Intimate & personalized: Maximum of 2 participants ensures deep attention and guidance.',
        'Holistic experience: Reiki training enriched with sound therapy for chakra alignment.',
        'Continued support: Integration beyond the day with email guidance.',
        'Premium setting: A soulful retreat atmosphere in Ubud.',
      ],
      style: 'plain',
    },
    {
      type: 'cta',
      heading: 'Ready to begin your Reiki journey?',
      text: 'Book your Level 1 training today.',
      label: 'Request Your Dates',
      action: 'whatsapp',
    },
  ],
  notes: [
    'ORPHAN PAGE: no navigation or page links here on the live site (audit 3.6). It is now linked as a 6th card on the retreat hub; remove that card if the owner prefers to keep it unlisted.',
    'Prices are kept verbatim in the source\'s "K" notation: "IDR 5,000K per person" and "IDR 9,600K per couple". This presumably means IDR 5,000,000 / 9,600,000; the owner should confirm and choose a format matching the other retreats. The audit lists Usui Reiki L1 alone at IDR 2,550,000 in Amelia.',
    'Inclusions conflict (audit 3.6 #6): the schedule says "Lunch Break (included)", but the "Included" list has only "Tea and snacks" and no lunch.',
    'The "(Group) Discussion" slot conflicts with the private format ("no more than two participants").',
    'This page does not state a day of the week or "weekend" timing beyond its H1/slug, and it publishes no availability.',
    'Divi CONTACT FORM not transcribed. The hero "Request Your Dates" button jumps to it (#dates). It posts to the page itself, and every field is required: Name; "Email or Whatsapp"; dates (placeholder "e.g., 10–12 Oct or flexible next month"); an "Experience Level" select (Beginner / Some experience / Refreshing Level 1); a message "Anything we should know?"; and a sum captcha ("11 + 12 ="). Submit label: "Submit Request". The new site should replace it with the WhatsApp/email enquiry composer, collecting the same fields.',
    'This page has no NinjaTeam WhatsApp button, unlike the other retreat pages. The cta label uses the source\'s "Request Your Dates" wording.',
    'Typo fixes: "Reiki &Attunement" → "Reiki & Attunement", and "training &attunement" → "training & attunement" (missing spaces). Bullet glyphs "•" and line breaks were removed from the Included items. Non-breaking hyphens ("One‑Day", "follow‑up") are kept as in the source.',
    'The source "Investment" prices are H4 headings. They are stored as a details block.',
    'IMAGES: the source page has no photos. The hero reuses the existing Reiki hands-and-crystals photo (/media/services/reiki/reiki-hands-crystals.jpg) as an illustrative image. Swap it or use variant "plain" if preferred.',
    'The section/breadcrumb is set to Day Retreats per the brief, although the content is a Reiki Level 1 training workshop.',
  ],
};
