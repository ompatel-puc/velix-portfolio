'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Calendar, MessageCircle, Send } from 'lucide-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Container } from '@/components/layout/Container'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

const INFO = [
  { icon: Mail,   label: 'Email',    value: 'hello@thevelix.com',          href: 'hello@thevelix.com'   },
  { icon: Phone,  label: 'Phone',    value: '+91 8733872010',        href: 'tel:+918733872010'         },
  { icon: MapPin, label: 'Location', value: 'Remote · Available Worldwide', href: null                  },
  { icon: Clock,  label: 'Working Hours', value: 'Mon – Fri, 9 AM – 6 PM EST', href: null               },
]

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.contact-col-left',  { opacity: 0, y: 80 })
      gsap.set('.contact-col-right', { opacity: 0, y: 100 })

      const st = { trigger: '.contact-grid', start: 'top 80%', toggleActions: 'play none none none' }

      gsap.to('.contact-col-left', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: st,
      })
      gsap.to('.contact-col-right', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: st,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden py-28 lg:py-36" style={{ background: '#060b18' }}>
      {/* Top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(233,255,0,0.3) 50%, transparent)' }}
      />
      <div
        className="pointer-events-none absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(233,255,0,0.06) 0%, transparent 65%)', filter: 'blur(60px)' }}
      />

      <Container>
        {/* Heading */}
        <motion.div
          className="mb-16 flex flex-col items-center gap-4 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.span variants={fadeInUp} className="section-label">Get In Touch</motion.span>
          <motion.h2 variants={fadeInUp} className="text-section text-white">
            Ready to Build Something <span className="gradient-text">Great?</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-body-lg text-[#A7B0C5] max-w-lg">
            Whether you have a project in mind or just want to explore what's possible — we'd love to hear from you.
          </motion.p>
        </motion.div>

        {/* Two-column GSAP slide-up */}
        <div className="contact-grid grid items-start gap-16 lg:grid-cols-2 lg:gap-20">

          {/* ── Left: info tiles ── */}
          <div className="contact-col-left flex flex-col gap-8 opacity-0">
            <div className="flex flex-col gap-3">
              {INFO.map((item) => {
                const Icon = item.icon
                const tile = (
                  <div className="glass-card flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 hover:border-[rgba(233,255,0,0.2)]">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: 'rgba(233,255,0,0.08)', border: '1px solid rgba(233,255,0,0.15)' }}
                    >
                      <Icon className="h-4 w-4 text-[#E9FF00]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold font-heading tracking-widest text-[#A7B0C5]/60 uppercase mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-sm font-medium text-white">{item.value}</div>
                    </div>
                  </div>
                )
                return item.href ? (
                  <a key={item.label} href={item.href} className="block">{tile}</a>
                ) : (
                  <div key={item.label}>{tile}</div>
                )
              })}
            </div>
          </div>

          {/* ── Right: CTA cards ── */}
          <div className="contact-col-right flex flex-col gap-5 opacity-0">
            {/* Book a Call */}
            <a
              href="https://calendly.com/velixventure"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:border-[rgba(233,255,0,0.25)]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(233,255,0,0.05), transparent 60%)' }}
              />
              <div className="relative flex items-start gap-5">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: 'rgba(233,255,0,0.10)', border: '1px solid rgba(233,255,0,0.25)' }}
                >
                  <Calendar className="h-6 w-6 text-[#E9FF00]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-heading text-lg font-semibold text-white">Book a Free Call</h3>
                  <p className="text-sm text-[#A7B0C5]">30-minute no-obligation consultation. We'll scope your project and give you a clear plan.</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#E9FF00]">
                    Schedule via Calendly
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/918733872010"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:border-[rgba(37,211,102,0.25)]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(37,211,102,0.05), transparent 60%)' }}
              />
              <div className="relative flex items-start gap-5">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: 'rgba(37,211,102,0.10)', border: '1px solid rgba(37,211,102,0.25)' }}
                >
                  <MessageCircle className="h-6 w-6" style={{ color: '#25D366' }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-heading text-lg font-semibold text-white">Chat on WhatsApp</h3>
                  <p className="text-sm text-[#A7B0C5]">Quick questions, rough ideas, or just want a fast response? Message us directly.</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: '#25D366' }}>
                    Open WhatsApp
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:hello@thevelix.com?subject=Project%20Enquiry"
              className="glass-card group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:border-[rgba(96,165,250,0.25)]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(96,165,250,0.05), transparent 60%)' }}
              />
              <div className="relative flex items-start gap-5">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: 'rgba(96,165,250,0.10)', border: '1px solid rgba(96,165,250,0.25)' }}
                >
                  <Send className="h-6 w-6 text-blue-400" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-heading text-lg font-semibold text-white">Send an Email</h3>
                  <p className="text-sm text-[#A7B0C5]">Prefer email? Drop us a line at hello@thevelix.com and we'll reply within 24 hours.</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-semibold text-blue-400">
                    hello@thevelix.com
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </div>
            </a>

            {/* CTA button */}
            <div className="mt-2 text-center">
              <a
                href="mailto:hello@velix.com?subject=Project%20Enquiry"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 font-heading text-sm font-semibold text-[#050816] transition-all duration-200 hover:brightness-110"
                style={{ background: 'linear-gradient(135deg, #E9FF00 0%, #C4D900 100%)', boxShadow: '0 0 24px rgba(233,255,0,0.25)' }}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-700 group-hover:translate-x-[200%]" />
                Start Your Project Today
              </a>
              <p className="mt-3 text-[11px] text-[#A7B0C5]/50">No commitment. Free consultation. Fast response.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
