import Image from 'next/image'
import type React from 'react'

interface VelixLogoProps {
  className?: string
  style?: React.CSSProperties
}

export function VelixLogo({ className, style }: VelixLogoProps) {
  return (
    <div className={`flex items-center ${className ?? ''}`.trim()}>
      <Image
        src="/logo-transparent.png"
        alt="Velix"
        width={140}
        height={40}
        priority
        style={{
          width: 'auto',
          height: '40px',
          ...style,
        }}
      />
    </div>
  )
}