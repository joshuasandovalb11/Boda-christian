/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'

export default function AdminLogin() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/admin')
    } catch (err) {
      setError('Credenciales incorrectas o error de conexión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-carbon flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-marfil border border-lino p-8 sm:p-12 shadow-2xl">
        <div className="text-center mb-10">
          <p className="font-elegant tracking-[0.3em] uppercase text-dorado text-xs mb-2">Acceso Reservado</p>
          <h1 className="font-serif text-rosa text-3xl font-light">Panel de Novios</h1>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="block font-elegant tracking-widest text-xs uppercase text-tierra mb-2">Correo electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b border-lino py-2 text-rosa font-elegant focus:outline-none focus:border-dorado transition-colors"
            />
          </div>

          <div>
            <label className="block font-elegant tracking-widest text-xs uppercase text-tierra mb-2">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border-b border-lino py-2 text-rosa font-elegant focus:outline-none focus:border-dorado transition-colors"
            />
          </div>

          {error && <p className="text-red-400 font-elegant text-sm">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 py-3 bg-dorado text-marfil font-elegant tracking-[0.2em] text-sm uppercase hover:bg-doradoOscuro transition-colors disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </main>
  )
}