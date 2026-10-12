import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import Ring from '@/components/ui/Ring';
import TextLink from '@/components/ui/TextLink';
import styles from './not-found.module.css';

export const metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className={`container ${styles.wrap}`}>
      <div className={styles.mark} aria-hidden="true">
        <Ring size={180} />
        <span>404</span>
      </div>
      <div className={styles.copy}>
        <Eyebrow>Page not found</Eyebrow>
        <h1>
          This path has <em>wandered off</em>
        </h1>
        <p className={styles.lead}>The page you are looking for may have moved. These will help you find your way back.</p>
        <div className={styles.actions}>
          <Button href="/" icon="arrow-right">
            Go to the homepage
          </Button>
          <TextLink href="/wellness-sessions/">Wellness sessions</TextLink>
          <TextLink href="/one-day-healing-retreats-in-bali/">Day retreats</TextLink>
        </div>
      </div>
    </section>
  );
}
