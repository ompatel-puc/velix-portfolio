import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  as?: React.ElementType
}

export function Section({ children, className, id, as: Tag = 'section' }: SectionProps) {
  return (
    <Tag id={id} className={cn('relative py-20 lg:py-32', className)}>
      {children}
    </Tag>
  )
}
