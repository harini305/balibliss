import Link from 'next/link';
import Figure from '@/components/ui/Figure';
import Reveal from '@/components/motion/Reveal';
import styles from './FacilitatorStrip.module.css';

/** Facilitators in arched portraits; the whole card links to the bio. people: [{ name, href, image, specialties }] */
export default function FacilitatorStrip({ people, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  return (
    <Reveal as="ul" className={styles.list} stagger={0.12}>
      {people.map((p, i) => (
        <li key={p.name} className={styles.item} style={{ '--offset': i % 2 }}>
          <Figure image={p.image} alt="" treatment="arch" aspect="3 / 4" sizes="(min-width: 1024px) 18vw, 45vw" />
          <H className={styles.name}>
            <Link href={p.href} className={styles.link}>
              {p.name}
            </Link>
          </H>
          <p className={styles.spec}>{p.specialties}</p>
        </li>
      ))}
    </Reveal>
  );
}
