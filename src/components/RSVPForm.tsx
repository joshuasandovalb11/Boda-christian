import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

type Step = 'form' | 'success' | 'error'

interface FormData {
  name:       string
  attending:  boolean | null
  companions: number
  message:    string
}

interface FormErrors {
  name?:      string
  attending?: string
}

const initial: FormData = {
  name:       '',
  attending:  null,
  companions: 0,
  message:    '',
}

export default function RSVPForm() {
  const [form,    setForm]    = useState<FormData>(initial)
  const [step,    setStep]    = useState<Step>('form')
  const [loading, setLoading] = useState(false)
  const [errors,  setErrors]  = useState<FormErrors>({})

    function validate(): boolean {
        const e: FormErrors = {}   // ← cambia "typeof errors" por "FormErrors"
        if (!form.name.trim())        e.name      = 'Por favor escribe tu nombre'
        if (form.attending === null)  e.attending = 'Por favor selecciona si asistirás'
        if (!e.name && !e.attending) return true
        setErrors(e)
        return false
    }

  async function handleSubmit() {
    if (!validate()) return
    setLoading(true)
    try {
      await addDoc(collection(db, 'guests'), {
        name:        form.name.trim(),
        attending:   form.attending,
        companions:  form.attending ? form.companions : 0,
        message:     form.message.trim(),
        confirmed:   true,
        confirmedAt: serverTimestamp(),
      })
      setStep('success')
    } catch {
      setStep('error')
    } finally {
      setLoading(false)
    }
  }

/* ── Success state ── */
  if (step === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center px-4">
        <div className="w-16 h-16 rounded-full border border-dorado/50 flex items-center justify-center">
          <svg className="w-7 h-7 text-dorado" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-rosa">
          {form.attending ? '¡Nos vemos pronto!' : 'Gracias por avisarnos'}
        </h3>
        <p className="font-elegant text-tierra text-lg max-w-sm">
          {form.attending
            ? 'Tu confirmación fue recibida. Estamos emocionados de celebrar contigo.'
            : 'Lamentamos que no puedas acompañarnos, pero gracias por hacernos saber.'}
        </p>
      </div>
    )
  }

  /* ── Error state ── */
  if (step === 'error') {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center px-4">
        <p className="font-elegant text-tierra text-lg">Hubo un error al enviar tu confirmación. Por favor intenta de nuevo.</p>
        <button onClick={() => setStep('form')} className="font-elegant tracking-widest text-sm uppercase border border-dorado/50 text-rosa px-6 py-2 hover:bg-dorado/10 transition-colors">
          Intentar de nuevo
        </button>
      </div>
    )
  }

  /* ── Main form ── */
  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="mb-6">
        <label className="block font-elegant tracking-widest text-xs uppercase text-tierra mb-2">Tu nombre completo *</label>
        <input type="text" value={form.name}
          onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: undefined })) }}
          placeholder="Escribe tu nombre"
          className="w-full bg-transparent border-b border-lino py-2.5 px-0 font-elegant text-rosa text-lg placeholder:text-lino focus:outline-none focus:border-dorado transition-colors"
        />
        {errors.name && <p className="text-[11px] text-red-400 font-elegant mt-1">{errors.name}</p>}
      </div>

      <div className="mb-6">
        <label className="block font-elegant tracking-widest text-xs uppercase text-tierra mb-3">¿Asistirás a la boda? *</label>
        <div className="flex gap-3">
          {([true, false] as const).map(val => (
            <button key={String(val)} onClick={() => { setForm(f => ({ ...f, attending: val })); setErrors(er => ({ ...er, attending: undefined })) }}
              className={`flex-1 py-3 border font-elegant tracking-widest text-sm uppercase transition-all duration-200
                          ${form.attending === val ? 'bg-dorado border-dorado text-marfil' : 'border-lino text-tierra hover:border-rosa hover:text-rosa'}`}>
              {val ? 'Sí, asistiré' : 'No podré ir'}
            </button>
          ))}
        </div>
        {errors.attending && <p className="text-[11px] text-red-400 font-elegant mt-1">{errors.attending}</p>}
      </div>

      {form.attending === true && (
        <div className="mb-6 animate-fade-up">
          <label className="block font-elegant tracking-widest text-xs uppercase text-tierra mb-2">¿Cuántos acompañantes traes? (sin contarte a ti)</label>
          <div className="flex items-center gap-4">
            <button onClick={() => setForm(f => ({ ...f, companions: Math.max(0, f.companions - 1) }))}
              className="w-10 h-10 border border-lino text-tierra font-serif text-xl flex items-center justify-center hover:border-rosa transition-colors">−</button>
            <span className="font-serif text-2xl text-rosa w-8 text-center">{form.companions}</span>
            <button onClick={() => setForm(f => ({ ...f, companions: Math.min(10, f.companions + 1) }))}
              className="w-10 h-10 border border-lino text-tierra font-serif text-xl flex items-center justify-center hover:border-rosa transition-colors">+</button>
          </div>
        </div>
      )}

      <div className="mb-8">
        <label className="block font-elegant tracking-widest text-xs uppercase text-tierra mb-2">Mensaje para los novios (opcional)</label>
        <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Escribe un mensaje..." rows={3}
          className="w-full bg-transparent border-b border-lino py-2.5 px-0 font-elegant text-rosa text-base placeholder:text-lino focus:outline-none focus:border-dorado transition-colors resize-none" />
      </div>

      <button onClick={handleSubmit} disabled={loading}
        className="w-full py-4 bg-dorado text-marfil font-elegant tracking-[0.2em] text-sm uppercase hover:bg-doradoOscuro transition-colors duration-300 disabled:opacity-50">
        {loading ? 'Enviando...' : 'Confirmar asistencia'}
      </button>
    </div>
  )
}