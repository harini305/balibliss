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

// The live site uses two WhatsApp numbers (verified 2026-10-12, see content/contact-audit.json):
// - bookings: every enquiry button (NinjaTeam widget on the retreat hub and retreat pages,
//   the floating chat bubble) and the booking engine's contact details: +62 813-3659-182.
// - footer: the WhatsApp social icon in the site footer: +62 815-8641-7127.
// Enquiry links here use the bookings number, like the live buttons; the footer keeps its own.
export const WHATSAPP = {
  number: '628133659182',
  display: '+62 813-3659-182',
  href: 'https://api.whatsapp.com/send?phone=628133659182',
};

export const WHATSAPP_FOOTER = {
  number: '6281586417127',
  display: '+62 815-8641-7127',
  href: 'https://api.whatsapp.com/send?phone=6281586417127',
};

/** WhatsApp enquiry link with an optional prefilled message (the visitor still presses send). */
export function whatsappLink(text) {
  return text ? `https://api.whatsapp.com/send?phone=${WHATSAPP.number}&text=${encodeURIComponent(text)}` : WHATSAPP.href;
}

// Social links exactly as in the live footer.
export const SOCIAL = [
  { label: 'Facebook', href: 'https://www.facebook.com/baliblisswellness', icon: 'facebook' },
  { label: 'Instagram', href: 'https://www.instagram.com/baliblisswellness', icon: 'instagram' },
  { label: 'YouTube', href: 'https://www.youtube.com/@baliblisswellness', icon: 'youtube' },
  { label: 'WhatsApp', href: WHATSAPP_FOOTER.href, icon: 'whatsapp' },
];

// Primary navigation: one page per item (former sub-pages are sections of these pages — see lib/routes.mjs).
export const NAV = [
  { label: 'Wellness Sessions', href: '/wellness-sessions/' },
  { label: 'Day Retreats', href: '/one-day-healing-retreats-in-bali/' },
  { label: 'Workshops', href: '/workshops/' },
  { label: 'Training', href: '/training/' },
  { label: 'About', href: '/about/' },
  { label: 'Insights', href: '/insights/' },
];

// Topics offered in the contact form (the experiences named in the live menu).
export const ENQUIRY_TOPICS = [
  'Reiki Healing',
  'Sound Therapy',
  'Somatic Practices',
  'Soul Full',
  'Sacred Cacao Ceremony',
  'Inner Guidance',
  'Facial Reflexology',
  'Intuitive Healing Massage',
  'Chi Nei Tsang Healing',
  'Postural Alignment Therapy',
  'Mat Pilates',
  'Qigong',
  'Yoga Sessions',
  'Day Retreats',
  'Yoga Alignment & Fundamentals',
  'Usui Reiki Training',
  'Something else',
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
