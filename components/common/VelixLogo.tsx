import Image from 'next/image'
import { cn } from '@/lib/utils'

interface VelixLogoProps {
  variant?: 'full' | 'mark'
  size?:    'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: { mark: 28, logo: { w: 90,  h: 28  } },
  md: { mark: 36, logo: { w: 112, h: 36  } },
  lg: { mark: 48, logo: { w: 150, h: 48  } },
}

export function VelixLogo({ variant = 'full', size = 'md', className }: VelixLogoProps) {
  const { mark, logo } = sizeMap[size]

  if (variant === 'mark') {
    return (
      <Image
        src="/logo-mark.jpg"
        alt="Velix"
        width={mark}
        height={mark}
        className={cn('rounded-lg object-contain', className)}
        priority
      />
    )
  }

  return (
    <Image
      src="/logo-transparent.png"
      alt="Velix"
      width={logo.w}
      height={logo.h}
      className={cn('object-contain', className)}
      priority
    />
  )
}
