'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK, motionSimulatedOff } from '@/lib/motion';
import styles from './StackCards.module.css';

/**
 * Cards that stack as you scroll: each one is position: sticky (pure CSS, so the stacking
 * works without JS), and GSAP gently recedes the card underneath (scale + dim) as the next
 * one slides over it. Below 768px the cards simply follow one another.
 */
export default function StackCards({ children, className = '' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (motionSimulatedOff()) return;
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
        const cards = gsap.utils.toArray(`.${styles.card}`, ref.current);
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.firstElementChild, {
            scale: 0.92,
            filter: 'brightness(0.55)',
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 15%', scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className={`${styles.stack} ${className}`}>
      {[].concat(children).map((child, i) => (
        <li key={i} className={styles.card} style={{ '--i': i }}>
          <div className={styles.inner}>{child}</div>
        </li>
      ))}
    </ol>
  );
}
