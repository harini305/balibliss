import Button from '@/components/ui/Button';
import TextLink from '@/components/ui/TextLink';
import Eyebrow from '@/components/ui/Eyebrow';
import Tag from '@/components/ui/Tag';
import Ring from '@/components/ui/Ring';
import Figure from '@/components/ui/Figure';
import Accordion from '@/components/ui/Accordion';
import { TextField, TextArea, SelectField, Checkbox, RadioGroup } from '@/components/ui/Field';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SplitFeature from '@/components/sections/SplitFeature';
import FacilitatorStrip from '@/components/sections/FacilitatorStrip';
import Testimonial from '@/components/sections/Testimonial';
import DayTimeline from '@/components/sections/DayTimeline';
import DetailsLine from '@/components/sections/DetailsLine';
import BookingCTA from '@/components/sections/BookingCTA';
import EnquiryComposer from '@/components/forms/EnquiryComposer';
import Parallax from '@/components/motion/Parallax';
import RingDraw from '@/components/motion/RingDraw';
import Reveal from '@/components/motion/Reveal';
import MotionLab from './MotionLab';
import Image from 'next/image';
import { MEDIA } from '@/content/media';
import { FACILITATORS } from '@/content/people';
import { BOOKING_URL } from '@/content/site';
import * as S from '@/content/styleguide-samples';
import { readColorTokens } from '@/lib/tokens';
import { contrast, rating } from '@/lib/contrast';
import styles from './styleguide.module.css';

export const metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false, nocache: true },
};

const SECTIONS = [
  ['brand', 'Logo & motif'],
  ['colour', 'Colour'],
  ['type', 'Typography'],
  ['space', 'Space, shape & layout'],
  ['buttons', 'Buttons & links'],
  ['forms', 'Form controls'],
  ['images', 'Image treatments'],
  ['components', 'Components'],
  ['sections', 'Section patterns'],
  ['responsive', 'Responsive'],
  ['motion', 'Motion'],
];

const TYPE_SCALE = [
  ['--fs-hero', 'Hero', 'Wellness and Healing in Ubud', 'heroSize'],
  ['--fs-h1', 'H1', 'One Day Healing Retreats in Bali', 'h1'],
  ['--fs-h2', 'H2', 'A Sacred Day to Reset, Reconnect & Realign', 'h2'],
  ['--fs-h3', 'H3', 'Cultural & Sacred Experience', 'h3'],
  ['--fs-h4', 'H4', 'What to Expect', 'h4'],
];

const SPACE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const SPACE_PX = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128];
const STATES = ['default', 'hover', 'focus', 'active'];

const CONTRAST_PAIRS = [
  ['#1f2526', '#faf6ef', 'Ink 900 on ivory', 'Body text'],
  ['#53605f', '#faf6ef', 'Ink 600 on ivory', 'Muted text'],
  ['#53605f', '#f1e8da', 'Ink 600 on sand', 'Muted text on alt surface'],
  ['#2a6371', '#faf6ef', 'Lagoon 700 on ivory', 'Links, buttons'],
  ['#ffffff', '#2a6371', 'White on lagoon 700', 'Primary button label'],
  ['#173e48', '#faf6ef', 'Lagoon 900 on ivory', 'Headings'],
  ['#6c4870', '#faf6ef', 'Orchid 700 on ivory', 'Eyebrows'],
  ['#825c85', '#faf6ef', 'Orchid 600 on ivory', 'Italic heading accents'],
  ['#9a4f31', '#faf6ef', 'Clay 600 on ivory', 'Index numerals'],
  ['#faf6ef', '#173e48', 'Ivory on lagoon 900', 'Text on dark'],
  ['#c8d6d6', '#173e48', 'Mist on lagoon 900', 'Muted text on dark'],
  ['#d8b36a', '#173e48', 'Gold on lagoon 900', 'Labels on dark'],
  ['#d8b36a', '#faf6ef', 'Gold on ivory', 'Ornament only — never text'],
];

function Section({ id, index, title, intro, children, tone }) {
  return (
    <section id={id} className={`${styles.section} ${tone ? styles[tone] : ''}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className={styles.sectionHead}>
          <Eyebrow index={index}>Styleguide</Eyebrow>
          <h2 id={`${id}-title`}>{title}</h2>
          {intro && <p className={styles.intro}>{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

function Sub({ title, children, note }) {
  return (
    <div className={styles.sub}>
      <h3 className={styles.subTitle}>{title}</h3>
      {note && <p className={styles.note}>{note}</p>}
      {children}
    </div>
  );
}

export default function Styleguide() {
  const colors = readColorTokens();

  return (
    <div className={styles.page}>
      {/* ---------- Intro ---------- */}
      <div className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div>
            <Eyebrow>Design system · v0.1 · private, noindex</Eyebrow>
            <h1 className={styles.heroTitle}>
              Daily <em>Offering</em>
            </h1>
            <p className={styles.lead}>
              The Bali Bliss design system: a calm, editorial field guide to small, repeated acts of care. Every page unfolds
              the way a session does — arrive, understand, feel safe, choose, book.
            </p>
            <p className={styles.note}>
              All copy on this page is verbatim from balibliss.net (source noted per block). Nothing here is published; this
              route is excluded from search engines and not linked from the site.
            </p>
          </div>
          <RingDraw size={220} className={styles.heroRing} />
        </div>
        <nav aria-label="Styleguide sections" className="container">
          <ol className={styles.toc}>
            {SECTIONS.map(([id, label], i) => (
              <li key={id}>
                <a href={`#${id}`}>
                  <span>{String(i + 1).padStart(2, '0')}</span> {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* ---------- 01 Brand ---------- */}
      <Section
        id="brand"
        index={1}
        title="Logo & signature motif"
        intro="The original logo is used as supplied (1626px PNG — a vector original was requested). The hand-drawn double ring is the single recurring motif: portrait masks, section ornaments, and one draw-on animation."
      >
        <div className={styles.logoGrid}>
          <div className={`${styles.logoTile} ${styles.onIvory}`}>
            <Image src={MEDIA.logo.src} width={MEDIA.logo.width} height={MEDIA.logo.height} alt={MEDIA.logo.alt} sizes="320px" className={styles.logoImg} />
            <p className={styles.caption}>Primary · on ivory · min height 40px</p>
          </div>
          <div className={`${styles.logoTile} ${styles.onDark}`}>
            <Image src={MEDIA.logoWhite.src} width={MEDIA.logoWhite.width} height={MEDIA.logoWhite.height} alt={MEDIA.logoWhite.alt} sizes="320px" className={styles.logoImg} />
            <p className={styles.caption}>Reversed · on lagoon 900 (footer)</p>
          </div>
          <div className={`${styles.logoTile} ${styles.onIvory}`}>
            <Image src={MEDIA.symbol.src} width={MEDIA.symbol.width} height={MEDIA.symbol.height} alt="Bali Bliss symbol" sizes="120px" className={styles.symbolImg} />
            <p className={styles.caption}>Symbol · favicon & app icon source</p>
          </div>
          <div className={`${styles.logoTile} ${styles.onIvory}`}>
            <div className={styles.ringRow}>
              <Ring size={88} />
              <Ring size={88} stroke="var(--c-orchid-600)" />
              <Ring size={88} stroke="var(--c-gold-300)" strokeWidth={1.5} />
            </div>
            <p className={styles.caption}>Signature ring · lagoon, orchid, gold strokes · 1–1.5px</p>
          </div>
        </div>
      </Section>

      {/* ---------- 02 Colour ---------- */}
      <Section
        id="colour"
        index={2}
        title="Colour"
        intro="Lagoon teal and orchid plum come straight from the logo; ivory and sand carry the page; clay is a restrained accent drawn from the photography (offerings, temple brick). Swatches below are read from styles/tokens.css at build time."
        tone="alt"
      >
        <ul className={styles.swatches}>
          {colors.map((c) => (
            <li key={c.name} className={styles.swatch}>
              <span className={styles.chip} style={{ background: c.hex }} />
              <code className={styles.token}>{c.name}</code>
              <span className={styles.hex}>{c.hex}</span>
              {c.note && <span className={styles.swatchNote}>{c.note}</span>}
            </li>
          ))}
        </ul>

        <Sub title="Contrast, measured" note="WCAG 2.2 ratios computed from the token values. Normal text needs 4.5:1 (AA); large text and UI parts need 3:1.">
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Sample</th>
                  <th scope="col">Pair</th>
                  <th scope="col">Use</th>
                  <th scope="col">Ratio</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                {CONTRAST_PAIRS.map(([fg, bg, label, use]) => {
                  const r = contrast(fg, bg);
                  const res = rating(r);
                  return (
                    <tr key={label}>
                      <td>
                        <span className={styles.sample} style={{ color: fg, background: bg }}>
                          Aa
                        </span>
                      </td>
                      <th scope="row">{label}</th>
                      <td>{use}</td>
                      <td>{r.toFixed(2)}:1</td>
                      <td>
                        <Tag tone={res === 'Fail' ? 'clay' : 'lagoon'}>{res}</Tag>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Sub>
      </Section>

      {/* ---------- 03 Type ---------- */}
      <Section
        id="type"
        index={3}
        title="Typography"
        intro="Fraunces (display, light weights, soft optical sizing, italic accents that echo the logo's italic wordmark) with Instrument Sans (body and UI). Both are open-licence and self-hosted via next/font. Sizes are fluid between 320px and 1440px."
      >
        <div className={styles.typeList}>
          {TYPE_SCALE.map(([token, name, sample, cls]) => (
            <div key={token} className={styles.typeRow}>
              <div className={styles.typeMeta}>
                <span className={styles.typeName}>{name}</span>
                <code>{token}</code>
              </div>
              <p className={`${styles.specimen} ${styles[cls]}`}>
                {cls === 'heroSize' ? (
                  <>
                    Wellness and Healing <em>in Ubud</em>
                  </>
                ) : (
                  sample
                )}
              </p>
            </div>
          ))}
          <div className={styles.typeRow}>
            <div className={styles.typeMeta}>
              <span className={styles.typeName}>Lead</span>
              <code>--fs-lead</code>
            </div>
            <p className={styles.leadSample}>{S.RETREAT_HERO.tagline}</p>
          </div>
          <div className={styles.typeRow}>
            <div className={styles.typeMeta}>
              <span className={styles.typeName}>Body</span>
              <code>--fs-body · 1.65</code>
            </div>
            <p className={styles.bodySample}>{S.HOME_HERO.intro}</p>
          </div>
          <div className={styles.typeRow}>
            <div className={styles.typeMeta}>
              <span className={styles.typeName}>Small</span>
              <code>--fs-small</code>
            </div>
            <p className={styles.smallSample}>{S.RETREAT_JOURNEY[1].note}</p>
          </div>
          <div className={styles.typeRow}>
            <div className={styles.typeMeta}>
              <span className={styles.typeName}>Label</span>
              <code>--fs-label · +0.08em</code>
            </div>
            <Eyebrow>{S.HOME_REIKI_FEATURE.eyebrow}</Eyebrow>
          </div>
        </div>

        <Sub title="Long-form prose" note="Measure capped at 68ch. Paragraph rhythm 16px.">
          <div className="prose">
            <h3>What to Expect</h3>
            <p>
              A Reiki session is a deeply relaxing experience designed to promote energy balance and overall well-being.
              During the session, you will remain fully clothed while lying comfortably. The Reiki practitioner will gently
              place their hands on or just above different areas of your body, allowing the universal life energy to flow.
            </p>
            <p>
              Whether you’re seeking relaxation, emotional healing, or simply a moment of peace, Reiki offers a nurturing space
              for self-discovery and renewal. <a href="/reiki/">Read about Reiki Healing</a>.
            </p>
            <ul>
              <li>Private &amp; personalised experiences</li>
              <li>Guided by a Balinese priest</li>
              <li>Cultural immersion &amp; sacred rituals</li>
            </ul>
          </div>
          <p className={styles.source}>Source: /reiki/ and /one-day-healing-retreats-in-bali/</p>
        </Sub>
      </Section>

      {/* ---------- 04 Space ---------- */}
      <Section id="space" index={4} title="Space, shape & layout" intro="A 4px base scale. Sections breathe with a fluid vertical rhythm (64→128px). Square corners by default; 4px on controls; pills only for tags." tone="alt">
        <div className={styles.twoCol}>
          <Sub title="Spacing scale">
            <ul className={styles.spaceList}>
              {SPACE.map((n, i) => (
                <li key={n}>
                  <code>--space-{n}</code>
                  <span className={styles.spaceBar} style={{ width: `var(--space-${n})` }} />
                  <span className={styles.hex}>{SPACE_PX[i]}px</span>
                </li>
              ))}
            </ul>
          </Sub>
          <div>
            <Sub title="Radii">
              <div className={styles.radii}>
                {[
                  ['--radius-0', 'Images, bands'],
                  ['--radius-1', 'Buttons, fields'],
                  ['--radius-2', 'Focus on cards'],
                  ['--radius-pill', 'Tags only'],
                ].map(([t, use]) => (
                  <div key={t} className={styles.radiusItem}>
                    <span className={styles.radiusBox} style={{ borderRadius: `var(${t})` }} />
                    <code>{t}</code>
                    <span className={styles.hex}>{use}</span>
                  </div>
                ))}
              </div>
            </Sub>
            <Sub title="Elevation">
              <div className={styles.radii}>
                <div className={styles.radiusItem}>
                  <span className={styles.shadowBox} style={{ boxShadow: 'var(--shadow-1)' }} />
                  <code>--shadow-1</code>
                  <span className={styles.hex}>Compact header</span>
                </div>
                <div className={styles.radiusItem}>
                  <span className={styles.shadowBox} style={{ boxShadow: 'var(--shadow-2)' }} />
                  <code>--shadow-2</code>
                  <span className={styles.hex}>Menus, panels</span>
                </div>
              </div>
            </Sub>
          </div>
        </div>

        <Sub title="12-column editorial grid" note="Content width 1200px (prose 68ch, wide 1440px), fluid gutters 16–32px. Typical pairings: 7/5 and 5/7 splits, 4/8 for index + content, occasional full-bleed.">
          <div className={styles.gridDemo} aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <div className={styles.gridDemo2} aria-hidden="true">
            <span className={styles.span7}>7 · image</span>
            <span className={styles.span5}>5 · text</span>
            <span className={styles.span4}>4 · index</span>
            <span className={styles.span8}>8 · content</span>
          </div>
        </Sub>
      </Section>

      {/* ---------- 05 Buttons ---------- */}
      <Section
        id="buttons"
        index={5}
        title="Buttons & links"
        intro="One primary action per section. Booking buttons go to the live booking system; WhatsApp is on-brand rather than a green bubble. States below are pinned for review — hover, Tab and press the live row to try them."
      >
        <div className={styles.stateRows}>
          {[
            ['primary', 'Book Now', 'arrow-right'],
            ['secondary', 'View Booking Options', undefined],
            ['whatsapp', 'Continue in WhatsApp', undefined],
          ].map(([v, label, icon]) => (
            <div key={v} className={styles.stateRow}>
              <h3 className={styles.stateVariant}>{v}</h3>
              <ul className={styles.stateCells}>
                {[...STATES, 'disabled', 'loading'].map((s) => (
                  <li key={s}>
                    <span className={styles.stateName}>{s}</span>
                    {s === 'disabled' ? (
                      <Button variant={v} icon={icon} disabled>
                        {label}
                      </Button>
                    ) : (
                      <Button
                        variant={v}
                        icon={icon}
                        loading={s === 'loading'}
                        force={STATES.includes(s) && s !== 'default' ? s : undefined}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        {label}
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Sub title="Live — try hover, Tab, Enter">
          <div className={styles.row}>
            <Button href={BOOKING_URL} external icon="arrow-right">
              Book Now
            </Button>
            <Button href="/one-day-healing-retreats-in-bali/" variant="secondary">
              Explore Our Experiences
            </Button>
            <Button variant="whatsapp">Discuss a Booking Time</Button>
            <Button size="lg" href={BOOKING_URL} external icon="arrow-right">
              {S.REIKI_CTA.button}
            </Button>
          </div>
          <p className={styles.note}>
            “Discuss a Booking Time” is shown unlinked here: its WhatsApp destination depends on the primary number (Phase 0, Q2).
          </p>
        </Sub>

        <Sub title="Text links">
          <div className={styles.row}>
            <TextLink href="/purification-and-blessing/">View Experience</TextLink>
            <TextLink href="/reiki/" force="hover">
              Learn More (hover)
            </TextLink>
            <TextLink href="/reiki/" force="focus">
              Learn More (focus)
            </TextLink>
            <TextLink href={BOOKING_URL} external>
              Make Booking
            </TextLink>
          </div>
          <p className={styles.bodySample}>
            Inline links are underlined at rest and thicken on hover, e.g. <a href="/terms-conditions/">Terms &amp; Conditions</a>{' '}
            and <a href="/privacy-policy/">Privacy</a>.
          </p>
        </Sub>

        <div className={styles.darkPanel}>
          <p className={styles.darkLabel}>On dark surfaces</p>
          <div className={styles.row}>
            <Button variant="onDark" href={BOOKING_URL} external icon="arrow-right">
              Book Now
            </Button>
            <Button variant="onDark" force="hover" tabIndex={-1} aria-hidden="true" icon="arrow-right">
              Book Now (hover)
            </Button>
            <Button variant="onDark" force="focus" tabIndex={-1} aria-hidden="true" icon="arrow-right">
              Book Now (focus)
            </Button>
            <TextLink href="/contact/" onDark>
              Contact us
            </TextLink>
          </div>
        </div>
      </Section>

      {/* ---------- 06 Forms ---------- */}
      <Section
        id="forms"
        index={6}
        title="Form controls"
        intro="Frontend-only: forms compose a message and hand it to WhatsApp or the visitor's email app. Labels are always visible, required is stated in words, errors are announced and linked from a summary."
        tone="alt"
      >
        <div className={styles.formStates}>
          <TextField id="sg-default" label="Your name" required placeholder="e.g. Kat Green" />
          <TextField id="sg-hover" label="Hover" force="hover" defaultValue="Lia" />
          <TextField id="sg-focus" label="Focus" force="focus" defaultValue="Lia Natali" />
          <TextField id="sg-hint" label="Email or WhatsApp number" required hint="Include your country code for WhatsApp." />
          <TextField id="sg-error" label="Email or WhatsApp number" required defaultValue="12" error="Enter a valid email address or a phone number with country code, e.g. +44 7700 900123." />
          <TextField id="sg-disabled" label="Disabled" disabled defaultValue="Not editable" />
          <SelectField id="sg-select" label="What are you interested in?" options={['Reiki Healing', 'Sound Therapy', 'Day Retreats', 'Usui Reiki Training']} />
          <SelectField id="sg-select-err" label="Retreat" required options={['Purification and Blessing']} error="Choose a retreat." />
        </div>
        <div className={styles.formStates}>
          <TextArea id="sg-textarea" label="Your message" required rows={4} />
          <div className={styles.stack}>
            <RadioGroup id="sg-radio" label="Who is joining?" options={['Solo', 'Couple']} defaultValue="Solo" />
            <RadioGroup id="sg-radio-dis" label="Disabled group" options={['Option A', 'Option B']} disabled />
          </div>
          <div className={styles.stack}>
            <Checkbox id="sg-check" label="I have read the Terms & Conditions" required />
            <Checkbox id="sg-check-on" label="Checked" defaultChecked />
            <Checkbox id="sg-check-err" label="I have read the Terms & Conditions" required error="Please confirm you have read the Terms & Conditions." />
            <Checkbox id="sg-check-dis" label="Disabled" disabled />
          </div>
        </div>

        <Sub
          title="Live enquiry composer"
          note="Submit empty to see the error summary. With valid input it shows the composed message (preview mode: the destination number/email is awaiting your confirmation, so nothing opens)."
        >
          <div className={styles.composer}>
            <EnquiryComposer idPrefix="sg-enq" topics={['Reiki Healing', 'Sound Therapy', 'Day Retreats', 'Weekend Mini Retreats', 'Usui Reiki Training']} />
          </div>
        </Sub>
      </Section>

      {/* ---------- 07 Images ---------- */}
      <Section
        id="images"
        index={7}
        title="Image treatments"
        intro="Authentic on-site photography leads. Tier A (≥1400px) can go full-bleed; Tier B (800–1399px) half-width; Tier C (<800px) only in portraits and cards. Images are never upscaled beyond ~1.25×. Crops are art-directed per image with a focal point."
      >
        <Sub title="Full-bleed hero · Tier A · parallax ≤6% on desktop">
          <div className={styles.bleed}>
            <Parallax className={styles.bleedFrame}>
              <Figure image={MEDIA.retreatSteps} aspect="auto" sizes="100vw" className={styles.fill} />
            </Parallax>
            <div className={styles.bleedCopy}>
              <p className={styles.bleedTitle}>{S.RETREAT_HERO.title}</p>
              <p>{S.RETREAT_HERO.tagline}</p>
            </div>
          </div>
          <p className={styles.source}>retreat-jungle-steps.jpg · 1920×950 · Source: BaliBliss-Retreats-small.jpg</p>
        </Sub>

        <Sub title="Art-directed crops · one Tier B image, three ratios">
          <div className={styles.crops}>
            <Figure image={MEDIA.jeroMangku} aspect="16 / 10" sizes="(min-width: 1024px) 40vw, 100vw" caption="16:10 · landscape card" />
            <Figure image={MEDIA.jeroMangku} aspect="4 / 5" sizes="(min-width: 1024px) 25vw, 50vw" caption="4:5 · portrait" />
            <Figure image={MEDIA.jeroMangku} aspect="1 / 1" sizes="(min-width: 1024px) 20vw, 50vw" caption="1:1 · thumbnail" />
          </div>
          <p className={styles.source}>Focal point 68% 40% keeps Jero Mangku Artha in frame at every ratio.</p>
        </Sub>

        <div className={styles.twoCol}>
          <Sub title="Framed plate · with caption">
            <Figure image={MEDIA.oracleCards} treatment="framed" aspect="4 / 3" sizes="(min-width: 1024px) 40vw, 100vw" caption="Inner Guidance — oracle cards, flowers and a candle" />
          </Sub>
          <Sub title="Ring portrait · the signature mask">
            <div className={styles.ringDemo}>
              <Figure image={MEDIA.lia} treatment="ring" sizes="280px" />
            </div>
            <p className={styles.source}>lia-natali.jpg · 1024×1536, cropped to a circle at 28% from top.</p>
          </Sub>
        </div>
      </Section>

      {/* ---------- 08 Components ---------- */}
      <Section id="components" index={8} title="Components" tone="alt">
        <div className={styles.twoCol}>
          <Sub title="Eyebrows & ritual index">
            <div className={styles.stack}>
              <Eyebrow>{S.HOME_REIKI_FEATURE.eyebrow}</Eyebrow>
              <Eyebrow index={1}>Arrive</Eyebrow>
              <Eyebrow index={2}>What happens</Eyebrow>
              <Eyebrow index={3}>Your guide</Eyebrow>
            </div>
          </Sub>
          <Sub title="Tags">
            <div className={styles.row}>
              <Tag>Reiki</Tag>
              <Tag tone="orchid">Rituals &amp; Ceremonies</Tag>
              <Tag tone="clay">Melukat</Tag>
              <Tag tone="neutral">Online</Tag>
            </div>
          </Sub>
        </div>

        <Sub title="Breadcrumbs">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Day Retreats', href: '/one-day-healing-retreats-in-bali/' },
              { label: 'Purification and Blessing' },
            ]}
          />
        </Sub>

        <div className={styles.twoCol}>
          <Sub title="FAQ accordion · native details/summary">
            <Accordion items={S.REIKI_FAQ} defaultOpen={0} />
            <p className={styles.source}>Source: /reiki/ — Reiki Healing FAQs</p>
          </Sub>
          <Sub title="Testimonial · existing, verbatim">
            <Testimonial quote={S.REIKI_TESTIMONIAL.quote} name={S.REIKI_TESTIMONIAL.name} source="Reiki Healing" />
            <p className={styles.source}>Source: /reiki/ — What Our Clients Are Saying</p>
          </Sub>
        </div>

        <Sub title="Retreat card · details line">
          <article className={styles.card}>
            <Figure image={MEDIA.melukat} aspect="auto" sizes="(min-width: 768px) 360px, 100vw" className={styles.cardMedia} />
            <div className={styles.cardBody}>
              <Eyebrow>{S.RETREAT_CARD.subtitle}</Eyebrow>
              <h3>{S.RETREAT_CARD.title}</h3>
              <p className={styles.muted}>{S.RETREAT_CARD.text}</p>
              <DetailsLine
                items={[
                  { term: 'Duration', value: S.RETREAT_CARD.duration },
                  { term: 'From', value: S.RETREAT_CARD.price },
                ]}
              />
              <TextLink href={S.RETREAT_CARD.href}>View Experience</TextLink>
            </div>
          </article>
          <p className={styles.source}>
            Source: /one-day-healing-retreats-in-bali/. This price is already published on the live page. Prices that exist only
            in the booking widget (session prices) are not shown anywhere until you confirm them (Phase 0, Q3).
          </p>
        </Sub>
      </Section>

      {/* ---------- 09 Sections ---------- */}
      <Section
        id="sections"
        index={9}
        title="Section patterns"
        intro="Pages are composed from a small set of varied patterns — not three-card rows everywhere. Each takes content props only, so every page stays consistent."
      >
        <Sub title="Ritual index · intro Q&As (service pages)">
          <Reveal as="ol" className={styles.ritual}>
            {S.REIKI_INTRO_QA.map((qa, i) => (
              <li key={qa.question}>
                <Eyebrow index={i + 1} as="span">
                  {['Arrive', 'Feel', 'After'][i]}
                </Eyebrow>
                <h3>{qa.question}</h3>
                <p className={styles.muted}>{qa.answer}</p>
              </li>
            ))}
          </Reveal>
          <p className={styles.source}>Source: /reiki/ — intro questions</p>
        </Sub>

        <Sub title="Split feature · 7/5">
          <SplitFeature image={MEDIA.reikiCrystals} eyebrow={S.HOME_REIKI_FEATURE.eyebrow} heading={S.HOME_REIKI_FEATURE.heading} headingLevel={3}>
            <p>{S.HOME_REIKI_FEATURE.text}</p>
            <TextLink href="/reiki/">Learn More</TextLink>
          </SplitFeature>
          <p className={styles.source}>Source: / — Reiki feature</p>
        </Sub>

        <Sub title="Day timeline · retreats">
          <DayTimeline steps={S.RETREAT_JOURNEY} />
          <p className={styles.source}>Source: /one-day-healing-retreats-in-bali/ — Your Day Retreat Journey</p>
        </Sub>

        <Sub title="Facilitator strip · ring portraits">
          <FacilitatorStrip people={FACILITATORS} headingLevel={4} />
          <p className={styles.source}>Source: / — Our Facilitators (names and specialties verbatim)</p>
        </Sub>

        <Sub title="Booking call to action">
          <BookingCTA heading={S.REIKI_CTA.heading} buttonLabel={S.REIKI_CTA.button} secondary={{ label: 'Contact us', href: '/contact/' }} headingLevel={3} />
          <p className={styles.source}>Source: /reiki/ — closing CTA. Button opens the live booking page ({BOOKING_URL}).</p>
        </Sub>
      </Section>

      {/* ---------- 10 Responsive ---------- */}
      <Section id="responsive" index={10} title="Responsive behaviour" tone="alt">
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Breakpoint</th>
                <th scope="col">Width</th>
                <th scope="col">What changes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Base</th>
                <td>320–479</td>
                <td>Single column; Book Now moves into the menu; primary buttons go full width; timeline vertical.</td>
              </tr>
              <tr>
                <th scope="row">sm</th>
                <td>≥480</td>
                <td>Header shows Book Now beside Menu.</td>
              </tr>
              <tr>
                <th scope="row">md</th>
                <td>≥768</td>
                <td>Two-column forms and cards; crops switch to portrait ratios.</td>
              </tr>
              <tr>
                <th scope="row">lg</th>
                <td>≥1024</td>
                <td>7/5 editorial splits; horizontal day timeline; parallax on; footer 4+8 layout.</td>
              </tr>
              <tr>
                <th scope="row">nav</th>
                <td>≥1200</td>
                <td>Full desktop navigation with disclosure menus and mega-panel; Menu button hidden.</td>
              </tr>
              <tr>
                <th scope="row">xl / 2xl</th>
                <td>≥1280 / ≥1536</td>
                <td>Wider gutters; content capped at 1200px, wide sections at 1440px.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.note}>Resize the window, or test at 375, 768 and 1440px. Header behaviour: compact after 24px of scroll, hides on scroll down, returns on scroll up or when anything in it gets focus.</p>
      </Section>

      {/* ---------- 11 Motion ---------- */}
      <Section
        id="motion"
        index={11}
        title="Motion"
        intro="GSAP + ScrollTrigger, used sparingly: one ring draw, soft image unmasking, gentle staggered rises, ≤8% parallax on two or three hero images, and a single pinned timeline on retreat pages (desktop). Content is never hidden before JavaScript runs; reduced motion turns everything off."
      >
        <MotionLab />
        <Reveal className={styles.revealDemo} variant="clip">
          <Figure image={MEDIA.soundGarden} aspect="16 / 9" sizes="(min-width: 1024px) 60vw, 100vw" caption="Scroll reveal · clip unmask (runs when scrolled into view)" />
        </Reveal>
      </Section>
    </div>
  );
}
