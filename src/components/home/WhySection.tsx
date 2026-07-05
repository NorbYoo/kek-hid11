import { Button } from '@/components/Button'
import { MediaImage } from '@/components/MediaImage'
import { SectionHeading } from '@/components/SectionHeading'

export function WhySection({ home }: { home: any }) {
  const paras: { text?: string }[] = home?.whyParagraphs || []
  return (
    <section className="bg-white">
      <div className="container grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2">
        <div>
          <SectionHeading>{home?.whyHeading || 'Miért jött létre a KÉK-HÍD?'}</SectionHeading>
          <div className="mt-5 space-y-4 leading-relaxed text-slate-600">
            {paras.map((p, i) => (
              <p key={i}>{p.text}</p>
            ))}
          </div>
          {home?.whyCtaLabel ? (
            <div className="mt-7">
              <Button href={home?.whyCtaUrl || '/rolunk'} variant="primary" iconRight="arrow-right">
                {home.whyCtaLabel}
              </Button>
            </div>
          ) : null}
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-card shadow-soft">
          <MediaImage media={home?.whyImage} alt="Közösségi pillanat a KÉK-HÍD életéből" fallbackLabel="Közösségi kép helye" />
        </div>
      </div>
    </section>
  )
}
