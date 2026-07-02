import { cn } from '@/lib/utils'

type OrbColor   = 'accent' | 'white' | 'blue' | 'violet'
type OrbSize    = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface GlowOrbProps {
  color?:     OrbColor
  size?:      OrbSize
  className?: string
  blur?:      string
  opacity?:   number
  animate?:   boolean
}

const sizeMap: Record<OrbSize, string> = {
  sm:  'w-48 h-48',
  md:  'w-80 h-80',
  lg:  'w-[32rem] h-[32rem]',
  xl:  'w-[48rem] h-[48rem]',
  '2xl': 'w-[64rem] h-[64rem]',
}

const colorMap: Record<OrbColor, string> = {
  accent: 'bg-[#E9FF00]',
  white:  'bg-white',
  blue:   'bg-blue-500',
  violet: 'bg-violet-500',
}

export function GlowOrb({
  color   = 'accent',
  size    = 'lg',
  className,
  blur    = 'blur-[128px]',
  opacity = 0.08,
  animate = false,
}: GlowOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute rounded-full',
        sizeMap[size],
        colorMap[color],
        blur,
        animate && 'animate-float',
        className
      )}
      style={{ opacity }}
    />
  )
}
