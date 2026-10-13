'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK, motionSimulatedOff } from '@/lib/motion';
import styles from './HeroBackdrop.module.css';

/**
 * Full-bleed hero photograph behind dark-hero copy: settles from a slow zoom on load and
 * drifts down as the page scrolls. Decorative (alt=""), because the hero copy carries meaning.
 */
export default function HeroBackdrop({ image, quality = 80 }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (motionSimulatedOff()) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const img = ref.current.querySelector('img');
        gsap.fromTo(img, { scale: 1.2 }, { scale: 1.05, duration: 2.6, ease: 'exhale' });
        gsap.to(img, {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: { trigger: ref.current.parentElement, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={styles.media} aria-hidden="true">
      <Image src={image.src} alt="" fill preload sizes="100vw" quality={quality} className={styles.img} style={{ objectPosition: image.position ?? '50% 50%' }} />
      <span className={styles.scrim} />
    </div>
  );
}
