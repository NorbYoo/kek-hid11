import type { GlobalConfig } from 'payload'

import { anyone, isLoggedIn } from '../access'

export const Brand: GlobalConfig = {
  slug: 'brand',
  label: 'Arculat (logó, név)',
  admin: {
    group: 'Beállítások',
    description: 'Logó, favicon és az oldal neve. A logót világos és sötét háttérre is feltöltheted.',
  },
  access: {
    read: anyone,
    update: isLoggedIn,
  },
  fields: [
    { name: 'siteName', label: 'Oldal neve', type: 'text', defaultValue: 'KÉK-HÍD' },
    { name: 'siteSubtitle', label: 'Alcím (logó alatt)', type: 'text', defaultValue: 'Egyesület' },
    {
      name: 'logoLight',
      label: 'Logó (világos háttérre — fejléc)',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoDark',
      label: 'Logó (sötét háttérre — lábléc)',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'favicon', label: 'Favicon', type: 'upload', relationTo: 'media' },
    { name: 'ogImage', label: 'Megosztási kép (OG)', type: 'upload', relationTo: 'media' },
  ],
}
