import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPostBySlug } from '@/lib/payload'
import { PageHero } from '@/components/PageHero'
import { RichText } from '@/components/RichText'
import { MediaImage } from '@/components/MediaImage'
import { formatHuDate } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug).catch(() => null)
  if (!post) return {}
  return {
    title: post.meta?.title || post.title,
    description: post.meta?.description || post.excerpt || undefined,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug).catch(() => null)
  if (!post) notFound()

  return (
    <>
      <PageHero title={post.title} subtitle={formatHuDate(post.publishedAt as string)} compact />
      <article className="bg-white">
        <div className="container max-w-3xl py-12 md:py-16">
          {post.coverImage && (
            <div className="mb-8 aspect-[16/9] overflow-hidden rounded-card shadow-soft">
              <MediaImage media={post.coverImage} alt={post.title} />
            </div>
          )}
          <RichText content={post.content as any} />
          <div className="mt-10 border-t border-slate-100 pt-6">
            <Link href="/hirek" className="text-sm font-semibold text-brand hover:underline">
              ← Vissza a hírekhez
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
