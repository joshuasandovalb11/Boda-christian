import { useState, useEffect }      from 'react'
import { doc, onSnapshot }          from 'firebase/firestore'
import { db }                       from '../lib/firebase'

export interface SpeiSettings {
  clabe:   string
  bank:    string
  holder:  string
  alias:   string
  concept: string
  amount:  string
  showQR:  boolean
}

export function useSettings() {
  const [settings, setSettings] = useState<SpeiSettings | null>(null)
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'spei'), (snap) => {
      if (snap.exists()) setSettings(snap.data() as SpeiSettings)
      setLoading(false)
    })
    return unsub
  }, [])

  return { settings, loading }
}