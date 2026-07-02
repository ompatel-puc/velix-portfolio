'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroContent() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl
        .from('.hc-badge', { opacity: 0, y: 8,  duration: 0.4 }, 1.0)
        .from('.hc-line',  { opacity: 0, y: 30, duration: 0.7, stagger: 0.1 }, 1.1)
        .from('.hc-sub',   { opacity: 0, y: 16, duration: 0.55 }, 1.58)
        .from('.hc-btn',   { opacity: 0, y: 12, duration: 0.45, stagger: 0.1 }, 1.78)
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className="flex flex-col items-center text-center gap-6 mt-10 max-w-4xl mx-auto"
    >
      {/* Eyebrow badge */}
      <div className="hc-badge">
        <span className="badge-accent">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-velix-accent animate-pulse" />
          Premium Web Agency
        </span>
      </div>

      {/* Heading — progressive size hierarchy */}
      <h1
        className="flex flex-col items-center"
        style={{ gap: '0.05em' }}
        aria-label="Building Premium Digital Experiences"
      >
        {/* Line 1 — smallest */}
        <span
          className="hc-line block font-heading font-bold text-white"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
          }}
        >
          Building
        </span>

        {/* Line 2 — medium */}
        <span
          className="hc-line block font-heading font-bold text-white"
          style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 4.5rem)',
            lineHeight: 1.06,
            letterSpacing: '-0.04em',
          }}
        >
          Premium
        </span>

        {/* Line 3 — largest, "Digital" in accent */}
        <span
          className="hc-line block font-heading font-bold"
          style={{
            fontSize: 'clamp(3.2rem, 8.5vw, 5.75rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.05em',
            color: '#fff',
          }}
        >
          <span style={{ color: '#E9FF00' }}>Digital</span>
          {' '}Experiences
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className="hc-sub text-velix-muted leading-relaxed max-w-xl"
        style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.0625rem)' }}
      >
        Velix builds fast, modern and conversion-focused websites and web applications
        that help businesses grow.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="#work" className="hc-btn">
          <Button
            size="default"
            variant="default"
            className="group transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_24px_rgba(233,255,0,0.4)]"
          >
            View Our Work
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
        <Link href="#contact" className="hc-btn">
          <Button
            size="default"
            variant="secondary"
            className="group transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
          >
            <Calendar className="h-4 w-4" />
            Book a Free Call
          </Button>
        </Link>
      </div>
    </div>
  )
}
