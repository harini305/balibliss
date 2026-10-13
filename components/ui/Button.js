import Link from 'next/link';
import Icon from './Icon';
import { hrefFor } from '@/lib/routes.mjs';
import styles from './Button.module.css';

/**
 * Button / link-button: a calm pill; a terracotta tide rises through it on hover while the
 * arrow travels through its disc.
 * variant: primary (forest) | accent (terracotta) | secondary (outline) | whatsapp (outline + WhatsApp mark) | onDark (ivory on forest) | ghostDark (outline on forest)
 * Renders <a> when `href` is set (internal → next/link), otherwise <button>.
 * `force` pins a visual state (hover | active | focus) for the styleguide only.
 */
export default function Button({
  children,
  href: rawHref,
  external = false,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  fullWidthOnMobile = false,
  force,
  className = '',
  ...rest
}) {
  const href = hrefFor(rawHref);
  const cls = [styles.button, styles[variant], styles[size], fullWidthOnMobile ? styles.block : '', className].join(' ');

  const trailing = icon ?? null;
  const content = (
    <>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {variant === 'whatsapp' && <Icon name="whatsapp" size={20} className={styles.lead} />}
      <span className={styles.text}>{children}</span>
      {trailing && !loading && (
        <span className={styles.disc} aria-hidden="true">
          <Icon name={trailing} size={16} className={styles.icon} />
          <Icon name={trailing} size={16} className={`${styles.icon} ${styles.iconNext}`} />
        </span>
      )}
    </>
  );

  const shared = { className: cls, 'data-force': force, 'data-loading': loading || undefined, ...rest };

  if (href && !disabled) {
    if (external) {
      return (
        <a href={href} {...shared}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} {...shared}>
        {content}
      </Link>
    );
  }

  return (
    <button type={rest.type ?? 'button'} {...shared} disabled={disabled} aria-disabled={loading || undefined} aria-busy={loading || undefined}>
      {content}
    </button>
  );
}
