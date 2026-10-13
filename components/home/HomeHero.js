'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { gsap, useGSAP, MOTION_OK, motionSimulatedOff } from '@/lib/motion';
import { HERO } from '@/content/home';
import { SITE, BOOKING_URL } from '@/content/site';
import styles from './HomeHero.module.css';

/**
 * Opening scene (collage): a full-screen photograph, the place label, the brand name in large
 * uppercase serif, the headline as a subtitle, the practices line and two actions.
 * The photograph settles from a slow zoom and drifts on scroll; the copy rises in order.
 */
export default function HomeHero() {
  const ref = useRef(null);
  const { image } = HERO;

  useGSAP(
    () => {
      const root = document.documentElement;
      const mm = gsap.matchMedia();
      if (!motionSimulatedOff()) {
        mm.add(MOTION_OK, () => {
          const q = gsap.utils.selector(ref);
          const items = q('[data-intro]');
          gsap.set(items, { autoAlpha: 0, y: 26 });
          root.classList.add('intro-ready');
          const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'exhale' } });
          tl.fromTo(q('[data-hero-img]'), { scale: 1.16 }, { scale: 1.04, duration: 2.6 }, 0).to(
            items,
            { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.12, clearProps: 'transform' },
            0.25,
          );
          gsap.to(q('[data-hero-media]'), {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
          });
        });
      }
      root.classList.add('intro-ready');
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <header ref={ref} className={`theme-dark ${styles.hero}`} data-dark-hero>
      <div className={styles.media} data-hero-media>
        <Image src={image.src} alt={image.alt} fill preload quality={80} sizes="100vw" className={styles.img} style={{ objectPosition: image.position }} data-hero-img="" />
      </div>
      <span className={styles.shade} aria-hidden="true" />

      <div className={`container-wide ${styles.copy}`}>
        <p className={styles.place} data-intro>
          Ubud, Bali
        </p>
        <h1 className={styles.title} data-intro>
          <span className={styles.brand}>{SITE.name}</span>
          <span className={styles.sub}>
            {HERO.title} {HERO.titleAccent}
          </span>
        </h1>
        <p className={styles.text} data-intro>
          Restore balance, gain clarity, and deepen the connection to your body and spirit.
        </p>
        <div className={styles.actions} data-intro>
          <Button href="/wellness-sessions/">Explore Our Offerings</Button>
          <Button href={BOOKING_URL} external variant="onDark">
            Book a Session
          </Button>
        </div>
      </div>

      <a href="#intro" className={styles.cue} aria-label="Scroll to the introduction">
        <Icon name="arrow-right" size={16} className={styles.cueIcon} />
        <span>Scroll</span>
      </a>
    </header>
  );
}
