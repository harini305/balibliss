import { BOOKING_URL, whatsappLink } from '@/content/site';

/**
 * Resolves a page or block call to action to a real destination. Nothing here simulates
 * a booking: 'booking' opens the live booking system, 'whatsapp' opens a prefilled chat
 * the visitor still has to send, 'email' opens their mail app.
 */
export function resolveAction(action, { href, title } = {}) {
  switch (action) {
    case 'booking':
      return { href: BOOKING_URL, external: true };
    case 'whatsapp':
      return { href: whatsappLink(title ? `Hello Bali Bliss, I'd like to ask about ${title}.` : undefined), external: true, whatsapp: true };
    case 'email':
      return href ? { href, external: true } : null;
    case 'internal':
      return href ? { href, external: false } : null;
    default:
      return null;
  }
}
