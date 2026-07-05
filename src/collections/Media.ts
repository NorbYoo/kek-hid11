import path from 'path'
import type { CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Médiaelem',
    plural: 'Médiakönyvtár',
  },
  admin: {
    group: 'Tartalom',
  },
  access: {
    // A képek nyilvánosan megjeleníthetők az oldalon
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      label: 'Alternatív szöveg (kötelező — akadálymentesség)',
      type: 'text',
      required: true,
      admin: {
        description:
          'Rövid leírás a képről képernyőolvasók és kép-betöltési hiba esetére. Dekoratív képnél írj be egy szóközt.',
      },
    },
    {
      name: 'caption',
      label: 'Képaláírás (opcionális)',
      type: 'text',
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../public/uploads'),
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 576, position: 'centre' },
      { name: 'feature', width: 1200, height: 800, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
    focalPoint: true,
  },
}
