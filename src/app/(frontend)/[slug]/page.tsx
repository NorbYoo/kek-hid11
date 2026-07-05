import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPageBySlug } from '@/lib/payload'
import { PageHero } from '@/components/PageHero'
import { RichText } from '@/components/RichText'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug).catch(() => null)
  if (!page) return {}
  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description || undefined,
  }
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  const page = await getPageBySlug(slug).catch(() => null)
  if (!page) notFound()

  return (
    <>
      <PageHero title={page.title} subtitle={page.subtitle} image={page.heroImage} />
      <section className="bg-white">
        <div className="container py-12 md:py-16">
          <RichText content={page.content} />
        </div>
      </section>
    </>
  )
}
