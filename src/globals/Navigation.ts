import type { GlobalConfig } from 'payload'

import { anyone, isLoggedIn } from '../access'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Főmenü',
  admin: {
    group: 'Beállítások',
    description:
      'A fejléc menüpontjai. Húzással átrendezhetők, és új menüpont (akár új oldalra mutató) is felvehető.',
  },
  access: {
    read: anyone,
    update: isLoggedIn,
  },
  fields: [
    {
      name: 'items',
      label: 'Menüpontok',
      type: 'array',
      labels: { singular: 'Menüpont', plural: 'Menüpontok' },
      admin: {
        initCollapsed: true,
      },
      fields: [
        { name: 'label', label: 'Felirat', type: 'text', required: true },
        {
          name: 'type',
          label: 'Hivatkozás típusa',
          type: 'radio',
          defaultValue: 'internal',
          options: [
            { label: 'Belső oldal', value: 'internal' },
            { label: 'Egyéni URL', value: 'custom' },
          ],
        },
        {
          name: 'page',
          label: 'Oldal',
          type: 'relationship',
          relationTo: 'pages',
          admin: { condition: (_, sib) => sib?.type === 'internal' },
        },
        {
          name: 'url',
          label: 'URL (pl. /programjaink vagy https://…)',
          type: 'text',
          admin: { condition: (_, sib) => sib?.type === 'custom' },
        },
        { name: 'newTab', label: 'Új lapon nyíljon', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'cta',
      label: 'Kiemelt gomb (jobb felül)',
      type: 'group',
      fields: [
        { name: 'label', label: 'Felirat', type: 'text', defaultValue: 'Csatlakozom' },
        { name: 'url', label: 'URL', type: 'text', defaultValue: '/csatlakozas' },
        { name: 'show', label: 'Megjelenjen', type: 'checkbox', defaultValue: true },
      ],
    },
  ],
}
