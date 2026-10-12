'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV, BOOKING_URL } from '@/content/site';
import { MEDIA } from '@/content/media';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import MobileMenu from './MobileMenu';
import styles from './Header.module.css';

const HOVER_INTENT_MS = 120;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(null); // index of the open disclosure
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const hoverTimer = useRef(null);
  const baseId = useId();

  const close = useCallback((returnFocus = false) => {
    setOpen((current) => {
      if (returnFocus && current != null) {
        navRef.current?.querySelector(`[data-trigger="${current}"]`)?.focus();
      }
      return null;
    });
  }, []);

  // Close panels on navigation.
  useEffect(() => {
    setOpen(null);
    setMenuOpen(false);
  }, [pathname]);

  // Esc and outside click close the open panel.
  useEffect(() => {
    if (open == null) return;
    const onKey = (e) => e.key === 'Escape' && close(true);
    const onPointer = (e) => !navRef.current?.contains(e.target) && close();
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open, close]);

  // Compact on scroll; hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setCompact(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
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

  const isCurrent = (href) => href === pathname;
  const sectionCurrent = (item) =>
    item.hub?.href === pathname || item.groups?.some((g) => g.items.some((l) => l.href === pathname));

  const hoverOpen = (i) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(i), HOVER_INTENT_MS);
  };
  const hoverClose = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(null), HOVER_INTENT_MS * 2);
  };
  const isFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Never hide while a panel or the mobile menu is open.
  const isHidden = hidden && open == null && !menuOpen;

  return (
    <header
      className={styles.header}
      data-compact={compact || undefined}
      data-hidden={isHidden || undefined}
      onFocusCapture={() => setHidden(false)}
    >
      <div className={`container-wide ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label="Bali Bliss — home">
          <Image src={MEDIA.logo.src} width={MEDIA.logo.width} height={MEDIA.logo.height} alt="" priority className={styles.logo} sizes="180px" />
        </Link>

        <nav ref={navRef} className={styles.nav} aria-label="Main">
          <ul className={styles.menu}>
            {NAV.map((item, i) => {
              if (item.href) {
                return (
                  <li key={item.label}>
                    <Link href={item.href} className={styles.topLink} aria-current={isCurrent(item.href) ? 'page' : undefined}>
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const panelId = `${baseId}-panel-${i}`;
              const expanded = open === i;
              const mega = item.groups.length > 1;
              return (
                <li
                  key={item.label}
                  className={mega ? styles.megaItem : styles.dropItem}
                  onPointerEnter={() => isFinePointer() && hoverOpen(i)}
                  onPointerLeave={() => isFinePointer() && hoverClose()}
                  onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen((c) => (c === i ? null : c))}
                >
                  <button
                    type="button"
                    className={styles.trigger}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    data-trigger={i}
                    data-current={sectionCurrent(item) || undefined}
                    onClick={() => setOpen(expanded ? null : i)}
                  >
                    {item.label}
                    <Icon name="chevron-down" size={16} className={styles.chevron} />
                  </button>
                  <div id={panelId} className={`${styles.panel} ${mega ? styles.mega : ''}`} hidden={!expanded}>
                    <div className={mega ? `container-wide ${styles.megaInner}` : styles.dropInner}>
                      {item.hub && (
                        <Link href={item.hub.href} className={styles.hub} aria-current={isCurrent(item.hub.href) ? 'page' : undefined}>
                          <span>{item.hub.label}</span>
                          <Icon name="arrow-right" size={18} />
                        </Link>
                      )}
                      <div className={styles.groups}>
                        {item.groups.map((group, gi) => (
                          <div key={gi} className={styles.group}>
                            {group.label && <p className={styles.groupLabel}>{group.label}</p>}
                            <ul>
                              {group.items.map((link) => (
                                <li key={link.href}>
                                  <Link href={link.href} className={styles.panelLink} aria-current={isCurrent(link.href) ? 'page' : undefined}>
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button href={BOOKING_URL} external icon="arrow-right" className={styles.book}>
            Book Now
          </Button>
          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" size={22} />
            <span>Menu</span>
          </button>
        </div>
      </div>

      <MobileMenu id="mobile-menu" open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </header>
  );
}
