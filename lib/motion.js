'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** Motion is allowed only when the OS allows it and the styleguide override is off. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export function motionSimulatedOff() {
  return typeof document !== 'undefined' && document.documentElement.dataset.motion === 'reduce';
}

export { gsap, ScrollTrigger, useGSAP };
