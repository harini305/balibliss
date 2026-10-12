// Site-wide content transcribed from balibliss.net (header menu, footer) on 2026-10-12.
// Labels are verbatim from the live menu unless noted. Do not change business details here
// without the owner's approval — see docs/phase-0-audit-and-plan.md §3.6 and §10.

export const SITE = {
  name: 'Bali Bliss',
  fullName: 'Bali Bliss Wellness & Healing',
  tagline: 'Reconnect. Restore. Renew',
  url: 'https://balibliss.net',
  // Verbatim footer introduction.
  footerIntro:
    'Located in Ubud, Bali, our skilled practitioners and instructors will guide you through the gentle healing practices of Yoga, Reiki, Intuitive Readings, Sound Therapy and Facial Massage – helping you restore balance, gain clarity, and deepen the connection to your body and spirit.',
};

// The live booking engine (Amelia on WordPress). The new site links to it; it never simulates it.
export const BOOKING_URL = 'https://balibliss.net/bookings/';

// Social links exactly as in the live footer.
// NOTE: the footer WhatsApp number differs from the floating chat bubble and Amelia
// (+62 813-3659-182). Primary number is an open question (Phase 0, Q2) — not changed here.
export const SOCIAL = [
  { label: 'Facebook', href: 'https://www.facebook.com/baliblisswellness', icon: 'facebook' },
  { label: 'Instagram', href: 'https://www.instagram.com/baliblisswellness', icon: 'instagram' },
  { label: 'YouTube', href: 'https://www.youtube.com/@baliblisswellness', icon: 'youtube' },
  { label: 'WhatsApp', href: 'https://api.whatsapp.com/send?phone=6281586417127', icon: 'whatsapp' },
];

// Primary navigation. Groups with `label: null` were top-level items in the live mega-menu.
// `hub` pages replace the live "#" parents (approved: /wellness-sessions/, /about/).
export const NAV = [
  {
    label: 'Wellness Sessions',
    hub: { label: 'All wellness sessions', href: '/wellness-sessions/' },
    groups: [
      {
        label: null,
        items: [
          { label: 'Reiki Healing', href: '/reiki/' },
          { label: 'Sound Therapy', href: '/sound-therapy/' },
        ],
      },
      {
        label: 'Nervous System Regulation',
        items: [
          { label: 'Somatic Practices', href: '/somatic-practices/' },
          { label: 'Soul Full', href: '/soul-full/' },
        ],
      },
      {
        label: 'Rituals & Ceremonies',
        items: [
          { label: 'Sacred Cacao Ceremony', href: '/sacred_cacao-ceremony/' },
          { label: 'Inner Guidance', href: '/inner-guidance/' },
        ],
      },
      {
        label: 'Massage Therapy',
        items: [
          { label: 'Facial Reflexology', href: '/facial-reflexology-massage/' },
          { label: 'Intuitive Healing Massage', href: '/intuitive-healing-massage/' },
          { label: 'Chi Nei Tsang Healing', href: '/chi-nei-tsang-healing/' },
          // Orphan page on the live site; linked per the approved sitemap.
          { label: 'Postural Alignment Therapy', href: '/postural-alignment-therapy/' },
        ],
      },
      {
        label: null,
        items: [
          { label: 'Mat Pilates', href: '/mat-pilates/' },
          { label: 'Qigong', href: '/qigong-session/' },
          { label: 'Yoga Sessions', href: '/yoga/' },
        ],
      },
    ],
  },
  {
    label: 'Day Retreats',
    hub: { label: 'All day retreats', href: '/one-day-healing-retreats-in-bali/' },
    groups: [
      {
        label: null,
        items: [
          { label: 'Purification and Blessing', href: '/purification-and-blessing/' },
          { label: 'Sacred Birthday Blessing Ceremony', href: '/sacred-birthday-blessing-ceremony/' },
          { label: 'Sacred Healing & Purification Ritual', href: '/sacred-healing-purification-ritual/' },
          { label: 'Sacred Renewal Immersion', href: '/sacred-renewal-immersion/' },
          { label: 'Sound & Soul Healing Immersion', href: '/sound-soul-healing-immersion/' },
          // Orphan page on the live site; linked per the approved sitemap.
          { label: 'Weekend Mini Retreats', href: '/weekend-mini-retreats/' },
        ],
      },
    ],
  },
  {
    label: 'Workshops',
    groups: [{ label: null, items: [{ label: 'Yoga Alignment & Fundamentals', href: '/yoga-alignment-fundamentals/' }] }],
  },
  {
    label: 'Training',
    groups: [
      {
        label: null,
        items: [
          { label: 'Usui Reiki Training – Level 1', href: '/usui-reiki-training-level-1/' },
          { label: 'Usui Reiki Training – Level 2', href: '/usui-reiki-training-level-2/' },
        ],
      },
    ],
  },
  {
    label: 'About',
    hub: { label: 'About Bali Bliss', href: '/about/' },
    groups: [
      {
        label: null,
        items: [
          { label: 'About Lia', href: '/about-lia-natali/' },
          { label: 'About Arsita', href: '/about-arsita-putri/' },
          { label: 'About Kiki', href: '/about-kiki-dewi/' },
          { label: 'About Yuli', href: '/about-kadek-yuli/' },
          { label: 'About Yulia', href: '/about-yulia-andriyani/' },
          { label: 'Our Partners', href: '/partners/' },
        ],
      },
    ],
  },
  { label: 'Insights', href: '/insights/' },
];

// Footer columns. "Info Links", "Wellness" and "Facilitators" are verbatim from the live footer;
// "Explore" is new and mirrors the approved sitemap.
export const FOOTER_COLUMNS = [
  {
    title: 'Wellness',
    links: [
      { label: 'Sound Therapy', href: '/sound-therapy/' },
      { label: 'Reiki Healing', href: '/reiki/' },
      { label: 'Qigong', href: '/qigong-session/' },
      { label: 'Yoga Sessions', href: '/yoga/' },
      { label: 'Mat Pilates', href: '/mat-pilates/' },
      { label: 'Facial Reflexology', href: '/facial-reflexology-massage/' },
      { label: 'Intuitive Healing Massage', href: '/intuitive-healing-massage/' },
      { label: 'Intuitive Readings', href: '/inner-guidance/' },
    ],
  },
  {
    title: 'Facilitators',
    links: [
      { label: 'About Lia', href: '/about-lia-natali/' },
      { label: 'About Arsita', href: '/about-arsita-putri/' },
      { label: 'About Kiki', href: '/about-kiki-dewi/' },
      { label: 'About Yuli', href: '/about-kadek-yuli/' },
      { label: 'About Yulia', href: '/about-yulia-andriyani/' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Wellness Sessions', href: '/wellness-sessions/' },
      { label: 'Day Retreats', href: '/one-day-healing-retreats-in-bali/' },
      { label: 'Workshops & Training', href: '/yoga-alignment-fundamentals/' },
      { label: 'About Bali Bliss', href: '/about/' },
      { label: 'Our Partners', href: '/partners/' },
      { label: 'Insights', href: '/insights/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  {
    title: 'Info Links',
    links: [
      { label: 'Make Booking', href: BOOKING_URL, external: true },
      { label: 'Privacy', href: '/privacy-policy/' },
      { label: 'Terms & Conditions', href: '/terms-conditions/' },
    ],
  },
];
