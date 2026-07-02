import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you were looking for doesn\'t exist.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050816] px-6">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(233,255,0,0.06) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        {/* Glyph */}
        <div
          className="flex h-20 w-20 items-center justify-center rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #E9FF00 0%, #C4D900 100%)',
            boxShadow: '0 0 60px rgba(233,255,0,0.3)',
          }}
        >
          <span className="font-heading text-4xl font-black text-[#050816]">V</span>
        </div>

        {/* Error code */}
        <p
          className="font-heading font-black leading-none text-white/5 select-none"
          style={{ fontSize: 'clamp(6rem, 20vw, 14rem)', letterSpacing: '-0.05em' }}
          aria-hidden="true"
        >
          404
        </p>

        <div className="-mt-10 flex flex-col gap-3">
          <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            Page not found
          </h1>
          <p className="max-w-sm text-base text-[#A7B0C5]">
            This page doesn't exist or was moved. Let's get you back on track.
          </p>
        </div>

        <Link
          href="/"
          className="mt-2 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-heading text-sm font-semibold text-[#050816] transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
          style={{ background: 'linear-gradient(135deg, #E9FF00 0%, #C4D900 100%)', boxShadow: '0 0 24px rgba(233,255,0,0.25)' }}
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}
