import Figure from '@/components/ui/Figure';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/motion/Reveal';
import styles from './SplitFeature.module.css';

/**
 * Asymmetric 7/5 image–text pairing. `reverse` puts the image on the right.
 * Stacks on small screens with the image first.
 */
export default function SplitFeature({ image, eyebrow, index, heading, children, reverse = false, aspect = '4 / 3', headingLevel = 2 }) {
  const H = `h${headingLevel}`;
  return (
    <div className={`${styles.split} ${reverse ? styles.reverse : ''}`}>
      <Reveal className={styles.media} variant="clip">
        <Figure image={image} aspect={aspect} sizes="(min-width: 1024px) 56vw, 100vw" />
      </Reveal>
      <Reveal className={styles.copy}>
        {(eyebrow || index != null) && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
        <H>{heading}</H>
        <div className={styles.body}>{children}</div>
      </Reveal>
    </div>
  );
}
