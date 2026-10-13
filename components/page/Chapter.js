import Link from 'next/link';
import Image from 'next/image';
import Figure from '@/components/ui/Figure';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Disclosure from '@/components/ui/Disclosure';
import DetailsLine from '@/components/sections/DetailsLine';
import Reveal from '@/components/motion/Reveal';
import { resolveAction } from '@/lib/actions';
import { hrefFor } from '@/lib/routes.mjs';
import { whatsappLink } from '@/content/site';
import styles from './Chapter.module.css';

const FACT_ICON = [
  [/duration|time|hours/i, 'clock'],
  [/couple/i, 'users'],
  [/solo|person/i, 'user'],
  [/location/i, 'pin'],
  [/availab|date|day/i, 'calendar'],
];
const iconFor = (term) => FACT_ICON.find(([re]) => re.test(term))?.[1] ?? 'list';

/** `**bold**` lead-ins from the source become <strong>. */
function rich(text) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g);
  return parts.length === 1 ? text : parts.map((p, i) => (i % 2 ? <strong key={i}>{p}</strong> : p));
}
const paras = (items = []) => items.map((p, i) => <p key={i}>{rich(p)}</p>);

function Checks({ items }) {
  return (
    <ul className={styles.checks}>
      {items.map((it, i) => (
        <li key={i}>
          <Icon name="check" size={15} className={styles.check} />
          <span>{rich(it)}</span>
        </li>
      ))}
    </ul>
  );
}

/** Compact rendering of one content block inside an expandable panel. */
function body(block) {
  switch (block.type) {
    case 'prose':
      return (
        <div className={styles.flow}>
          {paras(block.paragraphs)}
          {block.list && <Checks items={block.list} />}
          {block.image && <Figure image={block.image} aspect="16 / 9" sizes="(min-width: 1024px) 34rem, 92vw" className={styles.inlineImg} />}
        </div>
      );
    case 'list':
      return (
        <div className={styles.flow}>
          {block.intro && <p>{rich(block.intro)}</p>}
          <Checks items={block.items} />
          {block.outro && <p>{rich(block.outro)}</p>}
        </div>
      );
    case 'steps':
      return (
        <ol className={styles.steps}>
          {block.steps.map((s, i) => (
            <li key={i}>
              <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                {s.title && <h4>{s.title}</h4>}
                {s.text && <p>{rich(s.text)}</p>}
              </div>
            </li>
          ))}
        </ol>
      );
    case 'timeline':
      return (
        <ol className={styles.timeline}>
          {block.steps.map((s, i) => (
            <li key={i}>
              <p className={styles.time}>{s.time}</p>
              <h4>{s.title}</h4>
              {s.text && <p>{rich(s.text)}</p>}
              {s.note && <p className={styles.note}>{s.note}</p>}
            </li>
          ))}
        </ol>
      );
    case 'faq':
    case 'qa':
      return (
        <div className={styles.faq}>
          {block.items.map((it, i) => (
            <div key={i}>
              <h4>{it.q}</h4>
              {paras(it.a)}
            </div>
          ))}
        </div>
      );
    case 'cards':
      return (
        <ul className={styles.miniCards}>
          {block.items.map((c, i) => (
            <li key={i} className={styles.miniCard}>
              {c.image && (
                <span className={styles.miniImg}>
                  <Image src={c.image.src} alt={c.image.src.endsWith('.png') ? '' : c.image.alt} width={c.image.width} height={c.image.height} sizes="8rem" style={{ objectPosition: c.image.position ?? '50% 50%' }} />
                </span>
              )}
              <span className={styles.miniBody}>
                <strong>{c.title}</strong>
                {c.subtitle && <span className={styles.miniSub}>{c.subtitle}</span>}
                {c.text && <span>{rich(c.text)}</span>}
                {c.meta && <span className={styles.miniMeta}>{c.meta}</span>}
              </span>
            </li>
          ))}
        </ul>
      );
    case 'testimonials':
      return (
        <div className={styles.quotes}>
          {block.items.map((t, i) => (
            <figure key={i} className={styles.quote}>
              <blockquote>
                {t.quote.split(/\n\s*\n/).map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </blockquote>
              <figcaption>
                — {t.name}
                {t.source ? ` ${t.source}` : ''}
              </figcaption>
            </figure>
          ))}
        </div>
      );
    case 'details':
      return (
        <div className={styles.flow}>
          <DetailsLine items={block.items} />
          {block.text && <p>{rich(block.text)}</p>}
        </div>
      );
    case 'gallery':
      return (
        <div className={styles.gallery}>
          {block.images.map((im, i) => (
            <Figure key={i} image={im} aspect="4 / 3" sizes="12rem" />
          ))}
        </div>
      );
    default:
      return null;
  }
}

const DEFAULT_TITLE = { qa: 'Questions & answers', faq: 'Frequently asked questions', testimonials: 'What clients say', gallery: 'Gallery', details: 'Details', cards: 'Options', list: 'Details', steps: 'What to expect' };

/**
 * One former sub-page, shown in full as a section of its menu page: the photograph (sticky on
 * desktop) with the facilitators beneath it; beside it the title, strapline, key facts, the opening
 * text, the actions, and every remaining block as an expandable panel. Nothing is dropped.
 * page: cleaned content page · label: group eyebrow · reverse: photograph on the right
 */
export default function Chapter({ page, label, reverse = false, headingLevel = 2 }) {
  const H = `h${headingLevel}`;
  const bio = page.kind === 'bio';
  const action = resolveAction(page.cta, { title: page.title });
  const image = page.hero?.image;
  // Crop to the photograph's own shape and never show it larger than its pixels, so it stays sharp.
  const landscape = image && image.width > image.height * 1.1;
  const ratio = landscape ? 4 / 3 : bio ? 4 / 5 : 4 / 4.6;
  const maxW = image ? Math.max(340, Math.round(Math.min(image.width, image.height * ratio))) : 0;
  const people = page.blocks.filter((b) => b.type === 'people').flatMap((b) => b.items);
  const ctas = page.blocks.filter((b) => b.type === 'cta');
  const rest = page.blocks.filter((b) => !['people', 'cta'].includes(b.type));

  // Opening text: the hero intro, else the first prose section (shown in full, not as a panel).
  let lead = page.intro ?? [];
  let leadBlock = null;
  if (!lead.length) {
    leadBlock = rest.find((b) => b.type === 'prose' && !b.image);
  }
  const visibleIntro = bio ? lead.slice(0, 2) : lead;
  const panels = [];
  if (bio && lead.length > 2) panels.push({ key: 'story', title: `More about ${page.person?.name?.split(' ')[0] ?? 'me'}`, content: <div className={styles.flow}>{paras(lead.slice(2))}</div> });
  rest.forEach((b, i) => {
    if (b === leadBlock) return;
    if (b.type === 'qa' && !b.heading) {
      b.items.forEach((it, j) => panels.push({ key: `qa-${i}-${j}`, title: it.q, content: <div className={styles.flow}>{paras(it.a)}</div> }));
      return;
    }
    const content = body(b);
    if (content) panels.push({ key: `b-${i}`, title: b.heading ?? DEFAULT_TITLE[b.type] ?? 'More', content });
  });

  const mainLabel = page.ctaLabel ?? 'Book Now';
  const enquire = whatsappLink(`Hello Bali Bliss, I'd like to ask about ${page.title}.`);

  return (
    <section
      id={page.slug}
      className={`${styles.chapter} ${reverse ? styles.reverse : ''} ${image ? '' : styles.noImage}`}
      aria-labelledby={`${page.slug}-title`}
      style={image ? { '--media-w': `${maxW}px` } : undefined}
    >
      <div className={`container-wide ${styles.grid}`}>
        {image && (
          <div className={styles.side}>
            <Reveal variant="clip" className={styles.media}>
              <div>
                <Figure image={image} aspect={landscape ? '4 / 3' : bio ? '4 / 5' : '4 / 4.6'} sizes="(min-width: 1024px) 34vw, 92vw" />
              </div>
            </Reveal>
            {people.length > 0 && (
              <div className={styles.people}>
                <p className={styles.peopleLabel}>{people.length > 1 ? 'Facilitators' : 'Facilitator'}</p>
                <ul>
                  {people.map((p) => {
                    const inner = (
                      <>
                        {p.image && (
                          <span className={styles.avatar}>
                            <Image src={p.image.src} alt="" width={p.image.width} height={p.image.height} sizes="3rem" style={{ objectPosition: p.image.position ?? '50% 30%' }} />
                          </span>
                        )}
                        <span className={styles.personText}>
                          <span className={styles.personName}>{p.name}</span>
                          {p.role && <span className={styles.personRole}>{p.role}</span>}
                        </span>
                      </>
                    );
                    return (
                      <li key={p.name}>
                        {p.href ? (
                          <Link href={hrefFor(p.href)} className={styles.person}>
                            {inner}
                          </Link>
                        ) : (
                          <span className={styles.person}>{inner}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}

        <Reveal className={styles.copy} stagger={0.05}>
          {(bio ? page.person?.role : label) && <p className={styles.eyebrow}>{bio ? page.person.role : label}</p>}
          <H id={`${page.slug}-title`} className={styles.title}>
            {bio ? page.person?.name ?? page.title : page.title}
          </H>
          {page.tagline && <p className={styles.tagline}>{page.tagline}</p>}

          {page.facts?.length > 0 && (
            <dl className={styles.facts}>
              {page.facts.map((f) => (
                <div key={f.term} className={styles.fact}>
                  <Icon name={iconFor(f.term)} size={17} className={styles.factIcon} />
                  <dt>{f.term}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className={styles.text}>
            {paras(visibleIntro)}
            {leadBlock && (
              <>
                {leadBlock.heading && <h3 className={styles.leadHeading}>{leadBlock.heading}</h3>}
                {paras(leadBlock.paragraphs)}
                {leadBlock.list && <Checks items={leadBlock.list} />}
              </>
            )}
          </div>

          {bio && page.quote && <p className={styles.pull}>“{page.quote}”</p>}

          <div className={styles.actions}>
            {action && (
              <Button href={action.href} external={action.external} icon={action.whatsapp ? 'whatsapp' : 'arrow-right'}>
                {mainLabel}
              </Button>
            )}
            {page.cta !== 'whatsapp' && page.kind !== 'partners' && (
              <Button href={enquire} external variant="secondary" icon="whatsapp">
                Ask on WhatsApp
              </Button>
            )}
          </div>

          {panels.length > 0 && <Disclosure items={panels} open={0} headingLevel={headingLevel + 1} />}

          {ctas
            .filter((c) => !(bio && c.heading === page.quote))
            .map((c, i) => {
              const t = resolveAction(c.action, { href: c.href, title: page.title });
              const button = t && c.label !== mainLabel;
              if (!button && !c.text) {
                return (
                  <p key={i} className={styles.pull}>
                    {c.heading}
                  </p>
                );
              }
              return (
                <div key={i} className={`card ${styles.callout}`}>
                  <p className={styles.calloutHeading}>{c.heading}</p>
                  {c.text && <p className={styles.calloutText}>{c.text}</p>}
                  {button && (
                    <Button href={t.href} external={t.external} size="sm" variant="secondary" icon={t.whatsapp ? 'whatsapp' : 'arrow-right'}>
                      {c.label}
                    </Button>
                  )}
                </div>
              );
            })}
        </Reveal>
      </div>
    </section>
  );
}
