export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

/** Magyar dátumformázás (pl. „2026. július 13.”). */
export function formatHuDate(input?: string | Date | null): string {
  if (!input) return ''
  const d = typeof input === 'string' ? new Date(input) : input
  if (Number.isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

type MediaLike =
  | { url?: string | null; alt?: string | null; width?: number | null; height?: number | null }
  | string
  | number
  | null
  | undefined

export function mediaObject(media: MediaLike) {
  if (media && typeof media === 'object') return media
  return null
}
