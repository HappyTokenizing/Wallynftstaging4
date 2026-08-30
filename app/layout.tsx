import type { Metadata } from 'next';
import './globals.css';
import './edition.css';
import './arrival.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://wallynftstaging4.vercel.app'),
  title: 'WALLY WORLD SERVICE — The RWA Report',
  description:
    'A special television bulletin from Wally and 1,000 leaders working to bring the real world onchain through fair, open RWA markets.',
  openGraph: {
    title: 'WALLY WORLD SERVICE — The RWA Report',
    description: '1,000 leaders. One mission. Bring the real world onchain.',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1733,
        height: 908,
        alt: 'Wally World Service — The real world is coming onchain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WALLY WORLD SERVICE — The RWA Report',
    description: '1,000 leaders. One mission. Bring the real world onchain.',
    images: ['/og.png'],
  },
  icons: {
    icon: '/wally-logo-mark.png',
    apple: '/wally-logo-mark.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
