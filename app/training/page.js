import CombinedPage from '@/components/page/CombinedPage';
import { COMBINED } from '@/lib/routes.mjs';
import { MEDIA } from '@/content/media';
import { NOT_SURE } from '@/content/home';
import { whatsappLink } from '@/content/site';

export const metadata = {
  title: 'Usui Reiki Training in Ubud',
  description: 'Usui Reiki Training Level 1 and Level 2 with Lia Natali at Bali Bliss Wellness & Healing in Ubud, Bali — in person or online.',
  alternates: { canonical: '/training/' },
};

const config = COMBINED.find((c) => c.path === '/training/');

export default function Training() {
  return (
    <CombinedPage
      config={config}
      title="Usui Reiki Training"
      tagline="Level 1 · Level 2"
      bannerImage={MEDIA.oracleCards}
      closing={{
        heading: NOT_SURE.heading,
        text: NOT_SURE.text,
        buttonLabel: 'Chat with us on WhatsApp',
        href: whatsappLink("Hello Bali Bliss, I'd like to ask about Usui Reiki Training."),
      }}
    />
  );
}
