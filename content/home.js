import { MEDIA } from './media';
import { BOOKING_URL } from './site';

// Homepage copy transcribed from balibliss.net/ and /one-day-healing-retreats-in-bali/,
// re-checked against the live pages on 2026-10-12. Wording is verbatim unless marked
// "corrected" (spelling only — listed in the homepage review notes for owner sign-off).

export const HERO = {
  eyebrow: 'Reconnect. Restore. Renew',
  title: 'Wellness and Healing in',
  titleAccent: 'Ubud',
  image: MEDIA.retreatSteps,
};

// Live homepage intro paragraph (the hero text block, not the shorter footer variant).
export const INTRO =
  'Located in Ubud, Bali, our skilled practitioners and instructors will guide you through the gentle healing practices of Yoga, Reiki, Intuitive Readings, Sound Therapy, Facial Reflexology, and Intuitive Healing Massage - helping you restore balance, gain clarity, and deepen the connection to your body and spirit.';

// "Bali Bliss Daily Sessions" — every action on the live page goes to the booking system.
export const DAILY_SESSIONS = {
  heading: 'Bali Bliss Daily Sessions',
  allLabel: 'View Booking Options',
  items: [
    {
      title: 'Small Group and Private Yoga & Qigong Classes',
      text: 'Begin or deepen your practice, enhance flexibility, and restore inner peace with our personalized yoga classes. Make today, your day!',
      book: 'Book a class',
      links: [
        { label: 'Yoga Sessions', href: '/yoga/' },
        { label: 'Qigong', href: '/qigong-session/' },
      ],
      image: MEDIA.yogaGroup,
    },
    {
      title: 'Reiki Healing Wellness Sessions',
      text: 'Release stress, restore your energy, and find deep relaxation with a Reiki healing session. Experience the power of balance today!',
      book: 'Book a Session',
      links: [{ label: 'Reiki Healing', href: '/reiki/' }],
      image: MEDIA.reikiHands,
    },
    {
      // corrected: "Rejuventating" → "Rejuvenating"
      title: 'Rejuvenating Massage Treatments',
      text: 'Choose between intuitive healing massage or facial massage therapy for relaxation and rejuvenation. Treat yourself now!',
      book: 'Book a Treatment',
      links: [
        { label: 'Intuitive Healing Massage', href: '/intuitive-healing-massage/' },
        { label: 'Facial Reflexology', href: '/facial-reflexology-massage/' },
      ],
      image: MEDIA.facialEyeMask,
    },
    {
      title: 'Personalised Inner Guidance Session',
      text: 'Receive soul-guided insight, emotional clarity, and gentle direction through a personalised intuitive session. Reserve your session!',
      book: 'Book a session',
      links: [{ label: 'Inner Guidance', href: '/inner-guidance/' }],
      image: MEDIA.cardReading,
    },
    {
      title: 'Sound Therapy with Himalayan Singing Bowls',
      text: 'Reduce stress, overthinking and anxiety - Increase emotional and mental awareness - Balance your energy and release tightness in the body.',
      book: 'Book a session',
      links: [{ label: 'Sound Therapy', href: '/sound-therapy/' }],
      image: MEDIA.soundVeranda,
    },
  ],
};

// The six "Learn More" features. `label` is the live heading minus the "Bali Bliss" prefix;
// `heading` is the live sub-heading.
export const PRACTICES = {
  sound: {
    label: 'Sound Therapy',
    heading: 'Harmonize Your Mind & Body',
    text: 'Immerse yourself in the healing vibrations of sound therapy, where soothing frequencies from Himalayan singing bowls and other sacred instruments help restore balance, release tension, and promote deep relaxation. Experience a profound sense of inner peace as sound waves realign your energy.',
    href: '/sound-therapy/',
    image: MEDIA.soundBowlBody,
  },
  reiki: {
    label: 'Reiki Healing',
    heading: 'For Balance and Renewal',
    text: 'Experience the gentle power of Reiki, whether you seek stress relief, emotional healing, energy balance, or deep relaxation. Ideal for beginners, those recovering, or anyone seeking inner harmony, Reiki promotes renewal and well-being in a calming, supportive space.',
    href: '/reiki/',
    image: MEDIA.reikiCrystals,
  },
  movement: {
    label: 'Yoga & Qigong',
    heading: 'For Every Body and Every Journey',
    text: "Whether you're a beginner, recovering, a senior, or seeking small group or family sessions, our tailored yoga and qigong classes support your journey. Build strength, restore balance, and find inner peace at your own pace.",
    links: [
      { label: 'Yoga Sessions', href: '/yoga/' },
      { label: 'Qigong', href: '/qigong-session/' },
    ],
    image: MEDIA.yogaHatha,
  },
  guidance: {
    label: 'Inner Guidance Session',
    heading: 'For Clarity and Insight',
    // Verbatim, including "our session provide" (grammar left for the owner — see review notes).
    text: "Gain guidance, clarity, and deeper self-understanding with a personalized intuitive session. Whether you seek answers, direction, or a fresh perspective, our session provide insight to help you navigate life's journey with confidence and awareness.",
    href: '/inner-guidance/',
    image: MEDIA.oracleCards,
  },
  facial: {
    label: 'Facial Massage',
    heading: 'For Radiance and Relaxation',
    text: 'Rejuvenate your skin and melt away tension with a soothing facial and intuitive healing massage. Perfect for deep relaxation, stress relief, and a natural glow, this treatment promotes circulation, reduces tension, and leaves you feeling refreshed, balanced, and revitalized.',
    href: '/facial-reflexology-massage/',
    image: MEDIA.facialMassage,
  },
  massage: {
    label: 'Intuitive Healing Massage',
    heading: 'Restore, Rebalance, Renew',
    text: "This deeply nurturing massage combines intuitive touch with energy healing to release tension, restore balance, and promote emotional and physical well-being. By tuning into your body's needs, this treatment encourages deep relaxation and a renewed sense of harmony.",
    href: '/intuitive-healing-massage/',
    image: MEDIA.backMassage,
  },
};

// From the Day Retreats hub. Prices are deliberately not repeated on the homepage.
export const RETREATS = {
  eyebrow: 'Day Retreats',
  heading: 'One Day Healing Retreats in Bali',
  lead: 'Private spiritual journeys combining sacred Balinese rituals, cultural immersion, and holistic healing',
  text: 'These are not tours. They are intentional, private experiences created to support emotional release, energetic balance, and deeper connection to yourself.',
  journey: [
    {
      time: 'Morning',
      title: 'Cultural & Sacred Experience',
      text: 'Begin your day with a guided cultural journey, including visits to sacred sites and the traditional Melukat water purification ritual, followed by a Balinese blessing ceremony.',
    },
    {
      time: 'Midday',
      title: 'Nourishment & Pause',
      text: 'Enjoy a nourishing lunch and time to rest, reflect, and integrate your morning experience.',
      note: '(Included in full-day retreats)',
    },
    {
      time: 'Afternoon',
      title: 'Healing & Integration',
      text: 'Return to a peaceful setting for a deeply restorative healing session. Depending on your chosen retreat, this may include Reiki, sound healing, intuitive guidance, or Yoga Nidra.',
    },
  ],
  href: '/one-day-healing-retreats-in-bali/',
  cta: 'Explore day retreats',
  images: { main: MEDIA.melukat, inset: MEDIA.jeroMangku },
};

export const DRIVERS = {
  heading: 'Our VIP Drivers',
  text: 'Bali Bliss provides fixed price pickup and drop-off for clients in the Ubud area. Our drivers are safe, reliable, honest & friendly each with more than 20 years professional driving experience in Bali.',
  people: [
    { name: 'Pak Likko', text: 'Located in Ubud, provides scooter or car pickup & drop-off for your treatment', image: MEDIA.pakLikko },
    { name: 'Pak Kadek', text: 'Located in Ubud, provides scooter or car pickup & drop-off for your treatment', image: MEDIA.pakKadek },
  ],
};

// Verbatim Google reviews shown by the review widgets on the live homepage (2026-10-12).
// No rating counts or dates are reproduced: those change over time.
export const REVIEWS = {
  heading: 'What our Clients are Saying',
  googleUrl: 'https://search.google.com/local/reviews?placeid=ChIJDbsfz_I90i0RxcTKr_w_2Yg',
  featured: {
    name: 'Luciana Pires',
    quote:
      "My experience of Reiki with Lia was simply amazing! I arrived feeling really disconnected and was struggling with headaches daily and I felt that it was from some level of tension that I was carrying around. In the first 10 minutes I already felt the tension release and I left the session feeling great and super light! Such an important work, I couldn't recommend more",
  },
  more: [
    {
      name: 'Gloria M',
      quote:
        'It was an amazing experience. The location is in a typical Indonesian home with many small temple like rooms, very calm and sirene. We had a couple sound therapy with Yuli in one of the rooms with a nice breeze, sounds of birds and was very calming.',
    },
    {
      name: 'Courtney Hodge',
      quote:
        'I had a booking with Lia yesterday and it was lovely and peaceful. Lia was able to pinpoint energetically where I was needing assistance. I walked away feeling validated, heard and understood. Thank you Lia for helping me unpack and feel more balanced.',
    },
  ],
};

export const NOT_SURE = {
  heading: 'Not Sure Which Session is Right for You?',
  text: "We're here to help! If you're unsure which session best suits your needs, reach out for a chat —we'll guide you toward the perfect choice for your journey",
  bookingUrl: BOOKING_URL,
};
