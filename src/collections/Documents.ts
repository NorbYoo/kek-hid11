import type { CollectionConfig } from 'payload'

import { anyone, isLoggedIn } from '../access'

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: { singular: 'Dokumentum', plural: 'Dokumentumtár' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'year'],
    group: 'Tartalom',
    description: 'Beszámolók, közhasznúsági melléklet, alapszabály és egyéb letölthető PDF-ek.',
  },
  access: {
    read: anyone,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  upload: {
    mimeTypes: ['application/pdf'],
  },
  fields: [
    { name: 'title', label: 'Megnevezés', type: 'text', required: true },
    {
      name: 'type',
      label: 'Típus',
      type: 'select',
      required: true,
      defaultValue: 'beszamolo',
      options: [
        { label: 'Éves beszámoló', value: 'beszamolo' },
        { label: 'Közhasznúsági melléklet', value: 'kozhasznusagi' },
        { label: 'Alapszabály / Alapító okirat', value: 'alapszabaly' },
        { label: 'Szabályzat', value: 'szabalyzat' },
        { label: 'Egyéb', value: 'egyeb' },
      ],
    },
    { name: 'year', label: 'Év', type: 'number' },
  ],
}
