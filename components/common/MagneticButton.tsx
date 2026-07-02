'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  strength?: number
  className?: string
}

export function MagneticButton({ children, strength = 0.38, className }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x   = useMotionValue(0)
  const y   = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 })

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width  / 2) * strength)
    y.set((e.clientY - rect.top  - rect.height / 2) * strength)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    /* Ripple on the nearest interactive child (a, button) */
    const target = e.target as HTMLElement
    const inner  = target.closest('a, button') as HTMLElement | null
    if (!inner) return

    const rect = inner.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2.2
    const sx   = e.clientX - rect.left - size / 2
    const sy   = e.clientY - rect.top  - size / 2

    const ripple = document.createElement('span')
    ripple.setAttribute('aria-hidden', 'true')
    ripple.style.cssText = [
      'position:absolute',
      'border-radius:50%',
      'background:rgba(233,255,0,0.18)',
      'transform:scale(0)',
      'animation:btn-ripple 0.65s ease-out forwards',
      `width:${size}px`,
      `height:${size}px`,
      `left:${sx}px`,
      `top:${sy}px`,
      'pointer-events:none',
    ].join(';')

    inner.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true })
  }

  return (
    <div
      ref={ref}
      className={`inline-block ${className ?? ''}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <motion.div style={{ x: springX, y: springY }}>
        {children}
      </motion.div>
    </div>
  )
}
