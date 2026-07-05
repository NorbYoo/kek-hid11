import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: {
    default: 'KÉK-HÍD Egyesület',
    template: '%s · KÉK-HÍD Egyesület',
  },
  description: 'Hidat építünk az emberek között, hogy mindenki otthonra találhasson.',
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    siteName: 'KÉK-HÍD Egyesület',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#fooldal-tartalom"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Ugrás a tartalomra
        </a>
        <Header />
        <main id="fooldal-tartalom" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
