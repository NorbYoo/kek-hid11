import type { CollectionConfig } from 'payload'

import { anyone, isLoggedIn } from '../access'

export const FAQ: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'GYIK elem', plural: 'GYIK (Gyakori kérdések)' },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
    group: 'Tartalom',
  },
  access: {
    read: anyone,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  defaultSort: 'order',
  fields: [
    { name: 'question', label: 'Kérdés', type: 'text', required: true },
    { name: 'answer', label: 'Válasz', type: 'textarea', required: true },
    { name: 'category', label: 'Kategória', type: 'text' },
    { name: 'order', label: 'Sorrend', type: 'number', defaultValue: 0 },
  ],
}
