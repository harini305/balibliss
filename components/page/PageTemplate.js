import PageHero from './PageHero';
import Blocks from './Blocks';
import BookingCTA from '@/components/sections/BookingCTA';
import PhotoBanner from '@/components/sections/PhotoBanner';
import { resolveAction } from '@/lib/actions';
import { MEDIA } from '@/content/media';

const CLOSING_BUTTON = { booking: 'Book Now', whatsapp: 'Chat with us on WhatsApp', email: 'Send an email' };
// Bookable experiences get a second "Contact Us" action beside the main one (collage day-retreat page).
const CONTACT_KINDS = ['retreat', 'training', 'workshop'];

/** Standalone inner page (bookings, legal, thank-you): banner + intro panel → blocks in source order → extras → closing band. */
export default function PageTemplate({ page, children, hideBlockTypes = [], afterHero = null }) {
  const crumbs = [{ label: 'Home', href: '/' }];
  if (page.section?.href) crumbs.push({ label: page.section.label, href: page.section.href });
  crumbs.push({ label: page.title });

  const action = resolveAction(page.cta, { title: page.title });
  const hasCtaBlock = page.blocks.some((b) => b.type === 'cta');
  const eyebrow = page.kind === 'bio' ? page.person?.role : page.section && !page.section.href ? page.section.label : null;
  const blocks = page.blocks.filter((b) => !hideBlockTypes.includes(b.type));

  return (
    <>
      <PageHero
        title={page.title}
        tagline={page.tagline}
        intro={page.intro}
        image={page.hero?.image}
        crumbs={crumbs}
        eyebrow={eyebrow}
        facts={page.facts}
        action={action}
        actionLabel={page.ctaLabel}
        contactLink={CONTACT_KINDS.includes(page.kind)}
      />

      {/* The facilitator's own words, as a quote band (skipped when the closing band repeats them). */}
      {page.kind === 'bio' && page.quote && !page.blocks.some((b) => b.type === 'cta' && b.heading === page.quote) && (
        <PhotoBanner image={MEDIA.soundGarden} quote={page.quote} cite={page.person?.name} align="right" label={`In ${page.person?.name ?? 'their'} words`} />
      )}

      {afterHero}

      <Blocks blocks={blocks} page={page} />

      {children}

      {!hasCtaBlock && action && (
        <section aria-label={page.ctaLabel}>
          <BookingCTA heading={page.ctaLabel} buttonLabel={CLOSING_BUTTON[page.cta]} href={action.href} />
        </section>
      )}

    </>
  );
}
