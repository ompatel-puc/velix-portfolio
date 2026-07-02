'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Code2, Palette, Globe, Layers, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Container } from '@/components/layout/Container'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    icon: Code2,
    title: 'Web Development',
    description:
      'Bespoke websites engineered from scratch using Next.js and React — fast, accessible, and built to last.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'User journeys mapped, wireframes crafted, and interfaces designed that convert visitors into customers.',
  },
  {
    icon: Globe,
    title: 'WordPress',
    description:
      'Headless and classic WordPress builds — powerful CMS setups that keep clients in control of their content.',
  },
  {
    icon: Layers,
    title: 'Web Applications',
    description:
      'Full-stack SaaS platforms, dashboards and complex web apps with real-time features and solid architecture.',
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.service-card', { opacity: 0, y: 48 })
      gsap.to('.service-card', {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: { each: 0.10, from: 'start' },
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="relative overflow-hidden bg-velix-bg py-28 lg:py-36">
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

      {/* Bottom ambient glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-200 -translate-x-1/2"
        style={{
          background: 'radial-gradient(ellipse, rgba(233,255,0,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <Container>
        {/* Header */}
        <motion.div
          className="mb-16 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="flex flex-col gap-4">
            <motion.span variants={fadeInUp} className="section-label self-start">
              Services
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-section text-white max-w-md">
              What We <span className="gradient-text">Build For You.</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeInUp} className="text-body text-velix-muted max-w-xs lg:text-right">
            Four core disciplines all executed with the same obsessive attention to craft.
          </motion.p>
        </motion.div>

        {/* 2 × 2 grid */}
        <div className="services-grid grid gap-5 sm:grid-cols-2">
          {SERVICES.map((svc) => {
            const Icon = svc.icon
            return (
              <div
                key={svc.title}
                className="service-card glass-card glass-card-accent group relative flex flex-col gap-5 overflow-hidden rounded-2xl p-7 opacity-0"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Icon */}
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] transition-all duration-300 group-hover:scale-105 group-hover:border-[rgba(233,255,0,0.28)] group-hover:bg-[rgba(233,255,0,0.12)]"
                >
                  <Icon className="h-5 w-5 text-velix-muted transition-colors duration-300 group-hover:text-velix-accent" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {svc.title}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-velix-muted">
                    {svc.description}
                  </p>
                </div>

                {/* Hover arrow */}
                <ArrowRight className="mt-auto h-4 w-4 -translate-x-1 text-velix-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-velix-accent group-hover:opacity-100" />

                {/* Corner glow on hover */}
                <div
                  className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'rgba(233,255,0,0.10)' }}
                />
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
