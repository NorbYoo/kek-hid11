import config from '@payload-config'
import { getPayload } from 'payload'

export const getPayloadClient = () => getPayload({ config })

export async function getGlobalData<T = any>(slug: string, depth = 2): Promise<T> {
  const payload = await getPayloadClient()
  return (await payload.findGlobal({ slug: slug as never, depth })) as T
}

export async function getFeaturedPrograms(limit = 4) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'programs',
    where: { featured: { equals: true } },
    sort: 'startDate',
    limit,
    depth: 1,
  })
  return res.docs
}

export async function getUpcomingPrograms(limit = 12) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'programs',
    sort: 'startDate',
    limit,
    depth: 1,
  })
  return res.docs
}

export async function getFeaturedTestimonials(limit = 3) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'testimonials',
    where: { featured: { equals: true } },
    limit,
    depth: 1,
  })
  return res.docs
}

export async function getLatestPosts(limit = 3) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit,
    depth: 1,
  })
  return res.docs
}

export async function getPageBySlug(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return res.docs[0] ?? null
}

export async function getPostBySlug(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return res.docs[0] ?? null
}

export async function getProgramBySlug(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'programs',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return res.docs[0] ?? null
}
