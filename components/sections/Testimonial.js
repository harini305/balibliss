import styles from './Testimonial.module.css';

/** A single client quote, reproduced verbatim from an existing source. */
export default function Testimonial({ quote, name, source }) {
  return (
    <figure className={styles.figure}>
      <span className={styles.mark} aria-hidden="true">
        “
      </span>
      <blockquote className={styles.quote}>
        <p>{quote}</p>
      </blockquote>
      <figcaption className={styles.cite}>
        <span className={styles.name}>{name}</span>
        {source && <span className={styles.source}>{source}</span>}
      </figcaption>
    </figure>
  );
}
