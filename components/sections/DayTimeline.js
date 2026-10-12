import Reveal from '@/components/motion/Reveal';
import styles from './DayTimeline.module.css';

/**
 * Morning / Midday / Afternoon journey. Horizontal on desktop, vertical on phones.
 * (The pinned desktop sequence from the plan is added on the retreat pages.)
 */
export default function DayTimeline({ steps, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  return (
    <Reveal as="ol" className={styles.timeline}>
      {steps.map((s, i) => (
        <li key={s.time} className={styles.step}>
          <span className={styles.dot} aria-hidden="true" />
          <p className={styles.time}>
            <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span> {s.time}
          </p>
          <H className={styles.title}>{s.title}</H>
          <p className={styles.text}>{s.text}</p>
          {s.note && <p className={styles.note}>{s.note}</p>}
        </li>
      ))}
    </Reveal>
  );
}
