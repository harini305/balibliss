'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV, BOOKING_URL } from '@/content/site';
import { MEDIA } from '@/content/media';
import Button from '@/components/ui/Button';
import MobileMenu from './MobileMenu';
import styles from './Header.module.css';

/**
 * Site header (collage): white logo and plain links over the photographic banner — one page per
 * item, no dropdowns — and an orange "Book Now". Gains a deep-forest backing once scrolled; hides
 * on scroll down and returns on scroll up.
 */
export default function Header() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    // Arriving part-way down a page (a link to a section) starts with the header tucked away.
    if (last > 320) setHidden(true);
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setCompact(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 320);
        last = y;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The sticky section bar sits just under the header while it shows, and at the very top when it hides.
  const isHidden = hidden && !menuOpen;
  useEffect(() => {
    const header = document.querySelector('[data-site-header]');
    document.documentElement.style.setProperty('--header-offset', isHidden || !header ? '0px' : `${header.offsetHeight}px`);
  }, [isHidden, compact]);

  const current = (href) => (href === pathname ? 'page' : undefined);

  return (
    <header
      className={styles.header}
      data-site-header=""
      data-tone="dark"
      data-solid={compact || undefined}
      data-compact={compact || undefined}
      data-hidden={isHidden || undefined}
      onFocusCapture={() => setHidden(false)}
    >
      <div className={`container-wide ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label="Bali Bliss — home">
          <Image src={MEDIA.logoWhite.src} width={MEDIA.logoWhite.width} height={MEDIA.logoWhite.height} alt="" preload className={styles.logo} sizes="180px" />
        </Link>

        <nav className={styles.nav} aria-label="Main">
          <ul className={styles.menu}>
            <li>
              <Link href="/" className={styles.topLink} aria-current={current('/')}>
                Home
              </Link>
            </li>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.topLink} aria-current={current(item.href)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact/" className={styles.topLink} aria-current={current('/contact/')}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button href={BOOKING_URL} external className={styles.book}>
            Book Now
          </Button>
          <button type="button" className={styles.menuToggle} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(true)}>
            <span>Menu</span>
            <span className={styles.burger} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <MobileMenu id="mobile-menu" open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </header>
  );
}
