import ImageCard from '@/components/ui/ImageCard';
import TextLink from '@/components/ui/TextLink';
import Reveal from '@/components/motion/Reveal';
import styles from './Experiences.module.css';

/**
 * Retreats, workshops, training and rituals (collage "Retreats & Workshops"): a 2 × 2 set of
 * feature cards — photograph, title, one line, "Explore →".
 * items: [{ href, title, text, image }]
 */
export default function Experiences({ heading, lead, items, allHref, allLabel, id = 'experiences-title' }) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <div className={`container-wide ${styles.grid}`}>
        <Reveal className={styles.head} stagger={0.08}>
          <h2 id={id} className={styles.title}>
            {heading}
          </h2>
          {lead && <p className={styles.lead}>{lead}</p>}
          {allHref && <TextLink href={allHref}>{allLabel}</TextLink>}
        </Reveal>
        <Reveal as="ul" className={styles.cards} stagger={0.08}>
          {items.map((it) => (
            <li key={it.href}>
              <ImageCard variant="feature" href={it.href} image={it.image} title={it.title} text={it.text} sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 92vw" />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
