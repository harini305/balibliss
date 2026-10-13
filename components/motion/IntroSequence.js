'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK, motionSimulatedOff } from '@/lib/motion';

/**
 * Page-hero entrance. Inside the wrapper, [data-intro] elements rise in order and
 * [data-intro-media] elements unmask from a soft inset. The hidden start state comes from
 * globals.css (only when JS runs and motion is allowed), so there is no flash before
 * hydration and nothing stays hidden without JS. Adds .intro-ready to <html> once GSAP owns it.
 */
export default function IntroSequence({ children, as: Tag = 'div', className, delay = 0.1, ...rest }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const root = document.documentElement;
      const mm = gsap.matchMedia();
      if (!motionSimulatedOff()) {
        mm.add(MOTION_OK, () => {
          const items = gsap.utils.toArray('[data-intro]', ref.current);
          const media = gsap.utils.toArray('[data-intro-media]', ref.current);
          gsap.set(items, { autoAlpha: 0, y: 28 });
          root.classList.add('intro-ready');

          const tl = gsap.timeline({ delay, defaults: { ease: 'power3.out' } });
          if (media.length) {
            // Photographs wipe up into their frames while settling from a slight zoom.
            tl.fromTo(
              media,
              { clipPath: 'inset(100% 0% 0% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'tide', clearProps: 'clipPath' },
              0.1,
            );
            const imgs = media.map((m) => m.querySelector('img')).filter(Boolean);
            if (imgs.length) tl.fromTo(imgs, { scale: 1.3 }, { scale: 1, duration: 2.2, ease: 'exhale', clearProps: 'scale' }, 0.1);
          }
          tl.to(items, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.12, clearProps: 'transform' }, 0.1);
        });
      }
      root.classList.add('intro-ready');
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
