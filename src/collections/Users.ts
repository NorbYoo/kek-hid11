import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Felhasználó',
    plural: 'Felhasználók',
  },
  auth: {
    // Belépési kísérlet-korlátozás (brute-force védelem)
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 perc zárolás
    tokenExpiration: 2 * 60 * 60, // 2 óra
    verify: false, // Email megerősítés kikapcsolva — nincs email-szerver
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Rendszer',
  },
  access: {
    // Csak bejelentkezett felhasználó férhet a felhasználókhoz
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      label: 'Név',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Szerepkör',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Adminisztrátor (mindenhez hozzáfér)', value: 'admin' },
        { label: 'Szerkesztő (tartalom)', value: 'editor' },
      ],
    },
  ],
}
