import TextLink from '@/components/ui/TextLink';
import Reveal from '@/components/motion/Reveal';
import { REVIEWS } from '@/content/home';
import styles from './Reviews.module.css';

/** Verbatim Google reviews as quiet quote cards. No rating counts or dates (they change over time). */
export default function Reviews() {
  const all = [REVIEWS.featured, ...REVIEWS.more];
  return (
    <div className={`container-wide ${styles.wrap}`}>
      <Reveal className={styles.head}>
        <div>
          <h2 id="reviews-title" className={styles.heading}>
            {REVIEWS.heading}
          </h2>
          <TextLink href={REVIEWS.googleUrl} external>
            Read our Google reviews
          </TextLink>
        </div>
      </Reveal>
      <Reveal as="ul" className={styles.list} stagger={0.1}>
        {all.map((r) => (
          <li key={r.name} className={`card ${styles.card}`}>
            <span className={styles.mark} aria-hidden="true">
              “
            </span>
            <blockquote className={styles.quote}>
              <p>{r.quote}</p>
            </blockquote>
            <p className={styles.cite}>
              — {r.name} <span>Google review</span>
            </p>
          </li>
        ))}
      </Reveal>
    </div>
  );
}
