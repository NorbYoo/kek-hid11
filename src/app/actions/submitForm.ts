'use server'

import { getPayloadClient } from '@/lib/payload'

type FormData = {
  formType: 'kapcsolat' | 'csatlakozas' | 'hirlevel'
  name?: string
  email: string
  phone?: string
  joinType?: string
  message?: string
  consent: boolean
}

export async function submitForm(data: FormData): Promise<{ ok: boolean; error?: string }> {
  if (!data.email || !data.consent) {
    return { ok: false, error: 'Az e-mail cím és az adatvédelmi hozzájárulás megadása kötelező.' }
  }

  // Alap spam-szűrés
  const honeypot = (data as any).website
  if (honeypot) return { ok: true } // Bot — csendesen eldobjuk

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'form-submissions',
      data: {
        formType: data.formType,
        name: data.name,
        email: data.email,
        phone: data.phone,
        joinType: data.joinType,
        message: data.message,
        consent: data.consent,
      } as any,
    })
    return { ok: true }
  } catch (err) {
    console.error('[submitForm]', err)
    return { ok: false, error: 'Technikai hiba. Kérlek próbáld újra vagy írj közvetlenül e-mailben.' }
  }
}
