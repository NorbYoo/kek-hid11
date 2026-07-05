import type { GlobalConfig } from 'payload'

import { anyone, isLoggedIn } from '../access'

export const Organization: GlobalConfig = {
  slug: 'organization',
  label: 'Szervezeti és jogi adatok',
  admin: {
    group: 'Beállítások',
    description:
      'A szervezet hivatalos adatai. Ezeket használja az impresszum, a lábléc és az adományozási blokk.',
  },
  access: {
    read: anyone,
    update: isLoggedIn,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Alapadatok',
      fields: [
        { name: 'officialName', label: 'Hivatalos név', type: 'text', defaultValue: 'KÉK-HÍD Egyesület' },
        { name: 'shortName', label: 'Rövidített név', type: 'text', defaultValue: 'KÉK-HÍD' },
        {
          name: 'legalForm',
          label: 'Jogi forma',
          type: 'select',
          defaultValue: 'egyesulet',
          options: [
            { label: 'Egyesület', value: 'egyesulet' },
            { label: 'Alapítvány', value: 'alapitvany' },
          ],
        },
        { name: 'representative', label: 'Képviselő neve', type: 'text' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Elérhetőség',
      fields: [
        { name: 'seat', label: 'Székhely', type: 'text' },
        { name: 'postalAddress', label: 'Postacím', type: 'text' },
        { name: 'email', label: 'E-mail', type: 'text', defaultValue: 'info@kekhid.hu' },
        { name: 'phone', label: 'Telefon', type: 'text' },
        { name: 'mapsEmbedUrl', label: 'Google Maps beágyazás URL', type: 'text' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Hivatalos azonosítók',
      fields: [
        { name: 'taxNumber', label: 'Adószám', type: 'text' },
        { name: 'registrationNumber', label: 'Bírósági nyilvántartási szám', type: 'text' },
        { name: 'szja1Number', label: 'SZJA 1% adószám (technikai szám)', type: 'text' },
        { name: 'bankAccount', label: 'Bankszámlaszám', type: 'text' },
        { name: 'iban', label: 'IBAN', type: 'text' },
        {
          name: 'hostingProvider',
          label: 'Tárhelyszolgáltató (impresszumhoz)',
          type: 'textarea',
          admin: { description: 'Név és elérhetőség — kötelező az impresszumban.' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Közösségi média',
      fields: [
        { name: 'facebookUrl', label: 'Facebook URL', type: 'text' },
        { name: 'instagramUrl', label: 'Instagram URL', type: 'text' },
        { name: 'youtubeUrl', label: 'YouTube URL', type: 'text' },
      ],
    },
  ],
}
