import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Geist_Mono } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { MotionProvider }       from '@/components/providers/MotionProvider'
import { CustomCursor }         from '@/components/common/CustomCursor'
import { ScrollProgress }       from '@/components/common/ScrollProgress'
import { LoadingScreen }        from '@/components/common/LoadingScreen'
import { MouseFX }              from '@/components/common/MouseFX'
import { NoiseOverlay }         from '@/components/common/NoiseOverlay'
import { Navbar }               from '@/components/layout/Navbar'
import './globals.css'

/* ── Fonts ───────────────────────────────────────────────── */
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['300', '400', '500', '600'],
})
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
})

/* ── Metadata ────────────────────────────────────────────── */
const BASE_URL = 'https://velix.dev'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'Velix — Premium Web Development Agency',
    template: '%s · Velix',
  },
  description:
    'Velix builds premium websites and web applications with Next.js, React, and TypeScript. Pixel-perfect design, 100/100 Lighthouse scores, and exceptional results.',
  keywords: [
    'web development', 'Next.js agency', 'React development', 'TypeScript',
    'UI design', 'web design agency', 'premium websites', 'Velix',
    'high performance websites', 'SEO', 'landing page',
  ],
  authors: [{ name: 'Velix', url: BASE_URL }],
  creator: 'Velix',
  publisher: 'Velix',

  alternates: { canonical: '/' },

  /* ── Open Graph ── */
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Velix',
    title: 'Velix — Premium Web Development Agency',
    description: 'We build digital experiences that impress, convert, and endure.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Velix — Premium Web Development' }],
    locale: 'en_US',
  },

  /* ── Twitter / X ── */
  twitter: {
    card: 'summary_large_image',
    title: 'Velix — Premium Web Development Agency',
    description: 'We build digital experiences that impress, convert, and endure.',
    images: ['/og-image.png'],
    creator: '@velixdev',
    site: '@velixdev',
  },

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },

  /* ── Icons ── */
  icons: {
    icon: [
      { url: '/favicon.svg',  type: 'image/svg+xml' },
      { url: '/favicon.ico',  sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },

  /* ── Manifest ── */
  manifest: '/manifest.json',

  /* ── Other ── */
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: '#050816',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

/* ── JSON-LD structured data ─────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Velix',
  description: 'Premium web development agency crafting high-performance digital experiences.',
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.svg`,
  foundingDate: '2022',
  areaServed: 'Worldwide',
  serviceType: 'Web Development',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@velix.dev',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://github.com/velix',
    'https://twitter.com/velixdev',
    'https://linkedin.com/company/velix',
  ],
}

/* ── Favicon SVG (inline) ────────────────────────────────── */
/* Generated as public/favicon.svg — the V mark in accent yellow */

/* ── Root Layout ─────────────────────────────────────────── */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to external services used at runtime */}
        <link rel="preconnect" href="https://s0.wp.com" />
      </head>
      <body className="min-h-screen antialiased bg-[#050816]">
        {/* Skip-to-content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[99999] focus:rounded-lg focus:bg-[#E9FF00] focus:px-4 focus:py-2 focus:font-heading focus:text-sm focus:font-semibold focus:text-[#050816]"
        >
          Skip to content
        </a>

        <MotionProvider>
          <SmoothScrollProvider>
            {/* Ambient overlays — no interaction, no layout impact */}
            <NoiseOverlay />
            <MouseFX />

            <LoadingScreen />
            <ScrollProgress />
            <CustomCursor />
            <Navbar />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
          </SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
