'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK, motionSimulatedOff } from '@/lib/motion';
import { RING_PATH } from '@/components/ui/ringPath';

/**
 * The signature ring drawing itself once — the only "hero" flourish in the system.
 * Renders fully drawn on the server; the draw runs after hydration (or, with `scroll`, when it
 * scrolls into view) when motion is allowed.
 */
export default function RingDraw({
  size = 160,
  stroke = 'var(--c-sage)',
  strokeWidth = 1.25,
  duration = 2.4,
  delay = 0.2,
  preserveAspectRatio,
  scroll = false,
  className,
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (motionSimulatedOff()) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const path = ref.current.querySelector('path');
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration,
            delay,
            ease: 'power2.inOut',
            clearProps: 'strokeDasharray,strokeDashoffset',
            scrollTrigger: scroll ? { trigger: ref.current, start: 'top 85%', once: true } : undefined,
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      preserveAspectRatio={preserveAspectRatio}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={RING_PATH} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
