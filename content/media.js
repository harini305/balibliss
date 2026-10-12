// Registry of imported source images (see scripts/assets-map.json for originals).
// Dimensions are intrinsic pixel sizes measured after import. Tier: A ≥1400w, B 800–1399w, C <800w.
// `position` is the art-directed focal point used for object-position crops.

export const MEDIA = {
  logo: { src: '/media/brand/bali-bliss-logo.png', width: 1626, height: 512, alt: 'Bali Bliss — reconnect restore renew' },
  logoWhite: { src: '/media/brand/bali-bliss-logo-white.png', width: 809, height: 255, alt: 'Bali Bliss — reconnect restore renew' },
  symbol: { src: '/media/brand/bali-bliss-symbol.png', width: 958, height: 988, alt: '' },

  retreatSteps: {
    src: '/media/retreats/retreat-jungle-steps.jpg',
    width: 1920,
    height: 950,
    tier: 'A',
    position: '50% 18%',
    alt: 'A woman in a red dress walking down stone steps through tropical greenery in Bali',
  },
  jeroMangku: {
    src: '/media/retreats/jero-mangku-artha.jpg',
    width: 800,
    height: 500,
    tier: 'B',
    position: '68% 40%',
    alt: 'Jero Mangku Artha at a Balinese water temple with ceremonial umbrellas',
  },
  melukat: {
    src: '/media/retreats/melukat-water-blessing.jpg',
    width: 800,
    height: 500,
    tier: 'B',
    position: '60% 35%',
    alt: 'A Balinese priest blessing a guest beneath a sacred spring during Melukat',
  },
  soundGarden: {
    src: '/media/retreats/sound-healing-garden.jpg',
    width: 800,
    height: 500,
    tier: 'B',
    position: '35% 50%',
    alt: 'A facilitator playing a singing bowl over a client resting in a garden pavilion',
  },
  reikiCrystals: {
    src: '/media/services/reiki/reiki-with-crystals.jpg',
    width: 1100,
    height: 579,
    tier: 'B',
    position: '55% 50%',
    alt: 'A client lying on a mat during a Reiki session, with crystals and flowers beside her',
  },
  soundPavilion: {
    src: '/media/services/sound-therapy/singing-bowl-pavilion.jpg',
    width: 450,
    height: 335,
    tier: 'C',
    position: '70% 40%',
    alt: 'A facilitator holding a singing bowl above a seated client in an open pavilion',
  },
  oracleCards: {
    src: '/media/services/inner-guidance/oracle-cards-table.jpg',
    width: 1536,
    height: 1024,
    tier: 'A',
    position: '50% 55%',
    alt: 'Three oracle cards laid on a wooden table beside flowers, crystals and a candle',
  },

  lia: { src: '/media/people/lia-natali.jpg', width: 1024, height: 1536, tier: 'B', position: '50% 28%', alt: 'Lia Natali' },
  arsita: { src: '/media/people/arsita-putri.jpg', width: 400, height: 400, tier: 'C', position: '50% 35%', alt: 'Arsita Putri' },
  kiki: { src: '/media/people/kiki-dewi.jpg', width: 600, height: 600, tier: 'C', position: '50% 30%', alt: 'Kiki Dewi' },
  yuli: { src: '/media/people/kadek-yuli.jpg', width: 400, height: 400, tier: 'C', position: '50% 35%', alt: 'Kadek Yuli' },
  yulia: { src: '/media/people/yulia-andriyani.jpg', width: 800, height: 800, tier: 'C', position: '50% 30%', alt: 'Yulia Andriyani' },
};
