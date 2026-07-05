import type { Field } from 'payload'

export const slugify = (val: string): string =>
  val
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // ékezetek eltávolítása (á→a, ő→o stb.)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/** Automatikus slug-mező, amely a megadott mezőből (alapból "title") képződik. */
export const slugField = (from = 'title'): Field => ({
  name: 'slug',
  label: 'URL-részlet (slug)',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'Automatikusan kitöltődik a címből; szükség esetén kézzel módosítható.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.length > 0) return slugify(value)
        const source = data?.[from]
        if (typeof source === 'string' && source.length > 0) return slugify(source)
        return value
      },
    ],
  },
})
