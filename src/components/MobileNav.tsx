'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/lib/utils'

type Item = { label: string; href: string; newTab?: boolean }

export function MobileNav({
  items,
  cta,
}: {
  items: Item[]
  cta?: { label: string; href: string; show?: boolean }
}) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Menü megnyitása"
        aria-expanded={open}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-brand-navy hover:bg-brand-light"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[60] bg-brand-navy/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <nav
            className="absolute right-0 top-0 flex h-full w-80 max-w-[85%] flex-col gap-1 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            aria-label="Mobil menü"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Menü bezárása"
              className="mb-4 inline-flex h-11 w-11 items-center justify-center self-end rounded-lg text-brand-navy hover:bg-brand-light"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
            {items.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                target={item.newTab ? '_blank' : undefined}
                rel={item.newTab ? 'noopener noreferrer' : undefined}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-brand-navy hover:bg-brand-light"
              >
                {item.label}
              </Link>
            ))}
            {cta?.show !== false && cta?.label && (
              <Link
                href={cta.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark',
                )}
              >
                {cta.label}
              </Link>
            )}
          </nav>
          </div>,
          document.body,
        )}
    </div>
  )
}
