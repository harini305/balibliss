'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NAV, BOOKING_URL, SOCIAL } from '@/content/site';
import { MEDIA } from '@/content/media';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import styles from './MobileMenu.module.css';

/**
 * Full-screen menu on a native modal <dialog>: the browser provides the focus
 * trap, inert background, Esc-to-close and focus return to the Menu button.
 */
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
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    const handleClose = () => {
      document.body.removeAttribute('data-scroll-lock');
      onClose();
    };
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  const current = (href) => (href === pathname ? 'page' : undefined);
  const closeNow = () => ref.current?.close();

  return (
    <dialog ref={ref} id={id} className={styles.dialog} aria-label="Site menu">
      <div className={styles.top}>
        <Link href="/" className={styles.brand} onClick={closeNow} aria-label="Bali Bliss — home">
          <Image src={MEDIA.logo.src} width={MEDIA.logo.width} height={MEDIA.logo.height} alt="" className={styles.logo} sizes="160px" loading="eager" />
        </Link>
        <button ref={closeRef} type="button" className={styles.close} onClick={closeNow}>
          <Icon name="close" size={22} />
          <span>Close</span>
        </button>
      </div>

      <nav aria-label="Main" className={styles.nav}>
        <ul className={styles.list}>
          {NAV.map((item) =>
            item.href ? (
              <li key={item.label} className={styles.row}>
                <Link href={item.href} className={styles.topLink} aria-current={current(item.href)} onClick={closeNow}>
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.label} className={styles.row}>
                <details className={styles.group}>
                  <summary className={styles.summary}>
                    <span>{item.label}</span>
                    <Icon name="chevron-down" size={20} className={styles.chevron} />
                  </summary>
                  <div className={styles.groupBody}>
                    {item.hub && (
                      <Link href={item.hub.href} className={styles.hub} aria-current={current(item.hub.href)} onClick={closeNow}>
                        {item.hub.label}
                        <Icon name="arrow-right" size={18} />
                      </Link>
                    )}
                    {item.groups.map((group, gi) => (
                      <div key={gi} className={styles.sub}>
                        {group.label && <p className={styles.subLabel}>{group.label}</p>}
                        <ul>
                          {group.items.map((link) => (
                            <li key={link.href}>
                              <Link href={link.href} className={styles.link} aria-current={current(link.href)} onClick={closeNow}>
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              </li>
            ),
          )}
          <li className={styles.row}>
            <Link href="/contact/" className={styles.topLink} aria-current={current('/contact/')} onClick={closeNow}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.footer}>
        <Button href={BOOKING_URL} external icon="arrow-right" size="lg" fullWidthOnMobile className={styles.book}>
          Book Now
        </Button>
        <ul className={styles.social} aria-label="Bali Bliss on social media">
          {SOCIAL.map((s) => (
            <li key={s.label}>
              <a href={s.href} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                <Icon name={s.icon} size={22} label={`${s.label} (opens in a new tab)`} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
