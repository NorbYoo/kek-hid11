import { Icon } from '@/components/Icon'
import { SectionHeading } from '@/components/SectionHeading'

export function AudiencesSection({ home }: { home: any }) {
  const items: { icon?: string; title?: string }[] = home?.audiences || []
  if (!items.length) return null
  return (
    <section className="bg-white">
      <div className="container py-8 md:py-12">
        <SectionHeading center>{home?.audiencesHeading || 'Kiknek szólunk?'}</SectionHeading>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-card border border-brand-light bg-white p-5 shadow-card"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
                <Icon name={a.icon} className="h-6 w-6" />
              </div>
              <span className="font-semibold text-brand-navy">{a.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
