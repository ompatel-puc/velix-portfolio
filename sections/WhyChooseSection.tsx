'use client'

import { useEffect, useRef } from 'react'
import { Zap, Sparkles, Smartphone, Search, Code2, HeartHandshake } from 'lucide-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/common/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    icon: Zap,
    title: 'Lightning Performance',
    description: 'Perfect 100/100 Lighthouse scores. Every site is optimised for Core Web Vitals and loads in under 1 second.',
    color: '#E9FF00',
  },
  {
    icon: Sparkles,
    title: 'Premium Design',
    description: "Pixel-perfect aesthetics built to convert. We obsess over every detail until it's award-worthy.",
    color: '#A78BFA',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Every layout is flawless from a 320px screen to a 4K display — no compromises on any device.',
    color: '#38BDF8',
  },
  {
    icon: Search,
    title: 'SEO Ready',
    description: 'Semantic HTML, structured data, perfect meta — built for search engines from the first line of code.',
    color: '#34D399',
  },
  {
    icon: Code2,
    title: 'Clean Architecture',
    description: "Modular, typed TypeScript codebases that scale. You'll never need to rewrite our work.",
    color: '#FB923C',
  },
  {
    icon: HeartHandshake,
    title: 'Dedicated Support',
    description: "We don't disappear after launch. Ongoing care, updates, and improvements — we're your long-term partner.",
    color: '#F472B6',
  },
]

/* Small random rotation for organic card entrance */
const ROTATIONS = [-3, 2, -2, 3, -1.5, 2.5]

export function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.why-card', { scale: 0.78, opacity: 0, y: 20, rotate: (i) => ROTATIONS[i] ?? 0 })

      gsap.to('.why-card', {
        scale: 1,
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 0.65,
        ease: 'back.out(1.7)',
        stagger: { each: 0.09, from: 'start' },
        scrollTrigger: {
          trigger: '.why-grid',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="why-choose" className="relative overflow-hidden py-28 lg:py-36" style={{ background: '#0a0f1e' }}>
      {/* Top edge glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(233,255,0,0.3) 50%, transparent 100%)' }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(233,255,0,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <Container>
        <SectionHeading
          label="Why Choose Velix"
          title={<>Built Different. <span className="gradient-text">Delivers Results.</span></>}
          subtitle="Six reasons why ambitious businesses choose Velix for their most important digital projects."
        />

        {/* Cards grid — GSAP scale pop */}
        <div className="why-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="why-card glass-card group relative overflow-hidden rounded-2xl p-7 hover-lift opacity-0"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Corner accent glow on hover */}
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: f.color + '1A' }}
                />

                {/* Icon — rotates slightly on hover */}
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:rotate-6"
                  style={{ background: f.color + '14', border: `1px solid ${f.color}28` }}
                >
                  <Icon className="h-5 w-5" style={{ color: f.color }} />
                </div>

                <h3 className="text-subheading mb-2.5 text-white">{f.title}</h3>
                <p className="text-body text-[#A7B0C5] leading-relaxed">{f.description}</p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${f.color}60, transparent)`, transformOrigin: 'left' }}
                />
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
