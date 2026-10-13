export default {
  slug: 'about-arsita-putri',
  kind: 'bio',
  section: { label: 'About', href: '/about/' },
  person: { name: 'Arsita Putri', role: 'Vinyasa, Hatha, Deep Stretch, Beginner Yoga, Weights Yoga' },
  title: 'About Arsita',
  tagline: 'Meet Arsita Putri – Cultivating Strength, Serenity, and Self-Discovery',
  intro: [
    'My journey with yoga began in 2011, during a time when I was navigating the demands of a high-pressure corporate environment. Yoga quickly became more than just an escape—it became a sanctuary, a place where I could release stress, quiet my mind, and reconnect with my body. My mat transformed into a playground of self-discovery, where I could explore movement, deepen my breath, and nurture a sense of inner peace.',
    'In 2014, my passion for wellness led me to work at one of Asia’s largest wellness centers, where I immersed myself in different yoga styles and practices. This experience inspired me to deepen my understanding of yoga, and in 2015, I completed my 200-hour foundational teacher training with Les Leventhal. My dedication to learning didn’t stop there—I pursued my 300-hour advanced training and later had the privilege of assisting Les in guiding new teachers through their 200-hour training in 2017.',
    'Yoga is a lifelong journey, and I continue to expand my knowledge by taking courses, workshops, and trainings. My classes emphasize self-awareness and body intuition, encouraging students to listen to their bodies, honor their limits, and explore their potential. I specialize in Hatha Flow, Vinyasa, Yoga with Weights, Gentle Yoga with Deep Stretch, and Yin Yoga for Stress Release—practices designed to help you strengthen, restore, and reconnect with yourself.',
    'At Bali Bliss, my mission is to create a supportive and uplifting space where students of all backgrounds can experience the profound benefits of yoga.',
  ],
  seo: {
    title: 'About Arsita Putri, Yoga Teacher in Ubud',
    description:
      'My classes emphasize self-awareness and body intuition, encouraging students to listen to their bodies, honor their limits, and explore their potential.',
  },
  hero: {
    variant: 'portrait',
    image: {
      src: '/media/people/arsita-putri.jpg',
      width: 400,
      height: 400,
      alt: 'Arsita Putri smiling outdoors, with long dark hair and a light blue T-shirt, greenery behind her',
      position: '50% 35%',
    },
  },
  cta: 'booking',
  ctaLabel: 'Book a Session With Arsita',
  facts: [],
  // Verbatim fragments from the bio above (the source has no separate list).
  credentials: [
    '200-hour foundational teacher training with Les Leventhal (2015)',
    '300-hour advanced training',
    'assisting Les in guiding new teachers through their 200-hour training in 2017',
  ],
  specialties: ['Hatha Flow', 'Vinyasa', 'Yoga with Weights', 'Gentle Yoga with Deep Stretch', 'Yin Yoga for Stress Release'],
  quote:
    'Whether you seek strength, flexibility, stress relief, or simply a moment of stillness, I am here to guide you on this beautiful journey.',
  blocks: [
    {
      type: 'cta',
      heading:
        'Whether you seek strength, flexibility, stress relief, or simply a moment of stillness, I am here to guide you on this beautiful journey.',
      label: 'Book a Session With Arsita',
      action: 'booking',
      href: 'https://balibliss.net/bookings/',
    },
  ],
  notes: [
    'The source bolds many phrases mid-sentence (years, "sanctuary", the training names and so on). They are not lead-ins, so they are rendered as plain text.',
    'The credentials entries are bio fragments; the source does not say when the 300-hour training was completed.',
    'person.role comes from Arsita’s card on the home page. The live T&C says Yoga at Mayu House is "led by Arsita". A Google review on other pages calls her "Sita".',
    'The source button reads "Book a Session With Arsita" (capital W); kept as written.',
    'The source portrait alt is the copy-pasted "Reiki with Crystals - Bali Bliss"; replaced with a description. The portrait is only 400×400 px (tier C) and no larger original exists on the live site.',
  ],
};
