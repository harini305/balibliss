import Link from 'next/link';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/motion/Reveal';
import MapFacade from './MapFacade';
import { getPage } from '@/lib/content';
import { BOOKING_URL, WHATSAPP, whatsappLink } from '@/content/site';
import styles from './BookingInfo.module.css';

// Shown in the live booking engine's sidebar (see content/contact-audit.json).
const BOOKINGS_EMAIL = 'bookings@balibliss.net';

function rich(text) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) => (i % 2 ? <strong key={i}>{p.replace(/^•\s*/, '')}</strong> : p));
}

/**
 * Body of /bookings/. The Amelia booking engine only runs on the live WordPress site, so this
 * page explains the real options and links to it. Policy text is quoted from the live T&C.
 */
export default async function BookingInfo({ page }) {
  const terms = await getPage('terms-conditions');
  const sections = terms?.blocks.find((b) => b.type === 'legal')?.sections ?? [];
  const pick = (re) => sections.find((s) => re.test(s.heading));
  const whatsappPolicy = pick(/whatsapp/i);
  const advance = pick(/advance/i);
  const locations = pick(/locations/i);

  return (
    <>
      <section className={`container-wide ${styles.options}`} aria-labelledby="booking-options">
        <h2 id="booking-options" className="visually-hidden">
          Ways to book
        </h2>
        <Reveal as="ol" className={styles.ledger} stagger={0.12}>
          <li className={styles.row}>
            <span className={styles.num} aria-hidden="true">01</span>
            <h3 className={styles.rowTitle}>
              Book online
            </h3>
            <div className={styles.rowText}>
              <p>Choose your session, practitioner, location, date and time in the Bali Bliss booking system on balibliss.net.</p>
            </div>
            <div className={styles.rowAction}>
              <Button href={BOOKING_URL} external size="lg" icon="external">
                {page.ctaLabel}
              </Button>
            </div>
          </li>
          <li className={styles.row}>
            <span className={styles.num} aria-hidden="true">02</span>
            <h3 className={styles.rowTitle}>
              WhatsApp
            </h3>
            <div className={styles.rowText}>
              {whatsappPolicy?.paragraphs.map((p, i) => (
                <p key={i}>{rich(p)}</p>
              ))}
            </div>
            <div className={styles.rowAction}>
              <Button href={whatsappLink('Hello Bali Bliss, I would like to make a booking.')} external variant="whatsapp">
                {WHATSAPP.display}
              </Button>
            </div>
          </li>
          <li className={styles.row}>
            <span className={styles.num} aria-hidden="true">03</span>
            <h3 className={styles.rowTitle}>
              Email
            </h3>
            <div className={styles.rowText}>
              <p>
                <a href={`mailto:${BOOKINGS_EMAIL}`} className={styles.email}>
                  {BOOKINGS_EMAIL}
                </a>
              </p>
            </div>
          </li>
        </Reveal>
        {advance && (
          <p className={styles.note}>
            <strong>{advance.heading}:</strong> {advance.paragraphs.join(' ')}{' '}
            <Link href="/terms-conditions/">Read the Terms &amp; Conditions</Link>
          </p>
        )}
      </section>

      {locations && (
        <section className={`container-wide ${styles.locations}`} aria-labelledby="booking-locations">
          <div className={styles.locGrid}>
            <Reveal className={styles.locCopy}>
              <Eyebrow>Locations</Eyebrow>
              <h2 id="booking-locations">{locations.heading}</h2>
              {locations.paragraphs.map((p, i) => (
                <p key={i}>{rich(p)}</p>
              ))}
            </Reveal>
            {page.map && (
              <Reveal className={styles.map}>
                <h3 className={styles.mapTitle}>{page.map.heading}</h3>
                <MapFacade src={page.map.embedSrc} title={page.map.title} />
              </Reveal>
            )}
          </div>
        </section>
      )}
    </>
  );
}
