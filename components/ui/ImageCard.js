import Link from 'next/link';
import Figure from './Figure';
import Icon from './Icon';
import { hrefFor } from '@/lib/routes.mjs';
import styles from './ImageCard.module.css';

/**
 * Collage card: a photograph on a cream card with a fine border.
 * variant:
 *  tile    — label beside a circled arrow (wellness offerings, "Other Sessions")
 *  feature — title, short text and "Explore →" (retreats & workshops)
 *  person  — portrait, name, specialty and a circled arrow (facilitators)
 *  post    — title, date and "Read More →" (insights)
 * The whole card is one link (through the title), so nothing nests interactive elements.
 */
export default function ImageCard({ href: rawHref, image, title, text, meta, more, variant = 'tile', headingLevel = 3, aspect, sizes, external = false }) {
  const H = `h${headingLevel}`;
  const href = hrefFor(rawHref);
  const ratio = aspect ?? { tile: '4 / 3', feature: '16 / 10', person: '1 / 1', post: '4 / 3' }[variant];
  const LinkTag = external ? 'a' : Link;
  return (
    <article className={`${styles.card} ${styles[variant]}`} data-zoom="">
      {image && (
        <Figure image={image} alt="" aspect={ratio} sizes={sizes ?? '(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 92vw'} className={styles.media} />
      )}
      <div className={styles.body}>
        <div className={styles.text}>
          {variant === 'post' && meta && <p className={styles.metaTop}>{meta}</p>}
          <H className={styles.title}>
            <LinkTag href={href} className={styles.link}>
              {title}
            </LinkTag>
          </H>
          {variant !== 'post' && meta && <p className={styles.meta}>{meta}</p>}
          {text && <p className={styles.desc}>{text}</p>}
          {(variant === 'feature' || variant === 'post') && (
            <p className={styles.more} aria-hidden="true">
              {more ?? (variant === 'post' ? 'Read More' : 'Explore')} <Icon name="arrow-right" size={14} />
            </p>
          )}
        </div>
        {(variant === 'tile' || variant === 'person') && (
          <span className={styles.circle} aria-hidden="true">
            <Icon name="arrow-right" size={14} />
          </span>
        )}
      </div>
    </article>
  );
}
