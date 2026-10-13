// Only real photographs of Bali Bliss are shown. Several images on the live site are AI-generated
// (reviewed 2026-10-13); they are filtered out here, centrally, so no page or card can show them.
// Replacements are real Bali Bliss photographs; their alt text describes what is actually shown.
import { MEDIA } from '@/content/media';

const img = (src, width, height, alt, position = '50% 50%') => ({ src, width, height, alt, position });

/** Real photographs from the live site that are not in MEDIA. */
export const REAL = {
  reikiPavilion: img('/media/services/reiki/reiki-garden-pavilion.jpg', 450, 335, 'A facilitator giving Reiki to a client lying on a mat in an open garden pavilion', '60% 50%'),
  guidanceVeranda: img('/media/services/inner-guidance/guidance-session-veranda.jpg', 1100, 580, 'Two women sharing an inner guidance session at a table on a garden veranda', '50% 50%'),
  foreheadMassage: img('/media/services/facial-reflexology/forehead-massage.jpg', 450, 335, "A practitioner's hands resting on a client's forehead during a facial massage", '50% 40%'),
  shoulderMassage: img('/media/services/intuitive-healing-massage/shoulder-massage-paisley.jpg', 450, 600, "A practitioner massaging a client's shoulders as she lies on a paisley bedspread", '50% 40%'),
  deepStretch: img('/media/services/yoga/deep-stretch-assist.jpg', 400, 445, "A yoga teacher gently stretching a student's arm as she lies on a mat", '50% 50%'),
  cobraAssist: img('/media/services/yoga/vinyasa-cobra-assist.jpg', 400, 445, 'A yoga teacher assisting a student in cobra pose', '50% 50%'),
  yogaWeights: img('/media/services/yoga/yoga-with-weights.jpg', 400, 445, 'A woman holding light hand weights overhead in a lunge on a yoga mat in a garden', '50% 40%'),
  restorative: img('/media/services/yoga/restorative-bolster.jpg', 400, 445, 'A student resting over a bolster in a restorative yoga pose', '50% 50%'),
  liaSession: img('/media/retreats/sacred-renewal-immersion/lia-healing-session.jpg', 800, 500, "Lia Natali cradling a client's head as she lies on a garden daybed during a healing session", '60% 45%'),
  melukatSpring: img('/media/retreats/sacred-renewal-immersion/melukat-spring.jpg', 800, 500, 'A guest bowing beneath a sacred spring as a Balinese priest watches during Melukat', '55% 45%'),
  blessingBracelet: img('/media/retreats/sacred-birthday-blessing-ceremony/blessing-bracelet.jpg', 800, 500, "A Balinese priest holding a guest's hands during a blessing ceremony", '50% 45%'),
};

// Folders whose photographs are all AI-generated, plus single AI files elsewhere.
const AI_FOLDERS = [
  '/media/services/chi-nei-tsang-healing/',
  '/media/services/mat-pilates/',
  '/media/services/postural-alignment-therapy/',
  '/media/services/qigong-session/',
  '/media/services/somatic-practices/',
  '/media/services/soul-full/',
  '/media/services/yoga-alignment-fundamentals/',
];
const AI_FILES = ['/media/services/sacred-cacao-ceremony/singing-bowls-garden.jpg'];

// Small live-site exports replaced by their full-size originals.
const UPGRADES = { '/media/services/sound-therapy/singing-bowl-veranda.jpg': MEDIA.soundVeranda };
const upgrade = (image) => (image?.src && UPGRADES[image.src] ? { ...UPGRADES[image.src], alt: image.alt ?? UPGRADES[image.src].alt } : image);

export const isAiImage = (image) => Boolean(image?.src) && (AI_FOLDERS.some((f) => image.src.startsWith(f)) || AI_FILES.includes(image.src));

/** Real hero photograph for pages whose own photographs are AI-generated. */
export const HERO_REPLACEMENT = {
  'chi-nei-tsang-healing': MEDIA.backMassage,
  'postural-alignment-therapy': REAL.foreheadMassage,
  'somatic-practices': REAL.restorative,
  yoga: MEDIA.yogaGroup,
  'soul-full': REAL.reikiPavilion,
  'qigong-session': MEDIA.yulia,
  'mat-pilates': MEDIA.kiki,
  'yoga-alignment-fundamentals': REAL.deepStretch,
};

// Blog featured images that are real photographs (all others on the live blog are AI-generated).
const REAL_POST_IMAGES = new Set([
  'benefits-of-private-yoga-classes-for-beginners-visiting-bali',
  'sound-healing-unveiled-understanding-chakra-vibrational-therapy-energy-balancing-chakra-meridian-massage-therapy',
  'the-many-faces-of-reiki-choosing-the-path-that-resonates',
  'what-is-facial-reflexology-and-how-does-it-help-you-relax',
  'what-is-reiki-healing',
  'what-is-sound-healing-and-how-does-it-work',
]);

// Real photographs to stand in for AI featured images, by the post's main topic.
const POOLS = {
  'reiki-healing': [MEDIA.reikiCrystals, MEDIA.reikiHands, REAL.reikiPavilion],
  'sound-therapy': [MEDIA.soundBowlBody, MEDIA.soundGarden, MEDIA.soundVeranda],
  yoga: [MEDIA.yogaGroup, REAL.cobraAssist, REAL.yogaWeights, REAL.restorative],
  pilates: [REAL.yogaWeights, MEDIA.yogaHatha],
  qigong: [MEDIA.yogaHatha, MEDIA.yulia],
  melukat: [MEDIA.melukat, REAL.melukatSpring, MEDIA.riverBlessing],
  ceremony: [REAL.blessingBracelet, MEDIA.jeroMangku],
  'facial-reflexology': [MEDIA.facialMassage, REAL.foreheadMassage],
  'abdominal-massage': [MEDIA.backMassage],
  'inner-guidance': [MEDIA.oracleCards, MEDIA.cardReading, REAL.guidanceVeranda],
  'somatic-healing': [MEDIA.yogaGroup, REAL.restorative],
  default: [
    MEDIA.retreatSteps,
    MEDIA.crystalsTray,
    REAL.liaSession,
    MEDIA.soundPavilion,
    MEDIA.oracleCards,
    REAL.reikiPavilion,
    REAL.guidanceVeranda,
    MEDIA.soundGarden,
    MEDIA.reikiCrystals,
    MEDIA.facialEyeMask,
  ],
};

/**
 * Featured images for a list of posts (newest first): the post's own image when it is a real
 * photograph, else a real Bali Bliss photograph for its topic — never one used by the two posts
 * just before it, so neighbouring cards differ.
 */
export function withRealImages(posts) {
  const recent = [];
  const counters = {};
  return posts.map((post) => {
    let image = post.featuredImage;
    if (!REAL_POST_IMAGES.has(post.slug)) {
      const topic = post.categories?.find((c) => POOLS[c]) ?? 'default';
      const pool = POOLS[topic].length > 2 ? POOLS[topic] : [...POOLS[topic], ...POOLS.default];
      let i = counters[topic] ?? 0;
      for (let tries = 0; tries < pool.length && recent.includes(pool[i % pool.length].src); tries++) i++;
      image = pool[i % pool.length];
      counters[topic] = i + 1;
    }
    recent.push(image.src);
    if (recent.length > 2) recent.shift();
    return { ...post, featuredImage: image };
  });
}

/** A copy of a content page with every AI-generated photograph removed or replaced. */
export function cleanPage(page) {
  if (!page) return page;
  const hero = page.hero?.image;
  const heroImage = HERO_REPLACEMENT[page.slug] ?? (isAiImage(hero) ? null : upgrade(hero));
  const keep = (image) => (isAiImage(image) ? undefined : upgrade(image));
  const blocks = page.blocks.map((b) => {
    const out = { ...b };
    if ('image' in b) out.image = keep(b.image);
    if (b.items) out.items = b.items.map((it) => (it && typeof it === 'object' && 'image' in it ? { ...it, image: keep(it.image) } : it));
    if (b.images) out.images = b.images.filter((i) => !isAiImage(i)).map(upgrade);
    return out;
  });
  return { ...page, hero: { ...page.hero, image: heroImage }, blocks };
}
