import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A projekt gyökerének rögzítése (több lockfile esetén a helyes mappa)
  outputFileTracingRoot: dirname,
  turbopack: {
    root: dirname,
  },
  // A helyi böngésző-előnézet (proxy) engedélyezése fejlesztés közben
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  // Server Actions: proxy és localhost engedélyezése
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '127.0.0.1:3000', '127.0.0.1:57088', 'localhost'],
    },
  },
  images: {
    remotePatterns: [
      // Helyi fejlesztői szerver feltöltött képei
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: '127.0.0.1' },
      // Engedélyezett külső képforrások
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
  // Biztonsági fejlécek (a teljes oldalra)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig)
