/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'
import { useGoals, type Goal } from '../hooks/useGoals'
import { useSettings, type SpeiSettings } from '../hooks/useSettings'

/* ── Tipado para eliminar los errores de "any" y "confirmedAt" ── */
interface Guest {
  id: string;
  name: string;
  attending: boolean | null;
  companions: number;
  message: string;
  confirmed: boolean;
  confirmedAt?: { seconds: number; nanoseconds: number } | null;
}

type TabType = 'guests' | 'goals' | 'spei';

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('guests')
  
  const { goals } = useGoals()
  const { settings } = useSettings()

  const [guests, setGuests] = useState<Guest[]>([])
  const [loadingGuests, setLoadingGuests] = useState(false)
  
  const hasFetchedGuests = useRef(false)

  const fetchGuests = async () => {
    setLoadingGuests(true)
    try {
      const snap = await getDocs(collection(db, 'guests'))
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Guest))
      data.sort((a, b) => (b.confirmedAt?.seconds || 0) - (a.confirmedAt?.seconds || 0))
      setGuests(data)
    } catch (error) {
      console.error("Error obteniendo invitados", error)
    } finally {
      setLoadingGuests(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'guests' && !hasFetchedGuests.current) {
      hasFetchedGuests.current = true;
      fetchGuests()
    }
  }, [activeTab])

  async function handleLogout() {
    await signOut(auth)
    navigate('/admin/login')
  }

  // Cálculos rápidos para el resumen
  const totalConfirmed = guests.filter(g => g.attending).length
  const totalCompanions = guests.filter(g => g.attending).reduce((acc, curr) => acc + (curr.companions || 0), 0)
  const totalExpected = totalConfirmed + totalCompanions

  return (
    <div className="min-h-screen bg-carbon text-rosa font-elegant">
      {/* Header Admin */}
      <header className="bg-marfil border-b border-lino px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div>
          <h1 className="font-serif text-xl tracking-wide">Panel de Control</h1>
          <p className="text-tierra text-xs tracking-[0.2em] uppercase">Christian & Nallely</p>
        </div>
        <button onClick={handleLogout} className="text-xs tracking-widest uppercase border border-tierra/40 px-4 py-1.5 hover:border-dorado transition-colors">
          Cerrar Sesión
        </button>
      </header>

      {/* Tabs */}
      <nav className="flex border-b border-lino/30 px-6 overflow-x-auto">
        {[
          { id: 'guests', label: 'Invitados' },
          { id: 'goals', label: 'Metas / Regalos' },
          { id: 'spei', label: 'Datos SPEI' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`py-4 px-6 tracking-[0.2em] uppercase text-sm border-b-2 transition-colors whitespace-nowrap
              ${activeTab === tab.id ? 'border-dorado text-dorado' : 'border-transparent text-tierra hover:text-rosa'}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="p-6 max-w-5xl mx-auto">
        
        {/* PESTAÑA INVITADOS */}
        {activeTab === 'guests' && (
          <div className="animate-fade-up">
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-marfil p-4 border border-lino text-center">
                <p className="text-xs uppercase tracking-widest text-tierra mb-1">Titulares</p>
                <p className="font-serif text-3xl text-dorado">{totalConfirmed}</p>
              </div>
              <div className="bg-marfil p-4 border border-lino text-center">
                <p className="text-xs uppercase tracking-widest text-tierra mb-1">Acompañantes</p>
                <p className="font-serif text-3xl text-dorado">{totalCompanions}</p>
              </div>
              <div className="bg-marfil p-4 border border-dorado/50 text-center">
                <p className="text-xs uppercase tracking-widest text-tierra mb-1">Total Personas</p>
                <p className="font-serif text-3xl text-rosa">{totalExpected}</p>
              </div>
            </div>

            <div className="flex justify-between items-end mb-4">
              <h2 className="font-serif text-2xl">Lista de Confirmaciones</h2>
              <button onClick={fetchGuests} disabled={loadingGuests} className="text-xs tracking-widest uppercase border border-dorado px-4 py-2 hover:bg-dorado/10 transition-colors">
                {loadingGuests ? 'Actualizando...' : 'Actualizar Lista'}
              </button>
            </div>

            <div className="bg-marfil border border-lino overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-lino/50 text-tierra text-xs uppercase tracking-widest">
                    <th className="p-4 font-normal whitespace-nowrap">Nombre</th>
                    <th className="p-4 font-normal text-center whitespace-nowrap">¿Asiste?</th>
                    <th className="p-4 font-normal text-center whitespace-nowrap">Extras</th>
                    <th className="p-4 font-normal min-w-50">Mensaje</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map(g => (
                    <tr key={g.id} className="border-b border-lino/20 last:border-0 hover:bg-marfil">
                      <td className="p-4 text-rosa font-medium">{g.name}</td>
                      <td className="p-4 text-center">
                        {g.attending ? <span className="text-olivo">Sí</span> : <span className="text-tierra/60">No</span>}
                      </td>
                      <td className="p-4 text-center text-dorado">{g.attending ? g.companions : '-'}</td>
                      <td className="p-4 text-tierra text-sm italic">{g.message || '-'}</td>
                    </tr>
                  ))}
                  {guests.length === 0 && !loadingGuests && (
                    <tr><td colSpan={4} className="p-8 text-center text-tierra">Aún no hay confirmaciones.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PESTAÑA METAS */}
        {activeTab === 'goals' && (
          <div className="animate-fade-up">
            <div className="flex justify-between items-end mb-6">
              <h2 className="font-serif text-2xl">Administrar Metas</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map(goal => (
                <GoalAdminCard key={goal.id} goal={goal} />
              ))}
              <NewGoalCard nextOrder={goals.length + 1} />
            </div>
          </div>
        )}

        {/* PESTAÑA SPEI */}
        {activeTab === 'spei' && settings && (
          <div className="animate-fade-up max-w-xl">
            <h2 className="font-serif text-2xl mb-6">Configuración Bancaria</h2>
            <SpeiAdminForm settings={settings} />
          </div>
        )}
      </main>
    </div>
  )
}

/* ────────────────────────────────────────────────────────
   SUB-COMPONENTES PARA MANTENER EL CÓDIGO LIMPIO
──────────────────────────────────────────────────────── */

function GoalAdminCard({ goal }: { goal: Goal }) {
  const [current, setCurrent] = useState(goal.current)
  const [saving, setSaving] = useState(false)

  async function handleUpdate() {
    setSaving(true)
    try {
      await updateDoc(doc(db, 'goals', goal.id), { current: Number(current) })
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if(confirm(`¿Eliminar la meta "${goal.title}"?`)) {
      await deleteDoc(doc(db, 'goals', goal.id))
    }
  }

  const pct = goal.target > 0 ? Math.min(Math.round((goal.current / goal.target) * 100), 100) : 0

  return (
    <div className="bg-marfil border border-lino p-6 relative">
      <button onClick={handleDelete} className="absolute top-4 right-4 text-tierra/50 hover:text-tierra text-[10px] uppercase tracking-widest transition-colors">Eliminar</button>
      <h3 className="font-serif text-xl mb-1">{goal.title}</h3>
      <p className="text-tierra text-sm mb-4">Meta: ${goal.target.toLocaleString()}</p>
      
      <div className="mb-4">
        <div className="w-full h-1.5 bg-carbon mb-2">
          <div className="h-full bg-dorado transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-[11px] text-tierra text-right uppercase tracking-widest">{pct}% completado</p>
      </div>

      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-[10px] uppercase tracking-widest text-tierra mb-1">Monto recibido ($)</label>
          <input 
            type="number" 
            value={current} 
            onChange={(e) => setCurrent(Number(e.target.value))}
            className="w-full bg-carbon border border-lino/50 p-2 text-rosa focus:border-dorado focus:outline-none transition-colors"
          />
        </div>
        <button onClick={handleUpdate} disabled={saving || current === goal.current} className="bg-dorado text-carbon px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-rosa transition-colors">
          {saving ? 'Guardando...' : 'Actualizar'}
        </button>
      </div>
    </div>
  )
}

function NewGoalCard({ nextOrder }: { nextOrder: number }) {
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if(!title || !target) return
    setLoading(true)
    try {
      await addDoc(collection(db, 'goals'), {
        title,
        description: '',
        target: Number(target),
        current: 0,
        active: true,
        order: nextOrder,
        imageUrl: ''
      })
      setTitle('')
      setTarget('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleAdd} className="bg-transparent border border-dashed border-lino p-6 flex flex-col justify-center">
      <h3 className="font-serif text-xl mb-4 text-dorado">Agregar Nueva Meta</h3>
      <div className="flex flex-col gap-3">
        <input type="text" placeholder="Ej. Luna de miel" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-marfil border border-lino p-2 text-rosa focus:border-dorado focus:outline-none placeholder:text-tierra/50 transition-colors" />
        <input type="number" placeholder="Monto objetivo (Ej. 10000)" value={target} onChange={e => setTarget(e.target.value)} required className="w-full bg-marfil border border-lino p-2 text-rosa focus:border-dorado focus:outline-none placeholder:text-tierra/50 transition-colors" />
        <button type="submit" disabled={loading} className="w-full border border-dorado text-dorado py-2.5 mt-2 text-[10px] uppercase tracking-widest hover:bg-dorado hover:text-carbon transition-colors disabled:opacity-50">
          {loading ? 'Agregando...' : '+ Agregar Meta'}
        </button>
      </div>
    </form>
  )
}

function SpeiAdminForm({ settings }: { settings: SpeiSettings }) {
  const [form, setForm] = useState<SpeiSettings>(settings)
  const [saving, setSaving] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await updateDoc(doc(db, 'settings', 'spei'), { ...form })
      alert('Datos bancarios actualizados correctamente.')
    } catch(err) {
      alert('Error al guardar. Revisa tus permisos.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSave} className="bg-marfil border border-lino p-6 sm:p-8 flex flex-col gap-4">
      {Object.keys(form).filter(k => k !== 'showQR').map((key) => (
        <div key={key}>
          <label className="block text-[10px] uppercase tracking-widest text-tierra mb-1">
            {key === 'clabe' ? 'CLABE' : key === 'bank' ? 'Banco' : key === 'holder' ? 'Titular' : key === 'alias' ? 'Alias' : key === 'concept' ? 'Concepto' : 'Monto'}
          </label>
          <input 
            type="text" 
            value={form[key as keyof typeof form] as string} 
            onChange={e => setForm({...form, [key]: e.target.value})}
            className="w-full bg-transparent border-b border-lino py-2 text-rosa focus:border-dorado focus:outline-none transition-colors"
          />
        </div>
      ))}
      <button type="submit" disabled={saving} className="mt-6 bg-dorado text-carbon py-3 text-xs uppercase tracking-widest font-bold disabled:opacity-50 hover:bg-rosa transition-colors">
        {saving ? 'Guardando Cambios...' : 'Guardar Configuración SPEI'}
      </button>
    </form>
  )
}