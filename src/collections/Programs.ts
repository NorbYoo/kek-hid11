import type { CollectionConfig } from 'payload'

import { isLoggedIn, publishedOrLoggedIn } from '../access'
import { slugField } from '../fields/slug'

export const Programs: CollectionConfig = {
  slug: 'programs',
  labels: { singular: 'Program / Esemény', plural: 'Programok' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'featured', '_status'],
    group: 'Tartalom',
    description: 'Programok és események. A „Kiemelt” jelölésűek jelennek meg a főoldalon.',
  },
  access: {
    read: publishedOrLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  versions: { drafts: { autosave: { interval: 1000 } } },
  fields: [
    { name: 'title', label: 'Cím', type: 'text', required: true },
    { name: 'image', label: 'Borítókép', type: 'upload', relationTo: 'media' },
    { name: 'summary', label: 'Rövid leírás', type: 'textarea' },
    { name: 'description', label: 'Részletes leírás', type: 'richText' },
    {
      name: 'startDate',
      label: 'Kezdés',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'endDate',
      label: 'Befejezés (opcionális)',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    { name: 'location', label: 'Helyszín', type: 'text' },
    { name: 'online', label: 'Online esemény', type: 'checkbox', defaultValue: false },
    { name: 'registerUrl', label: 'Jelentkezési link', type: 'text' },
    {
      name: 'featured',
      label: 'Kiemelt a főoldalon',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    slugField('title'),
  ],
}
