import IntroSequence from '@/components/motion/IntroSequence';
import ParallaxBg from '@/components/motion/ParallaxBg';
import Reveal from '@/components/motion/Reveal';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Figure from '@/components/ui/Figure';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { MEDIA } from '@/content/media';
import styles from './PageHero.module.css';

const FACT_ICON = [
  [/duration|time|hours/i, 'clock'],
  [/couple/i, 'users'],
  [/solo|person/i, 'user'],
  [/location/i, 'pin'],
  [/availab|date|day/i, 'calendar'],
];
const iconFor = (term) => FACT_ICON.find(([re]) => re.test(term))?.[1] ?? 'list';

/** Only photographs at least 1400px wide are stretched across the banner, so it always stays sharp. */
const bannerWorthy = (img) => Boolean(img) && img.width >= 1400;

/**
 * Inner-page opening (collage): a darkened photographic banner with the title and one-line
 * subtitle, followed — when the page has them — by a panel with the page photograph on the left
 * and its introduction, key facts (with icons) and actions on the right.
 */
export default function PageHero({
  title,
  tagline,
  intro = [],
  image,
  bannerImage,
  crumbs,
  facts = [],
  action,
  actionLabel,
  eyebrow,
  contactLink = false,
}) {
  const banner = bannerWorthy(bannerImage) ? bannerImage : bannerWorthy(image) && image.width > image.height ? image : MEDIA.retreatSteps;
  const panelImage = image && image !== banner ? image : null;
  const portrait = panelImage && panelImage.height >= panelImage.width;
  const showPanel = Boolean(panelImage || intro.length || facts.length);

  return (
    <>
      <IntroSequence as="header" className={`theme-dark ${styles.banner}`} data-dark-hero>
        <ParallaxBg image={banner} priority intro amount={10} />
        <span className={styles.shade} aria-hidden="true" />
        <div className={`container-wide ${styles.bannerInner}`}>
          {crumbs && (
            <div data-intro className={styles.crumbs}>
              <Breadcrumbs items={crumbs} />
            </div>
          )}
          <h1 className={styles.title} data-intro>
            {title}
          </h1>
          {tagline && (
            <p className={styles.subtitle} data-intro>
              {tagline}
            </p>
          )}
          {!showPanel && action && (
            <div className={styles.bannerAction} data-intro>
              <Button href={action.href} external={action.external} icon={action.whatsapp ? 'whatsapp' : 'arrow-right'}>
                {actionLabel}
              </Button>
            </div>
          )}
        </div>
      </IntroSequence>

      {showPanel && (
        <section className={styles.panel} aria-label={`About ${title}`}>
          <div className={`container-wide ${styles.panelGrid} ${panelImage ? '' : styles.noImage}`}>
            {panelImage && (
              <Reveal variant="clip" className={`${styles.media} ${portrait ? styles.portrait : ''}`}>
                <div>
                  <Figure image={panelImage} aspect={portrait ? '4 / 5' : '4 / 3'} sizes="(min-width: 1024px) 44vw, 92vw" priority />
                </div>
              </Reveal>
            )}
            <Reveal className={styles.details} stagger={0.08}>
              {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
              {facts.length > 0 && (
                <dl className={styles.facts}>
                  {facts.map((f) => (
                    <div key={f.term} className={styles.fact}>
                      <span className={styles.factIcon} aria-hidden="true">
                        <Icon name={iconFor(f.term)} size={18} />
                      </span>
                      <dt>{f.term}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {intro.map((p, i) => (
                <p key={i} className={i === 0 && intro.length > 1 ? styles.lead : styles.intro}>
                  {p}
                </p>
              ))}
              {(action || contactLink) && (
                <div className={styles.actions}>
                  {action && (
                    <Button href={action.href} external={action.external} icon={action.whatsapp ? 'whatsapp' : undefined}>
                      {actionLabel}
                    </Button>
                  )}
                  {contactLink && (
                    <Button href="/contact/" variant="secondary">
                      Contact Us
                    </Button>
                  )}
                </div>
              )}
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
