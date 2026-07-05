import type { CollectionConfig } from 'payload'

import { isLoggedIn, publishedOrLoggedIn } from '../access'
import { slugField } from '../fields/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Oldal', plural: 'Oldalak' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Tartalom',
    description: 'Statikus oldalak (Rólunk, Kapcsolat, jogi oldalak…). Új oldal is létrehozható, majd felvehető a menübe.',
  },
  access: {
    read: publishedOrLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  versions: {
    drafts: {
      autosave: { interval: 1000 },
    },
    maxPerDoc: 20,
  },
  fields: [
    { name: 'title', label: 'Cím', type: 'text', required: true },
    {
      name: 'subtitle',
      label: 'Alcím (opcionális)',
      type: 'text',
    },
    {
      name: 'heroImage',
      label: 'Fejléckép (opcionális)',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      label: 'Tartalom',
      type: 'richText',
    },
    slugField('title'),
    {
      name: 'meta',
      label: 'SEO',
      type: 'group',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'title', label: 'SEO cím', type: 'text' },
        { name: 'description', label: 'SEO leírás', type: 'textarea' },
      ],
    },
  ],
}
