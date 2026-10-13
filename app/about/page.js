import CombinedPage from '@/components/page/CombinedPage';
import Blocks, { Cta } from '@/components/page/Blocks';
import Drivers from '@/components/home/Drivers';
import Facilitators from '@/components/home/Facilitators';
import AboutIntro from '@/components/page/AboutIntro';
import { COMBINED } from '@/lib/routes.mjs';
import { getPage } from '@/lib/content';
import { SITE } from '@/content/site';
import { MEDIA } from '@/content/media';
import { NOT_SURE } from '@/content/home';
import styles from '../hub.module.css';

export const metadata = {
  title: 'About Bali Bliss',
  description: 'Meet the Bali Bliss Wellness & Healing facilitators, retreat guides, drivers and partners in Ubud, Bali.',
  alternates: { canonical: '/about/' },
};

const config = COMBINED.find((c) => c.path === '/about/');

export default async function About() {
  const hub = await getPage('one-day-healing-retreats-in-bali');
  const guides = hub?.blocks.find((b) => b.type === 'people');
  const partners = await getPage('partners');
  const lia = await getPage('about-lia-natali');

  return (
    <CombinedPage
      config={config}
      title="About Bali Bliss"
      tagline={SITE.tagline}
      bannerImage={MEDIA.retreatSteps}
      exclude={['partners']}
      intro={<AboutIntro quote={lia?.quote} />}
      before={
        <section id="facilitators" className={`${styles.sand} ${styles.anchor}`} aria-labelledby="about-facilitators">
          <Facilitators headingId="about-facilitators" showAbout={false} />
        </section>
      }
      after={
        <>
          {guides && (
            <div id="guides" className={styles.anchor}>
              <Blocks blocks={[guides]} page={hub} />
            </div>
          )}
          <section id="drivers" className={`${styles.section} ${styles.anchor}`} aria-labelledby="drivers-title">
            <Drivers />
          </section>
          {partners && (
            <div id="partners" className={styles.anchor}>
              <Blocks blocks={partners.blocks.filter((b) => b.type !== 'cta')} page={partners} />
              {partners.blocks
                .filter((b) => b.type === 'cta')
                .map((b) => (
                  <Cta key={b.heading} block={b} page={partners} photo />
                ))}
            </div>
          )}
        </>
      }
      closing={{ heading: NOT_SURE.heading, text: NOT_SURE.text, buttonLabel: 'Explore wellness sessions', href: '/wellness-sessions/' }}
    />
  );
}
