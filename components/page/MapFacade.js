'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import styles from './MapFacade.module.css';

/** Click-to-load Google Map: no third-party request until the visitor asks for it. */
export default function MapFacade({ src, title }) {
  const [on, setOn] = useState(false);
  return (
    <div className={styles.frame}>
      {on ? (
        <iframe src={src} title={title} className={styles.iframe} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      ) : (
        <button type="button" className={styles.button} onClick={() => setOn(true)}>
          <Icon name="info" size={22} />
          <span>Show the map</span>
          <span className={styles.hint}>Loads Google Maps</span>
        </button>
      )}
    </div>
  );
}
