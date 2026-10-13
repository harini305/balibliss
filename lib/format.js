/** "9 October 2026" — fixed to the site's locale and Bali's time zone so server and client agree. */
export function formatDate(iso) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Makassar' }).format(new Date(iso));
}
