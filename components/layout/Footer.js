import Image from 'next/image';
import Link from 'next/link';
import { SITE, SOCIAL, BOOKING_URL, WHATSAPP, whatsappLink } from '@/content/site';
import { MEDIA } from '@/content/media';
import Icon from '@/components/ui/Icon';
import styles from './Footer.module.css';

// Verified on the live site's booking engine (see content/contact-audit.json).
const BOOKINGS_EMAIL = 'bookings@balibliss.net';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Wellness', href: '/wellness-sessions/' },
  { label: 'Retreats', href: '/one-day-healing-retreats-in-bali/' },
  { label: 'Workshops', href: '/workshops/' },
  { label: 'Training', href: '/training/' },
  { label: 'About', href: '/about/' },
  { label: 'Partners', href: '/about/#partners' },
  { label: 'Insights', href: '/insights/' },
  { label: 'Contact', href: '/contact/' },
];

/** Footer (collage): a calm ivory band — logo, one row of links, contact details, socials, legal. */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container-wide ${styles.top}`}>
        <Link href="/" className={styles.brand} aria-label="Bali Bliss — home">
          <Image src={MEDIA.logo.src} width={MEDIA.logo.width} height={MEDIA.logo.height} alt="" sizes="170px" className={styles.logo} />
        </Link>

        <nav className={styles.nav} aria-label="Footer">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={BOOKING_URL} className={styles.link}>
                Make Booking
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className={`container-wide ${styles.middle}`}>
        <p className={styles.intro}>{SITE.footerIntro}</p>
        <ul className={styles.channels}>
          <li>
            <span className={styles.channel}>
              <Icon name="pin" size={16} />
              Ubud, Bali
            </span>
          </li>
          <li>
            <a href={whatsappLink('Hello Bali Bliss,')} className={styles.channel}>
              <Icon name="whatsapp" size={16} />
              {WHATSAPP.display}
            </a>
          </li>
          <li>
            <a href={`mailto:${BOOKINGS_EMAIL}`} className={styles.channel}>
              <Icon name="mail" size={16} />
              {BOOKINGS_EMAIL}
            </a>
          </li>
        </ul>
      </div>

      <div className={`container-wide ${styles.base}`}>
        <p>
          © {year} {SITE.fullName}. All rights reserved.
          <span className={styles.legal}>
            <Link href="/privacy-policy/">Privacy</Link>
            <Link href="/terms-conditions/">Terms &amp; Conditions</Link>
          </span>
        </p>
        <ul className={styles.social} aria-label="Bali Bliss on social media">
          {SOCIAL.map((s) => (
            <li key={s.label}>
              <a href={s.href} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                <Icon name={s.icon} size={17} label={`${s.label} (opens in a new tab)`} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
