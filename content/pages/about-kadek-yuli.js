export default {
  slug: 'about-kadek-yuli',
  kind: 'bio',
  section: { label: 'About', href: '/about/' },
  person: { name: 'Kadek Yuli', role: 'Massage, Reiki and Sound Therapy' },
  title: 'About Yuli',
  tagline: 'Meet Yuli – Nurturing Balance, Harmony, and Healing',
  intro: [
    'I’m Yuli, a proud Balinese native living in the heart of Ubud, where the spirit of tradition and the beauty of nature inspire my journey. My life is deeply rooted in harmony, alignment, and the sacred art of living, guided by the wisdom of my ancestors and the divine presence that surrounds us.',
    'My path began in the hospitality industry, where I developed a deep appreciation for human connection and the power of creating moments of relaxation and peace. Over time, I felt a calling to deepen my connection with nature and holistic healing, leading me to explore traditional Balinese healing arts.',
    'I have honed my skills in Balinese full-body massage and facial reflexology, techniques that not only promote physical relaxation but also restore energetic balance. My experience in the industry has also inspired me to embrace the healing power of Reiki, and I have completed my Usui Reiki Level 1 training to further support the well-being of those I work with.',
    'For me, helping others find balance, harmony, and relaxation is both an honor and a purpose. Whether through touch, energy work, or guiding individuals back to themselves, I believe in creating a space where deep healing can unfold naturally.',
  ],
  seo: {
    title: 'About Kadek Yuli, Massage & Reiki in Ubud',
    description:
      'I’m Yuli, a proud Balinese native living in the heart of Ubud. I have honed my skills in Balinese full-body massage and facial reflexology.',
  },
  hero: {
    variant: 'portrait',
    image: {
      src: '/media/people/kadek-yuli.jpg',
      width: 400,
      height: 400,
      alt: 'Yuli smiling in a pale blue embroidered top in front of tropical leaves',
      position: '50% 40%',
    },
  },
  cta: 'booking',
  ctaLabel: 'Book a Session With Yuli',
  facts: [],
  // Verbatim fragments from the bio above.
  credentials: ['Usui Reiki Level 1 training'],
  specialties: ['Balinese full-body massage', 'facial reflexology', 'Reiki'],
  quote:
    'Join me at Bali Bliss, where together, we embrace the art of living in alignment—with ourselves, with nature, and with the flow of life',
  blocks: [
    {
      type: 'cta',
      heading:
        'Join me at Bali Bliss, where together, we embrace the art of living in alignment—with ourselves, with nature, and with the flow of life',
      label: 'Book a Session With Yuli',
      action: 'booking',
      href: 'https://balibliss.net/bookings/',
    },
  ],
  notes: [
    'Portrait: the live site uses 2025/03/Yuli-Bali-Bliss-400-1.jpg for Yuli everywhere (bio, home page, Reiki, Sound Therapy, Facial Reflexology and Intuitive Healing Massage cards). /media/people/kadek-yuli.jpg now holds that photo for every page. The earlier import came from Yuli-Bali-Bliss-400.jpg, which shows a different woman; the owner should confirm the photo.',
    'Credentials: she states only Usui Reiki Level 1, but she is listed for paid Reiki and Sound Therapy sessions, and the bio gives no sound-therapy training (audit §3.6 item 9). Nothing added.',
    'Name: the H1 is "About Yuli"; the browser title is "About Kadek"; the home card says "Kadek Yuli". The source uses "Yuli" throughout the bio.',
    'Source bolds phrases mid-sentence; rendered as plain text. The closing quote has no full stop in the source.',
    'The source portrait alt is the copy-pasted "Reiki with Crystals - Bali Bliss"; replaced with a description. The portrait is only 400×400 px.',
  ],
};
