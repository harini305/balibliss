# Page content schema

Each public page (except home, insights and posts) is one file: `content/pages/<slug>.js`
with `export default { ... }`. The slug is the live URL path without slashes
(`/sacred_cacao-ceremony/` → `sacred_cacao-ceremony.js`). Pages are rendered by
`components/page/PageTemplate.js`, which maps every block `type` to a section component.

## Rules

- **Verbatim.** Headings, paragraphs, list items, FAQs, testimonials, prices, durations and
  names are copied exactly from the live page at https://balibliss.net/<slug>/. Never write new
  marketing copy, never invent facts, prices, schedules, credentials or reviews.
- Allowed corrections: obvious spelling typos only (e.g. "Relaxe" → "Relax", "en d" → "end",
  "Whats Included" → "What's Included"). Record every one in `notes`.
- Facts that conflict between pages, copy-paste errors, broken/wrong links: keep the source
  wording and record the issue in `notes` (shown to the owner for review, never rendered).
- `seo.description` is the only new text: ≤ 155 characters, built from the page's own sentences.
- Skip Divi junk: icon-font glyphs, empty headings, duplicate blocks, "Select Page", widgets.
- Paragraph strings are plain text. Use `**bold**` only where the source bolds a lead-in.

## Shape

```js
export default {
  slug: 'reiki',
  kind: 'service',            // service | retreat | training | workshop | bio | partners | legal | info
  section: { label: 'Wellness Sessions', href: '/wellness-sessions/' }, // breadcrumb parent (null for top level)
  title: 'Reiki Healing',     // the page H1, verbatim
  tagline: '…' | null,        // the hero sub-heading / strap line, verbatim
  intro: ['…'],               // hero paragraph(s), verbatim (may be [])
  seo: { title: 'Reiki Healing in Ubud', description: '…' },
  hero: {
    variant: 'split',         // split (image right) | full (full-bleed image, text below) | portrait (tall image + text column) | plain (no image)
    image: IMAGE | null,
  },
  cta: 'booking',             // booking (live Amelia /bookings/) | whatsapp (prefilled WhatsApp enquiry) | email | none
  ctaLabel: 'Book a Reiki Session', // verbatim source button label when one exists, else a plain label
  facts: [{ term: 'Duration', value: '3 Hours' }], // key facts shown in the hero (only values published on the page)
  blocks: [ /* BLOCK, … in source order */ ],
  notes: ['…'],               // review notes for the owner; not rendered
};
```

`IMAGE` = `{ src: '/media/<group>/<slug>/<name>.jpg', width, height, alt, position: '50% 40%' }`
(width/height are the real pixel size printed by the import script; alt describes what is
actually in the photo — never copy the source's wrong alts such as "Reiki with Crystals" on a
sound photo; `position` is the focal point for cropping).

### Block types

| type | fields | use for |
|---|---|---|
| `qa` | `heading?`, `items: [{ q, a: string[] }]` | the intro question/answer pairs ("What is…", "Who is it for…") |
| `prose` | `eyebrow?`, `heading`, `paragraphs: string[]`, `list?: string[]`, `image?: IMAGE` | a heading with body copy (optionally a photo) |
| `list` | `heading`, `intro?`, `items: string[]`, `style?: 'check' \| 'plain'` | benefits, inclusions, "is this right for you", practical info |
| `steps` | `heading`, `intro?`, `steps: [{ title, text }]` | "What to expect", numbered journeys |
| `timeline` | `heading`, `intro?`, `steps: [{ time, title, text, note? }]` | timed retreat schedules (Morning / 10:00 …) |
| `cards` | `heading`, `intro?`, `items: [{ title, text, image?, meta? }]` | yoga class types, retreat options, partner venues |
| `people` | `heading`, `items: [{ name, role?, text?, href?, image? }]` | facilitator / priest cards; `href` only to real bio pages |
| `faq` | `heading`, `items: [{ q, a: string[] }]` | FAQ toggles |
| `testimonials` | `heading`, `items: [{ quote, name, source? }]` | on-page client quotes, verbatim |
| `details` | `heading`, `items: [{ term, value }]`, `text?` | prices, durations, availability, location as published |
| `gallery` | `heading?`, `images: IMAGE[]` | extra photos |
| `legal` | `sections: [{ heading, paragraphs: string[], list?: string[] }]` | privacy / terms text |
| `cta` | `heading`, `text?`, `label`, `action: 'booking' \| 'whatsapp' \| 'email' \| 'internal'`, `href?` | closing call to action (source wording) |

Images: add each source image you use to `scripts/assets/<group>.json`
(`{ "assets": [{ "src": "2025/03/File.jpg", "out": "public/media/…/name.jpg", "alt": "…" }] }`,
`src` relative to https://balibliss.net/wp-content/uploads/ and **without** the `-WIDTHxHEIGHT`
thumbnail suffix), then run `node scripts/fetch-assets.mjs`, which skips existing files and prints
the real dimensions. Reuse existing files in `public/media/` (see `content/media.js`) instead of
re-downloading. Do not use Divi demo stock (`meditation-center-*`, `portrait-square-*`) or the
WooCommerce placeholder. Images that are clearly AI-generated (e.g. `ChatGPT-Image-*`) may be used
only when the page has no other photo, and must be listed in `notes`.
