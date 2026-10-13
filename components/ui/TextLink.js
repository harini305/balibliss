import Link from 'next/link';
import Icon from './Icon';
import { hrefFor } from '@/lib/routes.mjs';
import styles from './TextLink.module.css';

/** Text link with an arrow — for secondary actions ("Read more", "View experience"). */
export default function TextLink({ href: rawHref, children, external = false, onDark = false, force, className = '' }) {
  const href = hrefFor(rawHref);
  const cls = `${styles.link} ${onDark ? styles.onDark : ''} ${className}`;
  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      <Icon name={external ? 'external' : 'arrow-right'} size={18} className={styles.icon} />
    </>
  );
  return external ? (
    <a href={href} className={cls} data-force={force}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} data-force={force}>
      {inner}
    </Link>
  );
}
