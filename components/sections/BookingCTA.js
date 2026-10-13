import Image from 'next/image';
import Button from '@/components/ui/Button';
import TextLink from '@/components/ui/TextLink';
import Reveal from '@/components/motion/Reveal';
import ParallaxBg from '@/components/motion/ParallaxBg';
import { BOOKING_URL } from '@/content/site';
import { MEDIA } from '@/content/media';
import styles from './BookingCTA.module.css';

/**
 * Closing invitation (collage "Your Journey Awaits"): a centred moss-green band — or, with
 * `image`, a darkened photograph — with the brand sprig, a serif heading, a line of text and
 * an outlined action. The button always goes to a real destination.
 */
export default function BookingCTA({ heading, text, buttonLabel = 'Book Now', href = BOOKING_URL, secondary, headingLevel = 2, image }) {
  const H = `h${headingLevel}`;
  const isWhatsApp = /whatsapp\.com/.test(href);
  // A photograph behind the band only when it is large enough to stay sharp full-width.
  if (image && image.width < 1400) image = undefined;
  return (
    <div className={`${styles.band} ${image ? styles.photo : styles.moss}`}>
      {image && <ParallaxBg image={image} />}
      <span className={styles.shade} aria-hidden="true" />
      <Reveal className={`container-wide ${styles.inner}`} stagger={0.1}>
        <span className={styles.sprig} aria-hidden="true">
          <Image src={MEDIA.symbol.src} alt="" width={MEDIA.symbol.width} height={MEDIA.symbol.height} sizes="80px" />
        </span>
        <H className={styles.heading}>{heading}</H>
        {text && <p className={styles.text}>{text}</p>}
        <div className={styles.actions}>
          <Button href={href} external={/^(https?:|mailto:)/.test(href)} variant="onDark" size="sm" icon={isWhatsApp ? 'whatsapp' : undefined}>
            {buttonLabel}
          </Button>
          {secondary && (
            <TextLink href={secondary.href} external={secondary.external} onDark>
              {secondary.label}
            </TextLink>
          )}
        </div>
      </Reveal>
    </div>
  );
}
