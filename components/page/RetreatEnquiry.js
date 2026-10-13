import EnquiryComposer from '@/components/forms/EnquiryComposer';
import Figure from '@/components/ui/Figure';
import Icon from '@/components/ui/Icon';
import { WHATSAPP, whatsappLink } from '@/content/site';
import { MEDIA } from '@/content/media';
import styles from './RetreatEnquiry.module.css';

/**
 * Replaces the live page's Divi request form. The source form only collected a request
 * (name, contact, dates, experience, notes), so this prepares the same request in WhatsApp
 * or email — nothing is sent until the visitor presses send there.
 */
export default function RetreatEnquiry() {
  return (
    <section id="request-dates" className={`container-wide ${styles.wrap}`} aria-labelledby="retreat-enquiry">
      <div className={styles.copy}>
        <h2 id="retreat-enquiry" className={styles.title}>
          Request Your Dates
        </h2>
        <p className={styles.note}>This form prepares your request in WhatsApp or your email app. Nothing is sent until you press send there.</p>
        <Figure image={MEDIA.soundGarden} aspect="4 / 3" sizes="(min-width: 1024px) 30vw, 92vw" className={styles.photo} />
        <ul className={styles.direct}>
          <li>
            <a href={whatsappLink("Hello Bali Bliss, I'd like to request dates for a retreat.")}>
              <Icon name="whatsapp" size={17} />
              {WHATSAPP.display}
            </a>
          </li>
          <li>
            <a href="mailto:bookings@balibliss.net">
              <Icon name="mail" size={17} />
              bookings@balibliss.net
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.form}>
        <EnquiryComposer idPrefix="weekend" whatsappNumber={WHATSAPP.number} email="bookings@balibliss.net" />
      </div>
    </section>
  );
}
