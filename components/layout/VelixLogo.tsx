import Image from 'next/image'
import type React from 'react'

interface VelixLogoProps {
  className?: string
  style?: React.CSSProperties
}

export function VelixLogo({ className, style }: VelixLogoProps) {
  return (
    <Image
      src="/logo-transparent.png"
      alt="Velix"
      width={180}
      height={44}
      className={`object-cover ${className ?? ''}`.trim()}
      style={style}
      priority
    />
  )
}
