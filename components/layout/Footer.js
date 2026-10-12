import Image from 'next/image';
import Link from 'next/link';
import { SITE, SOCIAL, FOOTER_COLUMNS } from '@/content/site';
import { MEDIA } from '@/content/media';
import Ring from '@/components/ui/Ring';
import Icon from '@/components/ui/Icon';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <Ring className={styles.ornament} size={520} stroke="var(--c-lagoon-800)" strokeWidth={1.5} />
      <div className={`container-wide ${styles.inner}`}>
        <div className={styles.intro}>
          <Link href="/" className={styles.brand} aria-label="Bali Bliss — home">
            <Image src={MEDIA.logoWhite.src} width={MEDIA.logoWhite.width} height={MEDIA.logoWhite.height} alt="" className={styles.logo} sizes="200px" />
          </Link>
          <p className={styles.text}>{SITE.footerIntro}</p>
          <div>
            <p className={styles.heading} id="footer-social">
              Follow Us on Social Media
            </p>
            <ul className={styles.social} aria-labelledby="footer-social">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                    <Icon name={s.icon} size={22} label={`${s.label} (opens in a new tab)`} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav className={styles.columns} aria-label="Footer">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className={styles.col}>
              <h2 className={styles.heading}>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a href={l.href} className={styles.link}>
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className={styles.link}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={`container-wide ${styles.base}`}>
        <p>
          © {year} {SITE.name}. All rights reserved.
        </p>
        <p className={styles.tagline}>Reconnect · Restore · Renew</p>
      </div>
    </footer>
  );
}
