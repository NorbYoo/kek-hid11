export const dynamic = 'force-dynamic'

import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

const BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/rolunk`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/programjaink`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/hirek`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/kapcsolat`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/csatlakozas`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/tudastar`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/kozosseg`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/adatvedelem`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/impresszum`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const [{ docs: posts }, { docs: programs }, { docs: pages }] = await Promise.all([
    payload.find({ collection: 'posts', limit: 200, depth: 0 }),
    payload.find({ collection: 'programs', limit: 200, depth: 0 }),
    payload.find({ collection: 'pages', limit: 200, depth: 0 }),
  ])

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/hirek/${p.slug}`,
    lastModified: new Date(p.updatedAt as string),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const programRoutes: MetadataRoute.Sitemap = programs.map((p) => ({
    url: `${BASE}/programjaink/${p.slug}`,
    lastModified: new Date(p.updatedAt as string),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const pageRoutes: MetadataRoute.Sitemap = pages
    .filter((p) => !['kapcsolat', 'csatlakozas', 'rolunk', 'tudastar', 'kozosseg'].includes(p.slug as string))
    .map((p) => ({
      url: `${BASE}/${p.slug}`,
      lastModified: new Date(p.updatedAt as string),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

  return [...staticRoutes, ...postRoutes, ...programRoutes, ...pageRoutes]
}
