import Link from 'next/link'

import { getGlobalData } from '@/lib/payload'
import { Logo } from './Logo'
import { Icon } from './Icon'
import { SocialIcon } from './SocialIcon'

export async function Footer() {
  const [brand, footer, org] = await Promise.all([
    getGlobalData<any>('brand').catch(() => null),
    getGlobalData<any>('footer').catch(() => null),
    getGlobalData<any>('organization').catch(() => null),
  ])

  const year = new Date().getFullYear()
  const name = org?.officialName || 'KÉK-HÍD Egyesület'
  const copyright = footer?.copyright || `© ${year} ${name} – Minden jog fenntartva.`
  const links: { label: string; url: string }[] = footer?.usefulLinks || []

  const socials = [
    { url: org?.facebookUrl, icon: 'facebook', label: 'Facebook' },
    { url: org?.instagramUrl, icon: 'instagram', label: 'Instagram' },
    { url: org?.youtubeUrl, icon: 'youtube', label: 'YouTube' },
  ].filter((s) => s.url)

  return (
    <footer className="bg-brand-navy text-white/80">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo brand={brand} variant="dark" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{footer?.tagline}</p>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.icon}
                  href={s.url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <SocialIcon name={s.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Kapcsolat</h2>
          <ul className="space-y-3 text-sm">
            {org?.email && (
              <li className="flex items-center gap-2">
                <Icon name="mail" className="h-4 w-4 text-brand-sky" />
                <a href={`mailto:${org.email}`} className="hover:text-white">{org.email}</a>
              </li>
            )}
            {org?.phone && (
              <li className="flex items-center gap-2">
                <Icon name="phone" className="h-4 w-4 text-brand-sky" />
                <a href={`tel:${org.phone}`} className="hover:text-white">{org.phone}</a>
              </li>
            )}
            {org?.seat && (
              <li className="flex items-start gap-2">
                <Icon name="map-pin" className="mt-0.5 h-4 w-4 text-brand-sky" />
                <span>{org.seat}</span>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Hasznos információk</h2>
          <ul className="space-y-3 text-sm">
            {links.map((l) => (
              <li key={l.url + l.label}>
                <Link href={l.url} className="hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 text-center text-xs text-white/60">{copyright}</div>
      </div>
    </footer>
  )
}
