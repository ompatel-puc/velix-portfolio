'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { fadeInUp, viewportOnce } from '@/lib/animations'

/* ── Animated counter data ────────────────────────────────── */
interface Stat {
  end: number
  suffix: string
  label: string
}

const STATS: Stat[] = [
  { end: 50,  suffix: '+', label: 'Projects Delivered' },
  { end: 20,  suffix: '+', label: 'Happy Clients'      },
  { end: 5,   suffix: '★', label: 'Average Rating'     },
  { end: 100, suffix: '%', label: 'Client Satisfaction' },
]

/* easeOut cubic */
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

/* ── Single animated stat card ────────────────────────────── */
function StatCard({ stat, running }: { stat: Stat; running: boolean }) {
  const [display, setDisplay] = useState(0)
  const rafRef  = useRef<number>(0)
  const startTs = useRef<number>(0)
  const DURATION = 1600 // ms

  const animate = useCallback(() => {
    const tick = (now: number) => {
      if (!startTs.current) startTs.current = now
      const elapsed  = now - startTs.current
      const progress = Math.min(elapsed / DURATION, 1)
      setDisplay(Math.round(stat.end * easeOut(progress)))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [stat.end])

  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    startTs.current = 0
    if (running) {
      animate()
    } else {
      setDisplay(0)
    }
    return () => cancelAnimationFrame(rafRef.current)
  }, [running, animate])

  return (
    <div
      className="glass-card group flex flex-col items-center justify-center rounded-2xl p-8 text-center"
      style={{ willChange: 'transform' }}
    >
      <span className="font-heading text-4xl font-bold text-white leading-none tabular-nums">
        {display}
        <span className="text-velix-accent">{stat.suffix}</span>
      </span>
      <span className="text-caption mt-2 text-center">{stat.label}</span>
      <div
        className="mt-4 h-px w-8 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'linear-gradient(90deg, #E9FF00, transparent)' }}
      />
    </div>
  )
}

/* ── Main section ─────────────────────────────────────────── */
export function AboutSection() {
  const statsRef  = useRef<HTMLDivElement>(null)
  const [running, setRunning] = useState(false)

  /* IntersectionObserver — starts counters on entry, resets on exit */
  useEffect(() => {
    const el = statsRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setRunning(entry.isIntersecting)
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="relative overflow-hidden bg-velix-bg py-28 lg:py-36">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -left-64 top-1/2 h-150 w-150 -translate-y-1/2 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(233,255,0,0.12) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />

      <Container>
        <div className="flex flex-col items-center gap-16 text-center">

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-section text-white"
          >
            We Are creative{' '}
            <span className="gradient-text">technologists.</span>
          </motion.h2>

          {/* ── Animated stats: four in a row ── */}
          <div ref={statsRef} className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <StatCard key={s.label} stat={s} running={running} />
            ))}
          </div>

        </div>
      </Container>
    </section>
  )
}
