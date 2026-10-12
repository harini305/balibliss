// Inline stroke icons (24×24, 1.5px stroke). Decorative by default; pass `label` to expose.
const PATHS = {
  'arrow-right': <path d="M4 12h15m-6-6 6 6-6 6" />,
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
