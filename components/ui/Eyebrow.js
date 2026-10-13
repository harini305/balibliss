import styles from './Eyebrow.module.css';

/** Small uppercase label above a heading. `index` renders an italic numeral (01, 02…) before the rule. */
export default function Eyebrow({ children, index, as: Tag = 'p', onDark = false, className = '' }) {
  return (
    <Tag className={`${styles.eyebrow} ${onDark ? styles.onDark : ''} ${className}`}>
      {index != null && <span className={styles.index}>{String(index).padStart(2, '0')}</span>}
      {children && <span>{children}</span>}
    </Tag>
  );
}
