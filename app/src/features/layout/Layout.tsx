import { Stack } from "@mui/material";
import Topbar from "./topbar/Topbar.tsx";
import Sidebar from "./sidebar/Sidebar.tsx";
import { Outlet, useLocation } from "react-router-dom";
import Paths from "../../utils/Paths.ts";

function Layout() {
  const location = useLocation()
  const isDisplayable = isLayoutDisplayable(location.pathname)

  return (
    <Stack
      direction={'row'}
      width={'100%'}
      height={'100%'}>
      <Sidebar isDisplayable={isDisplayable} />
      <Stack width={'100%'}>
        <Topbar isDisplayable={isDisplayable} />
        <Outlet />
      </Stack>
    </Stack>
  );
}

function isLayoutDisplayable(path: string): boolean
{
  return path !== Paths.login && path !== Paths.signup
}

export default Layout;