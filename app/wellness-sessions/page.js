import CombinedPage from '@/components/page/CombinedPage';
import { COMBINED } from '@/lib/routes.mjs';
import { SITE } from '@/content/site';
import { MEDIA } from '@/content/media';
import { RETREATS } from '@/content/home';

export const metadata = {
  title: 'Wellness Sessions in Ubud',
  description:
    'Reiki, sound therapy, somatic practices, Soul Full, cacao ceremony, inner guidance, facial reflexology, massage, Chi Nei Tsang, Mat Pilates, Qigong and yoga at Bali Bliss in Ubud.',
  alternates: { canonical: '/wellness-sessions/' },
};

const config = COMBINED.find((c) => c.path === '/wellness-sessions/');

export default function WellnessSessions() {
  return (
    <CombinedPage
      config={config}
      title="Wellness Sessions"
      tagline={SITE.footerIntro}
      bannerImage={MEDIA.soundVeranda}
      closing={{ heading: RETREATS.heading, text: RETREATS.lead, buttonLabel: RETREATS.cta, href: RETREATS.href }}
    />
  );
}
