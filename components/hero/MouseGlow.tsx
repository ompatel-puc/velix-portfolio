'use client'

import { useEffect, useRef } from 'react'

export function MouseGlow() {
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    let raf: number
    let tx = -600, ty = -600
    let cx = -600, cy = -600

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    window.addEventListener('mousemove', onMove, { passive: true })

    const tick = () => {
      cx += (tx - cx) * 0.07
      cy += (ty - cy) * 0.07
      el.style.background =
        `radial-gradient(650px circle at ${cx}px ${cy}px,` +
        ` rgba(233,255,0,0.042) 0%, transparent 45%)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <div ref={elRef} className="pointer-events-none absolute inset-0 z-[2]" />
}
