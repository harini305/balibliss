import Icon from './Icon';
import styles from './Accordion.module.css';

/**
 * FAQ accordion built on native <details>/<summary>: keyboard and screen-reader
 * support for free, and fully readable without JavaScript.
 * items: [{ question, answer }] (answer: string or paragraph array); headingLevel sets the semantic level of each question.
 */
export default function Accordion({ items, headingLevel = 3, defaultOpen = -1 }) {
  const H = `h${headingLevel}`;
  return (
    <div className={styles.list}>
      {items.map((item, i) => (
        <details key={item.question} className={styles.item} open={i === defaultOpen}>
          <summary className={styles.summary}>
            <H className={styles.question}>{item.question}</H>
            <span className={styles.marker} aria-hidden="true">
              <Icon name="plus" size={20} />
            </span>
          </summary>
          <div className={styles.answer}>
            {[].concat(item.answer).map((p, pi) => (
              <p key={pi}>{p}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
