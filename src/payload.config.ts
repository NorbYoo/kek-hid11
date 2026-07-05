import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Programs } from './collections/Programs'
import { Testimonials } from './collections/Testimonials'
import { FAQ } from './collections/FAQ'
import { Documents } from './collections/Documents'
import { FormSubmissions } from './collections/FormSubmissions'

import { Brand } from './globals/Brand'
import { Navigation } from './globals/Navigation'
import { Footer } from './globals/Footer'
import { Organization } from './globals/Organization'
import { HomeContent } from './globals/HomeContent'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · KÉK-HÍD Admin',
    },
    components: {
      beforeLogin: ['@/components/admin/CustomLoginPage#AdminLoginBanner'],
    },
  },
  collections: [Pages, Posts, Programs, Testimonials, FAQ, Documents, FormSubmissions, Media, Users],
  globals: [Brand, Navigation, HomeContent, Footer, Organization],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: process.env.DATABASE_URI?.startsWith('postgresql')
    ? postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } })
    : sqliteAdapter({ client: { url: process.env.DATABASE_URI || 'file:./kek-hid.db' } }),
  sharp,
})
