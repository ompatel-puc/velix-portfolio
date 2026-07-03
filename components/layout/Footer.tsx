'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Container } from './Container'
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger)

/* Inline SVG brand icons — lucide-react doesn't include brand icons */
function IconGithub({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
function IconTwitter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

const QUICK_LINKS = [
  { label: 'About',     href: '#about'        },
  { label: 'Services',  href: '#services'     },
  { label: 'Tech',      href: '#tech'         },
  { label: 'Process',   href: '#process'      },
  { label: 'Reviews',   href: '#testimonials' },
  { label: 'Contact',   href: '#contact'      },
]

const SERVICES_LINKS = [
  { label: 'Website Development', href: '#services' },
  { label: 'Web Applications',    href: '#services' },
  { label: 'UI / UX Design',      href: '#services' },
  { label: 'SEO',                  href: '#services' },
  { label: 'Performance',          href: '#services' },
  { label: 'Maintenance',          href: '#services' },
]

const SOCIAL = [
   { icon: IconLinkedin,  href: 'https://www.linkedin.com/company/velixventures/',      label: 'LinkedIn'  },
  { icon: IconInstagram, href: 'https://www.instagram.com/velix.future/',             label: 'Instagram' },
]

export function Footer() {
  const year = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.footer-col', { opacity: 0, y: 30 })
      gsap.set('.footer-bottom', { opacity: 0 })

      gsap.to('.footer-col', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-grid',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
      gsap.to('.footer-bottom', {
        opacity: 1,
        duration: 0.6,
        delay: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-grid',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef}
      className="relative overflow-hidden border-t"
      style={{ background: '#030511', borderColor: 'rgba(255,255,255,0.06)' }}
    >
      {/* Top glow line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(233,255,0,0.25) 50%, transparent)' }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(233,255,0,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <Container className="py-16 lg:py-20">
        {/* Main grid */}
        <div className="footer-grid grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="footer-col flex flex-col gap-5 lg:col-span-1 opacity-0">
            {/* Logo + tagline grouped */}
            <div className="flex flex-col gap-0">
              <Link
                href="#home"
                className="group flex items-center self-start transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src="/logo-nav.png"
                  alt="Velix Logo"
                  width={1400}
                  height={340}
                  priority
                  className="h-11 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
                />
              </Link>

              <p className="text-sm leading-relaxed text-[#A7B0C5]">
                Premium web development. We build digital experiences that impress, convert, and endure.
              </p>
            </div>

            {/* Social links */}
            <div className="flex gap-2">
              {SOCIAL.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300 ease-out hover:scale-110 hover:border-velix-accent/40 hover:bg-velix-accent/10 hover:shadow-[0_0_18px_4px_rgba(233,255,0,0.35)]"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      borderColor: 'rgba(255,255,255,0.08)',
                    }}
                  >
                    <Icon className="h-3.5 w-3.5 text-[#A7B0C5] transition-colors duration-300 group-hover:text-velix-accent" />
                  </a>
                )
              })}
            </div>

            {/* Status pill */}
            <div
              className="self-start flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
              }}
            >
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              <span className="text-[10px] font-semibold text-green-400">Open for projects</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col flex flex-col gap-5 opacity-0">
            <h4 className="font-heading text-xs font-semibold tracking-widest text-[#A7B0C5]/60 uppercase">
              Navigate
            </h4>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-1.5 text-sm text-[#A7B0C5] transition-colors duration-200 hover:text-white"
                  >
                    <span className="h-px w-3 bg-[#A7B0C5]/30 transition-all duration-200 group-hover:w-5 group-hover:bg-[#E9FF00]" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col flex flex-col gap-5 opacity-0">
            <h4 className="font-heading text-xs font-semibold tracking-widest text-[#A7B0C5]/60 uppercase">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICES_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-1.5 text-sm text-[#A7B0C5] transition-colors duration-200 hover:text-white"
                  >
                    <span className="h-px w-3 bg-[#A7B0C5]/30 transition-all duration-200 group-hover:w-5 group-hover:bg-[#E9FF00]" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div className="footer-col flex flex-col gap-5 opacity-0">
            <h4 className="font-heading text-xs font-semibold tracking-widest text-[#A7B0C5]/60 uppercase">
              Start a Project
            </h4>
            <p className="text-sm text-[#A7B0C5]">
              Have a project in mind? Let's talk about how Velix can bring it to life.
            </p>
            <a
              href="https://wa.me/918733872010"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 self-start rounded-xl px-4 py-2.5 text-sm font-semibold font-heading text-[#050816] transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #E9FF00 0%, #C4D900 100%)',
                boxShadow: '0 0 20px rgba(233,255,0,0.2)',
              }}
            >
              Get in Touch
             <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <div className="mt-2 flex flex-col gap-1.5">
              <a href="mailto:hello@thevelix.com" className="text-xs text-[#A7B0C5] hover:text-white transition-colors">
                hello@thevelix.com
              </a>
              <a href="https://wa.me/918733872010" className="text-xs text-[#A7B0C5] hover:text-white transition-colors">
                +91 8733872010
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="footer-bottom my-10 h-px w-full opacity-0"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)' }}
        />

        {/* Bottom bar */}
        <div className="footer-bottom flex flex-col items-center justify-between gap-4 sm:flex-row opacity-0">
          <p className="text-xs text-[#A7B0C5]/50">
            © {year} Velix. All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
              <Link key={l} href="#" className="text-xs text-[#A7B0C5]/50 transition-colors hover:text-[#A7B0C5]">
                {l}
              </Link>
            ))}
          </div>
          <p className="text-xs text-[#A7B0C5]/30">
            Crafted with <span className="text-[#E9FF00]/60">♥</span> by Velix
          </p>
        </div>
      </Container>
    </footer>
  )
}
