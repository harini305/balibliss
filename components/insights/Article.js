import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ImageCard from '@/components/ui/ImageCard';
import Figure from '@/components/ui/Figure';
import TextLink from '@/components/ui/TextLink';
import IntroSequence from '@/components/motion/IntroSequence';
import ParallaxBg from '@/components/motion/ParallaxBg';
import Reveal from '@/components/motion/Reveal';
import ReadingProgress from './ReadingProgress';
import BookingCTA from '@/components/sections/BookingCTA';
import { getCategories, getPostIndex } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { NOT_SURE } from '@/content/home';
import { MEDIA } from '@/content/media';
import styles from './Article.module.css';

/** Imported article bodies sometimes skip heading levels (h1 → h4, h2 → h4); never go more than one level deeper than the last. */
function normaliseHeadings(html) {
  let prev = 1;
  return html.replace(/<h([2-6])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_, lvl, attrs, inner) => {
    const level = Math.min(Number(lvl), prev + 1);
    prev = level;
    return `<h${level}${attrs}>${inner}</h${level}>`;
  });
}

/** Insights article (collage): photographic banner with title and metadata, a calm reading column, related cards. */
export default function Article({ post }) {
  const cats = getCategories();
  const catName = (s) => cats.find((c) => c.slug === s)?.name;
  const primary = post.categories.find((s) => catName(s));
  const related = getPostIndex()
    .filter((p) => p.slug !== post.slug && p.categories.some((c) => post.categories.includes(c)))
    .slice(0, 3);
  const author = post.author === 'Lia Natali' ? <Link href="/about-lia-natali/">{post.author}</Link> : post.author;

  return (
    <article className={styles.article}>
      <ReadingProgress />
      <IntroSequence as="header" className={`theme-dark ${styles.banner}`} data-dark-hero>
        <ParallaxBg image={MEDIA.retreatSteps} priority intro amount={10} />
        <span className={styles.shade} aria-hidden="true" />
        <div className={`container-wide ${styles.bannerInner}`}>
          <div data-intro className={styles.crumbs}>
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Insights', href: '/insights/' }, { label: post.title }]} />
          </div>
          {primary && (
            <p className={styles.kicker} data-intro>
              <Link href={`/category/${primary}/`}>{catName(primary)}</Link>
            </p>
          )}
          <h1 className={styles.title} data-intro>
            {post.title}
          </h1>
          <p className={styles.meta} data-intro>
            <span>{author}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingMinutes} min read</span>
          </p>
        </div>
      </IntroSequence>

      <div className={`container-wide ${styles.bodyGrid}`}>
        <aside className={styles.rail} aria-label="Article details">
          <div className={`card ${styles.railInner}`}>
            {primary && (
              <p className={styles.railItem}>
                <span className={styles.railLabel}>Filed under</span>
                <Link href={`/category/${primary}/`}>{catName(primary)}</Link>
              </p>
            )}
            <p className={styles.railItem}>
              <span className={styles.railLabel}>Written by</span>
              {author}
            </p>
            <TextLink href="/insights/">All insights</TextLink>
          </div>
        </aside>
        <div className={styles.main}>
          {/* Many featured images carry their own title lettering, so they sit above the text, not behind it. */}
          {post.featuredImage && (
            <Figure image={post.featuredImage} sizes="(min-width: 1024px) 42rem, 92vw" priority className={styles.cover} />
          )}
          <div className={styles.body} dangerouslySetInnerHTML={{ __html: normaliseHeadings(post.html) }} />
        </div>
      </div>

      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-posts">
          <div className="container-wide">
            <div className={styles.relatedHead}>
              <h2 id="related-posts" className={styles.relatedTitle}>
                Continue reading
              </h2>
              <TextLink href="/insights/">All insights</TextLink>
            </div>
            <Reveal as="ul" className={styles.relatedList} stagger={0.08}>
              {related.map((p) => (
                <li key={p.slug}>
                  <ImageCard
                    variant="post"
                    href={`/${p.slug}/`}
                    image={p.featuredImage}
                    title={p.title}
                    meta={<time dateTime={p.date}>{formatDate(p.date)}</time>}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  />
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      <section aria-label="Book a session">
        <BookingCTA heading={NOT_SURE.heading} text={NOT_SURE.text} secondary={{ label: 'Explore wellness sessions', href: '/wellness-sessions/' }} />
      </section>
    </article>
  );
}
