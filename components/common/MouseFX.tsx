'use client'

import { useEffect, useRef } from 'react'

/* Renders a fixed transparent overlay that reacts to mouse position.
   Also sets --sx / --sy CSS vars on .glass-card elements for the spotlight effect. */
export function MouseFX() {
  const gradRef  = useRef<HTMLDivElement>(null)
  const rafRef   = useRef<number>(0)
  const prevCard = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const grad = gradRef.current
    if (!grad) return

    function onMove(e: MouseEvent) {
      cancelAnimationFrame(rafRef.current)

      rafRef.current = requestAnimationFrame(() => {
        /* Page-level ambient gradient */
        if (grad) {
          const px = (e.clientX / window.innerWidth)  * 100
          const py = (e.clientY / window.innerHeight) * 100
          grad.style.background = `radial-gradient(700px circle at ${px}% ${py}%, rgba(233,255,0,0.022), transparent 50%)`
        }

        /* Card spotlight */
        const card = (e.target as HTMLElement).closest('.glass-card') as HTMLElement | null

        if (prevCard.current && prevCard.current !== card) {
          prevCard.current.style.setProperty('--sx', '-9999px')
          prevCard.current.style.setProperty('--sy', '-9999px')
        }

        if (card) {
          const rect = card.getBoundingClientRect()
          card.style.setProperty('--sx', `${e.clientX - rect.left}px`)
          card.style.setProperty('--sy', `${e.clientY - rect.top}px`)
        }

        prevCard.current = card
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={gradRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 1 }}
    />
  )
}
