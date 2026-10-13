export default {
  slug: 'intuitive-healing-massage',
  kind: 'service',
  section: { label: 'Wellness Sessions', href: '/wellness-sessions/' },
  title: 'Bali Bliss Intuitive Healing Massage',
  tagline: 'Restore. Rebalance. Renew.',
  intro: [],
  seo: {
    title: 'Intuitive Healing Massage in Ubud',
    description:
      'A holistic therapy that combines traditional massage techniques with energy healing, addressing both physical and emotional blockages.',
  },
  hero: {
    variant: 'portrait',
    image: {
      src: '/media/services/intuitive-healing-massage/shoulder-massage-paisley.jpg',
      width: 450,
      height: 600,
      alt: "A practitioner's hands massaging the shoulders of a client lying face down on a paisley cover",
      position: '55% 35%',
    },
  },
  cta: 'booking',
  ctaLabel: 'Book a Healing Massage Now',
  facts: [],
  blocks: [
    {
      type: 'qa',
      items: [
        {
          q: 'How is an intuitive healing massage different from a regular massage?',
          a: [
            'Unlike a traditional massage focused solely on muscle relaxation, an intuitive healing massage integrates energy work, helping to restore emotional and energetic balance while relieving physical tension.',
          ],
        },
        {
          q: 'Do I need to prepare anything before my session?',
          a: [
            'No special preparation is needed, but wearing comfortable clothing, staying hydrated, and arriving with an open mind can enhance your experience.',
          ],
        },
        {
          q: 'What sensations might I experience during the massage?',
          a: [
            'You may feel deep relaxation, warmth, tingling, or emotional release as blocked energy is cleared and your body realigns.',
          ],
        },
        {
          q: 'Can this massage help with emotional healing?',
          a: [
            'Yes, an intuitive healing massage can support emotional release by working with energy flow, helping to ease stress, anxiety, and emotional blockages.',
          ],
        },
      ],
    },
    {
      type: 'prose',
      heading: 'What is an Intuitive Healing Massage?',
      paragraphs: [
        "An **Intuitive Healing Massage** is a holistic therapy that combines traditional massage techniques with energy healing, allowing for a deeply restorative experience. Unlike a standard massage that primarily targets muscle relaxation, this approach listens to your body's energetic needs, addressing both physical and emotional blockages. Through intentional touch, breathwork, and intuitive guidance, the therapist works to clear stagnant energy, ease tension, and restore balance to the mind, body, and spirit.",
        'During the session, you may feel a profound sense of relaxation, emotional release, or even subtle energetic shifts as your body aligns with a natural state of harmony. This massage is ideal for those seeking more than just physical relief—whether you’re carrying stress, emotional weight, or simply want to reconnect with yourself, **Intuitive Healing Massage** offers a deeply nurturing and transformative experience.',
      ],
      image: {
        src: '/media/services/intuitive-healing-massage/back-massage.jpg',
        width: 1100,
        height: 526,
        alt: "A practitioner massaging a client's back as she lies face down beneath a batik sarong",
        position: '40% 50%',
      },
    },
    {
      type: 'people',
      heading: 'Our Facilitator',
      items: [
        {
          name: 'Kadek Yuli',
          role: 'Massage Therapist',
          href: '/about-kadek-yuli/',
          image: { src: '/media/people/kadek-yuli.jpg', width: 400, height: 400, alt: 'Kadek Yuli', position: '50% 35%' },
        },
      ],
    },
    {
      type: 'faq',
      heading: 'Intuitive Healing Massage FAQs',
      items: [
        {
          q: 'Is this massage suitable for everyone?',
          a: ['Yes, anyone looking for physical relaxation, emotional healing, or energetic balance can benefit from an intuitive healing massage.'],
        },
        {
          q: 'How often should I receive an intuitive healing massage?',
          a: ['It depends on your personal needs—some people benefit from weekly sessions, while others find monthly treatments sufficient for maintaining balance.'],
        },
        {
          q: 'Will I feel tired or energized after the session?',
          a: ['Responses vary—some feel deeply relaxed or even sleepy, while others experience a renewed sense of energy and clarity.'],
        },
        {
          q: 'Can I combine this massage with other healing therapies?',
          a: ['Absolutely! Many clients pair it with Reiki, sound therapy, or yoga for a more comprehensive healing experience.'],
        },
        {
          q: 'What should I do after my massage to maximize benefits?',
          a: ['Drink plenty of water, rest if needed, and take some quiet time to integrate the healing effects of the session.'],
        },
        {
          q: 'Is this massage safe for pregnant women?',
          a: ['Yes, but we recommend informing your therapist beforehand to tailor the session for your comfort and safety.'],
        },
        {
          q: 'How long does a session usually last?',
          a: ['Sessions typically last between 60 to 90 minutes, allowing enough time for both physical and energetic healing.'],
        },
        {
          q: 'Can I request a specific focus area or concern to be addressed?',
          a: ['Yes, your therapist will discuss your needs before the session and intuitively tailor the massage to your unique concerns.'],
        },
      ],
    },
    {
      type: 'testimonials',
      heading: 'What Our Clients Are Saying',
      items: [
        {
          quote:
            'I left feeling lighter, more aligned, and deeply at peace. If you’re looking for a massage that goes beyond the physical and nurtures both body and soul, I highly recommend Intuitive Healing Massage.',
          name: 'Hellen T',
        },
        {
          quote:
            'I recently experienced an Intuitive Healing Massage, and it was truly transformative. From the moment the session began, I could feel the practitioner’s deep connection to energy work, allowing them to intuitively address areas of tension and emotional blockages.',
          name: 'Ratih Suryaning',
        },
        {
          quote:
            'Pijat ini bukan sekadar teknik, tetapi juga tentang bagaimana terapis bisa “mendengar” tubuh klien—merasakan di mana ada ketegangan, blok energi, atau kebutuhan penyembuhan. Dengan pendekatan intuitif, setiap sesi menjadi unik karena benar-benar mengikuti kondisi saya saat itu.',
          name: 'Jasmine Jero',
        },
      ],
    },
    {
      type: 'cta',
      heading: 'Reconnect with your Body, Mind, and Spirit',
      label: 'Book a Healing Massage Now',
      action: 'booking',
    },
  ],
  notes: [
    'Closing CTA: the source places "Reconnect with your Body, Mind, and Spirit" with a booking button after the "What is…" section; the final button after the testimonials has no heading, so that line is used as the closing CTA heading.',
    'Both source images carry the wrong alt "Facial Massage - Bali Bliss"; new alts describe the photos.',
    'The FAQ says sessions "typically last between 60 to 90 minutes"; the booking system lists this service as 75 minutes. Kept as published.',
    'The third testimonial (Jasmine Jero) is in Indonesian on the source; kept verbatim, untranslated.',
    'The page has no "What to expect" section and no published duration or price.',
  ],
};
