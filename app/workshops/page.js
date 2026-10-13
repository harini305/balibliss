import CombinedPage from '@/components/page/CombinedPage';
import { COMBINED } from '@/lib/routes.mjs';
import { getPage } from '@/lib/content';
import { MEDIA } from '@/content/media';
import { NOT_SURE } from '@/content/home';
import { whatsappLink } from '@/content/site';

const config = COMBINED.find((c) => c.path === '/workshops/');

export async function generateMetadata() {
  const page = await getPage('yoga-alignment-fundamentals');
  return {
    title: 'Workshops',
    description: page?.seo?.description,
    alternates: { canonical: '/workshops/' },
  };
}

export default function Workshops() {
  return (
    <CombinedPage
      config={config}
      title="Workshops"
      tagline="Yoga Alignment & Fundamentals"
      bannerImage={MEDIA.retreatSteps}
      closing={{
        heading: NOT_SURE.heading,
        text: NOT_SURE.text,
        buttonLabel: 'Chat with us on WhatsApp',
        href: whatsappLink("Hello Bali Bliss, I'd like to ask about your workshops."),
      }}
    />
  );
}
