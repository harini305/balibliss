import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import RingDraw from '@/components/motion/RingDraw';
import styles from './page.module.css';

// Temporary placeholder. The real homepage is built after the design system is approved.
export const metadata = {
  title: 'Foundation preview',
  robots: { index: false, follow: false },
};

export default function Home() {
  return (
    <section className={`container ${styles.wrap}`}>
      <RingDraw size={140} className={styles.ring} />
      <Eyebrow>Local preview · not published</Eyebrow>
      <h1>
        Bali Bliss redesign — <em>foundation</em>
      </h1>
      <p className={styles.lead}>
        The homepage and remaining pages will be built after the design system is approved. Review the header, footer and
        every component on the styleguide.
      </p>
      <div className={styles.actions}>
        <Button href="/styleguide/" icon="arrow-right" size="lg">
          Open the styleguide
        </Button>
      </div>
    </section>
  );
}
