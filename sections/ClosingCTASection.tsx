'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Container }     from '@/components/layout/Container'
import { MagneticButton } from '@/components/common/MagneticButton'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* Quote broken into lines — each reveals independently on scroll */
const LINES = [
  { text: 'Every great business deserves',             accent: false },
  { text: 'a website that works',                      accent: false },
  { text: 'as hard as you do.',                        accent: true  },
  { text: "Let's build something",                     accent: false, gap: true },
  { text: 'remarkable together.',                      accent: true  },
]

const STREAKS = [
  { left: '22%', dur: '13s', delay: '0s'  },
  { left: '58%', dur: '17s', delay: '4.5s' },
  { left: '79%', dur: '11s', delay: '8s'  },
]

export function ClosingCTASection() {
  return (
    <section
      id="closing-cta"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-velix-bg px-6 py-32"
    >
      {/* ── Centered ambient glow ──────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          style={{
            width: 900,
            height: 900,
            background:
              'radial-gradient(circle, rgba(233,255,0,0.042) 0%, transparent 62%)',
            filter: 'blur(70px)',
          }}
        />
      </div>

      {/* ── Subtle light streaks ───────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {STREAKS.map((s, i) => (
          <div
            key={i}
            className="absolute top-0 h-full w-px"
            style={{
              left: s.left,
              background:
                'linear-gradient(180deg, transparent 0%, rgba(233,255,0,0.07) 35%, rgba(233,255,0,0.07) 65%, transparent 100%)',
              filter: 'blur(1.5px)',
              animation: `streak-fade ${s.dur} ${s.delay} ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Ghost opening quotation mark ───────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 select-none font-heading font-black leading-none"
        style={{
          fontSize: 'clamp(160px, 22vw, 320px)',
          color: 'rgba(255,255,255,0.013)',
        }}
      >
        "
      </div>

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-14 text-center">

          {/* ── The quote ─────────────────────────────────── */}
          <div className="flex flex-col items-center" style={{ gap: '0.18em' }}>
            {LINES.map((line, i) => (
              <motion.span
                key={i}
                className={`block font-heading font-bold ${line.accent ? 'gradient-text' : 'text-white'}`}
                style={{
                  fontSize: 'clamp(1.75rem, 4.5vw, 3.75rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  marginTop: line.gap ? '0.55em' : undefined,
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.13, duration: 0.95, ease: EASE }}
              >
                {line.text}
              </motion.span>
            ))}
          </div>

          {/* ── Divider ────────────────────────────────────── */}
          <motion.div
            className="flex w-56 items-center gap-4"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1.1, ease: EASE }}
          >
            <div
              className="h-px flex-1"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(233,255,0,0.35))' }}
            />
            <div
              className="h-1.5 w-1.5 flex-none rotate-45"
              style={{ background: '#E9FF00' }}
            />
            <div
              className="h-px flex-1"
              style={{ background: 'linear-gradient(90deg, rgba(233,255,0,0.35), transparent)' }}
            />
          </motion.div>

          {/* ── CTA block ──────────────────────────────────── */}
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.9, ease: EASE }}
          >
            {/* Label */}
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.38em] text-velix-muted">
              Ready to build something amazing?
            </p>

            {/* Buttons */}
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              {/* Primary — solid accent */}
              <MagneticButton>
                <a
                  href="#contact"
                  className="inline-flex h-13 items-center gap-2.5 rounded-full px-8 font-heading text-sm font-bold text-velix-bg transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #E9FF00 0%, #C4D900 100%)',
                    boxShadow: '0 0 28px rgba(233,255,0,0.28), 0 0 56px rgba(233,255,0,0.10)',
                    height: '3.25rem',
                  }}
                >
                  Book a Free Call
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </MagneticButton>

              {/* Secondary — ghost */}
              <MagneticButton>
                <a
                  href="mailto:hello@thevelix.com"
                  className="inline-flex items-center gap-2 rounded-full font-heading text-sm font-semibold text-velix-muted transition-all duration-300 hover:border-[rgba(233,255,0,0.28)] hover:text-white"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    height: '3.25rem',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                  }}
                >
                  hello@thevelix.com
                </a>
              </MagneticButton>
            </div>
          </motion.div>

        </div>
      </Container>

      {/* ── Bottom fade into Footer ─────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: 'linear-gradient(0deg, rgba(5,8,22,0.95), transparent)' }}
      />
    </section>
  )
}
