'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import RingDraw from '@/components/motion/RingDraw';
import styles from './styleguide.module.css';

/** Replays motion demos and previews the reduced-motion path without changing OS settings. */
export default function MotionLab() {
  const [osReduced, setOsReduced] = useState(null);
  const [simulate, setSimulate] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setOsReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (simulate) root.dataset.motion = 'reduce';
    else delete root.dataset.motion;
    setRun((r) => r + 1);
    return () => delete root.dataset.motion;
  }, [simulate]);

  const effective = osReduced || simulate;

  return (
    <div className={styles.motionLab}>
      <div className={styles.motionControls}>
        <p className={styles.status} aria-live="polite">
          OS setting: <strong>{osReduced == null ? '…' : osReduced ? 'reduce' : 'no preference'}</strong> · Motion on this page:{' '}
          <strong>{effective ? 'off (static)' : 'on'}</strong>
        </p>
        <div className={styles.row}>
          <Button variant="secondary" onClick={() => setRun((r) => r + 1)}>
            Replay demos
          </Button>
          <Button variant="secondary" aria-pressed={simulate} onClick={() => setSimulate((s) => !s)}>
            {simulate ? 'Stop simulating reduced motion' : 'Simulate reduced motion'}
          </Button>
        </div>
      </div>

      <div className={styles.motionGrid} key={run}>
        <div className={styles.motionCell}>
          <RingDraw size={150} delay={0.1} />
          <p className={styles.caption}>Ring draw · 2.4s, once, on load. Reduced: drawn immediately.</p>
        </div>
        <div className={styles.motionCell}>
          <ReplayRise />
          <p className={styles.caption}>Staggered rise · 24px, 0.8s, 80ms stagger. Reduced: no movement.</p>
        </div>
      </div>
    </div>
  );
}

/*
 * <Reveal> deliberately skips content already in view (so nothing flashes on load),
 * so this in-view demo replays the same rise with token-driven CSS transitions,
 * which collapse to 0ms under reduced motion.
 */
function ReplayRise() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 60);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={styles.riseDemo}>
      {['Arrive', 'Understand', 'Feel safe', 'Choose', 'Book'].map((w, i) => (
        <span key={w} className={on ? styles.riseOn : styles.riseOff} style={{ '--i': i }}>
          {w}
        </span>
      ))}
    </div>
  );
}
