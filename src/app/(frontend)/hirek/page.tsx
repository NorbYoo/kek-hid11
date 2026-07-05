import type { Metadata } from 'next'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'
import { PageHero } from '@/components/PageHero'
import { MediaImage } from '@/components/MediaImage'
import { formatHuDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Hírek',
  description: 'A KÉK-HÍD Egyesület legfrissebb hírei, közleményei és eseménybeszámolói.',
}

export const dynamic = 'force-dynamic'

const categoryLabel: Record<string, string> = {
  hir: 'Hír',
  beszamolo: 'Esemény-beszámoló',
  tudastar: 'Tudástár',
  kozlemeny: 'Közlemény',
}

export default async function HirekPage() {
  const payload = await getPayloadClient()
  const { docs: posts } = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: 24,
    depth: 1,
  })

  return (
    <>
      <PageHero title="Hírek" subtitle="Legfrissebb híreink, közleményeink és eseménybeszámolóink" compact />
      <section className="bg-white">
        <div className="container py-12 md:py-16">
          {posts.length === 0 ? (
            <p className="text-center text-slate-500">Hamarosan új hírekkel jelentkezünk.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/hirek/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-card bg-white shadow-card ring-1 ring-slate-100 transition-shadow hover:shadow-soft"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-brand-light">
                    <MediaImage media={post.coverImage} alt={post.title} fallbackLabel="Kép" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-center gap-2">
                      {post.category ? (
                        <span className="rounded-full bg-brand-light px-2.5 py-0.5 text-xs font-semibold text-brand">
                          {categoryLabel[post.category as string] ?? post.category}
                        </span>
                      ) : null}
                      <span className="text-xs text-slate-400">{formatHuDate(post.publishedAt as string)}</span>
                    </div>
                    <h2 className="text-lg font-bold text-brand-navy transition-colors group-hover:text-brand">
                      {post.title}
                    </h2>
                    {post.excerpt ? (
                      <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-600">{post.excerpt}</p>
                    ) : null}
                    <span className="mt-4 text-sm font-semibold text-brand">Tovább →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
