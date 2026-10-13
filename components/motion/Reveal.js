'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, motionSimulatedOff } from '@/lib/motion';

const VARIANTS = {
  // Fade-up for text and small groups.
  rise: {
    from: { autoAlpha: 0, y: 36 },
    to: { autoAlpha: 1, y: 0, duration: 1.1, ease: 'exhale' },
  },
  // Image wipe: the frame opens upward like a blind while the photograph settles from a zoom.
  clip: {
    from: { clipPath: 'inset(100% 0% 0% 0%)' },
    to: { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'tide' },
    img: { from: { scale: 1.25 }, to: { scale: 1, duration: 1.8, ease: 'exhale' } },
  },
  // Sideways wipe for wide images and rules.
  wipe: {
    from: { clipPath: 'inset(0% 100% 0% 0%)' },
    to: { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'tide' },
    img: { from: { scale: 1.15, xPercent: -4 }, to: { scale: 1, xPercent: 0, duration: 1.8, ease: 'exhale' } },
  },
  fade: {
    from: { autoAlpha: 0 },
    to: { autoAlpha: 1, duration: 1.2, ease: 'power1.out' },
  },
};

/**
 * Staggered entrance for direct children (or `selector` matches).
 * Content is visible by default: only elements that start below the fold are hidden,
 * and only after hydration, so no-JS and reduced-motion users see everything at once.
 * variant: 'rise' | 'clip' | 'wipe' | 'fade'
 */
export default function Reveal({ children, as: Tag = 'div', selector, variant = 'rise', stagger = 0.1, className, ...rest }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (motionSimulatedOff()) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const v = VARIANTS[variant] ?? VARIANTS.rise;
        const targets = selector ? gsap.utils.toArray(selector, ref.current) : Array.from(ref.current.children);
        const fold = window.innerHeight * 0.92;
        const pending = targets.filter((t) => t.getBoundingClientRect().top > fold);
        if (!pending.length) return;

        gsap.set(pending, v.from);
        const imgs = v.img ? pending.map((t) => t.querySelector('img')).filter(Boolean) : [];
        if (imgs.length) gsap.set(imgs, v.img.from);

        ScrollTrigger.batch(pending, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, { ...v.to, stagger, overwrite: true, clearProps: 'clipPath,transform,opacity,visibility' });
            if (v.img) {
              const bi = batch.map((t) => t.querySelector('img')).filter(Boolean);
              if (bi.length) gsap.to(bi, { ...v.img.to, stagger, clearProps: 'transform' });
            }
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
