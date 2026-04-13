import { useState, useEffect }                      from 'react'
import { collection, onSnapshot, orderBy, query }  from 'firebase/firestore'
import { db }                                       from '../lib/firebase'

export interface Goal {
  id:          string
  title:       string
  description: string
  target:      number
  current:     number
  active:      boolean
  order:       number
  imageUrl:    string
}

export function useGoals() {
  const [goals,   setGoals]   = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'goals'),
      orderBy('order', 'asc')
    )
    const unsub = onSnapshot(q, (snap) => {
      setGoals(snap.docs.map(d => ({ id: d.id, ...d.data() } as Goal)))
      setLoading(false)
    })
    return unsub
  }, [])

  return { goals, loading }
}