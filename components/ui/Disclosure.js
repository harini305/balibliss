import Icon from './Icon';
import styles from './Disclosure.module.css';

/**
 * A stack of expandable panels on native <details>: keyboard and screen-reader friendly, readable
 * without JavaScript. items: [{ key, title, content: ReactNode }]; `open` = index opened by default.
 */
export default function Disclosure({ items, open = -1, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  return (
    <div className={styles.list}>
      {items.map((it, i) => (
        <details key={it.key} className={styles.item} open={i === open}>
          <summary className={styles.summary}>
            <H className={styles.title}>{it.title}</H>
            <span className={styles.marker} aria-hidden="true">
              <Icon name="plus" size={16} />
            </span>
          </summary>
          <div className={styles.content}>{it.content}</div>
        </details>
      ))}
    </div>
  );
}
