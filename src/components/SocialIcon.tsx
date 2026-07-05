export function SocialIcon({ name, className }: { name: string; className?: string }) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true as const,
  }

  if (name === 'facebook') {
    return (
      <svg {...common}>
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
      </svg>
    )
  }
  if (name === 'instagram') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  if (name === 'youtube') {
    return (
      <svg {...common}>
        <path d="M23 7.5a3 3 0 0 0-2.1-2.12C19.1 4.9 12 4.9 12 4.9s-7.1 0-8.9.48A3 3 0 0 0 1 7.5 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.12c1.8.48 8.9.48 8.9.48s7.1 0 8.9-.48A3 3 0 0 0 23 16.5 31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.5zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    )
  }
  return null
}
