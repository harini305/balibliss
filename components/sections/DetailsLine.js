import styles from './DetailsLine.module.css';

/**
 * Key facts as a definition list (Duration / From / Format …).
 * Only pass prices that are already published on the live page or confirmed by the owner.
 */
export default function DetailsLine({ items }) {
  return (
    <dl className={styles.list}>
      {items.map((d) => (
        <div key={d.term} className={styles.row}>
          <dt className={styles.term}>{d.term}</dt>
          <dd className={styles.value}>{d.value}</dd>
        </div>
      ))}
    </dl>
  );
}
