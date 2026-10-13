'use client';

import { useRef } from 'react';
import { gsap, SplitText, useGSAP, MOTION_OK, motionSimulatedOff } from '@/lib/motion';

/**
 * Heading whose lines (or words) rise out of a mask. `immediate` plays on mount (heroes);
 * otherwise it plays when the heading scrolls into view. SplitText keeps an aria-label with
 * the full text, re-splits on resize/font load, and the original markup is restored on unmount.
 * Without JS or with reduced motion the heading is simply shown.
 */
export default function SplitHeading({ as: Tag = 'h2', children, className, id, type = 'lines', immediate = false, delay = 0, stagger, ...rest }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (motionSimulatedOff()) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = ref.current;
        gsap.set(el, { autoAlpha: 0 }); // hide until split, so the unsplit text never flashes
        const split = SplitText.create(el, {
          type: type === 'words' ? 'words,lines' : 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { autoAlpha: 1 });
            const targets = type === 'words' ? self.words : self.lines;
            return gsap.from(targets, {
              yPercent: 110,
              rotate: 2,
              duration: 1.3,
              ease: 'exhale',
              stagger: stagger ?? (type === 'words' ? 0.05 : 0.12),
              delay: immediate ? delay : 0,
              scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 88%', once: true },
            });
          },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className} {...rest}>
      {children}
    </Tag>
  );
}
