'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'click' | 'text' | 'view' | 'hidden'

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, [tabindex], [data-cursor]'

export function CustomCursor() {
  const [state, setState] = useState<CursorState>('hidden')
  const [isTouch, setIsTouch] = useState(true)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  /* Dot — snappy */
  const dotX = useSpring(mouseX, { stiffness: 1500, damping: 60, mass: 0.08 })
  const dotY = useSpring(mouseY, { stiffness: 1500, damping: 60, mass: 0.08 })

  /* Ring — lagging */
  const ringX = useSpring(mouseX, { stiffness: 280, damping: 28, mass: 0.6 })
  const ringY = useSpring(mouseY, { stiffness: 280, damping: 28, mass: 0.6 })

  const rafRef = useRef<number>(0)
  const stateRef = useRef<CursorState>('hidden')
  stateRef.current = state

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    setIsTouch(false)

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
        if (stateRef.current === 'hidden') setState('default')
      })
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('[data-cursor="hidden"]')) { setState('hidden'); return }
      if (t.closest('[data-cursor="view"]'))   { setState('view');   return }
      if (t.closest('[data-cursor="text"]'))   { setState('text');   return }
      if (t.closest(INTERACTIVE))              { setState('hover');  return }
      setState('default')
    }

    const onDown  = () => setState('click')
    const onUp    = () => {
      const el = document.elementFromPoint(mouseX.get(), mouseY.get())
      const s = el?.closest('[data-cursor="view"]') ? 'view'
        : el?.closest(INTERACTIVE) ? 'hover'
        : 'default'
      setState(s as CursorState)
    }
    const onLeave = () => setState('hidden')
    const onEnter = () => setState('default')

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [mouseX, mouseY])

  if (isTouch) return null

  const isHidden = state === 'hidden'
  const isHover  = state === 'hover'
  const isClick  = state === 'click'
  const isText   = state === 'text'
  const isView   = state === 'view'

  const ringSize = isView ? 80 : isHover ? 54 : isClick ? 20 : isText ? 2 : 36
  const dotSize  = isView ? 0  : isHover ? 5  : isClick ? 8  : isText ? 20 : 5

  return (
    <>
      {/* ── Outer ring ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: isHidden ? 0 : 1,
          borderWidth: isView ? 1.5 : isHover ? 1.5 : 1,
          borderColor: isView
            ? 'rgba(233,255,0,0.70)'
            : isHover
            ? 'rgba(233,255,0,0.90)'
            : isClick
            ? 'rgba(233,255,0,1)'
            : 'rgba(233,255,0,0.45)',
          borderStyle: 'solid',
          boxShadow: isView
            ? '0 0 20px rgba(233,255,0,0.25)'
            : isHover
            ? '0 0 16px rgba(233,255,0,0.35)'
            : isClick
            ? '0 0 24px rgba(233,255,0,0.60)'
            : 'none',
          scale: isClick ? 0.85 : 1,
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* VIEW label inside ring */}
        <AnimatePresence>
          {isView && (
            <motion.span
              key="view-label"
              className="pointer-events-none absolute inset-0 flex items-center justify-center font-heading text-[9px] font-bold tracking-[0.2em] text-[#E9FF00] uppercase"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              VIEW
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Inner dot ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-[#E9FF00]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: isHidden || isView ? 0 : 1,
          scale: isClick ? 0.7 : 1,
          boxShadow: isHover || isClick
            ? '0 0 12px rgba(233,255,0,0.80)'
            : '0 0 4px rgba(233,255,0,0.50)',
        }}
        transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  )
}
