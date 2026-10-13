'use client';

import { useRef } from 'react';
import { gsap, SplitText, useGSAP, MOTION_OK, motionSimulatedOff } from '@/lib/motion';

/**
 * A statement whose words brighten one by one as it scrolls through the viewport (scrubbed).
 * The text is fully legible at all times — unlit words sit at reduced opacity, never hidden.
 */
export default function ScrubWords({ as: Tag = 'p', children, className, dim = 0.18 }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (motionSimulatedOff()) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(ref.current, {
          type: 'words',
          autoSplit: true,
          onSplit(self) {
            return gsap.fromTo(
              self.words,
              { opacity: dim },
              {
                opacity: 1,
                ease: 'none',
                stagger: 0.1,
                scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
              },
            );
          },
        });
        return () => split.revert();
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
