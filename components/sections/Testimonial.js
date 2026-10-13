import styles from './Testimonial.module.css';

/** A single client quote, reproduced verbatim from an existing source. Blank lines in `quote` separate paragraphs. */
export default function Testimonial({ quote, name, source }) {
  return (
    <figure className={styles.figure}>
      <span className={styles.mark} aria-hidden="true">
        “
      </span>
      <blockquote className={styles.quote}>
        {quote.split(/\n\s*\n/).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </blockquote>
      <figcaption className={styles.cite}>
        <span className={styles.name}>{name}</span>
        {source && <span className={styles.source}>{source}</span>}
      </figcaption>
    </figure>
  );
}
