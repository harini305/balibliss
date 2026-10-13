import Link from 'next/link';
import Figure from '@/components/ui/Figure';
import Button from '@/components/ui/Button';
import TextLink from '@/components/ui/TextLink';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/motion/Reveal';
import Parallax from '@/components/motion/Parallax';
import { INTRO } from '@/content/home';
import { MEDIA } from '@/content/media';
import { REAL } from '@/lib/media-policy';
import { BOOKING_URL } from '@/content/site';
import styles from './Statement.module.css';

// The practices named in the live introduction, each linking to its section.
const PRACTICES = [
  { label: 'Yoga', href: '/wellness-sessions/#yoga', icon: 'lotus' },
  { label: 'Reiki', href: '/wellness-sessions/#reiki', icon: 'hands' },
  { label: 'Intuitive Readings', href: '/wellness-sessions/#inner-guidance', icon: 'eye' },
  { label: 'Sound Therapy', href: '/wellness-sessions/#sound-therapy', icon: 'bowl' },
  { label: 'Facial Reflexology', href: '/wellness-sessions/#facial-reflexology-massage', icon: 'leaf' },
  { label: 'Intuitive Healing Massage', href: '/wellness-sessions/#intuitive-healing-massage', icon: 'wave' },
];

/**
 * Introduction (collage "Reconnect Restore Renew"): two layered real photographs with a place tag,
 * beside the tagline, the live introduction, the practices it names as quick links, and two actions.
 */
export default function Statement() {
  return (
    <section id="intro" className={styles.section} aria-labelledby="intro-title">
      <div className={`container-wide ${styles.grid}`}>
        <div className={styles.collage}>
          <Reveal variant="clip" className={styles.main}>
            <div>
              <Figure image={MEDIA.crystalsTray} aspect="4 / 3.3" sizes="(min-width: 1024px) 36vw, 80vw" />
            </div>
          </Reveal>
          <div className={styles.inset}>
            <Parallax amount={7}>
              <Figure image={REAL.shoulderMassage} aspect="3 / 4" sizes="(min-width: 1024px) 15vw, 38vw" />
            </Parallax>
          </div>
          <p className={styles.tag}>
            <Icon name="pin" size={15} />
            Ubud, Bali
          </p>
        </div>

        <Reveal className={styles.copy} stagger={0.08}>
          <p className={styles.eyebrow}>Bali Bliss Wellness &amp; Healing</p>
          <h2 id="intro-title" className={styles.words}>
            <span>Reconnect</span>
            <span className={styles.dot} aria-hidden="true" />
            <span>Restore</span>
            <span className={styles.dot} aria-hidden="true" />
            <span>Renew</span>
          </h2>
          <p className={styles.text}>{INTRO}</p>
          <ul className={styles.practices} aria-label="Our practices">
            {PRACTICES.map((p) => (
              <li key={p.label}>
                <Link href={p.href} className={styles.practice}>
                  <Icon name={p.icon} size={16} />
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Button href={BOOKING_URL} external icon="arrow-right">
              Book a Session
            </Button>
            <TextLink href="/about/">Our Story</TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
