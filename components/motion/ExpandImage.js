'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK, motionSimulatedOff } from '@/lib/motion';

/**
 * A photograph that opens from a framed window to full-bleed as it scrolls into view
 * (scrubbed clip-path), while the image itself settles from a slight zoom. Fully visible
 * without JS or with reduced motion.
 */
export default function ExpandImage({ children, className, from = 'inset(12% 22% 12% 22% round 999px 999px 0 0)' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (motionSimulatedOff()) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const img = ref.current.querySelector('img');
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'center 45%', scrub: 0.8 },
        });
        tl.fromTo(ref.current, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0 0)', ease: 'none' }, 0);
        if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, ease: 'none' }, 0);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
