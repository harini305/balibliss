'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);
  // House curves: a long, soft deceleration ("exhale") for reveals, and a weighted
  // in-out ("tide") for clip-path sweeps and image wipes.
  CustomEase.create('exhale', '0.16, 1, 0.3, 1');
  CustomEase.create('tide', '0.77, 0, 0.18, 1');
  // Touch browsers resize the viewport as the URL bar shows/hides; don't re-layout pins for that.
  ScrollTrigger.config({ ignoreMobileResize: true });
  // Re-measure trigger positions once webfonts and images have settled.
  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

/** Motion is allowed only when the OS allows it and the styleguide override is off. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
/** Desktop-class pointer: hover effects, cursor-follow previews and pinned sequences. */
export const FINE_POINTER = '(hover: hover) and (pointer: fine)';

export function motionSimulatedOff() {
  return typeof document !== 'undefined' && document.documentElement.dataset.motion === 'reduce';
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
