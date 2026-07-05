import type { GlobalConfig } from 'payload'

import { anyone, isLoggedIn } from '../access'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Lábléc',
  admin: {
    group: 'Beállítások',
    description: 'A lábléc szövege és linkjei. A kapcsolati adatok a „Szervezeti adatok”-ból jönnek.',
  },
  access: {
    read: anyone,
    update: isLoggedIn,
  },
  fields: [
    {
      name: 'tagline',
      label: 'Mottó (logó alatt)',
      type: 'textarea',
      defaultValue: 'Hidat építünk az emberek között, hogy mindenki otthonra találhasson.',
    },
    {
      name: 'usefulLinks',
      label: 'Hasznos információk (linkek)',
      type: 'array',
      labels: { singular: 'Link', plural: 'Linkek' },
      admin: { initCollapsed: true },
      fields: [
        { name: 'label', label: 'Felirat', type: 'text', required: true },
        { name: 'url', label: 'URL', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Adatvédelmi tájékoztató', url: '/adatvedelem' },
        { label: 'Alapszabály', url: '/dokumentumok' },
        { label: 'Csatlakozási feltételek', url: '/csatlakozasi-feltetelek' },
        { label: 'Beszámolók', url: '/beszamolok' },
        { label: 'Impresszum', url: '/impresszum' },
      ],
    },
    {
      name: 'copyright',
      label: 'Szerzői jogi sor (üresen automatikus)',
      type: 'text',
      admin: {
        description: 'Pl. „© 2026 KÉK-HÍD Egyesület – Minden jog fenntartva.” Üresen hagyva automatikus.',
      },
    },
  ],
}
