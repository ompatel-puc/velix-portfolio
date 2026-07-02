'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Search, Ruler, Palette, Settings, CheckCircle2, Rocket, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    title: 'Discovery',
    description: 'Deep-dive into your goals, users, and competitive landscape. We ask the hard questions so the work that follows is purposeful.',
    icon: Search,
  },
  {
    num: '02',
    title: 'Planning',
    description: 'Sitemap, technical architecture, sprint timeline, and feature scope locked in. No surprises — everything agreed upfront.',
    icon: Ruler,
  },
  {
    num: '03',
    title: 'Design',
    description: 'Wireframes to high-fidelity Figma prototypes. Every screen, interaction, and micro-animation crafted before a line of code is written.',
    icon: Palette,
  },
  {
    num: '04',
    title: 'Development',
    description: 'Clean TypeScript, component-driven architecture, CI/CD pipelines. Built for performance, accessibility, and long-term maintainability.',
    icon: Settings,
  },
  {
    num: '05',
    title: 'Testing',
    description: 'Cross-browser QA, performance audits, accessibility checks, and user acceptance testing — shipped only when perfect.',
    icon: CheckCircle2,
  },
  {
    num: '06',
    title: 'Launch',
    description: 'Zero-downtime deployment, DNS handover, analytics wired up, and a real-time monitoring dashboard set live.',
    icon: Rocket,
  },
  {
    num: '07',
    title: 'Support',
    description: "We don't vanish after launch. Ongoing maintenance, performance reviews, and feature development — your growth, our mission.",
    icon: ShieldCheck,
  },
]

const NODE_SHADOW_BASE = '0 0 12px rgba(233,255,0,0.30)'
const NODE_SHADOW_ACTIVE = '0 0 22px rgba(233,255,0,0.75)'
const GLOW_SEGMENT_HEIGHT = 76 // ~2cm

export function ProcessSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const glowSegmentRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timelineEl = timelineRef.current
      const glowSegment = glowSegmentRef.current
      const cards = cardRefs.current
      const nodes = nodeRefs.current
      if (!timelineEl || !glowSegment) return

      cards.forEach((card, i) => {
        if (!card) return
        gsap.set(card, { opacity: 0, scale: 1, x: i % 2 === 1 ? 60 : -60 })
      })
      nodes.forEach((node) => {
        if (!node) return
        gsap.set(node, { opacity: 0.35, scale: 0.7, boxShadow: NODE_SHADOW_BASE })
      })
      gsap.set(glowSegment, { y: -GLOW_SEGMENT_HEIGHT, opacity: 0 })

      const revealed: boolean[] = new Array(STEPS.length).fill(false)
      let thresholds: number[] = []
      let activeIndex = -1

      const computeThresholds = () => {
        const lineRect = timelineEl.getBoundingClientRect()
        thresholds = nodes.map((node) => {
          if (!node) return 0
          const r = node.getBoundingClientRect()
          return (r.top + r.height / 2 - lineRect.top) / lineRect.height
        })
      }
      computeThresholds()

      const st = ScrollTrigger.create({
        trigger: timelineEl,
        start: 'top 75%',
        end: 'bottom 60%',
        scrub: 0.4,
        onRefresh: computeThresholds,
        onUpdate: (self) => {
          const progress = self.progress
          const lineHeight = timelineEl.offsetHeight
          const fade = Math.min(progress / 0.03, 1, (1 - progress) / 0.03)
          gsap.set(glowSegment, {
            y: progress * lineHeight - GLOW_SEGMENT_HEIGHT / 2,
            opacity: Math.max(fade, 0),
          })

          // the glow's brightest point sits at the bottom of the segment —
          // reveal steps as soon as that leading edge reaches the node, not the segment's center
          const leadProgress = progress + (GLOW_SEGMENT_HEIGHT / 2) / lineHeight

          let newActive = -1
          thresholds.forEach((threshold, i) => {
            const card = cards[i]
            const node = nodes[i]
            if (!card || !node) return
            const reached = leadProgress >= threshold
            if (reached) newActive = i

            if (reached && !revealed[i]) {
              revealed[i] = true
              gsap.to(card, { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' })
            } else if (!reached && revealed[i]) {
              revealed[i] = false
              gsap.to(card, { opacity: 0, scale: 1, x: i % 2 === 1 ? 60 : -60, duration: 0.4, ease: 'power2.in' })
              gsap.to(node, { opacity: 0.35, scale: 0.7, boxShadow: NODE_SHADOW_BASE, duration: 0.3, ease: 'power2.in' })
            }
          })

          if (newActive !== activeIndex) {
            activeIndex = newActive
            revealed.forEach((rev, i) => {
              if (!rev) return
              const card = cards[i]
              const node = nodes[i]
              if (!card || !node) return
              if (i === activeIndex) {
                gsap.to(card, { opacity: 1, scale: 1.02, duration: 0.5, ease: 'power2.out' })
                gsap.to(node, { opacity: 1, scale: 1.15, boxShadow: NODE_SHADOW_ACTIVE, duration: 0.4, ease: 'back.out(2)' })
              } else {
                gsap.to(card, { opacity: 0.35, scale: 1, duration: 0.5, ease: 'power2.out' })
                gsap.to(node, { opacity: 0.55, scale: 0.85, boxShadow: NODE_SHADOW_BASE, duration: 0.4, ease: 'power2.out' })
              }
            })
          }
        },
      })

      return () => st.kill()
    }, timelineRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" className="relative overflow-hidden py-28 lg:py-36" style={{ background: '#070c1a' }}>
      {/* Top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(233,255,0,0.2) 50%, transparent)' }}
      />

      <Container>
        {/* Heading */}
        <motion.div
          className="mb-20 flex flex-col items-center gap-4 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.span variants={fadeInUp} className="section-label">How We Work</motion.span>
          <motion.h2 variants={fadeInUp} className="text-section text-white max-w-xl">
            Our <span className="gradient-text">Development Process</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-body-lg text-[#A7B0C5] max-w-lg">
            Seven stages. Zero guesswork. Every project follows the same proven path from idea to impact.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical connecting line (base, dim) */}
          <div
            className="pointer-events-none absolute left-[28px] top-0 hidden h-full w-0.5 sm:block lg:left-1/2"
            style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(233,255,0,0.15) 10%, rgba(233,255,0,0.15) 90%, transparent 100%)' }}
          />

          {/* Short glowing segment travelling down the line, in sync with scroll */}
          <div
            ref={glowSegmentRef}
            className="pointer-events-none absolute left-[28px] top-0 z-10 hidden w-0.5 rounded-full sm:block lg:left-1/2"
            style={{
              height: GLOW_SEGMENT_HEIGHT,
              background: 'linear-gradient(180deg, rgba(233,255,0,0) 0%, rgba(233,255,0,0.03) 25%, rgba(233,255,0,0.1) 50%, rgba(233,255,0,0.28) 70%, rgba(233,255,0,0.6) 88%, rgba(233,255,0,1) 100%)',
              boxShadow: '0 0 5px 0.5px rgba(233,255,0,0.55)',
              WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, transparent 22%, rgba(0,0,0,0.35) 55%, black 100%)',
              maskImage: 'linear-gradient(180deg, transparent 0%, transparent 22%, rgba(0,0,0,0.35) 55%, black 100%)',
              willChange: 'transform',
            }}
          />

          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => {
              const isRight = i % 2 === 1
              return (
                <div
                  key={step.num}
                  className={[
                    'relative flex items-center gap-8',
                    'lg:gap-0',
                    isRight ? 'lg:flex-row-reverse' : 'lg:flex-row',
                  ].join(' ')}
                >
                  {/* ── Content card (takes half width on desktop) ── */}
                  <div
                    ref={(el) => { cardRefs.current[i] = el }}
                    className={[
                      'glass-card group relative flex-1 rounded-2xl p-6 sm:ml-14 lg:ml-0',
                      isRight ? 'lg:mr-16' : 'lg:ml-16',
                      'lg:max-w-[calc(50%-3rem)]',
                    ].join(' ')}
                  >
                    {/* Step number watermark */}
                    <span
                      className="pointer-events-none absolute -right-2 -top-4 font-heading text-6xl font-black leading-none select-none opacity-[0.04]"
                      style={{ color: '#E9FF00' }}
                    >
                      {step.num}
                    </span>

                    <div className="flex items-start gap-4">
                      <div
                        className="glass-card flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: 'rgba(233,255,0,0.06)', border: '1px solid rgba(233,255,0,0.18)' }}
                      >
                        <step.icon className="h-5 w-5" style={{ color: '#E9FF00' }} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-heading text-[11px] font-semibold tracking-widest text-[#E9FF00] opacity-60 uppercase">
                            {step.num}
                          </span>
                          <h3 className="text-subheading text-white">{step.title}</h3>
                        </div>
                        <p className="text-body text-[#A7B0C5]">{step.description}</p>
                      </div>
                    </div>

                    {/* Hover accent */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100 origin-left"
                      style={{ background: 'linear-gradient(90deg, #E9FF00, transparent)' }}
                    />
                  </div>

                  {/* ── Node dot (centered on line) ── */}
                  <div
                    ref={(el) => { nodeRefs.current[i] = el }}
                    className="absolute left-0 sm:left-[18px] lg:left-1/2 z-10 flex h-[22px] w-[22px] -translate-x-1/2 items-center justify-center rounded-full"
                    style={{
                      background: '#050816',
                      border: '2px solid rgba(233,255,0,0.40)',
                      boxShadow: '0 0 12px rgba(233,255,0,0.30)',
                    }}
                  >
                    <div className="h-2 w-2 rounded-full" style={{ background: '#E9FF00' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
