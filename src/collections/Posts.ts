import type { CollectionConfig } from 'payload'

import { isLoggedIn, publishedOrLoggedIn } from '../access'
import { slugField } from '../fields/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Hír / Bejegyzés', plural: 'Hírek / Blog' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    group: 'Tartalom',
    description: 'Hírek és blogbejegyzések. Új bejegyzés képpel együtt, percek alatt közzétehető.',
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
    { name: 'coverImage', label: 'Borítókép', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', label: 'Kivonat (lista nézethez)', type: 'textarea' },
    { name: 'content', label: 'Tartalom', type: 'richText' },
    {
      name: 'category',
      label: 'Kategória',
      type: 'select',
      defaultValue: 'hir',
      options: [
        { label: 'Hír', value: 'hir' },
        { label: 'Esemény-beszámoló', value: 'beszamolo' },
        { label: 'Tudástár', value: 'tudastar' },
        { label: 'Közlemény', value: 'kozlemeny' },
      ],
    },
    {
      name: 'publishedAt',
      label: 'Megjelenés dátuma',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
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
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data && !data.publishedAt && data._status === 'published') {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
}
