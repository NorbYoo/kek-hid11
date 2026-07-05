import { cn, mediaObject } from '@/lib/utils'

export function MediaImage({
  media,
  alt,
  className,
  imgClassName,
  fallbackLabel,
}: {
  media?: unknown
  alt?: string
  className?: string
  imgClassName?: string
  fallbackLabel?: string
}) {
  const m = mediaObject(media as never) as
    | { url?: string | null; alt?: string | null; width?: number | null; height?: number | null }
    | null

  if (m?.url) {
    const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const src = m.url.startsWith('http') ? m.url : `${base}${m.url}`
    return (
      <img
        src={src}
        alt={m.alt ?? alt ?? ''}
        width={m.width ?? undefined}
        height={m.height ?? undefined}
        loading="lazy"
        decoding="async"
        className={cn('h-full w-full object-cover', imgClassName)}
      />
    )
  }

  // Helykitöltő — amíg a megrendelő fel nem tölti a saját képét
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-light to-brand/20',
        className,
      )}
      role="img"
      aria-label={alt || fallbackLabel || 'Helykitöltő kép'}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center text-brand/70">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        {fallbackLabel ? <span className="text-xs font-medium">{fallbackLabel}</span> : null}
      </div>
    </div>
  )
}
