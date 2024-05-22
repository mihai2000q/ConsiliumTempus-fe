import { Stack } from "@mui/material";
import Topbar from "./features/topbar/Topbar.tsx";
import Sidebar from "./features/sidebar/Sidebar.tsx";
import { Outlet, useLocation } from "react-router-dom";
import Paths from "../../utils/Paths.ts";
import { useState } from "react";
import { Main } from "./components/Main.tsx";

const drawerWidth = 250

function Layout() {
  const location = useLocation()
  const isDisplayable = isLayoutDisplayable(location.pathname)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <Stack
      display={'flex'}
      direction={'row'}
      width={'100%'}
      height={'100%'}>
      <Sidebar
        width={drawerWidth}
        isDisplayable={isDisplayable}
        isOpen={isSidebarOpen} />
      <Stack width={'100%'}>
        <Topbar
          drawerWidth={drawerWidth}
          isDisplayable={isDisplayable}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen} />
        <Main
          isSidebarOpen={isSidebarOpen}
          isLayoutDisplayable={isDisplayable}
          drawerWidth={drawerWidth}>
          <Outlet />
        </Main>
      </Stack>
    </Stack>
  );
}

function isLayoutDisplayable(path: string): boolean {
  return path !== Paths.Login && path !== Paths.Signup
}

export default Layout;