import { Quote } from 'lucide-react'

import { MediaImage } from '@/components/MediaImage'
import { mediaObject } from '@/lib/utils'

export function TestimonialsSection({ home, testimonials }: { home: any; testimonials: any[] }) {
  const hasImage = Boolean(mediaObject(home?.testimonialsImage))
  if (!testimonials?.length && !hasImage) return null

  return (
    <section className="bg-gradient-to-br from-brand-navy via-brand-dark to-brand text-white">
      <div className="container py-16 md:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.slice(0, 2).map((t) => (
            <figure key={t.id} className="rounded-card bg-white/10 p-7 ring-1 ring-white/10 backdrop-blur">
              <Quote className="h-8 w-8 text-brand-sky" aria-hidden="true" />
              <blockquote className="mt-3 text-lg italic leading-relaxed text-white/90">{t.quote}</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-brand-sky">– {t.author}</figcaption>
            </figure>
          ))}
          <div className="min-h-[220px] overflow-hidden rounded-card shadow-soft">
            <MediaImage media={home?.testimonialsImage} alt="Összefogás a közösségben" fallbackLabel="Kép helye" />
          </div>
        </div>
      </div>
    </section>
  )
}
