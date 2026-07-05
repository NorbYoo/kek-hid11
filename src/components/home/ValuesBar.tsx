import { Icon } from '@/components/Icon'

export function ValuesBar({ values }: { values: any[] }) {
  if (!values?.length) return null
  return (
    <section className="bg-brand-light">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-white to-brand-light/40 shadow-card ring-1 ring-white">
                <Icon name={v.icon} className="h-7 w-7 text-brand" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-navy">{v.title}</h3>
              {v.text ? <p className="mt-1.5 max-w-[16rem] text-sm text-slate-600">{v.text}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
