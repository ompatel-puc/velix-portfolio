'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Phase = 'loading' | 'exit-content' | 'exit-curtains' | 'done'

const CURTAIN_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]
const ENTER_EASE:  [number, number, number, number] = [0.22, 1, 0.36,  1]

const R = 46
const C = +(2 * Math.PI * R).toFixed(4)

export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>('loading')

  useEffect(() => {
    const start = performance.now()
    const MIN_MS = 1100

    function trigger() {
      const elapsed = performance.now() - start
      const wait = Math.max(0, MIN_MS - elapsed)

      setTimeout(() => {
        setPhase('exit-content')
        setTimeout(() => setPhase('exit-curtains'), 360)
        setTimeout(() => setPhase('done'),          1650)
      }, wait)
    }

    if (document.readyState === 'complete') {
      trigger()
    } else {
      window.addEventListener('load', trigger, { once: true })
    }
  }, [])

  if (phase === 'done') return null

  const isExiting         = phase !== 'loading'
  const isSplitting       = phase === 'exit-curtains'
  const curtainTop        = isSplitting ? '-101%' : '0%'
  const curtainBottom     = isSplitting ? '101%'  : '0%'

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[99999]"
      style={{ pointerEvents: phase === 'exit-curtains' ? 'none' : undefined }}
    >
      {/* ── Top curtain panel ─────────────────────────────── */}
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{ height: '51%', background: '#050816' }}
        animate={{ y: curtainTop }}
        transition={{ duration: 1.15, ease: CURTAIN_EASE }}
      />

      {/* ── Bottom curtain panel ──────────────────────────── */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{ height: '51%', background: '#050816' }}
        animate={{ y: curtainBottom }}
        transition={{ duration: 1.15, ease: CURTAIN_EASE, delay: 0.04 }}
      />

      {/* ── Center stage ──────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center"
        style={{ gap: '1.25rem' }}
        animate={isExiting ? { opacity: 0, scale: 0.93 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.32, ease: ENTER_EASE }}
      >
        {/* Ring + logo container */}
        <div className="relative flex h-28 w-28 items-center justify-center">
          {/* Outer ambient glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: '-30%',
              background: 'radial-gradient(circle, rgba(233,255,0,0.09) 0%, transparent 60%)',
            }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.92, 1.06, 0.92] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* SVG progress ring */}
          <svg
            className="absolute inset-0 -rotate-90"
            width="112"
            height="112"
            viewBox="0 0 112 112"
          >
            {/* Track */}
            <circle
              cx="56" cy="56" r={R}
              fill="none"
              stroke="rgba(233,255,0,0.08)"
              strokeWidth="1"
            />
            {/* Animated arc */}
            <motion.circle
              cx="56" cy="56" r={R}
              fill="none"
              stroke="#E9FF00"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2.6, ease: 'easeInOut' }}
            />
          </svg>

          {/* Logo mark */}
          <motion.div
            className="relative z-10 flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 0 40px rgba(233,255,0,0.28), 0 0 80px rgba(233,255,0,0.10)' }}
            initial={{ scale: 0.45, opacity: 0, rotate: -12 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.75, ease: ENTER_EASE }}
          >
            <Image src="/logo-mark.jpg" alt="Velix" width={60} height={60} className="object-cover w-full h-full" priority />
          </motion.div>
        </div>

        {/* VELIX — per-character reveal ─────────────────── */}
        <div className="flex items-center" style={{ gap: '0.14em' }}>
          {'VELIX'.split('').map((char, i) => (
            <motion.span
              key={char + i}
              className="font-heading text-xl font-bold text-white"
              style={{ letterSpacing: '0.2em' }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3 + i * 0.085,
                duration: 0.55,
                ease: ENTER_EASE,
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          className="font-heading text-[10px] font-medium uppercase tracking-[0.38em] text-[#A7B0C5]/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.7 }}
        >
          Premium Web Development
        </motion.p>
      </motion.div>
    </div>
  )
}
