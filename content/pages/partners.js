export default {
  slug: 'partners',
  kind: 'partners',
  section: { label: 'About', href: '/about/' },
  title: 'Our Partners in Wellness',
  tagline: 'Elevating guest experiences through curated healing practices.',
  intro: [
    'At Bali Bliss, we proudly partner with a select group of Bali’s finest hotels and retreats to offer guests exclusive access to our holistic wellness services—including yoga, reiki, sound therapy, and facial reflexology massage.',
    'These partnerships allow hotel guests to effortlessly integrate mind-body healing into their stay, enhancing relaxation, recovery, and inner balance. Whether it’s a grounding yoga session at sunrise, a soothing facial massage, or a deeply restorative reiki or sound journey—our skilled practitioners bring a sense of calm and clarity to every experience.',
    'By collaborating closely with our partner hotels, we ensure a seamless, high-quality wellness offering that enriches the overall guest experience and aligns with the spirit of personalised luxury and wellbeing.',
  ],
  seo: {
    title: 'Hotel & Retreat Partners in Bali',
    description:
      'These partnerships allow hotel guests to effortlessly integrate mind-body healing into their stay, enhancing relaxation, recovery, and inner balance.',
  },
  hero: { variant: 'plain', image: null },
  cta: 'email',
  ctaLabel: 'Contact us at lia@balibliss.net',
  facts: [],
  blocks: [
    {
      type: 'cards',
      heading: 'Trusted By',
      // Source order on the live page: 1, 8, 6, 5, 7, 4, 3, 2.png
      items: [
        { title: 'Haigha House', text: '', image: { src: '/media/partners/haigha-house.png', width: 650, height: 650, alt: 'Haigha House, Ubud, Bali logo with a leaping hare', position: '50% 50%' } },
        { title: 'Tulus Hati', text: '', image: { src: '/media/partners/tulus-hati.png', width: 650, height: 650, alt: 'Tulus Hati logo with pale gold leaves over a sun', position: '50% 50%' } },
        { title: 'Milliways Bali', text: '', image: { src: '/media/partners/milliways-bali.png', width: 650, height: 650, alt: 'Milliways Bali script logo', position: '50% 50%' } },
        { title: 'The Alena', text: '', image: { src: '/media/partners/the-alena.png', width: 650, height: 650, alt: 'The Alena, Ubud – Bali logo with an ornamental mandala', position: '50% 50%' } },
        { title: 'Samyama', text: '', image: { src: '/media/partners/samyama.png', width: 650, height: 650, alt: 'Samyama script logo over a gold circle', position: '50% 50%' } },
        { title: 'Nyuh Bali', text: '', image: { src: '/media/partners/nyuh-bali.png', width: 650, height: 650, alt: 'Nyuh Bali, Ubud Nyuh Bali Resort & Spa logo', position: '50% 50%' } },
        { title: 'Kampung Uma Dawa', text: '', image: { src: '/media/partners/kampung-uma-dawa.png', width: 650, height: 650, alt: 'Kampung Uma Dawa logo with a gold lotus', position: '50% 50%' } },
        { title: 'Blue Karma Dijiwa', text: '', image: { src: '/media/partners/blue-karma-dijiwa.png', width: 650, height: 650, alt: 'Blue Karma Dijiwa Ubud logo', position: '50% 50%' } },
      ],
    },
    {
      type: 'cta',
      heading: 'Become a Bali Bliss Partner',
      text: 'We’d love to bring curated wellness to your guests. Contact us at lia@balibliss.net to discuss partnership opportunities.',
      label: 'lia@balibliss.net',
      action: 'email',
      href: 'mailto:lia@balibliss.net',
    },
  ],
  notes: [
    'Partner names are not written anywhere on the source page. They were read from the logo images (2025/04/1–8.png), each checked visually: 1 Haigha House, 2 Blue Karma Dijiwa, 3 Kampung Uma Dawa, 4 Nyuh Bali (Ubud Nyuh Bali Resort & Spa), 5 The Alena, 6 Milliways Bali, 7 Samyama, 8 Tulus Hati. Owner to confirm all are current partners.',
    'The logos are 650×650 PNGs with transparent backgrounds. Some marks are very pale (Tulus Hati) or black (Milliways), so they need a light, neutral card background.',
    'The source logo alts are literally "undefined"; replaced with descriptions.',
    'The email address is Cloudflare-obfuscated on the live page; decoded to lia@balibliss.net. There is no button: the source sentence is the link. ctaLabel uses the source wording.',
    'Body text bolds "Bali Bliss" and the list of services mid-sentence; rendered as plain text.',
    'The logos are not linked to the partner websites in the source; no links added.',
  ],
};
