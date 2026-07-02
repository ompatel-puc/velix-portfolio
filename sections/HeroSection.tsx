'use client'

import { motion } from 'framer-motion'
import { HeroBackground }   from '@/components/hero/HeroBackground'
import { HeroContent }      from '@/components/hero/HeroContent'
import { HeroIllustration } from '@/components/hero/HeroIllustration'
import { Container }        from '@/components/layout/Container'

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-velix-bg"
      style={{ minHeight: '100svh' }}
    >
      <HeroBackground />

      {/* Main content — browser centered above, text below */}
      <div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{ minHeight: '100svh' }}
      >
        <Container className="flex flex-col items-center pt-24 pb-32 w-full">
          {/* 1 · Browser illustration — above */}
          <HeroIllustration />

          {/* 2 · Heading + subtitle + buttons — below */}
          <HeroContent />
        </Container>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.9 }}
      >
        <motion.span
          className="text-lg leading-none select-none"
          style={{ color: 'rgba(255,255,255,0.25)' }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
        <span
          className="text-velix-muted/40"
          style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          Scroll to Explore
        </span>
      </motion.div>
    </section>
  )
}
