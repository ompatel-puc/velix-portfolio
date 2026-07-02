import { ParticleCanvas } from './ParticleCanvas'
import { MouseGlow }     from './MouseGlow'

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-velix-bg" />

      {/* Thin line grid */}
      <div className="absolute inset-0 bg-grid opacity-25" />

      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-50" />

      {/* Soft radial gradient — centered top */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 72% 56% at 50% 0%, rgba(233,255,0,0.07) 0%, transparent 60%)',
        }}
      />

      {/* Ambient glow — left */}
      <div
        className="pointer-events-none absolute -top-48 left-[8%] h-160 w-160 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(233,255,0,0.038) 0%, transparent 65%)',
          filter: 'blur(90px)',
          animation: 'float 18s ease-in-out infinite',
        }}
      />
      {/* Ambient glow — right */}
      <div
        className="pointer-events-none absolute top-[25%] -right-28 h-125 w-125 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(233,255,0,0.022) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'float 22s ease-in-out infinite reverse',
          animationDelay: '-9s',
        }}
      />

      {/* Glowing top-edge accent line */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-120 -translate-x-1/2"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(233,255,0,0.38), transparent)',
          boxShadow: '0 0 18px 1px rgba(233,255,0,0.14)',
        }}
      />

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Mouse glow */}
      <MouseGlow />

      {/* Bottom fade to next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-velix-bg to-transparent" />
    </div>
  )
}
