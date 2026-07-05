import Link from 'next/link'

import { Icon } from './Icon'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'white' | 'outlineWhite'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'border-2 border-brand/30 bg-white text-brand-dark hover:border-brand hover:bg-brand-light',
  white: 'bg-white text-brand-dark hover:bg-brand-light',
  outlineWhite: 'border-2 border-white/70 text-white hover:bg-white/10',
}

export function Button({
  href,
  children,
  variant = 'primary',
  icon,
  iconRight,
  className,
  newTab,
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  icon?: string
  iconRight?: string
  className?: string
  newTab?: boolean
}) {
  const external = href.startsWith('http')
  const content = (
    <>
      {icon ? <Icon name={icon} className="h-4 w-4" /> : null}
      <span>{children}</span>
      {iconRight ? <Icon name={iconRight} className="h-4 w-4" /> : null}
    </>
  )
  const cls = cn(base, variants[variant], className)

  if (external || newTab) {
    return (
      <a
        href={href}
        className={cls}
        target={newTab || external ? '_blank' : undefined}
        rel={newTab || external ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  )
}
