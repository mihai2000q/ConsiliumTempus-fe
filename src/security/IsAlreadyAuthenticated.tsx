import { useAppSelector } from "../state/store.ts";
import { Navigate, Outlet } from "react-router-dom";
import Paths from "../utils/enums/Paths.ts";

function IsAlreadyAuthenticated() {
  const token = useAppSelector(state => state.auth.token)
  const isAuthenticated = token !== null

  return (
    isAuthenticated
      ? <Navigate to={Paths.Home} replace />
      : <Outlet />
  );
}

export default IsAlreadyAuthenticated;