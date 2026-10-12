'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, motionSimulatedOff } from '@/lib/motion';

/**
 * Gentle staggered entrance for direct children (or `selector` matches).
 * Content is visible by default: only elements that start below the fold are
 * hidden, and only after hydration, so no-JS and reduced-motion users see
 * everything immediately. variant: 'rise' (fade-up) | 'clip' (image unmask).
 */
export default function Reveal({ children, as: Tag = 'div', selector, variant = 'rise', stagger = 0.08, className }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (motionSimulatedOff()) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = selector ? gsap.utils.toArray(selector, ref.current) : Array.from(ref.current.children);
        const fold = window.innerHeight * 0.92;
        const pending = targets.filter((t) => t.getBoundingClientRect().top > fold);
        if (!pending.length) return;

        const from = variant === 'clip' ? { clipPath: 'inset(18% 0% 18% 0%)', autoAlpha: 0.001 } : { autoAlpha: 0, y: 24 };
        const to =
          variant === 'clip'
            ? { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1, duration: 1.1, ease: 'power3.out' }
            : { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' };

        gsap.set(pending, from);
        ScrollTrigger.batch(pending, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) => gsap.to(batch, { ...to, stagger, overwrite: true, clearProps: 'clipPath,transform' }),
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
