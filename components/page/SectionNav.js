'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SectionNav.module.css';

/**
 * Sticky in-page navigation for a menu page: one pill per section. The pill for the section in
 * view is highlighted (IntersectionObserver) and scrolled into view inside the bar.
 * items: [{ id, label }]
 */
export default function SectionNav({ items, label = 'On this page' }) {
  const [active, setActive] = useState(items[0]?.id);
  const barRef = useRef(null);

  useEffect(() => {
    const sections = items.map((it) => document.getElementById(it.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    const pill = barRef.current?.querySelector(`[data-id="${active}"]`);
    const bar = barRef.current;
    if (pill && bar) bar.scrollTo({ left: pill.offsetLeft - bar.clientWidth / 2 + pill.clientWidth / 2, behavior: 'smooth' });
  }, [active]);

  return (
    <nav className={styles.nav} aria-label={label} data-section-nav="">
      <div className={`container-wide ${styles.inner}`}>
        <ul ref={barRef} className={styles.bar}>
          {items.map((it) => (
            <li key={it.id}>
              <a href={`#${it.id}`} data-id={it.id} className={styles.pill} aria-current={active === it.id ? 'location' : undefined}>
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
