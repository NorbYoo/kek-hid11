import { Button } from '@/components/Button'
import { mediaObject } from '@/lib/utils'

export function Hero({ home }: { home: any }) {
  const img = mediaObject(home?.heroImage) as { url?: string | null; alt?: string | null } | null

  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      {/* Háttérkép (ha van feltöltve) */}
      {img?.url ? (
        <img
          src={img.url}
          alt={img.alt || ''}
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden={img.alt ? undefined : true}
        />
      ) : null}
      {/* Gradiens overlay */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div
        className="absolute inset-0 opacity-40"
        style={{ background: 'radial-gradient(800px circle at 80% 20%, rgba(91,155,213,0.45), transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="container relative py-20 md:py-28 lg:py-32">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-extrabold leading-none tracking-tight md:text-6xl lg:text-7xl">
            {home?.heroTitle || 'KÉK-HÍD'}
          </h1>
          <p className="mt-2 text-2xl font-light text-white/90 md:text-3xl">{home?.heroSubtitle || 'Egyesület'}</p>

          {home?.heroLead ? (
            <p className="mt-6 text-xl font-medium text-brand-sky md:text-2xl">{home.heroLead}</p>
          ) : null}
          {home?.heroIntro ? (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">{home.heroIntro}</p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={home?.heroPrimaryUrl || '/csatlakozas'} variant="white" icon="heart" className="rounded-full">
              {home?.heroPrimaryLabel || 'Csatlakozom'}
            </Button>
            <Button href={home?.heroSecondaryUrl || '/rolunk'} variant="outlineWhite" iconRight="arrow-right" className="rounded-full">
              {home?.heroSecondaryLabel || 'Ismerj meg minket'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
