export default {
  slug: 'qigong-session',
  kind: 'service',
  section: { label: 'Wellness Sessions', href: '/wellness-sessions/' },
  title: 'Bali Bliss Qigong',
  tagline: 'Qigong - Cultivate Vitality, Flow, and Inner Peace',
  intro: [],
  seo: {
    title: 'Qigong Sessions in Ubud',
    description:
      'Qigong is a gentle and powerful movement practice that originates from ancient Chinese medicine and philosophy. Accessible to all ages and fitness levels.',
  },
  hero: {
    variant: 'split',
    image: {
      src: '/media/services/qigong-session/qigong-park-group.jpg',
      width: 1280,
      height: 853,
      alt: 'Three people practising Qigong hand movements together in a green park',
      position: '50% 35%',
    },
  },
  cta: 'booking',
  ctaLabel: 'Book A Qigong Session Now',
  facts: [],
  blocks: [
    {
      type: 'qa',
      items: [
        {
          q: 'What happens during a Qigong session?',
          a: [
            'A Qigong session involves a series of slow, mindful movements, deep breathing techniques, and meditation to activate and balance the body’s energy (Qi).',
          ],
        },
        {
          q: 'Do I need any prior experience?',
          a: ['Not at all. Qigong is gentle and accessible to all ages and fitness levels, including complete beginners.'],
        },
        {
          q: 'What should I wear or bring?',
          a: ['Wear loose, comfortable clothing that allows you to move freely. A water bottle and open mind are all you need.'],
        },
        {
          q: 'Will I be doing this seated, standing, or lying down?',
          a: [
            'Most movements are done standing, but some exercises may be done seated. Modifications are always available depending on your comfort and ability.',
          ],
        },
      ],
    },
    {
      type: 'prose',
      heading: 'What is Qigong?',
      paragraphs: [
        'Qigong (pronounced “chee-gong”) is a gentle and powerful movement practice that originates from ancient Chinese medicine and philosophy. It combines slow, intentional movements, breathing techniques, and focused awareness to help circulate Qi—your life force energy—throughout the body. Qigong helps activate the body’s natural healing mechanisms and supports overall vitality, flexibility, and emotional balance.',
        'Whether you’re recovering from stress, managing chronic tension, or simply looking for a grounding, meditative practice, Qigong offers a deeply restorative experience. It strengthens the connection between mind, body, and breath, and leaves you feeling both calm and energized. Practiced regularly, it can improve your posture, enhance your mood, and help regulate the flow of energy within your body.',
      ],
      image: {
        src: '/media/services/qigong-session/qigong-beach-sunset.jpg',
        width: 853,
        height: 1280,
        alt: 'A woman holding a Qigong posture on a beach at sunset',
        position: '50% 35%',
      },
    },
    {
      type: 'people',
      heading: 'Our Facilitators',
      items: [
        {
          name: 'Lia Natali',
          role: 'The Five Element Flow, Daoist 5, The Three Treasures, 8 Foundational Flow',
          href: '/about-lia-natali/',
          image: { src: '/media/people/lia-natali.jpg', width: 1024, height: 1536, alt: 'Lia Natali', position: '50% 28%' },
        },
        {
          name: 'Yulia Andriyani',
          role: 'Qigong, meditation, EFT (Emotional Freedom Technique) and principle of Traditional Chinese Medicine.',
          href: '/about-yulia-andriyani/',
          image: { src: '/media/people/yulia-andriyani.jpg', width: 800, height: 800, alt: 'Yulia Andriyani', position: '50% 30%' },
        },
      ],
    },
    {
      type: 'faq',
      heading: 'Qigong FAQs',
      items: [
        {
          q: 'How is Qigong different from Tai Chi?',
          a: [
            'While both are energy-based practices, Qigong is generally simpler and focuses more on healing and internal energy flow, whereas Tai Chi is often practiced as a martial art.',
          ],
        },
        {
          q: 'Can Qigong help with stress and anxiety?',
          a: ['Yes. Qigong is widely used to calm the nervous system, regulate breath, and promote emotional resilience.'],
        },
        {
          q: 'How often should I practice Qigong?',
          a: ['Even 1–2 sessions per week can bring noticeable benefits. A regular practice enhances long-term vitality and balance.'],
        },
        {
          q: 'Is Qigong safe for people with chronic illness or injury?',
          a: [
            'Yes. Qigong is low-impact and adaptable, making it a supportive option for individuals managing chronic conditions or recovering from injury.',
          ],
        },
        {
          q: 'Will I sweat or get physically tired during Qigong?',
          a: [
            'Qigong is gentle and meditative. While you may feel deeply relaxed or even energized, it’s not typically strenuous or physically exhausting.',
          ],
        },
        {
          q: 'Do I need any special equipment or props?',
          a: ['No equipment is required—just space to move, comfortable clothing, and a willingness to connect inward.'],
        },
        {
          q: 'Is Qigong a religious or spiritual practice?',
          a: [
            'Qigong is a holistic health practice rooted in traditional Chinese medicine. It’s not religious, though it can feel spiritually grounding.',
          ],
        },
        {
          q: 'Can I combine Qigong with other healing practices?',
          a: ['Absolutely. Qigong complements yoga, Reiki, meditation, massage, and other wellness modalities beautifully.'],
        },
      ],
    },
    {
      type: 'cta',
      heading: 'Restore your energy and calm your mind',
      text: 'Book your Qigong session today and experience the power of mindful movement.',
      label: 'Book A Qigong Session Now',
      action: 'booking',
    },
  ],
  notes: [
    'Both photos (2025/06/IMG-20250614-WA0050.jpg and IMG-20250614-WA0051.jpg) appear AI-generated. Used because the page has no other photo. The source shows the beach image in the hero; here the park group image leads and the beach image sits with "What is Qigong?".',
    'Wrong bio link: the source links Yulia Andriyani’s facilitator card to /about-lia-natali/. Linked to /about-yulia-andriyani/ here.',
    'Lia’s card on the source uses a different portrait file (2026/01/liaa.jpg); the existing Lia portrait is reused.',
    'Source heading "WHAT IS QIGONG?" is in capitals; written as "What is Qigong?" (case only). Bold emphasis inside the paragraphs ("slow, intentional movements…", "calm and energized") is mid-sentence, not a lead-in, so it is not kept.',
    'Source images carry the wrong alts "Reiki with Crystals - Bali Bliss"; new alts describe the photos.',
  ],
};
