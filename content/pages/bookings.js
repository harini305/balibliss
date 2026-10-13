export default {
  slug: 'bookings',
  kind: 'info',
  section: null,
  title: 'Make a Booking',
  tagline: null,
  intro: [],
  seo: {
    title: 'Make a Booking',
    description: 'Make a booking with Bali Bliss Wellness in Ubud, Bali.',
  },
  hero: { variant: 'plain', image: null },
  cta: 'booking',
  ctaLabel: 'Make a Booking',
  facts: [],
  // Live booking engine (Amelia step form) cannot be cloned; link out to it.
  bookingUrl: 'https://balibliss.net/bookings/',
  // "Find Us" section of the source: a Google Maps embed only, no caption, address or contact lines.
  map: {
    heading: 'Find Us',
    embedSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1972.95325190341!2d115.2663303817377!3d-8.508458741530983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23d944b387383%3A0x38c9431aeb24e84b!2sBali%20Bliss%20Wellness!5e0!3m2!1sen!2sus!4v1745205421078!5m2!1sen!2sus',
    title: 'Bali Bliss Wellness on Google Maps',
  },
  blocks: [],
  notes: [
    'The page has almost no copy outside widgets: H1 "Make a Booking", the Amelia step-booking widget, H2 "Find Us" with a Google Maps iframe (pin "Bali Bliss Wellness", ≈ -8.5085, 115.2663 = Ubud Center @ Mayu House), and a Trustindex Google-reviews widget ("Bali Bliss Wellness Ubud Center", 133 reviews). There is no intro paragraph, map caption, address, phone or email in visible copy.',
    'The Amelia widget renders its own sidebar contact from settings.company: phone +628133659182 and bookings@balibliss.net. That is a different number from the footer WhatsApp (+6281586417127). See content/contact-audit.json.',
    'The map shows only one venue, but Amelia offers 6 locations (Mayu House, Wana Stay/Mas, Singakerta, Kuta/Seminyak/Kerobokan, Online, Collaborators). A visitor booking Wana Stay sees the wrong pin. Owner to decide whether to show all venues (addresses are in contact-audit.json, but the T&C says location details are shared on confirmation).',
    '/book-now/ (fetched for comparison): no H1 and no copy of its own. It has the same Amelia widget (same company phone/email), H2 "What our Clients are Saying", and two review widgets (Trustindex Ubud Center 133 reviews; Google "Bali Bliss Wellness Mas", 5.0 from 45 reviews). Recommended 301 /book-now/ → /bookings/ (audit §3.2).',
    'seo.description is minimal because the page has no sentences of its own; built from the H1 and the site’s "Located in Ubud, Bali" footer line.',
  ],
};
