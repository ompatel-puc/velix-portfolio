'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function GoToTop() {
  const [visible,   setVisible]   = useState(false)
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleClick() {
    setScrolling(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setScrolling(false), 900)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: '#E9FF00' }}
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            scale: 1.12,
            boxShadow: '0 0 28px rgba(233,255,0,0.55), 0 0 60px rgba(233,255,0,0.2)',
          }}
          whileTap={{ scale: 0.93 }}
        >
          <motion.div
            animate={{ rotate: scrolling ? -15 : 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <ArrowUp className="h-5 w-5" style={{ color: '#050816' }} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
