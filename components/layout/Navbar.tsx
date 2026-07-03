'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { MagneticButton } from '@/components/common/MagneticButton'
import { Container } from '@/components/layout/Container'
import { VelixLogo } from '@/components/layout/VelixLogo'

const NAV_LINKS = [
  { label: 'About',    href: '#about'        },
  { label: 'Work',     href: '#work'         },
  { label: 'Services', href: '#services'     },
  { label: 'Tech',     href: '#tech'         },
  { label: 'Process',  href: '#process'      },
  { label: 'Reviews',  href: '#testimonials' },
  { label: 'Contact',  href: '#contact'      },
]

const SECTION_IDS = [
  'home', 'about', 'why-choose', 'services', 'work',
  'tech', 'process', 'testimonials', 'contact',
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const MOBILE_LINK_VARIANTS = {
  hidden:  { opacity: 0, x: -32 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: EASE, delay: 0.08 + i * 0.055 },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: 32,
    transition: { duration: 0.3, ease: EASE, delay: i * 0.03 },
  }),
}

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [activeId,    setActiveId]    = useState('home')
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-20% 0px -75% 0px' },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMenu = useCallback(() => setMobileOpen(false), [])
  const isActive  = (href: string) => activeId === href.slice(1)

  return (
    <>
      {/* ── Desktop / Mobile nav bar ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[900]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{
          background: scrolled ? 'rgba(5,8,22,0.80)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease',
        }}
      >
        <Container>
          {/* Thinner bar — h-14 instead of h-[72px] */}
          <div className="flex h-20 items-center justify-between">

            {/* Logo */}
            <MagneticButton strength={0.25}>
              <Link href="#home" aria-label="Velix Home">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <VelixLogo className="h-10 w-auto text-white md:h-12" />
                </motion.div>
              </Link>
            </MagneticButton>

            {/* Desktop nav links — wider gap, muted until hovered */}
            <ul className="hidden items-center gap-10 lg:flex">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href)
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group relative flex flex-col items-center gap-0.5 py-1"
                      aria-current={active ? 'page' : undefined}
                    >
                      <span
                        className="font-heading text-[12px] font-medium tracking-wide transition-colors duration-200"
                        style={{ color: active ? '#FFFFFF' : 'rgba(167,176,197,0.50)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = active ? '#fff' : 'rgba(167,176,197,0.50)'
                        }}
                      >
                        {link.label}
                      </span>

                      {/* Active underline indicator */}
                      <motion.div
                        className="absolute -bottom-0 h-[1.5px] rounded-full bg-[#E9FF00]"
                        initial={false}
                        animate={{ width: active ? '100%' : '0%', opacity: active ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ left: 0, boxShadow: '0 0 6px rgba(233,255,0,0.8)' }}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
            <MagneticButton strength={0.4}>
            <a
              href="#contact"
              className="group relative inline-flex h-11 min-w-[170px] items-center justify-center gap-2 whitespace-nowrap overflow-hidden rounded-full px-7 font-heading text-sm font-semibold text-[#050816] transition-all duration-300"
            style={{
            background: 'linear-gradient(135deg, #E9FF00 0%, #C4D900 100%)',
            boxShadow: '0 10px 30px rgba(233,255,0,0.18)',
            }}
           onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 14px 40px rgba(233,255,0,0.35)'
            }}
            onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(233,255,0,0.18)'
               }}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-700 group-hover:translate-x-[200%]" />
      <span>Book a Call</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  </MagneticButton>
</div>

            {/* Mobile hamburger */}
            <button
              className="relative z-[960] flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200 lg:hidden"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="h-4 w-4 text-white" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="h-4 w-4 text-white" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </Container>
      </motion.nav>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[890] flex flex-col items-center justify-center overflow-hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 28px)', opacity: 1 }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 28px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 28px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: '#050816' }}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(233,255,0,0.04) 0%, transparent 65%)', filter: 'blur(40px)' }}
            />

            <nav className="relative z-10 flex flex-col items-center gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  custom={i}
                  variants={MOBILE_LINK_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={closeMenu}
                  className="group flex items-baseline gap-3"
                >
                  <span className="font-heading text-[11px] font-semibold tracking-widest text-[#E9FF00]/50 uppercase">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-heading text-4xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#E9FF00]"
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.a
              href="#contact"
              onClick={closeMenu}
              className="mt-12 rounded-xl px-8 py-3.5 font-heading text-sm font-semibold text-[#050816]"
              style={{ background: '#E9FF00' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.4 } }}
              exit={{ opacity: 0, y: 10 }}
            >
              Book a Free Call
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
