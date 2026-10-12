import styles from './Eyebrow.module.css';

/** Small uppercase label above a heading. `index` renders the ritual-index numeral (01, 02…). */
export default function Eyebrow({ children, index, as: Tag = 'p', onDark = false }) {
  return (
    <Tag className={`${styles.eyebrow} ${onDark ? styles.onDark : ''}`}>
      {index != null && <span className={styles.index}>{String(index).padStart(2, '0')}</span>}
      {children}
    </Tag>
  );
}
