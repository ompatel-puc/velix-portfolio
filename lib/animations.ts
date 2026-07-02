import type { Variants, Transition } from 'framer-motion'

/* ── Easing curves ───────────────────────────────────── */
export const EASE_EXPO   = [0.22, 1, 0.36, 1]    as const
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const
export const EASE_SMOOTH = [0.40, 0.00, 0.20, 1] as const

/* ── Shared transitions ──────────────────────────────── */
export const transitionFast: Transition   = { duration: 0.35, ease: EASE_EXPO }
export const transitionBase: Transition   = { duration: 0.55, ease: EASE_EXPO }
export const transitionSlow: Transition   = { duration: 0.80, ease: EASE_EXPO }
export const transitionSpring: Transition = { type: 'spring', stiffness: 300, damping: 28 }

/* ── Fade variants ───────────────────────────────────── */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: transitionBase },
}

export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: transitionBase },
}

export const fadeInDown: Variants = {
  hidden:  { opacity: 0, y: -36 },
  visible: { opacity: 1, y: 0, transition: transitionBase },
}

/* ── Slide variants ──────────────────────────────────── */
export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -52 },
  visible: { opacity: 1, x: 0, transition: transitionBase },
}

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 52 },
  visible: { opacity: 1, x: 0, transition: transitionBase },
}

/* ── Scale variants ──────────────────────────────────── */
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: transitionBase },
}

export const scaleInSpring: Variants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 30 },
  },
}

/* ── Blur-in (glassmorphism reveal) ──────────────────── */
export const blurIn: Variants = {
  hidden:  { opacity: 0, filter: 'blur(12px)', y: 20 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.7, ease: EASE_EXPO },
  },
}

/* ── Draw line ───────────────────────────────────────── */
export const drawLine: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE_EXPO } },
}

/* ── Stagger containers ──────────────────────────────── */
export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.10, delayChildren: 0.05 } },
}

export const staggerContainerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.10 } },
}

export const staggerContainerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
}

/* ── Character/word text reveal ──────────────────────── */
export const charReveal: Variants = {
  hidden:  { opacity: 0, y: '120%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.6, ease: EASE_EXPO },
  },
}

/* ── Parallax (use with useTransform) ─────────────────── */
export const parallaxFast  = { input: [0, 1], output: [-60, 60]  }
export const parallaxSlow  = { input: [0, 1], output: [-20, 20]  }
export const parallaxScale = { input: [0, 1], output: [1.05, 0.95] }

/* ── Viewport defaults (use with whileInView) ────────── */
export const viewportOnce  = { once: true, margin: '-80px'  }
export const viewportEager = { once: true, margin: '-40px'  }
export const viewportLazy  = { once: true, margin: '-150px' }

/* ── Hover presets (use with whileHover) ─────────────── */
export const hoverLift  = { y: -6,     transition: transitionFast }
export const hoverScale = { scale: 1.04, transition: transitionFast }
export const hoverGlow  = { boxShadow: '0 0 40px rgba(233,255,0,0.35)' }

/* ── Tap preset ──────────────────────────────────────── */
export const tapScale = { scale: 0.96, transition: { duration: 0.1 } }
