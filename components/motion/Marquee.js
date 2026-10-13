'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, motionSimulatedOff } from '@/lib/motion';
import styles from './Marquee.module.css';

/**
 * Endless ticker of words. It drifts slowly, speeds up with scroll velocity and reverses
 * with scroll direction. The duplicate copy is aria-hidden; under reduced motion the
 * list simply wraps and stays still.
 */
export default function Marquee({ items, className = '', separator = '✳', speed = 40 }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (motionSimulatedOff()) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        ref.current.dataset.moving = '';
        const track = ref.current.querySelector(`.${styles.track}`);
        const loop = gsap.to(track, { xPercent: -50, ease: 'none', duration: speed, repeat: -1 });
        let settle;
        const st = ScrollTrigger.create({
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate(self) {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 5);
            gsap.to(loop, { timeScale: boost * self.direction, duration: 0.3, overwrite: true });
            clearTimeout(settle);
            settle = setTimeout(() => gsap.to(loop, { timeScale: self.direction, duration: 1.2 }), 120);
          },
        });
        return () => {
          clearTimeout(settle);
          st.kill();
          loop.kill();
          delete ref.current?.dataset.moving;
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const row = (hidden) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <span>{item}</span>
          <span className={styles.sep} aria-hidden="true">
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={ref} className={`${styles.marquee} ${className}`}>
      <div className={styles.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
