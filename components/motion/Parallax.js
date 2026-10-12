'use client';

import { useRef } from 'react';
import { gsap, useGSAP, motionSimulatedOff } from '@/lib/motion';
import styles from './Parallax.module.css';

/**
 * Subtle scroll parallax (≤ `amount`% travel) for hero images. Desktop only
 * (≥1024px) and off under reduced motion; elsewhere the image is static.
 */
export default function Parallax({ children, amount = 6, className = '' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (motionSimulatedOff()) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
        const inner = ref.current.firstElementChild;
        gsap.set(inner, { scale: 1 + (amount * 2) / 100 });
        gsap.fromTo(
          inner,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`${styles.frame} ${className}`}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
