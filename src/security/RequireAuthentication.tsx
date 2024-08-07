import { useAppSelector } from "../state/store.ts";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Paths from "../utils/enums/Paths.ts";

function RequireAuthentication() {
  const token = useAppSelector(state => state.auth.token)
  const isAuthenticated = token !== null

  const location = useLocation()

  return (
    isAuthenticated
      ? <Outlet />
      : <Navigate to={Paths.Login} state={{ from: location }} replace />
  );
}

export default RequireAuthentication;