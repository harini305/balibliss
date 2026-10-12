import Link from 'next/link';
import Icon from './Icon';
import styles from './Button.module.css';

/**
 * Button / link-button.
 * variant: primary | secondary | whatsapp | onDark
 * Renders <a> when `href` is set (internal → next/link), otherwise <button>.
 * `force` pins a visual state (hover | active | focus) for the styleguide only.
 */
export default function Button({
  children,
  href,
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
  const cls = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidthOnMobile ? styles.block : '',
    className,
  ].join(' ');

  const trailing = icon ?? (external ? 'external' : null);
  const content = (
    <>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {variant === 'whatsapp' && <Icon name="whatsapp" size={20} />}
      <span>{children}</span>
      {trailing && !loading && <Icon name={trailing} size={18} className={styles.icon} />}
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
    <button
      type={rest.type ?? 'button'}
      {...shared}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  );
}
