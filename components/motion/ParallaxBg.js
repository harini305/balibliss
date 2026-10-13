'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK, motionSimulatedOff } from '@/lib/motion';
import styles from './ParallaxBg.module.css';

/**
 * Background photograph for banners: it drifts slowly against the scroll (scrubbed) and settles
 * from a slight zoom on load when `intro` is set. Decorative (alt=""); static without motion.
 */
export default function ParallaxBg({ image, priority = false, intro = false, amount = 12, sizes = '100vw' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (motionSimulatedOff()) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const img = ref.current.querySelector('img');
        if (intro) gsap.fromTo(img, { scale: 1.14 }, { scale: 1, duration: 2.2, ease: 'exhale' });
        gsap.fromTo(
          ref.current,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: 'none',
            scrollTrigger: { trigger: ref.current.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={styles.bg} aria-hidden="true">
      <Image src={image.src} alt="" fill preload={priority} quality={90} sizes={sizes} className={styles.img} style={{ objectPosition: image.position ?? '50% 50%' }} />
    </div>
  );
}
