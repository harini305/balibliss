import Link from 'next/link';
import DetailsLine from '@/components/sections/DetailsLine';
import { hrefFor } from '@/lib/routes.mjs';
import BookingCTA from '@/components/sections/BookingCTA';
import Accordion from '@/components/ui/Accordion';
import Figure from '@/components/ui/Figure';
import ImageCard from '@/components/ui/ImageCard';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/motion/Reveal';
import { resolveAction } from '@/lib/actions';
import { MEDIA } from '@/content/media';
import styles from './Blocks.module.css';

/** `**bold**` lead-ins from the source become <strong>; everything else is plain text. */
function rich(text) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g);
  return parts.length === 1 ? text : parts.map((p, i) => (i % 2 ? <strong key={i}>{p}</strong> : p));
}

const slug = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);

const pad = (n) => String(n).padStart(2, '0');

function Section({ id, tone, children, className = '', label }) {
  const toneClass = tone === 'sand' ? `theme-sand ${styles.sand}` : '';
  return (
    <section className={`${styles.section} ${toneClass} ${className}`} aria-labelledby={label ? undefined : id} aria-label={label}>
      <div className="container-wide">{children}</div>
    </section>
  );
}

function Head({ id, heading, intro, eyebrow, center = false }) {
  if (!heading) return null;
  return (
    <Reveal className={`${styles.head} ${center ? styles.center : ''}`}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id={id} className={styles.h2}>
        {heading}
      </h2>
      {intro && <p className={styles.headIntro}>{rich(intro)}</p>}
    </Reveal>
  );
}

function Paragraphs({ items = [] }) {
  return items.map((p, i) => <p key={i}>{rich(p)}</p>);
}

/** Collage "What's Included": items with a small check mark. */
function Checklist({ items, columns = false }) {
  return (
    <ul className={`${styles.checks} ${columns ? styles.checkCols : ''}`}>
      {items.map((it, i) => (
        <li key={i}>
          <Icon name="check" size={16} className={styles.checkIcon} />
          <span>{rich(it)}</span>
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------

/** Question-and-answer pairs: cream cards in a two-column grid. */
function QA({ block, id }) {
  const H = block.heading ? 'h3' : 'h2';
  return (
    <Section id={block.heading ? id : undefined} label={block.heading ? undefined : 'Questions and answers'}>
      <Head id={id} heading={block.heading} />
      <Reveal as="dl" className={styles.qa} stagger={0.08}>
        {block.items.map((it, i) => (
          <div key={i} className={`card ${styles.qaItem}`}>
            <dt className={styles.qaQ}>
              <span className={styles.qaNum} aria-hidden="true">
                {pad(i + 1)}
              </span>
              <H className={styles.qaTitle}>{it.q}</H>
            </dt>
            <dd className={styles.qaA}>
              <Paragraphs items={it.a} />
            </dd>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

/** Body copy. With a photograph: image on one side, text on the other (collage "Our Philosophy"). */
function Prose({ block, id, flip }) {
  if (block.image) {
    return (
      <Section id={id}>
        <div className={`${styles.split} ${flip ? styles.flip : ''}`}>
          <Reveal variant="clip" className={styles.splitMedia}>
            <div>
              <Figure image={block.image} aspect="4 / 3" sizes="(min-width: 1024px) 44vw, 92vw" />
            </div>
          </Reveal>
          <Reveal className={styles.splitCopy} stagger={0.06}>
            {block.eyebrow && <p className={styles.eyebrow}>{block.eyebrow}</p>}
            <h2 id={id} className={styles.h2}>
              {block.heading}
            </h2>
            <div className={styles.body}>
              <Paragraphs items={block.paragraphs} />
              {block.list && <Checklist items={block.list} />}
            </div>
          </Reveal>
        </div>
      </Section>
    );
  }
  // With a checklist: text on the left, the checklist as a highlighted card on the right.
  if (block.list) {
    return (
      <Section id={id}>
        <div className={styles.proseList}>
          <div>
            <Head id={id} eyebrow={block.eyebrow} heading={block.heading} />
            <Reveal className={styles.body}>
              <Paragraphs items={block.paragraphs} />
            </Reveal>
          </div>
          <Reveal className={styles.highlight}>
            <ul className={styles.highlightList}>
              {block.list.map((it, i) => (
                <li key={i}>
                  <span className={styles.highlightIcon} aria-hidden="true">
                    <Icon name="check" size={16} />
                  </span>
                  <span>{rich(it)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>
    );
  }
  // Text only: heading on the left, text on the right.
  return (
    <Section id={id}>
      <div className={styles.listGrid}>
        <Head id={id} eyebrow={block.eyebrow} heading={block.heading} />
        <Reveal className={styles.body}>
          <Paragraphs items={block.paragraphs} />
        </Reveal>
      </div>
    </Section>
  );
}

/** Benefits, inclusions, practical notes: a checklist (collage "What's Included"). */
function List({ block, id }) {
  return (
    <Section id={id} tone={block.style === 'plain' ? undefined : 'sand'}>
      <div className={styles.listGrid}>
        <Head id={id} heading={block.heading} intro={block.intro} />
        <Reveal className={`card ${styles.listCard}`}>
          <Checklist items={block.items} columns={block.items.length > 5} />
          {block.outro && <p className={styles.outro}>{rich(block.outro)}</p>}
        </Reveal>
      </div>
    </Section>
  );
}

/** "What to expect": numbered cream cards in a row. */
function Steps({ block, id }) {
  return (
    <Section id={id} tone="sand">
      <Head id={id} heading={block.heading} intro={block.intro} />
      <Reveal as="ol" className={styles.steps} stagger={0.1}>
        {block.steps.map((s, i) => (
          <li key={i} className={`card ${styles.step}`}>
            <span className={styles.stepNum} aria-hidden="true">
              {pad(i + 1)}
            </span>
            {s.title && <h3 className={styles.stepTitle}>{s.title}</h3>}
            {s.text && <p className={styles.stepText}>{rich(s.text)}</p>}
          </li>
        ))}
      </Reveal>
    </Section>
  );
}

/** A timed day: one card per part of the day, joined by a line, across the full width. */
function Timeline({ block, id }) {
  return (
    <Section id={id} tone="sand">
      <Head id={id} heading={block.heading} intro={block.intro} />
      <Reveal as="ol" className={styles.tl} stagger={0.1}>
        {block.steps.map((s, i) => (
          <li key={i} className={`card ${styles.tlItem}`}>
            <p className={styles.tlTime}>
              <span className={styles.tlNum}>{pad(i + 1)}</span>
              {s.time}
            </p>
            <h3 className={styles.tlTitle}>{s.title}</h3>
            {s.text && <p className={styles.tlText}>{rich(s.text)}</p>}
            {s.note && <p className={styles.tlNote}>{s.note}</p>}
          </li>
        ))}
      </Reveal>
    </Section>
  );
}

/** Cards: partner logos, linked experiences (collage feature cards) or class types. */
function Cards({ block, id }) {
  const logos = block.items.every((c) => c.image?.src?.endsWith('.png'));
  const linked = block.items.some((c) => c.href);
  return (
    <Section id={id} tone={logos ? 'sand' : undefined}>
      <Head id={id} heading={block.heading} intro={block.intro} />
      <Reveal as="ul" className={`${styles.cards} ${logos ? styles.logos : linked ? styles.linkedGrid : styles.classGrid}`} stagger={0.06}>
        {block.items.map((c, i) => (
          <li key={i}>
            {c.href ? (
              <ImageCard
                variant="feature"
                href={c.href}
                image={c.image}
                title={c.title}
                meta={[c.subtitle, c.meta].filter(Boolean).join(' · ')}
                text={c.text}
                more="View Experience"
              />
            ) : (
              <div className={`card ${styles.staticCard}`}>
                {c.image && (
                  <Figure
                    image={c.image}
                    alt={logos ? '' : c.image.alt}
                    aspect={logos ? '1 / 1' : '4 / 3'}
                    sizes={logos ? '10rem' : '(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 92vw'}
                    className={styles.cardImage}
                  />
                )}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{c.title}</h3>
                  {c.subtitle && <p className={styles.cardSubtitle}>{c.subtitle}</p>}
                  {c.text && <p className={styles.cardText}>{rich(c.text)}</p>}
                  {c.meta && <p className={styles.cardMeta}>{c.meta}</p>}
                </div>
              </div>
            )}
          </li>
        ))}
      </Reveal>
    </Section>
  );
}

/** People (facilitators, priests): portrait cards (collage "Our Facilitators"). */
function People({ block, id }) {
  return (
    <Section id={id} tone="sand">
      <Head id={id} heading={block.heading} />
      <Reveal as="ul" className={styles.people} stagger={0.08}>
        {block.items.map((p, i) => (
          <li key={i} className={`card ${styles.person}`}>
            {p.image && <Figure image={p.image} alt="" aspect="1 / 1" sizes="11rem" className={styles.personImage} />}
            <div className={styles.personBody}>
              <h3 className={styles.personName}>{p.href ? <Link href={hrefFor(p.href)} className={styles.personLink}>{p.name}</Link> : p.name}</h3>
              {p.role && <p className={styles.cardSubtitle}>{p.role}</p>}
              {p.text && <p className={styles.cardText}>{rich(p.text)}</p>}
              {p.href && (
                <p className={styles.personMore} aria-hidden="true">
                  Read bio <Icon name="arrow-right" size={14} />
                </p>
              )}
            </div>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}

function Faq({ block, id }) {
  return (
    <Section id={id}>
      <div className={styles.listGrid}>
        <Head id={id} eyebrow="Questions" heading={block.heading} />
        <Reveal>
          <Accordion items={block.items.map((it) => ({ question: it.q, answer: it.a }))} />
        </Reveal>
      </div>
    </Section>
  );
}

/** Client words, verbatim, as quote cards. */
function Testimonials({ block, id }) {
  return (
    <Section id={id} tone="sand">
      <Head id={id} heading={block.heading} />
      <Reveal as="ul" className={styles.quotes} stagger={0.1}>
        {block.items.map((t, i) => (
          <li key={i} className={`card ${styles.quoteCard}`}>
            <span className={styles.quoteMark} aria-hidden="true">
              “
            </span>
            <blockquote className={styles.quoteText}>
              {t.quote.split(/\n\s*\n/).map((p, pi) => (
                <p key={pi}>{p}</p>
              ))}
            </blockquote>
            <p className={styles.quoteName}>
              — {t.name}
              {t.source && <span className={styles.quoteSource}> {t.source}</span>}
            </p>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}

/** Prices, durations, availability — as published. */
function Details({ block, id }) {
  return (
    <Section id={id}>
      <div className={styles.listGrid}>
        <Head id={id} eyebrow="Details" heading={block.heading} />
        <Reveal className={`card ${styles.detailsCard}`}>
          <DetailsLine items={block.items} />
          {block.text && <p className={styles.outro}>{rich(block.text)}</p>}
        </Reveal>
      </div>
    </Section>
  );
}

function Gallery({ block, id }) {
  return (
    <Section id={block.heading ? id : undefined} label={block.heading ? undefined : 'Gallery'}>
      <Head id={id} heading={block.heading} />
      <Reveal className={styles.gallery} variant="clip" stagger={0.1}>
        {block.images.map((img, i) => (
          <div key={i}>
            <Figure image={img} aspect="4 / 3" sizes="(min-width: 1024px) 30vw, 100vw" />
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

function Legal({ block, page }) {
  const sections = block.sections.map((s, i) => ({ ...s, id: `${slug(s.heading) || 'section'}-${i + 1}` }));
  return (
    <section className={styles.section} aria-label={page.title}>
      <div className={`container-wide ${styles.legal}`}>
        <nav className={`card ${styles.toc}`} aria-label="On this page">
          <p className={styles.tocTitle}>On this page</p>
          <ol>
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span aria-hidden="true">{/^\d/.test(s.heading) ? '' : pad(i + 1)}</span>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className={styles.legalBody}>
          {page.updated && <p className={styles.updated}>{page.updated}</p>}
          {sections.map((s) => (
            <div key={s.id} className={styles.legalSection}>
              <h2 id={s.id}>{s.heading}</h2>
              {/* Source order is "intro paragraph → list → closing paragraphs". */}
              <Paragraphs items={s.list ? s.paragraphs.slice(0, 1) : s.paragraphs} />
              {s.list && <Checklist items={s.list} />}
              {s.list && <Paragraphs items={s.paragraphs.slice(1)} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cta({ block, page, photo = false }) {
  const target = resolveAction(block.action, { href: block.href, title: page.title });
  if (!target) return null;
  return (
    <section aria-label={block.heading}>
      <BookingCTA heading={block.heading} text={block.text} buttonLabel={block.label} href={target.href} image={photo ? MEDIA.soundVeranda : undefined} />
    </section>
  );
}

const MAP = { qa: QA, prose: Prose, list: List, steps: Steps, timeline: Timeline, cards: Cards, people: People, faq: Faq, testimonials: Testimonials, details: Details, gallery: Gallery, legal: Legal, cta: Cta };

/** Renders a page's blocks in source order; when two closing bands meet, the first sits on a photograph. */
export default function Blocks({ blocks, page }) {
  let flip = true;
  return blocks.map((block, i) => {
    const Comp = MAP[block.type];
    if (!Comp) return null;
    if (block.type === 'prose' && block.image) flip = !flip;
    const photo = block.type === 'cta' && blocks[i + 1]?.type === 'cta';
    return <Comp key={i} block={block} page={page} flip={flip} photo={photo} id={`${slug(block.heading ?? block.type)}-${i}`} />;
  });
}
