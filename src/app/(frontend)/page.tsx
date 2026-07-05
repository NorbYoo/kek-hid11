import { Hero } from '@/components/home/Hero'
import { ValuesBar } from '@/components/home/ValuesBar'
import { WhySection } from '@/components/home/WhySection'
import { AudiencesSection } from '@/components/home/AudiencesSection'
import { ProgramsSection } from '@/components/home/ProgramsSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { JoinSection } from '@/components/home/JoinSection'
import { getFeaturedPrograms, getFeaturedTestimonials, getGlobalData } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [home, programs, testimonials] = await Promise.all([
    getGlobalData<any>('home').catch(() => null),
    getFeaturedPrograms(4).catch(() => []),
    getFeaturedTestimonials(2).catch(() => []),
  ])

  return (
    <>
      <Hero home={home} />
      <ValuesBar values={home?.values || []} />
      <WhySection home={home} />
      <AudiencesSection home={home} />
      <ProgramsSection home={home} programs={programs} />
      <TestimonialsSection home={home} testimonials={testimonials} />
      <JoinSection home={home} />
    </>
  )
}
