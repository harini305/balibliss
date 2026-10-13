'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK, motionSimulatedOff } from '@/lib/motion';
import styles from './HorizontalScroll.module.css';

/**
 * A title block plus a row of panels. On desktop with motion allowed, the section pins:
 * the title stays put on the left while vertical scrolling slides the panels past it
 * (scrubbed), with a progress hairline. Everywhere else the title sits above a native,
 * swipeable, scroll-snapping row — so nothing depends on the animation.
 */
export default function HorizontalScroll({ head, children, className = '', label }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (motionSimulatedOff()) return;
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const root = ref.current;
        const viewport = root.querySelector(`.${styles.viewport}`);
        const track = root.querySelector(`.${styles.track}`);
        const bar = root.querySelector(`.${styles.bar}`);
        root.dataset.pinned = '';
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
          },
        });
        // Each photo settles from a slight zoom as its panel travels across.
        gsap.utils.toArray(`.${styles.panel}`, root).forEach((panel) => {
          const img = panel.querySelector('img');
          if (!img) return;
          gsap.fromTo(
            img,
            { scale: 1.18 },
            { scale: 1, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } },
          );
        });
        // Keyboard users: focusing a link in an off-screen panel scrolls the page so that
        // panel slides into view (the track is transformed, so the browser can't do it).
        const onFocus = (e) => {
          const panel = e.target.closest(`.${styles.panel}`);
          const st = tween.scrollTrigger;
          if (!panel || !st || !distance()) return;
          const target = Math.min(1, Math.max(0, panel.offsetLeft / distance()));
          window.scrollTo({ top: st.start + target * (st.end - st.start), behavior: 'instant' });
        };
        root.addEventListener('focusin', onFocus);
        return () => {
          root.removeEventListener('focusin', onFocus);
          delete root.dataset.pinned;
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`${styles.wrap} ${className}`}>
      {head && <div className={styles.head}>{head}</div>}
      <div className={styles.viewport}>
        <div className={styles.track} role="list" aria-label={label}>
          {[].concat(children).map((child, i) => (
            <div key={i} role="listitem" className={styles.panel}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <span className={styles.progress} aria-hidden="true">
        <span className={styles.bar} />
      </span>
    </div>
  );
}
