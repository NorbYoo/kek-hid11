import Link from 'next/link'

import { getGlobalData } from '@/lib/payload'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'
import { Icon } from './Icon'

type NavItem = {
  label?: string | null
  type?: 'internal' | 'custom' | null
  page?: { slug?: string | null } | string | null
  url?: string | null
  newTab?: boolean | null
}

function resolveHref(item: NavItem): string {
  if (item.type === 'custom') return item.url || '#'
  if (item.page && typeof item.page === 'object' && item.page.slug) return `/${item.page.slug}`
  return '#'
}

export async function Header() {
  const [brand, nav] = await Promise.all([
    getGlobalData<any>('brand').catch(() => null),
    getGlobalData<any>('navigation').catch(() => null),
  ])

  const items: { label: string; href: string; newTab?: boolean }[] = (nav?.items || [])
    .filter((i: NavItem) => i?.label)
    .map((i: NavItem) => ({ label: i.label as string, href: resolveHref(i), newTab: Boolean(i.newTab) }))

  const cta = nav?.cta as { label?: string; url?: string; show?: boolean } | undefined

  return (
    <header className="sticky top-0 z-40 border-b border-brand-light bg-white/90 backdrop-blur">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" aria-label="KÉK-HÍD főoldal" className="shrink-0">
          <Logo brand={brand} variant="light" />
        </Link>

        <nav aria-label="Főmenü" className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              target={item.newTab ? '_blank' : undefined}
              rel={item.newTab ? 'noopener noreferrer' : undefined}
              className="rounded-lg px-3 py-2 text-sm font-medium text-brand-navy/90 transition-colors hover:bg-brand-light hover:text-brand-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {cta?.show !== false && cta?.label && (
            <Link
              href={cta.url || '/csatlakozas'}
              className="hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:inline-flex"
            >
              <Icon name="heart" className="h-4 w-4" />
              {cta.label}
            </Link>
          )}
          <MobileNav items={items} cta={cta ? { label: cta.label || 'Csatlakozom', href: cta.url || '/csatlakozas', show: cta.show } : undefined} />
        </div>
      </div>
    </header>
  )
}
