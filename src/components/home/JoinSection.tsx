import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { MediaImage } from '@/components/MediaImage'
import { SectionHeading } from '@/components/SectionHeading'

export function JoinSection({ home }: { home: any }) {
  const ways: { icon?: string; title?: string; text?: string }[] = home?.joinWays || []
  return (
    <section className="bg-brand-light">
      <div className="container py-16 md:py-20">
        <SectionHeading center>{home?.joinHeading || 'Csatlakozz hozzánk!'}</SectionHeading>
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid gap-6 sm:grid-cols-3">
              {ways.map((w, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand shadow-card sm:mx-0">
                    <Icon name={w.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-brand-navy">{w.title}</h3>
                  {w.text ? <p className="mt-1 text-sm text-slate-600">{w.text}</p> : null}
                </div>
              ))}
            </div>
            <div className="mt-8 text-center lg:text-left">
              <Button href={home?.joinCtaUrl || '/csatlakozas'} variant="primary" icon="heart" className="rounded-full">
                {home?.joinCtaLabel || 'Csatlakozom'}
              </Button>
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-card shadow-soft">
            <MediaImage media={home?.joinImage} alt="Összefogás – kék szívet tartó kezek" fallbackLabel="Kép helye" />
          </div>
        </div>
      </div>
    </section>
  )
}
