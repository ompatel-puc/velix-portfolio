import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'

interface SectionHeadingProps {
  label:     string
  title:     ReactNode
  subtitle?: string
  align?:    'left' | 'center'
  className?: string
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  return (
    <motion.div
      className={[
        'mb-16 flex flex-col gap-4',
        isCenter ? 'items-center text-center' : 'items-start text-left',
        className,
      ].join(' ')}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.span variants={fadeInUp} className="section-label">
        {label}
      </motion.span>
      <motion.h2 variants={fadeInUp} className="text-section text-white max-w-2xl">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className={`text-body-lg text-[#A7B0C5] max-w-lg ${isCenter ? 'text-center' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
