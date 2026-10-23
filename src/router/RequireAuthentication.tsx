import { Navigate, Outlet, useLocation } from 'react-router'
import Paths from '../utils/enums/Paths.ts'
import useAuth from '../hooks/useAuth.ts'

function RequireAuthentication() {
  const location = useLocation()
  const isAuthenticated = useAuth()

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={Paths.Login} state={{ from: location }} replace />
  )
}

export default RequireAuthentication
