import type { Metadata } from 'next'

import { PageHero } from '@/components/PageHero'
import { JoinForm } from '@/components/forms/JoinForm'
import { Icon } from '@/components/Icon'

export const metadata: Metadata = {
  title: 'Csatlakozás',
  description: 'Csatlakozz a KÉK-HÍD Egyesülethez tagként, önkéntesként vagy támogatóként.',
}

const ways = [
  { icon: 'users', title: 'Tagként', text: 'Részt veszel a programokban, szavazol a közgyűlésen, formálod a közösséget.' },
  { icon: 'heart', title: 'Önkéntesként', text: 'Segítesz az események szervezésében és lebonyolításában — saját tempódban.' },
  { icon: 'helping-hand', title: 'Támogatóként', text: 'Anyagi hozzájárulásoddal segítesz a programok és a szervezet fenntartásában.' },
]

export default function CsatlakozasPage() {
  return (
    <>
      <PageHero title="Csatlakozz hozzánk!" subtitle="Légy a híd része — tagként, önkéntesként vagy támogatóként." compact />

      <section className="bg-white">
        <div className="container py-12 md:py-16">
          <div className="mb-12 grid gap-5 sm:grid-cols-3">
            {ways.map((w) => (
              <div key={w.title} className="rounded-card border border-brand-light bg-brand-light/50 p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand shadow-card">
                  <Icon name={w.icon} className="h-6 w-6" />
                </div>
                <h2 className="font-bold text-brand-navy">{w.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{w.text}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-2xl">
            <h2 className="mb-6 text-center text-xl font-bold text-brand-navy">Töltsd ki a jelentkezési lapot</h2>
            <JoinForm />
          </div>
        </div>
      </section>
    </>
  )
}
