'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/common/SectionHeading'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'CEO',
    company: 'TechFlow Inc.',
    avatar: 'SM',
    avatarBg: '#7C3AED',
    rating: 5,
    text: "Velix completely transformed our digital presence. The site they built for us loads in under 0.8 seconds and our conversion rate jumped 43% within the first month. They don't just build websites — they build revenue machines.",
  },
  {
    id: 2,
    name: 'Marcus Osei',
    role: 'Founder',
    company: 'Launchpad Studio',
    avatar: 'MO',
    avatarBg: '#0891B2',
    rating: 5,
    text: "We've worked with three agencies before Velix. None of them came close to this level of craft. Every pixel is intentional, every animation feels premium. Our investors noticed before we even launched.",
  },
  {
    id: 3,
    name: 'Priya Nair',
    role: 'Head of Product',
    company: 'Nimbus Health',
    avatar: 'PN',
    avatarBg: '#059669',
    rating: 5,
    text: 'From discovery to launch in 6 weeks without a single missed deadline. The team communicates clearly, moves fast, and the quality of code they handed over is something our engineers still rave about.',
  },
  {
    id: 4,
    name: 'James Whitfield',
    role: 'Marketing Director',
    company: 'Apex Brands',
    avatar: 'JW',
    avatarBg: '#DC2626',
    rating: 5,
    text: 'The landing page Velix built for our campaign generated more leads in its first week than our old site did in an entire quarter. The design, the speed, the copy flow — all of it was next level.',
  },
  {
    id: 5,
    name: 'Lena Fischer',
    role: 'CTO',
    company: 'Stackline',
    avatar: 'LF',
    avatarBg: '#D97706',
    rating: 5,
    text: "As a technical founder, I was sceptical anyone could match our internal standards. Velix not only matched them — they raised the bar. TypeScript strict mode, perfect Lighthouse scores, and a codebase I'm proud to maintain.",
  },
  {
    id: 6,
    name: 'Amara Diallo',
    role: 'CEO',
    company: 'Craft Commerce',
    avatar: 'AD',
    avatarBg: '#BE185D',
    rating: 5,
    text: 'Our Shopify redesign by Velix increased our average order value by 28%. They understood our customers better than we did and designed the entire experience with conversion at the core. Exceptional work.',
  },
]

/* Pure fade — no x-slide — distinct from all other section animations */
const FADE_VARIANTS = {
  enter: { opacity: 0, scale: 0.96, filter: 'blur(6px)' },
  center: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit:  { opacity: 0, scale: 0.96, filter: 'blur(6px)' },
}

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const total = TESTIMONIALS.length

  const advance = useCallback((dir: number) => {
    setDirection(dir)
    setCurrent((prev) => (prev + dir + total) % total)
  }, [total])

  /* Auto-advance — pauses on hover */
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => advance(1), 5000)
    return () => clearInterval(id)
  }, [advance, paused])

  const t = TESTIMONIALS[current]

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#050816] py-28 lg:py-36">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
        style={{ background: 'linear-gradient(0deg, rgba(233,255,0,0.03) 0%, transparent 100%)' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30" />

      <Container>
        <SectionHeading
          label="Testimonials"
          title={<>Clients Who <span className="gradient-text">Trust Velix.</span></>}
        />

        {/* Slider — hover pauses auto-advance */}
        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Ambient glow behind card */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(233,255,0,0.06), transparent 70%)' }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              variants={FADE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card relative overflow-hidden rounded-3xl p-8 sm:p-10 lg:p-12"
            >
              {/* Quote mark */}
              <span
                className="pointer-events-none absolute -top-4 left-8 font-heading text-9xl font-black leading-none select-none"
                style={{ color: 'rgba(233,255,0,0.06)' }}
              >
                "
              </span>

              {/* Stars */}
              <div className="mb-6 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#E9FF00] text-[#E9FF00]" />
                ))}
              </div>

              {/* Quote text */}
              <p className="relative z-10 mb-8 text-lg leading-relaxed text-white sm:text-xl">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold font-heading text-white"
                  style={{ background: t.avatarBg }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-heading text-base font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-[#A7B0C5]">{t.role} · {t.company}</div>
                </div>

                {/* Company badge */}
                <div
                  className="ml-auto hidden rounded-full px-3 py-1 sm:block"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span className="text-[11px] font-medium text-[#A7B0C5]">{t.company}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => advance(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:border-[rgba(233,255,0,0.3)]"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4 text-[#A7B0C5]" />
            </button>

            {/* Progress dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 20 : 6,
                    height: 6,
                    background: i === current ? '#E9FF00' : 'rgba(255,255,255,0.20)',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => advance(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4 text-[#A7B0C5]" />
            </button>
          </div>

          {/* Counter */}
          <div className="mt-4 text-center text-[11px] font-medium text-[#A7B0C5]/50 tracking-widest uppercase">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
        </div>
      </Container>
    </section>
  )
}
