'use client'

import { motion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface SectionDividerProps {
  className?: string
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto flex max-w-5xl items-center gap-5 px-8 py-2 ${className ?? ''}`}
    >
      {/* Left line — grows from right (diamond) toward left edge */}
      <motion.div
        className="h-px flex-1"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(233,255,0,0.15))',
          originX: 1,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: EASE }}
      />

      {/* Center diamond */}
      <div
        className="h-1.5 w-1.5 flex-none rotate-45"
        style={{ background: 'rgba(233,255,0,0.38)' }}
      />

      {/* Right line — grows from left (diamond) toward right edge */}
      <motion.div
        className="h-px flex-1"
        style={{
          background: 'linear-gradient(90deg, rgba(233,255,0,0.15), transparent)',
          originX: 0,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: EASE }}
      />
    </div>
  )
}
