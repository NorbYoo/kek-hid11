import { cn, mediaObject } from '@/lib/utils'

function BridgeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 44" className={className} fill="none" aria-hidden="true">
      {/* boltív */}
      <path d="M4 36 C 20 12, 44 12, 60 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* híd pálya */}
      <line x1="3" y1="30" x2="61" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* függőleges kábelek */}
      <line x1="18" y1="20" x2="18" y2="30" stroke="currentColor" strokeWidth="1.6" />
      <line x1="32" y1="16" x2="32" y2="30" stroke="currentColor" strokeWidth="1.6" />
      <line x1="46" y1="20" x2="46" y2="30" stroke="currentColor" strokeWidth="1.6" />
      {/* emberkék fejei */}
      <circle cx="25" cy="24" r="2.1" fill="currentColor" />
      <circle cx="32" cy="22.5" r="2.1" fill="currentColor" />
      <circle cx="39" cy="24" r="2.1" fill="currentColor" />
    </svg>
  )
}

export function Logo({
  brand,
  variant = 'light',
  className,
}: {
  brand?: { siteName?: string | null; siteSubtitle?: string | null; logoLight?: unknown; logoDark?: unknown } | null
  variant?: 'light' | 'dark'
  className?: string
}) {
  const media = mediaObject((variant === 'dark' ? brand?.logoDark : brand?.logoLight) as never) as
    | { url?: string | null; alt?: string | null }
    | null
  const name = brand?.siteName || 'KÉK-HÍD'
  const subtitle = brand?.siteSubtitle || 'Egyesület'

  if (media?.url) {
    return <img src={media.url} alt={media.alt || name} className={cn('h-12 w-auto', className)} />
  }

  const textColor = variant === 'dark' ? 'text-white' : 'text-brand-navy'
  const markColor = variant === 'dark' ? 'text-white' : 'text-brand'

  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <BridgeMark className={cn('h-10 w-14 shrink-0', markColor)} />
      <span className="flex flex-col leading-none">
        <span className={cn('text-xl font-extrabold tracking-tight', textColor)}>{name}</span>
        <span className={cn('text-[11px] font-medium uppercase tracking-[0.2em]', variant === 'dark' ? 'text-white/70' : 'text-brand/70')}>
          {subtitle}
        </span>
      </span>
    </span>
  )
}
