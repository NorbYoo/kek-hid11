'use client'

import { useState } from 'react'
import { submitForm } from '@/app/actions/submitForm'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const fd = new FormData(e.currentTarget)
    const result = await submitForm({
      formType: 'kapcsolat',
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      phone: fd.get('phone') as string,
      message: fd.get('message') as string,
      consent: fd.get('consent') === 'on',
    })
    if (result.ok) {
      setStatus('ok')
    } else {
      setErrorMsg(result.error || 'Hiba történt.')
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-card bg-green-50 p-8 text-center ring-1 ring-green-200">
        <p className="text-lg font-semibold text-green-800">✓ Köszönjük az üzenetedet!</p>
        <p className="mt-2 text-green-700">Hamarosan felvesszük veled a kapcsolatot.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot (rejtett mező — bot-szűrés) */}
      <input type="text" name="website" className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1 block text-sm font-medium text-slate-700">Neved</label>
          <input id="c-name" name="name" type="text" autoComplete="name"
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20" />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1 block text-sm font-medium text-slate-700">E-mail *</label>
          <input id="c-email" name="email" type="email" required autoComplete="email"
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20" />
        </div>
      </div>

      <div>
        <label htmlFor="c-phone" className="mb-1 block text-sm font-medium text-slate-700">Telefonszám (opcionális)</label>
        <input id="c-phone" name="phone" type="tel" autoComplete="tel"
          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20" />
      </div>

      <div>
        <label htmlFor="c-msg" className="mb-1 block text-sm font-medium text-slate-700">Üzeneted *</label>
        <textarea id="c-msg" name="message" required rows={5}
          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20" />
      </div>

      <div className="flex items-start gap-3">
        <input id="c-consent" name="consent" type="checkbox" required
          className="mt-0.5 h-4 w-4 accent-brand" />
        <label htmlFor="c-consent" className="text-sm text-slate-600">
          Elolvastam és elfogadom az{' '}
          <a href="/adatvedelem" className="font-semibold text-brand hover:underline">adatvédelmi tájékoztatót</a>,
          és hozzájárulok adataim kezeléséhez. *
        </label>
      </div>

      {status === 'error' && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200">{errorMsg}</p>
      )}

      <button type="submit" disabled={status === 'sending'}
        className="inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60">
        {status === 'sending' ? 'Küldés…' : 'Üzenet küldése'}
      </button>
    </form>
  )
}
