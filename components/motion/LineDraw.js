'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK, motionSimulatedOff } from '@/lib/motion';

/**
 * A hairline that draws itself as its section scrolls through the viewport (scrubbed).
 * Horizontal from `breakpoint` up, vertical below it. Fully drawn without JS / reduced motion.
 */
export default function LineDraw({ className, trigger, breakpoint = 1024 }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (motionSimulatedOff()) return;
      const mm = gsap.matchMedia();
      const scroll = () => ({
        trigger: (trigger && ref.current.closest(trigger)) || ref.current,
        start: 'top 75%',
        end: 'bottom 60%',
        scrub: 0.6,
      });
      mm.add(`${MOTION_OK} and (min-width: ${breakpoint}px)`, () => {
        gsap.fromTo(ref.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', transformOrigin: '0 50%', scrollTrigger: scroll() });
      });
      mm.add(`${MOTION_OK} and (max-width: ${breakpoint - 1}px)`, () => {
        gsap.fromTo(ref.current, { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: '50% 0', scrollTrigger: scroll() });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <span ref={ref} className={className} aria-hidden="true" />;
}
