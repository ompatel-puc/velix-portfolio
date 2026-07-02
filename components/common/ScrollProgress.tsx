'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[9990] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, transparent 0%, #E9FF00 15%, #C4D900 100%)',
        boxShadow: '0 0 10px rgba(233,255,0,0.7), 0 0 3px rgba(233,255,0,1)',
      }}
    />
  )
}
