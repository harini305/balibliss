import InsightsListing from '@/components/insights/InsightsListing';
import { getPostIndex } from '@/lib/content';

export const metadata = {
  title: 'Insights',
  description: 'Articles on Reiki, sound therapy, yoga, Qigong, somatic healing and everyday wellness from Bali Bliss Wellness & Healing in Ubud, Bali.',
  alternates: { canonical: '/insights/' },
};

export default function InsightsPage() {
  return (
    <InsightsListing
      posts={getPostIndex()}
      page={1}
      title="Insights"
      basePath="/insights/"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Insights' }]}
    />
  );
}
