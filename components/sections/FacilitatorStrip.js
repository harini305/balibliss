import Link from 'next/link';
import Figure from '@/components/ui/Figure';
import Reveal from '@/components/motion/Reveal';
import styles from './FacilitatorStrip.module.css';

/** Facilitators in ring-masked portraits. people: [{ name, href, image, specialties }] */
export default function FacilitatorStrip({ people, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  return (
    <Reveal as="ul" className={styles.list}>
      {people.map((p) => (
        <li key={p.name} className={styles.item}>
          <Figure image={p.image} alt="" treatment="ring" sizes="(min-width: 1024px) 200px, 40vw" />
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
