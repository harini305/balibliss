import PageHero from '@/components/page/PageHero';
import Button from '@/components/ui/Button';
import TextLink from '@/components/ui/TextLink';
import { MEDIA } from '@/content/media';
import styles from './not-found.module.css';

export const metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <PageHero title="Page not found" tagline="The page you are looking for may have moved." bannerImage={MEDIA.retreatSteps} />
      <section className={`container-wide ${styles.wrap}`} aria-label="Find your way back">
        <p className={styles.lead}>These will help you find your way back.</p>
        <div className={styles.actions}>
          <Button href="/" icon="arrow-right">
            Go to the homepage
          </Button>
          <TextLink href="/wellness-sessions/">Wellness sessions</TextLink>
          <TextLink href="/one-day-healing-retreats-in-bali/">Day retreats</TextLink>
          <TextLink href="/contact/">Contact</TextLink>
        </div>
      </section>
    </>
  );
}
