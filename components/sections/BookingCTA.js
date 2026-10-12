import Button from '@/components/ui/Button';
import TextLink from '@/components/ui/TextLink';
import Ring from '@/components/ui/Ring';
import { BOOKING_URL } from '@/content/site';
import styles from './BookingCTA.module.css';

/**
 * Closing call to action on a dark band. The primary button always goes to the
 * existing live booking system; this component never simulates availability.
 */
export default function BookingCTA({ heading, text, buttonLabel = 'Book Now', href = BOOKING_URL, secondary, headingLevel = 2 }) {
  const H = `h${headingLevel}`;
  return (
    <div className={styles.band}>
      <Ring className={styles.ring} size={360} stroke="var(--c-lagoon-700)" strokeWidth={1.25} />
      <div className={styles.inner}>
        <H className={styles.heading}>{heading}</H>
        {text && <p className={styles.text}>{text}</p>}
        <div className={styles.actions}>
          <Button href={href} external variant="onDark" size="lg" icon="arrow-right" fullWidthOnMobile>
            {buttonLabel}
          </Button>
          {secondary && (
            <TextLink href={secondary.href} external={secondary.external} onDark>
              {secondary.label}
            </TextLink>
          )}
        </div>
      </div>
    </div>
  );
}
