import PageHero from './PageHero';
import Chapter from './Chapter';
import SectionNav from './SectionNav';
import BookingCTA from '@/components/sections/BookingCTA';
import { getPage } from '@/lib/content';
import styles from './CombinedPage.module.css';

/** Short pill label for a section: the page title without the "Bali Bliss" prefix. */
const shortTitle = (p) => (p.kind === 'bio' ? p.person?.name ?? p.title : p.title.replace(/^Bali Bliss\s+/i, ''));

/**
 * A menu page that holds all of its former sub-pages as sections (chapters), with a sticky
 * in-page navigation. `before` / `after` render page-specific content around the chapters.
 * config: an entry of COMBINED (lib/routes.mjs)
 */
export default async function CombinedPage({ config, title, tagline, bannerImage, intro, before, after, closing, exclude = [] }) {
  const groups = (
    await Promise.all(
      config.groups.map(async (g) => ({
        label: g.label,
        pages: (await Promise.all(g.slugs.filter((s) => !exclude.includes(s)).map(getPage))).filter(Boolean),
      })),
    )
  ).filter((g) => g.pages.length);
  const all = groups.flatMap((g) => g.pages);
  const multiGroup = groups.length > 1;
  let n = 0;

  return (
    <>
      <PageHero title={title} tagline={tagline} bannerImage={bannerImage} crumbs={[{ label: 'Home', href: '/' }, { label: config.label }]} />

      {all.length > 1 && <SectionNav items={all.map((p) => ({ id: p.slug, label: shortTitle(p) }))} label={`${config.label} on this page`} />}

      {intro && <div className={styles.intro}>{intro}</div>}

      {before}

      {groups.map((g) => (
        <div key={g.label} className={styles.group}>
          {multiGroup && (
            <div className={`container-wide ${styles.groupHead}`}>
              <h2 className={styles.groupTitle}>{g.label}</h2>
              <span className={styles.groupCount}>
                {g.pages.length} {g.pages.length === 1 ? 'session' : 'sessions'}
              </span>
            </div>
          )}
          {g.pages.map((p) => (
            <Chapter key={p.slug} page={p} label={multiGroup ? g.label : config.label} reverse={n++ % 2 === 1} headingLevel={multiGroup ? 3 : 2} />
          ))}
        </div>
      ))}

      {after}

      {closing && (
        <section aria-label={closing.heading}>
          <BookingCTA {...closing} />
        </section>
      )}
    </>
  );
}
