import { Navigate, Outlet } from 'react-router-dom'
import Paths from '../utils/enums/Paths.ts'
import useAuth from '../hooks/useAuth.ts'

function IsAlreadyAuthenticated() {
  const isAuthenticated = useAuth()

  return (
    isAuthenticated
      ? <Navigate to={Paths.Home} replace />
      : <Outlet />
  )
}

export default IsAlreadyAuthenticated
