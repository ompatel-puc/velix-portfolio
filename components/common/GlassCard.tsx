'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { scaleIn } from '@/lib/animations'

type GlassCardVariant = 'default' | 'accent' | 'featured' | 'surface'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  variant?: GlassCardVariant
  hover?: boolean
  glow?: boolean
  animate?: boolean
  delay?: number
  children: React.ReactNode
}

const variantClasses: Record<GlassCardVariant, string> = {
  default:  'glass-card',
  accent:   'glass-card-accent',
  featured: 'glass-card-featured',
  surface:  'surface-card',
}

export function GlassCard({
  variant = 'default',
  hover = true,
  glow = false,
  animate = true,
  delay = 0,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      variants={animate ? scaleIn : undefined}
      initial={animate ? 'hidden' : undefined}
      whileInView={animate ? 'visible' : undefined}
      viewport={animate ? { once: true, margin: '-80px' } : undefined}
      transition={animate ? { delay } : undefined}
      className={cn(
        variantClasses[variant],
        glow && 'glow-sm',
        !hover && '[&:hover]:transform-none [&:hover]:shadow-none',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
