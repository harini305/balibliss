import { RING_PATH } from './ringPath';

/** Static signature ring (decorative). For the animated version use motion/RingDraw. */
export default function Ring({ size = 96, stroke = 'var(--c-lagoon-700)', strokeWidth = 1.1, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true" focusable="false">
      <path d={RING_PATH} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
