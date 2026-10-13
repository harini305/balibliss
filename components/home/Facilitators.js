import ImageCard from '@/components/ui/ImageCard';
import TextLink from '@/components/ui/TextLink';
import Reveal from '@/components/motion/Reveal';
import { FACILITATORS } from '@/content/people';
import styles from './Facilitators.module.css';

/** "Our Facilitators" (collage): portrait cards with name, specialties and a circled arrow to each bio. */
export default function Facilitators({ people = FACILITATORS, headingId = 'facilitators-title', heading = 'Our Facilitators', showAbout = true }) {
  return (
    <div className={`container-wide ${styles.wrap}`}>
      <Reveal className={styles.head}>
        <div>
          <h2 id={headingId} className={styles.heading}>
            {heading}
          </h2>
          {showAbout && <TextLink href="/about/">View All</TextLink>}
        </div>
      </Reveal>
      <Reveal as="ul" className={styles.list} stagger={0.07}>
        {people.map((p) => (
          <li key={p.name}>
            <ImageCard variant="person" href={p.href} image={p.image} title={p.name} meta={p.specialties} sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 46vw" />
          </li>
        ))}
      </Reveal>
    </div>
  );
}
