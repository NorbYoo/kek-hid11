import type { CollectionConfig } from 'payload'

import { anyone, isLoggedIn } from '../access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Vélemény', plural: 'Vélemények' },
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'featured'],
    group: 'Tartalom',
  },
  access: {
    read: anyone,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    { name: 'quote', label: 'Idézet', type: 'textarea', required: true },
    { name: 'author', label: 'Aláírás (pl. „Egy édesanya”)', type: 'text', required: true },
    { name: 'image', label: 'Kép (opcionális)', type: 'upload', relationTo: 'media' },
    { name: 'featured', label: 'Megjelenjen a főoldalon', type: 'checkbox', defaultValue: true },
  ],
}
