import Link from 'next/link'

import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { MediaImage } from '@/components/MediaImage'
import { SectionHeading } from '@/components/SectionHeading'
import { formatHuDate } from '@/lib/utils'

export function ProgramsSection({ home, programs }: { home: any; programs: any[] }) {
  return (
    <section className="bg-brand-light">
      <div className="container py-16 md:py-20">
        <SectionHeading center>{home?.programsHeading || 'Közelgő programjaink'}</SectionHeading>

        {programs?.length ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p) => (
              <Link
                key={p.id}
                href={`/programjaink/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-card bg-white shadow-card transition-shadow hover:shadow-soft"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <MediaImage media={p.image} alt={p.title} fallbackLabel="Programkép" />
                </div>
                <div className="flex flex-1 flex-col p-5 text-center">
                  <h3 className="font-semibold text-brand-navy transition-colors group-hover:text-brand">{p.title}</h3>
                  <p className="mt-2 inline-flex items-center justify-center gap-1.5 text-sm text-slate-500">
                    <Icon name="calendar" className="h-4 w-4" />
                    {formatHuDate(p.startDate)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-slate-500">Hamarosan új programokkal jelentkezünk.</p>
        )}

        <div className="mt-10 text-center">
          <Button href={home?.programsCtaUrl || '/programjaink'} variant="primary">
            {home?.programsCtaLabel || 'További programok'}
          </Button>
        </div>
      </div>
    </section>
  )
}
