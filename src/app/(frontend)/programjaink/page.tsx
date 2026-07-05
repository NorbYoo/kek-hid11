import type { Metadata } from 'next'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'
import { PageHero } from '@/components/PageHero'
import { MediaImage } from '@/components/MediaImage'
import { Icon } from '@/components/Icon'
import { formatHuDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Programjaink',
  description: 'A KÉK-HÍD Egyesület közelgő és korábbi programjai, eseményei.',
}

export const dynamic = 'force-dynamic'

export default async function ProgramokPage() {
  const payload = await getPayloadClient()
  const { docs: programs } = await payload.find({
    collection: 'programs',
    sort: 'startDate',
    limit: 50,
    depth: 1,
  })

  const now = new Date()
  const upcoming = programs.filter((p) => new Date(p.startDate as string) >= now)
  const past = programs.filter((p) => new Date(p.startDate as string) < now)

  return (
    <>
      <PageHero title="Programjaink" subtitle="Rendszeres és egyedi eseményeink — csatlakozz te is!" compact />
      <section className="bg-white">
        <div className="container py-12 md:py-16">
          {upcoming.length > 0 && (
            <>
              <h2 className="mb-8 text-xl font-bold uppercase tracking-wide text-brand-navy">Közelgő programok</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((p) => (
                  <ProgramCard key={p.id} program={p} />
                ))}
              </div>
            </>
          )}

          {past.length > 0 && (
            <div className={upcoming.length ? 'mt-16' : ''}>
              <h2 className="mb-8 text-xl font-bold uppercase tracking-wide text-brand-navy">Korábbi programok</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 opacity-75">
                {past.map((p) => (
                  <ProgramCard key={p.id} program={p} past />
                ))}
              </div>
            </div>
          )}

          {programs.length === 0 && (
            <p className="text-center text-slate-500">Hamarosan új programokkal jelentkezünk.</p>
          )}
        </div>
      </section>
    </>
  )
}

function ProgramCard({ program, past }: { program: any; past?: boolean }) {
  return (
    <Link
      href={`/programjaink/${program.slug}`}
      className="group flex flex-col overflow-hidden rounded-card bg-white shadow-card ring-1 ring-slate-100 transition-shadow hover:shadow-soft"
    >
      <div className="aspect-[4/3] overflow-hidden bg-brand-light">
        <MediaImage media={program.image} alt={program.title} fallbackLabel="Programkép" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-bold text-brand-navy transition-colors group-hover:text-brand">{program.title}</h3>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-500">
          <Icon name="calendar" className="h-4 w-4 text-brand" />
          {formatHuDate(program.startDate)}
          {past && <span className="ml-1 text-xs text-slate-400">(lezárult)</span>}
        </p>
        {program.location && (
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-500">
            <Icon name="map-pin" className="h-4 w-4 text-brand" />
            {program.location}
          </p>
        )}
        {program.summary && (
          <p className="mt-3 line-clamp-2 flex-1 text-sm text-slate-600">{program.summary}</p>
        )}
        <span className="mt-4 text-sm font-semibold text-brand">Részletek →</span>
      </div>
    </Link>
  )
}
