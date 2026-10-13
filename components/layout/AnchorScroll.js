'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Lands every in-page jump exactly: the section's own heading ends up just below whatever is
 * pinned at the top (the sticky section bar, and the header when it is showing) — no strip of
 * empty section padding above it. Handles clicks on same-page "#…" links (section pills, quick
 * links) and arrivals from other pages with a hash (e.g. /wellness-sessions/#reiki).
 */
const GAP = 16;

/** Document position from layout offsets, so entrance animations and parallax (transforms) don't skew it. */
function layoutTop(node) {
  let y = 0;
  for (let n = node; n; n = n.offsetParent) y += n.offsetTop;
  return y;
}

function targetFor(el) {
  const nav = document.querySelector('[data-section-nav]');
  const navH = nav ? nav.offsetHeight : 0;
  // Align the section's heading (or the small label just above it), not the section's padding.
  // Headings never sit in sticky columns, so their layout position is reliable.
  const heading = el.querySelector('h1, h2, h3');
  const label = heading?.previousElementSibling;
  const start = label && label.tagName === 'P' && label.offsetHeight < 60 ? label : heading;
  const base = start ? layoutTop(start) : layoutTop(el) + (parseFloat(getComputedStyle(el).paddingTop) || 0);
  const top = base - navH - GAP;
  // Scrolling up brings the header back above the section bar, so leave room for it too.
  const header = document.querySelector('[data-site-header]');
  return top < window.scrollY && header ? top - header.offsetHeight : top;
}

function jump(hash, smooth) {
  if (!hash || hash === '#') return false;
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return false;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: Math.max(0, targetFor(el)), behavior: smooth && !reduce ? 'smooth' : 'instant' });
  return true;
}

export default function AnchorScroll() {
  const pathname = usePathname();

  // Same-page links: capture phase, so this runs before next/link handles the click.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a[href*="#"]');
      if (!a || a.target === '_blank') return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      if (jump(url.hash, true)) {
        e.preventDefault();
        history.pushState(null, '', url.hash);
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // Arriving with a hash (first load or from another page): correct the browser's own jump once
  // layout has settled, and again after late images and fonts.
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    const timers = [60, 450, 1200].map((ms) => setTimeout(() => jump(hash, false), ms));
    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  return null;
}
