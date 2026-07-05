import type { CollectionConfig } from 'payload'

import { isLoggedIn } from '../access'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: { singular: 'Űrlapbeküldés', plural: 'Űrlapbeküldések' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'formType', 'createdAt'],
    group: 'Beérkezett',
  },
  access: {
    // Beküldeni bárki tud (a szerveroldali végpont validál + spam-szűr),
    // de olvasni/törölni csak bejelentkezve lehet.
    create: () => true,
    read: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'formType',
      label: 'Űrlap típusa',
      type: 'select',
      options: [
        { label: 'Kapcsolatfelvétel', value: 'kapcsolat' },
        { label: 'Csatlakozás', value: 'csatlakozas' },
        { label: 'Hírlevél', value: 'hirlevel' },
      ],
    },
    { name: 'name', label: 'Név', type: 'text' },
    { name: 'email', label: 'E-mail', type: 'text' },
    { name: 'phone', label: 'Telefon', type: 'text' },
    {
      name: 'joinType',
      label: 'Csatlakozás módja',
      type: 'text',
    },
    { name: 'message', label: 'Üzenet', type: 'textarea' },
    { name: 'consent', label: 'GDPR hozzájárulás', type: 'checkbox' },
  ],
  timestamps: true,
}
