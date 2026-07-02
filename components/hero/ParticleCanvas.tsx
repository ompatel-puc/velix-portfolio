'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number
  opacity: number; maxOpacity: number
  colorIndex: number
  life: number; maxLife: number
}

const COLORS = [
  '255,255,255',   // white
  '233,255,0',     // accent
  '167,176,197',   // muted
]

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)
  const mouseRef  = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    /* ── Sizing ─────────────────────────────── */
    const resize = () => {
      canvas.width  = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    /* ── Particle factory ───────────────────── */
    const makeParticle = (w: number, h: number): Particle => {
      const maxLife = 250 + Math.random() * 300
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.8 + 0.4,
        opacity: 0,
        maxOpacity: Math.random() * 0.45 + 0.1,
        colorIndex: Math.random() < 0.08 ? 1 : Math.random() < 0.15 ? 2 : 0,
        life: Math.random() * maxLife,
        maxLife,
      }
    }

    const COUNT  = window.innerWidth < 768 ? 50 : 90
    const particles: Particle[] = Array.from({ length: COUNT }, () =>
      makeParticle(canvas.width, canvas.height)
    )

    /* ── Mouse ──────────────────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    /* ── Loop ───────────────────────────────── */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width
      const h = canvas.height
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        /* Lifecycle opacity */
        p.life++
        const half = p.maxLife * 0.5
        p.opacity = p.life < half
          ? (p.life / half) * p.maxOpacity
          : ((p.maxLife - p.life) / half) * p.maxOpacity

        if (p.life >= p.maxLife) {
          particles[i] = makeParticle(w, h)
          continue
        }

        /* Mouse repulsion */
        const dx = p.x - mx
        const dy = p.y - my
        const d2 = dx * dx + dy * dy
        if (d2 < 14400) {           // 120px radius
          const d    = Math.sqrt(d2)
          const force = (120 - d) / 120 * 0.25
          p.vx += (dx / d) * force
          p.vy += (dy / d) * force
        }

        /* Dampen + move */
        p.vx *= 0.992
        p.vy *= 0.992
        p.x  += p.vx
        p.y  += p.vy

        /* Wrap */
        if (p.x < -4)    p.x = w + 4
        if (p.x > w + 4) p.x = -4
        if (p.y < -4)    p.y = h + 4
        if (p.y > h + 4) p.y = -4

        /* Draw dot */
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${COLORS[p.colorIndex]},${p.opacity})`
        ctx.fill()
      }

      /* Draw connections */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < 8100) {            // 90px
            const alpha = (1 - Math.sqrt(d2) / 90) * 0.07
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`
            ctx.lineWidth   = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 0.65 }}
    />
  )
}
