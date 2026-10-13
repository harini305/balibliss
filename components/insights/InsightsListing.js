import Link from 'next/link';
import PageHero from '@/components/page/PageHero';
import ImageCard from '@/components/ui/ImageCard';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/motion/Reveal';
import PhotoBanner from '@/components/sections/PhotoBanner';
import { getCategories } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { MEDIA } from '@/content/media';
import styles from './InsightsListing.module.css';

export const PER_PAGE = 12;

/**
 * Insights index / category archive (collage): photographic banner, topic pills, a three-column
 * grid of article cards, numbered pagination and a quote band.
 * `basePath` is '/insights/' or '/category/<slug>/'; page n lives at `${basePath}page/n/`.
 */
export default function InsightsListing({ posts, page, title, intro, basePath, crumbs, activeCategory }) {
  const cats = getCategories();
  const pages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const slice = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const href = (n) => (n === 1 ? basePath : `${basePath}page/${n}/`);

  return (
    <>
      <PageHero
        title={title}
        tagline={intro || `${posts.length} ${posts.length === 1 ? 'article' : 'articles'}${pages > 1 ? ` · page ${page} of ${pages}` : ''}`}
        bannerImage={MEDIA.oracleCards}
        crumbs={crumbs}
      />

      <section className={`container-wide ${styles.list}`} aria-label={page > 1 ? `${title}, page ${page}` : title}>
        <nav aria-label="Topics" className={styles.cats}>
          <ul>
            <li>
              <Link href="/insights/" className={styles.cat} aria-current={!activeCategory ? 'page' : undefined}>
                All
              </Link>
            </li>
            {cats.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}/`} className={styles.cat} aria-current={activeCategory === c.slug ? 'page' : undefined}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Reveal as="ol" className={styles.grid} stagger={0.06}>
          {slice.map((p) => (
            <li key={p.slug}>
              <ImageCard
                variant="post"
                href={`/${p.slug}/`}
                image={p.featuredImage}
                title={p.title}
                headingLevel={2}
                meta={<time dateTime={p.date}>{formatDate(p.date)}</time>}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
              />
            </li>
          ))}
        </Reveal>

        {pages > 1 && (
          <nav className={styles.pager} aria-label="Pagination">
            {page > 1 ? (
              <Link href={href(page - 1)} className={styles.step} rel="prev">
                <Icon name="arrow-left" size={16} /> Newer
              </Link>
            ) : (
              <span />
            )}
            <ol className={styles.nums}>
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <li key={n}>
                  <Link href={href(n)} className={styles.num} aria-current={n === page ? 'page' : undefined} aria-label={`Page ${n}`}>
                    {n}
                  </Link>
                </li>
              ))}
            </ol>
            {page < pages ? (
              <Link href={href(page + 1)} className={styles.step} rel="next">
                Older <Icon name="arrow-right" size={16} />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </section>

      <PhotoBanner
        image={MEDIA.soundVeranda}
        quote="I left the session feeling great and super light!"
        cite="Luciana Pires, Google review"
        align="center"
      />
    </>
  );
}
