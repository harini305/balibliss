import Image from 'next/image';
import Button from '@/components/ui/Button';
import Reveal from '@/components/motion/Reveal';
import ParallaxBg from '@/components/motion/ParallaxBg';
import Figure from '@/components/ui/Figure';
import { MEDIA } from '@/content/media';
import styles from './PhotoBanner.module.css';

/**
 * Full-width band (collage): a darkened photograph — or the moss-green invitation colour — with a
 * serif quote or heading, the brand sprig, and an optional action.
 * Quotes must be verbatim from an existing source; `cite` names it.
 * align: left | center | right · tone: photo | moss
 */
export default function PhotoBanner({ image, quote, cite, heading, text, action, align = 'left', tone = 'photo', headingLevel = 2, label }) {
  const H = `h${headingLevel}`;
  // Photographs under 1400px wide would blur if stretched full-width: show them at their own size
  // beside the words on a deep-forest band instead.
  const split = tone === 'photo' && image && image.width < 1400;
  return (
    <section className={`${styles.band} ${split ? styles.split : styles[tone]} ${styles[align]}`} aria-label={label ?? (quote ? 'Client words' : undefined)}>
      {tone === 'photo' && image && !split && <ParallaxBg image={image} />}
      <span className={styles.shade} aria-hidden="true" />
      <div className={`container-wide ${styles.inner}`}>
        {split && (
          <Reveal variant="clip" className={styles.splitMedia} style={{ maxWidth: `${Math.min(image.width, 620)}px` }}>
            <div>
              <Figure image={image} alt="" aspect="4 / 3" sizes="(min-width: 1024px) 40vw, 92vw" />
            </div>
          </Reveal>
        )}
        <Reveal className={styles.copy} stagger={0.12}>
          {quote && (
            <figure className={styles.figure}>
              <blockquote className={styles.quote}>
                <p>{quote}</p>
              </blockquote>
              {cite && <figcaption className={styles.cite}>— {cite}</figcaption>}
            </figure>
          )}
          {heading && <H className={styles.heading}>{heading}</H>}
          {text && <p className={styles.text}>{text}</p>}
          {action && (
            <div className={styles.action}>
              <Button href={action.href} external={action.external} variant="onDark" size="sm">
                {action.label}
              </Button>
            </div>
          )}
          <span className={styles.sprig} aria-hidden="true">
            <Image src={MEDIA.symbol.src} alt="" width={MEDIA.symbol.width} height={MEDIA.symbol.height} sizes="80px" />
          </span>
        </Reveal>
      </div>
    </section>
  );
}
