import Image from 'next/image'
import type React from 'react'

interface VelixLogoProps {
  className?: string
  style?: React.CSSProperties
}

export function VelixLogo({ className = '', style }: VelixLogoProps) {
  return (
    <Image
      src="/logo-nav.png"
      alt="Velix"
      width={1400}
      height={340}
      priority
      className={`w-auto object-contain ${className}`.trim()}
      style={style}
    />
  )
}