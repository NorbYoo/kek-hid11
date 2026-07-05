import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getProgramBySlug } from '@/lib/payload'
import { PageHero } from '@/components/PageHero'
import { RichText } from '@/components/RichText'
import { MediaImage } from '@/components/MediaImage'
import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { formatHuDate } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const prog = await getProgramBySlug(slug).catch(() => null)
  if (!prog) return {}
  return {
    title: prog.title,
    description: prog.summary || undefined,
  }
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params
  const prog = await getProgramBySlug(slug).catch(() => null)
  if (!prog) notFound()

  return (
    <>
      <PageHero title={prog.title} subtitle={prog.summary} image={prog.image} compact />
      <article className="bg-white">
        <div className="container max-w-3xl py-12 md:py-16">
          {/* Meta sáv */}
          <div className="mb-8 flex flex-wrap gap-4 rounded-card bg-brand-light p-5 text-sm">
            {prog.startDate && (
              <span className="inline-flex items-center gap-2 font-medium text-brand-navy">
                <Icon name="calendar" className="h-4 w-4 text-brand" />
                {formatHuDate(prog.startDate as string)}
                {prog.endDate && prog.endDate !== prog.startDate
                  ? ` – ${formatHuDate(prog.endDate as string)}`
                  : ''}
              </span>
            )}
            {prog.location && (
              <span className="inline-flex items-center gap-2 font-medium text-brand-navy">
                <Icon name="map-pin" className="h-4 w-4 text-brand" />
                {prog.online ? 'Online' : prog.location}
              </span>
            )}
          </div>

          {/* Borítókép ha van */}
          {prog.image && (
            <div className="mb-8 aspect-[16/9] overflow-hidden rounded-card shadow-soft">
              <MediaImage media={prog.image} alt={prog.title} />
            </div>
          )}

          <RichText content={prog.description as any} />

          {/* Jelentkezési gomb */}
          {prog.registerUrl && (
            <div className="mt-8">
              <Button href={prog.registerUrl} variant="primary" newTab icon="arrow-right">
                Jelentkezés
              </Button>
            </div>
          )}

          <div className="mt-10 border-t border-slate-100 pt-6">
            <Link href="/programjaink" className="text-sm font-semibold text-brand hover:underline">
              ← Vissza a programokhoz
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
