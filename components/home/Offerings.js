import ImageCard from '@/components/ui/ImageCard';
import TextLink from '@/components/ui/TextLink';
import Reveal from '@/components/motion/Reveal';
import styles from './Offerings.module.css';

/**
 * "Discover Our Wellness Offerings" (collage): a 3 × 2 grid of photograph cards, each linking to
 * its session page, with "View All Services" beside the heading.
 * items: [{ href, title, image }]
 */
export default function Offerings({ items, heading = 'Discover Our Wellness Offerings', id = 'offerings-title', allHref = '/wellness-sessions/', allLabel = 'View All Services' }) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <div className="container-wide">
        <Reveal className={styles.head}>
          <div>
            <h2 id={id} className={styles.title}>
              {heading}
            </h2>
            {allHref && <TextLink href={allHref}>{allLabel}</TextLink>}
          </div>
        </Reveal>
        <Reveal as="ul" className={styles.grid} stagger={0.07}>
          {items.map((it) => (
            <li key={it.href + it.title}>
              <ImageCard href={it.href} image={it.image} title={it.title} meta={it.meta} aspect="4 / 3.3" sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw" />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
