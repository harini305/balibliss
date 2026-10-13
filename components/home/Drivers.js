import Image from 'next/image';
import Reveal from '@/components/motion/Reveal';
import { DRIVERS } from '@/content/home';
import styles from './Drivers.module.css';

/** Practical note: the two VIP drivers, verbatim — present, but quieter than the wellness story. */
export default function Drivers() {
  return (
    <div className={`container-wide ${styles.wrap}`}>
      <Reveal className={styles.copy}>
        <h2 id="drivers-title" className={styles.heading}>
          {DRIVERS.heading}
        </h2>
        <p className={styles.text}>{DRIVERS.text}</p>
      </Reveal>
      <Reveal as="ul" className={styles.people} stagger={0.12}>
        {DRIVERS.people.map((p) => (
          <li key={p.name} className={styles.person}>
            <span className={styles.photo}>
              <Image src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="9rem" style={{ objectPosition: p.image.position }} />
            </span>
            <span className={styles.body}>
              <span className={styles.name}>{p.name}</span>
              <span className={styles.role}>{p.text}</span>
            </span>
          </li>
        ))}
      </Reveal>
    </div>
  );
}
