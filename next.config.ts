import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* ── Performance ─────────────────────────────────────────── */
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  /* ── Images ──────────────────────────────────────────────── */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's0.wp.com',
        pathname: '/mshots/v1/**',
      },
    ],
  },

  /* ── Experimental ────────────────────────────────────────── */
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'gsap',
    ],
  },

  /* ── Security headers ────────────────────────────────────── */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',       value: 'nosniff'          },
          { key: 'X-Frame-Options',               value: 'DENY'             },
          { key: 'X-XSS-Protection',             value: '1; mode=block'    },
          { key: 'Referrer-Policy',               value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',            value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
