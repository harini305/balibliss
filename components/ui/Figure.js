import Image from 'next/image';
import Ring from './Ring';
import styles from './Figure.module.css';

/**
 * Art-directed image.
 * treatment: plain (square crop) | arch (rounded-top portrait) | ring (circular portrait inside the signature ring) | framed (sand mat + caption)
 * aspect: CSS aspect-ratio for the crop, e.g. '4 / 5'. Defaults to the intrinsic ratio.
 * alt is required: pass "" only for decorative images.
 */
export default function Figure({
  image,
  alt = image.alt,
  treatment = 'plain',
  aspect,
  sizes = '100vw',
  priority = false,
  caption,
  className = '',
  imgClassName = '',
}) {
  const ratio = aspect ?? `${image.width} / ${image.height}`;
  const img = (
    <Image
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      preload={priority}
      quality={90}
      className={`${styles.img} ${imgClassName}`}
      style={{ objectPosition: image.position ?? '50% 50%' }}
    />
  );

  if (treatment === 'ring') {
    return (
      <figure className={`${styles.figure} ${styles.ring} ${className}`}>
        <div className={styles.ringMask}>{img}</div>
        <Ring className={styles.ringStroke} size="100%" strokeWidth={1.25} />
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className={`${styles.figure} ${styles[treatment]} ${className}`}>
      <div className={styles.crop} style={{ aspectRatio: ratio }}>
        {img}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
