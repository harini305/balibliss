export default {
  slug: 'about-kiki-dewi',
  kind: 'bio',
  section: { label: 'About', href: '/about/' },
  person: {
    name: 'Kiki Dewi',
    role: 'Spa & Wellness Professional | Yoga & Mat Pilates Instructor | Reiki Practitioner | Spa Trainer',
  },
  title: 'About Kiki',
  tagline: 'Meet Kiki - Spa & Wellness Professional | Yoga & Mat Pilates Instructor | Reiki Practitioner | Spa Trainer',
  intro: [
    'With over 20 years of dedicated experience in the spa industry and more than a decade immersed in the practice of yoga, I am a committed wellness professional passionate about guiding individuals towards holistic well-being through mindful movement, breathwork, and natural healing modalities.',
    'As a freelance yoga instructor, I offer a diverse range of yoga styles, including Hatha and Vinyasa, alongside personalized Reiki healing sessions and comprehensive spa training. I hold a 200-hour Yoga Teacher Training certification earned in 2014 and embrace the philosophy of continuous learning as a dedicated "forever student."',
    'My active lifestyle encompasses various disciplines such as Body Pump, TRX, Body Combat, Pilates, swimming, trekking, and dance, reflecting my deep belief in the vital connection between a balanced body, mind, and spirit for a healthy and meaningful life.',
  ],
  seo: {
    title: 'About Kiki Dewi, Yoga, Pilates & Reiki in Ubud',
    description:
      'I hold a 200-hour Yoga Teacher Training certification earned in 2014 and embrace the philosophy of continuous learning as a dedicated "forever student."',
  },
  hero: {
    variant: 'portrait',
    image: {
      src: '/media/people/kiki-dewi.jpg',
      width: 600,
      height: 600,
      alt: 'Kiki Dewi smiling in a bright blue T-shirt beside a frangipani tree',
      position: '50% 30%',
    },
  },
  cta: 'booking',
  ctaLabel: 'Book a Session With Kiki',
  facts: [],
  // Verbatim fragments from the bio above.
  credentials: ['200-hour Yoga Teacher Training certification earned in 2014'],
  specialties: [
    'Private & Group Hatha & Vinyasa Yoga Classes',
    'Reiki Healing Sessions',
    'Spa Training & Consultation',
    'Wellness & Movement Workshops',
  ],
  quote: 'To inspire a healthy and balanced lifestyle by harmonizing physical movement, conscious breathing, and self-awareness.',
  blocks: [
    {
      type: 'list',
      heading: 'Services',
      items: [
        'Private & Group Hatha & Vinyasa Yoga Classes',
        'Reiki Healing Sessions',
        'Spa Training & Consultation',
        'Wellness & Movement Workshops',
      ],
      style: 'check',
    },
    {
      type: 'cta',
      heading: 'To inspire a healthy and balanced lifestyle by harmonizing physical movement, conscious breathing, and self-awareness.',
      label: 'Book a Session With Kiki',
      action: 'booking',
      href: 'https://balibliss.net/bookings/',
    },
  ],
  notes: [
    'Credentials: the only certification stated is the 200-hour YTT (2014). Her title says "Mat Pilates Instructor", but the page gives no Pilates certification ("Pilates" appears only in her list of personal activities), and no Reiki level is stated. Nothing added; for the owner to review (audit §3.6 item 9).',
    'The source page and home card give the name only as "Kiki" / "Kiki Dewi"; the image file is named "dewi.png".',
    'The "Services:" lead-in is a bold paragraph in the source; it is used as the list heading "Services".',
    'The source portrait alt is the copy-pasted "Reiki with Crystals - Bali Bliss"; replaced with a description. On the Mat Pilates and Yoga pages, Kiki’s card links to Yulia’s bio (audit), not to this page.',
  ],
};
