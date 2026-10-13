import ImageCard from '@/components/ui/ImageCard';
import TextLink from '@/components/ui/TextLink';
import Reveal from '@/components/motion/Reveal';
import { formatDate } from '@/lib/format';
import styles from './LatestInsights.module.css';

/** Newest Insights articles as collage post cards: photograph, title, date, "Read More →". */
export default function LatestInsights({ posts }) {
  return (
    <div className={`container-wide ${styles.wrap}`}>
      <Reveal className={styles.head}>
        <div>
          <h2 id="insights-title" className={styles.heading}>
            Latest Insights
          </h2>
          <TextLink href="/insights/">All Articles</TextLink>
        </div>
      </Reveal>
      <Reveal as="ul" className={styles.list} stagger={0.08}>
        {posts.map((p) => (
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
  );
}
