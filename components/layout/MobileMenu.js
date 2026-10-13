'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NAV, BOOKING_URL, SOCIAL, SITE } from '@/content/site';
import { MEDIA } from '@/content/media';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import styles from './MobileMenu.module.css';

/**
 * Full-screen menu on a native modal <dialog>: the browser provides the focus
 * trap, inert background and focus return to the Menu button. It opens as a widening circle
 * from the Menu button, rows rise in sequence, and it closes by drawing back (Esc included).
 * CSS animations only; instant under reduced motion.
 */
const CLOSE_MS = 420;
export default function MobileMenu({ id, open, onClose, pathname }) {
  const ref = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus(); // start on Close, not the logo link
      document.body.setAttribute('data-scroll-lock', '');
    } else if (!open && dialog.open) {
      closeNow();
    }
  }, [open]);

  // Animated close: mark the dialog as closing, then close it once the curtain has drawn back.
  const closeNow = () => {
    const dialog = ref.current;
    if (!dialog?.open || dialog.dataset.closing != null) return;
    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (instant) return dialog.close();
    dialog.dataset.closing = '';
    setTimeout(() => {
      delete dialog.dataset.closing;
      dialog.close();
    }, CLOSE_MS);
  };

  useEffect(() => {
    const dialog = ref.current;
    const handleClose = () => {
      document.body.removeAttribute('data-scroll-lock');
      onClose();
    };
    const handleCancel = (e) => {
      e.preventDefault();
      closeNow();
    };
    dialog.addEventListener('close', handleClose);
    dialog.addEventListener('cancel', handleCancel);
    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [onClose]);

  const current = (href) => (href === pathname ? 'page' : undefined);
  let row = 0;

  return (
    <dialog ref={ref} id={id} className={`theme-dark ${styles.dialog}`} aria-label="Site menu">
      <div className={styles.top}>
        <Link href="/" className={styles.brand} onClick={closeNow} aria-label="Bali Bliss — home">
          <Image src={MEDIA.logoWhite.src} width={MEDIA.logoWhite.width} height={MEDIA.logoWhite.height} alt="" className={styles.logo} sizes="160px" loading="eager" />
        </Link>
        <button ref={closeRef} type="button" className={styles.close} onClick={closeNow}>
          <span>Close</span>
          <Icon name="close" size={22} />
        </button>
      </div>

      <nav aria-label="Main" className={styles.nav}>
        <ul className={styles.list}>
          {[{ label: 'Home', href: '/' }, ...NAV, { label: 'Contact', href: '/contact/' }].map((item) => (
            <li key={item.href} className={styles.row} style={{ '--i': row++ }}>
              <Link href={item.href} className={styles.topLink} aria-current={current(item.href)} onClick={closeNow}>
                <span className={styles.num} aria-hidden="true">
                  {String(row).padStart(2, '0')}
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer} style={{ '--i': row + 1 }}>
        <Button href={BOOKING_URL} external icon="arrow-right" size="lg" fullWidthOnMobile className={styles.book}>
          Book Now
        </Button>
        <div className={styles.meta}>
          <p className={styles.tagline}>{SITE.tagline}</p>
          <ul className={styles.social} aria-label="Bali Bliss on social media">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                  <Icon name={s.icon} size={20} label={`${s.label} (opens in a new tab)`} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </dialog>
  );
}
