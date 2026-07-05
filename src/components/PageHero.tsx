import { MediaImage } from './MediaImage'
import { cn } from '@/lib/utils'

export function PageHero({
  title,
  subtitle,
  image,
  compact,
}: {
  title: string
  subtitle?: string | null
  image?: unknown
  compact?: boolean
}) {
  const hasImage = Boolean(
    image && typeof image === 'object' && (image as { url?: string }).url,
  )

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-brand-navy text-white',
        compact ? 'py-10 md:py-14' : 'py-16 md:py-24',
      )}
    >
      {hasImage && (
        <div className="absolute inset-0">
          <MediaImage media={image} imgClassName="opacity-30" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-transparent" />
      <div className="container relative">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-white/80">{subtitle}</p>}
      </div>
    </section>
  )
}
