'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Lenis context ────────────────────────────────────────── */
const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

/* ── Provider ─────────────────────────────────────────────── */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const tickerRef = useRef<((time: number) => void) | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const instance = new Lenis({
      duration:    prefersReduced ? 0 : 1.2,
      easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: !prefersReduced,
    })

    /* Make all GSAP animations near-instant when user prefers reduced motion */
    if (prefersReduced) {
      gsap.globalTimeline.timeScale(100)
    }

    /* Connect Lenis → GSAP ScrollTrigger */
    tickerRef.current = (time: number) => instance.raf(time * 1000)
    instance.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tickerRef.current)
    gsap.ticker.lagSmoothing(0)

    setLenis(instance)

    /* Smooth anchor scrolling — intercept all href="#..." clicks */
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null
      if (!anchor) return
      const id = anchor.getAttribute('href')?.slice(1)
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      instance.scrollTo(el, {
        offset:   -80,
        duration: prefersReduced ? 0 : 1.4,
        easing:   (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      if (tickerRef.current) gsap.ticker.remove(tickerRef.current)
      instance.off('scroll', ScrollTrigger.update)
      instance.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
