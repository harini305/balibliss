import HomeHero from '@/components/home/HomeHero';
import Statement from '@/components/home/Statement';
import Offerings from '@/components/home/Offerings';
import Experiences from '@/components/home/Experiences';
import Facilitators from '@/components/home/Facilitators';
import Reviews from '@/components/home/Reviews';
import Drivers from '@/components/home/Drivers';
import LatestInsights from '@/components/home/LatestInsights';
import PhotoBanner from '@/components/sections/PhotoBanner';
import BookingCTA from '@/components/sections/BookingCTA';
import { getPage, getPostIndex } from '@/lib/content';
import { HERO, NOT_SURE, RETREATS } from '@/content/home';
import { SITE, whatsappLink } from '@/content/site';
import { MEDIA } from '@/content/media';
import styles from './page.module.css';

export const metadata = {
  title: { absolute: `${SITE.fullName} | Yoga, Reiki & Sound Therapy in Ubud, Bali` },
  description:
    'Yoga, Qigong, Reiki, Intuitive Readings, Sound Therapy, Facial Reflexology and Intuitive Healing Massage in Ubud, Bali — restore balance and gain clarity.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    images: [{ url: HERO.image.src, width: HERO.image.width, height: HERO.image.height, alt: HERO.image.alt }],
  },
};

// The six offerings in the collage grid, each opening its own page (labels follow the live menu).
const OFFERINGS = [
  { title: 'Yoga & Qigong', href: '/yoga/', image: MEDIA.yogaHatha },
  { title: 'Reiki Healing', href: '/reiki/', image: MEDIA.reikiHands },
  { title: 'Sound Therapy', href: '/sound-therapy/', image: MEDIA.soundVeranda },
  { title: 'Massage & Facial Reflexology', href: '/facial-reflexology-massage/', image: MEDIA.facialEyeMask },
  { title: 'Intuitive Guidance', href: '/inner-guidance/', image: MEDIA.cardReading },
  { title: 'Nervous System Regulation', href: '/somatic-practices/', slug: 'somatic-practices' },
];

const slugOf = (href) => href.replace(/\//g, '');

/** Retreats, workshops, training and rituals — titles, straplines and photographs from each page. */
async function experiences() {
  const rows = [
    { href: RETREATS.href, title: 'Day Retreats', text: RETREATS.lead, image: RETREATS.images.main },
    { href: '/workshops/', title: 'Workshops', slug: 'yoga-alignment-fundamentals' },
    { href: '/training/', title: 'Reiki Training', slug: 'usui-reiki-training-level-1' },
    { href: '/sacred_cacao-ceremony/', title: 'Rituals & Ceremonies' },
  ];
  return Promise.all(
    rows.map(async (r) => {
      if (r.image) return r;
      const page = await getPage(r.slug ?? slugOf(r.href));
      return { href: r.href, title: r.title, text: `${page.title} — ${page.tagline}`, image: page.hero?.image ?? null };
    }),
  );
}

export default async function Home() {
  const posts = getPostIndex().slice(0, 3);
  const somatic = await getPage('somatic-practices');
  const offerings = OFFERINGS.map((o) => (o.slug ? { ...o, image: somatic?.hero?.image ?? null } : o));
  const exp = await experiences();

  return (
    <>
      <HomeHero />

      <Statement />

      <Offerings items={offerings} />

      <PhotoBanner
        image={MEDIA.retreatSteps}
        quote="I walked away feeling validated, heard and understood."
        cite="Courtney Hodge, Google review"
        align="left"
      />

      <Experiences
        heading="Retreats & Workshops"
        lead={RETREATS.text}
        items={exp}
        allHref={RETREATS.href}
        allLabel="View all day retreats"
      />

      <section aria-labelledby="facilitators-title">
        <Facilitators />
      </section>

      <PhotoBanner
        image={MEDIA.riverBlessing}
        quote="In the first 10 minutes I already felt the tension release and I left the session feeling great and super light!"
        cite="Luciana Pires, Google review"
        align="right"
      />

      <section className={styles.reviews} aria-labelledby="reviews-title">
        <Reviews />
      </section>

      <section className={styles.drivers} aria-labelledby="drivers-title">
        <Drivers />
      </section>

      <section aria-labelledby="insights-title">
        <LatestInsights posts={posts} />
      </section>

      <section aria-label="Help choosing a session">
        <BookingCTA
          heading={NOT_SURE.heading}
          text={NOT_SURE.text}
          buttonLabel="Chat with us on WhatsApp"
          href={whatsappLink("Hello Bali Bliss, I'm not sure which session is right for me. Could you help?")}
          secondary={{ label: 'View booking options', href: NOT_SURE.bookingUrl, external: true }}
        />
      </section>
    </>
  );
}
