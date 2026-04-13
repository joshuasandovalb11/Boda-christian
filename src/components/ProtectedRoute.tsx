import { Navigate }    from 'react-router-dom'
import { useAuth }     from '../hooks/useAuth'

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-marfil flex items-center justify-center">
        <p className="font-elegant text-tierra text-xl tracking-widest animate-pulse">
          Cargando...
        </p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}