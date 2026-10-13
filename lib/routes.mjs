// One page per menu item. The former sub-pages are now sections of these pages; their old URLs
// redirect to the section anchor (see next.config.mjs) and every internal link is rewritten with
// hrefFor(). Plain JS (no path aliases) so next.config.mjs can import it too.

export const COMBINED = [
  {
    path: '/wellness-sessions/',
    label: 'Wellness Sessions',
    groups: [
      { label: 'Healing', slugs: ['reiki', 'sound-therapy'] },
      { label: 'Nervous System Regulation', slugs: ['somatic-practices', 'soul-full'] },
      { label: 'Rituals & Ceremonies', slugs: ['sacred_cacao-ceremony', 'inner-guidance'] },
      { label: 'Massage Therapy', slugs: ['facial-reflexology-massage', 'intuitive-healing-massage', 'chi-nei-tsang-healing', 'postural-alignment-therapy'] },
      { label: 'Movement', slugs: ['yoga', 'qigong-session', 'mat-pilates'] },
    ],
  },
  {
    path: '/one-day-healing-retreats-in-bali/',
    label: 'Day Retreats',
    hub: 'one-day-healing-retreats-in-bali',
    groups: [
      {
        label: 'Day Retreats',
        slugs: [
          'purification-and-blessing',
          'sacred-healing-purification-ritual',
          'sacred-birthday-blessing-ceremony',
          'sacred-renewal-immersion',
          'sound-soul-healing-immersion',
          'weekend-mini-retreats',
        ],
      },
    ],
  },
  { path: '/workshops/', label: 'Workshops', groups: [{ label: 'Workshops', slugs: ['yoga-alignment-fundamentals'] }] },
  { path: '/training/', label: 'Training', groups: [{ label: 'Usui Reiki Training', slugs: ['usui-reiki-training-level-1', 'usui-reiki-training-level-2'] }] },
  {
    path: '/about/',
    label: 'About',
    groups: [
      { label: 'Facilitators', slugs: ['about-lia-natali', 'about-arsita-putri', 'about-kiki-dewi', 'about-kadek-yuli', 'about-yulia-andriyani'] },
      { label: 'Partners', slugs: ['partners'] },
    ],
  },
];

const HOME_OF = new Map(COMBINED.flatMap((c) => c.groups.flatMap((g) => g.slugs.map((s) => [s, c.path]))));

/** True when a content page is now a section of a combined page (it gets no URL of its own). */
export const isMerged = (slug) => HOME_OF.has(slug);

/** '/reiki/' → '/wellness-sessions/#reiki'; anything else is returned unchanged. */
export function hrefFor(href) {
  if (typeof href !== 'string') return href;
  const m = href.match(/^\/([^/#?]+)\/?$/);
  if (!m || !HOME_OF.has(m[1])) return href;
  return `${HOME_OF.get(m[1])}#${m[1]}`;
}

/** Permanent redirects from the former sub-page URLs to their sections. */
export function mergedRedirects() {
  return [...HOME_OF].map(([slug, path]) => ({ source: `/${slug}`, destination: `${path}#${slug}`, permanent: true }));
}
