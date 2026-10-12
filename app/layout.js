import { Fraunces, Instrument_Sans } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SITE } from '@/content/site';
import '@/styles/tokens.css';
import '@/styles/globals.css';

// Self-hosted at build time by next/font — no runtime request to Google.
const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'opsz'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.fullName,
    template: `%s | ${SITE.fullName}`,
  },
  openGraph: {
    siteName: SITE.fullName,
    locale: 'en_GB',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#faf6ef',
};

export default function RootLayout({ children }) {
  return (
    // data-scroll-behavior: keeps CSS smooth scrolling for in-page anchors but lets
    // route changes jump to the top instantly (Next 16 opt-in).
    <html lang="en" className={`${fraunces.variable} ${instrument.variable}`} data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
