import type { Metadata } from 'next'

import { getGlobalData } from '@/lib/payload'
import { PageHero } from '@/components/PageHero'
import { ContactForm } from '@/components/forms/ContactForm'
import { Icon } from '@/components/Icon'

export const metadata: Metadata = {
  title: 'Kapcsolat',
  description: 'Vedd fel a kapcsolatot a KÉK-HÍD Egyesülettel.',
}

export default async function KapcsolatPage() {
  const org = await getGlobalData<any>('organization').catch(() => null)

  return (
    <>
      <PageHero title="Kapcsolat" subtitle="Írj nekünk bizalommal — válaszolunk!" compact />
      <section className="bg-white">
        <div className="container py-12 md:py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Elérhetőségek */}
            <div>
              <h2 className="mb-6 text-xl font-bold text-brand-navy">Elérhetőségeink</h2>
              <ul className="space-y-5">
                {org?.email && (
                  <li className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
                      <Icon name="mail" className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">E-mail</p>
                      <a href={`mailto:${org.email}`} className="font-medium text-brand-navy hover:text-brand">{org.email}</a>
                    </div>
                  </li>
                )}
                {org?.phone && (
                  <li className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
                      <Icon name="phone" className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Telefon</p>
                      <a href={`tel:${org.phone}`} className="font-medium text-brand-navy hover:text-brand">{org.phone}</a>
                    </div>
                  </li>
                )}
                {org?.seat && (
                  <li className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
                      <Icon name="map-pin" className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Székhely</p>
                      <p className="font-medium text-brand-navy">{org.seat}</p>
                    </div>
                  </li>
                )}
              </ul>

              {org?.mapsEmbedUrl && (
                <div className="mt-8 overflow-hidden rounded-card shadow-card">
                  <iframe
                    src={org.mapsEmbedUrl}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="KÉK-HÍD Egyesület helyszíne a térképen"
                  />
                </div>
              )}
            </div>

            {/* Kapcsolatfelvételi form */}
            <div>
              <h2 className="mb-6 text-xl font-bold text-brand-navy">Írj nekünk!</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
