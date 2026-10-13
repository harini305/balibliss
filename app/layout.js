import { Inter, Mulish } from 'next/font/google';
import localFont from 'next/font/local';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnchorScroll from '@/components/layout/AnchorScroll';
import { SITE } from '@/content/site';
import '@/styles/tokens.css';
import '@/styles/globals.css';

// Typography matched to the reference the owner chose (houseofom.com): Bagnard for H1/H2,
// Inter for body, navigation, buttons and labels, Mulish for H3/H4 and footer titles.
// All self-hosted: Inter and Mulish by next/font at build time; Bagnard (SIL OFL 1.1, by
// Sébastien Sanfilippo, from github.com/sebsan/Bagnard) ships in app/fonts with its licence.
const bagnard = localFont({
  src: './fonts/Bagnard.otf',
  weight: '400',
  style: 'normal',
  variable: '--font-bagnard',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
  display: 'swap',
});

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mulish',
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
  themeColor: '#f7f5ef',
};

export default function RootLayout({ children }) {
  return (
    // data-scroll-behavior: keeps CSS smooth scrolling for in-page anchors but lets
    // route changes jump to the top instantly (Next 16 opt-in).
    // suppressHydrationWarning: the inline script below adds the "js" class before hydration.
    <html lang="en" className={`${bagnard.variable} ${inter.variable} ${mulish.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint so intro animations can start hidden
            without a flash. Without JS (or if hydration fails) nothing is ever hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <AnchorScroll />
      </body>
    </html>
  );
}
