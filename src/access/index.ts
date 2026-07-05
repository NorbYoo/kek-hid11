import type { Access } from 'payload'

/** Bárki olvashatja (nyilvános tartalom). */
export const anyone: Access = () => true

/** Csak bejelentkezett felhasználó (admin vagy szerkesztő). */
export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)

/** Csak adminisztrátor. */
export const isAdmin: Access = ({ req: { user } }) => user?.role === 'admin'

/**
 * Nyilvánosan csak a közzétett tartalom látszik; bejelentkezve minden
 * (piszkozat is) — így működik az élő előnézet.
 */
export const publishedOrLoggedIn: Access = ({ req: { user } }) => {
  if (user) return true
  return {
    _status: {
      equals: 'published',
    },
  }
}
