import Image from 'next/image';
import Link from 'next/link';
import Figure from '@/components/ui/Figure';
import Button from '@/components/ui/Button';
import TextLink from '@/components/ui/TextLink';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/motion/Reveal';
import Parallax from '@/components/motion/Parallax';
import { REAL } from '@/lib/media-policy';
import { hrefFor } from '@/lib/routes.mjs';
import { FACILITATORS } from '@/content/people';
import { SITE, BOOKING_URL } from '@/content/site';
import { MEDIA } from '@/content/media';
import styles from './AboutIntro.module.css';

const JUMPS = [
  { label: 'Our Facilitators', href: '#facilitators', icon: 'users' },
  { label: 'Retreat Guides', href: '#guides', icon: 'lotus' },
  { label: 'VIP Drivers', href: '#drivers', icon: 'pin' },
  { label: 'Our Partners', href: '#partners', icon: 'leaf' },
];

/**
 * About introduction: two layered real photographs, the studio introduction, Lia's own words,
 * the five facilitators as an avatar row, quick links down the page and two actions.
 * quote: Lia's verbatim closing line from her bio.
 */
export default function AboutIntro({ quote }) {
  return (
    <section className={styles.section} aria-labelledby="about-intro">
      <div className={`container-wide ${styles.grid}`}>
        <div className={styles.collage}>
          <Reveal variant="clip" className={styles.main}>
            <div>
              <Figure image={REAL.liaSession} aspect="4 / 3.2" sizes="(min-width: 1024px) 38vw, 86vw" priority />
            </div>
          </Reveal>
          <div className={styles.inset}>
            <Parallax amount={6}>
              <Figure image={MEDIA.lia} aspect="3 / 4" sizes="(min-width: 1024px) 14vw, 36vw" />
            </Parallax>
          </div>
          <p className={styles.tag}>
            <Icon name="pin" size={15} />
            Ubud, Bali
          </p>
        </div>

        <Reveal className={styles.copy} stagger={0.07}>
          <p className={styles.eyebrow}>{SITE.tagline}</p>
          <h2 id="about-intro" className={styles.title}>
            {SITE.fullName}
          </h2>
          <p className={styles.text}>{SITE.footerIntro}</p>

          {quote && (
            <figure className={styles.quote}>
              <blockquote>
                <p>“{quote}”</p>
              </blockquote>
              <figcaption>— Lia Natali, founder of Bali Bliss</figcaption>
            </figure>
          )}

          <div className={styles.team}>
            <ul className={styles.avatars} aria-label="Our facilitators">
              {FACILITATORS.map((p) => (
                <li key={p.name}>
                  <Link href={hrefFor(p.href)} className={styles.avatar} title={p.name}>
                    <Image src={p.image.src} alt={p.name} width={p.image.width} height={p.image.height} sizes="3.5rem" style={{ objectPosition: p.image.position }} />
                  </Link>
                </li>
              ))}
            </ul>
            <p className={styles.teamText}>
              <strong>{FACILITATORS.length} facilitators</strong> · Reiki, sound, yoga, Qigong, massage &amp; intuitive guidance
            </p>
          </div>

          <ul className={styles.jumps} aria-label="On this page">
            {JUMPS.map((j) => (
              <li key={j.href}>
                <a href={j.href} className={styles.jump}>
                  <Icon name={j.icon} size={16} />
                  {j.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <Button href={BOOKING_URL} external icon="arrow-right">
              Book a Session
            </Button>
            <TextLink href="#about-lia-natali">Read Lia’s story</TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
