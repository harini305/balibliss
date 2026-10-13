'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion';
import styles from './ReadingProgress.module.css';

/** A hairline across the top of the window showing how far through the article you are. */
export default function ReadingProgress() {
  const ref = useRef(null);

  useGSAP(() => {
    const article = ref.current.closest('article');
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { trigger: article, start: 'top top', end: 'bottom bottom', scrub: true } },
    );
  });

  return <span ref={ref} className={styles.bar} aria-hidden="true" />;
}
