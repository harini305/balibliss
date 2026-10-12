import styles from './Tag.module.css';

/** Pill tag — the only pill shape in the system. tone: lagoon | orchid | clay | neutral */
export default function Tag({ children, tone = 'lagoon' }) {
  return <span className={`${styles.tag} ${styles[tone]}`}>{children}</span>;
}
