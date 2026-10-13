import PageHero from '@/components/page/PageHero';
import EnquiryComposer from '@/components/forms/EnquiryComposer';
import BookingCTA from '@/components/sections/BookingCTA';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/motion/Reveal';
import { ENQUIRY_TOPICS, SOCIAL, BOOKING_URL, WHATSAPP, whatsappLink } from '@/content/site';
import { NOT_SURE } from '@/content/home';
import { MEDIA } from '@/content/media';
import styles from './contact.module.css';

// Destinations verified on the live site (content/contact-audit.json): the WhatsApp number
// used by every enquiry button and the email shown in the booking engine.
const BOOKINGS_EMAIL = 'bookings@balibliss.net';

export const metadata = {
  title: 'Contact',
  description: 'Contact Bali Bliss Wellness & Healing in Ubud, Bali by WhatsApp or email, or make a booking online.',
  alternates: { canonical: '/contact/' },
};


export default function Contact() {
  return (
    <>
      <PageHero title="Contact" tagline={NOT_SURE.heading} bannerImage={MEDIA.retreatSteps} crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      <section className={`container-wide ${styles.wrap}`} aria-labelledby="contact-title">
        <Reveal className={styles.info} stagger={0.08}>
          <h2 id="contact-title" className={styles.heading}>
            Get in Touch
          </h2>
          <p className={styles.lead}>{NOT_SURE.text}</p>
          <ul className={styles.channels}>
            <li className={styles.channel}>
              <span className={styles.chIcon} aria-hidden="true">
                <Icon name="pin" size={18} />
              </span>
              <span className={styles.chBody}>
                <span className={styles.label}>Location</span>
                <span className={styles.value}>Ubud, Bali</span>
              </span>
            </li>
            <li className={styles.channel}>
              <span className={styles.chIcon} aria-hidden="true">
                <Icon name="mail" size={18} />
              </span>
              <span className={styles.chBody}>
                <span className={styles.label}>Email</span>
                <a href={`mailto:${BOOKINGS_EMAIL}`} className={styles.value}>
                  {BOOKINGS_EMAIL}
                </a>
              </span>
            </li>
            <li className={styles.channel}>
              <span className={styles.chIcon} aria-hidden="true">
                <Icon name="whatsapp" size={18} />
              </span>
              <span className={styles.chBody}>
                <span className={styles.label}>WhatsApp</span>
                <a href={whatsappLink('Hello Bali Bliss,')} className={styles.value}>
                  {WHATSAPP.display}
                </a>
              </span>
            </li>
            <li className={styles.channel}>
              <span className={styles.chIcon} aria-hidden="true">
                <Icon name="calendar" size={18} />
              </span>
              <span className={styles.chBody}>
                <span className={styles.label}>Online booking</span>
                <a href={BOOKING_URL} className={styles.value}>
                  Make a Booking
                </a>
              </span>
            </li>
            <li className={styles.channel}>
              <span className={styles.chIcon} aria-hidden="true">
                <Icon name="users" size={18} />
              </span>
              <span className={styles.chBody}>
                <span className={styles.label}>Follow Us</span>
                <span className={styles.social}>
                  {SOCIAL.filter((s) => s.icon !== 'whatsapp').map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                      <Icon name={s.icon} size={17} label={`${s.label} (opens in a new tab)`} />
                    </a>
                  ))}
                </span>
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal className={`card ${styles.panel}`}>
          <div>
            <h2 className={styles.formTitle}>Send an enquiry</h2>
            <p className={styles.formNote}>This form prepares your message in WhatsApp or your email app. Nothing is sent until you press send there.</p>
            <EnquiryComposer idPrefix="contact" whatsappNumber={WHATSAPP.number} email={BOOKINGS_EMAIL} topics={ENQUIRY_TOPICS} />
          </div>
        </Reveal>
      </section>

      <section aria-label="Make a booking">
        <BookingCTA heading="Make a Booking" text="Choose your session and time in our online booking system." buttonLabel="Book Now" href={BOOKING_URL} image={MEDIA.retreatSteps} />
      </section>
    </>
  );
}
