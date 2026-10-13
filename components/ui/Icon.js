// Inline stroke icons (24×24, 1.5px stroke). Decorative by default; pass `label` to expose.
const PATHS = {
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3 19.5c.7-3.2 3.1-4.9 6-4.9s5.3 1.7 6 4.9" />
      <path d="M15.5 5.6a3.2 3.2 0 0 1 0 6M17.5 14.9c1.8.6 3 2.1 3.5 4.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </>
  ),
  list: <path d="M9 7h11M9 12h11M9 17h11M4.5 7h.01M4.5 12h.01M4.5 17h.01" />,
  lotus: (
    <>
      <path d="M12 5c1.8 2 2.6 4.3 2.6 6.6S13.6 16 12 17c-1.6-1-2.6-3-2.6-5.4S10.2 7 12 5Z" />
      <path d="M9.6 9.2C7.4 8.6 5.3 9 3.5 10c.8 3.6 4 7 8.5 7M14.4 9.2c2.2-.6 4.3-.2 6.1.8-.8 3.6-4 7-8.5 7" />
      <path d="M4 19.5h16" />
    </>
  ),
  hands: (
    <>
      <path d="M8 21v-4.5L4.8 12.3a1.6 1.6 0 0 1 2.5-2l2.2 2.4V5.5a1.4 1.4 0 0 1 2.8 0" />
      <path d="M16 21v-4.5l3.2-4.2a1.6 1.6 0 0 0-2.5-2l-2.2 2.4V5.5a1.4 1.4 0 0 0-2.8 0" />
    </>
  ),
  bowl: (
    <>
      <path d="M3.5 11h17a8.5 6.5 0 0 1-17 0Z" />
      <path d="M8 20h8M15 4l3 4" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  wave: <path d="M3 9c2.2 0 2.2-2 4.5-2S9.8 9 12 9s2.2-2 4.5-2S18.8 9 21 9M3 15c2.2 0 2.2-2 4.5-2s2.3 2 4.5 2 2.2-2 4.5-2 2.3 2 4.5 2" />,
  flame: (
    <>
      <path d="M12 21c3.6 0 6-2.5 6-5.8 0-3.6-2.8-5.6-3.6-9.2-1.7 1.4-2.5 3.2-2.4 5-1.4-.9-2.2-2.3-2.3-3.8C7.6 9 6 11.4 6 15.2 6 18.5 8.4 21 12 21Z" />
      <path d="M12 21c-1.6 0-2.6-1.1-2.6-2.6 0-1.6 1.3-2.5 2.6-4 1.3 1.5 2.6 2.4 2.6 4 0 1.5-1 2.6-2.6 2.6Z" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-13.5 15-14-.4 9.6-6 14.6-13.6 14.2" />
      <path d="M5 19c3-3.5 6-6 10-8" />
    </>
  ),
  'arrow-right': <path d="M4 12h15m-6-6 6 6-6 6" />,
  'arrow-left': <path d="M20 12H5m6-6-6 6 6 6" />,
  minus: <path d="M5 12h14" />,
  external: <path d="M8 16 17 7m-8 0h8v8" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5m0 3.2v.3" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5m0-9v.3" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6Z" />
      <path d="M9.2 8.6c.3-.5.8-.5 1.1 0l.6 1.3c.1.3 0 .6-.2.8l-.5.5a6 6 0 0 0 2.6 2.6l.5-.5c.2-.2.5-.3.8-.2l1.3.6c.5.3.5.8 0 1.1-.6.5-1.4.8-2.2.5a8 8 0 0 1-4.5-4.5c-.3-.8 0-1.6.5-2.2Z" />
    </>
  ),
  facebook: <path d="M14.5 8H16V5h-2a4 4 0 0 0-4 4v2H8v3h2v7h3v-7h2.2l.5-3H13V9a1 1 0 0 1 1-1Z" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.8 7.2v.1" />
    </>
  ),
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3.5" />
      <path d="m10.5 9.5 4 2.5-4 2.5Z" />
    </>
  ),
};

export default function Icon({ name, size = 20, label, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : 'true'}
      role={label ? 'img' : undefined}
      aria-label={label}
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
