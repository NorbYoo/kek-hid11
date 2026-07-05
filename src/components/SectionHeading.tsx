import { cn } from '@/lib/utils'

export function SectionHeading({
  children,
  center,
  className,
}: {
  children: React.ReactNode
  center?: boolean
  className?: string
}) {
  return (
    <h2
      className={cn(
        'text-2xl font-bold uppercase tracking-wide text-brand-navy md:text-3xl',
        center && 'text-center',
        className,
      )}
    >
      {children}
    </h2>
  )
}
