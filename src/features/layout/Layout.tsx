import { Stack } from "@mui/material";
import Topbar from "./features/topbar/Topbar.tsx";
import Sidebar from "./features/sidebar/Sidebar.tsx";
import { Outlet, useLocation } from "react-router-dom";
import Paths from "../../utils/Paths.ts";
import { useState } from "react";
import Main from "./components/Main.tsx";
import ProjectTaskDrawer from "../project-task-drawer/ProjectTaskDrawer.tsx";

const drawerWidth = 250

function Layout() {
  const location = useLocation()
  const isLayoutHidden = handleIsLayoutHidden(location.pathname)

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <Stack
      display={'flex'}
      direction={'row'}
      width={'100%'}
      height={'100%'}>
      <Sidebar
        width={drawerWidth}
        hidden={isLayoutHidden}
        open={isSidebarOpen} />
      <Stack width={'100%'}>
        <Topbar
          drawerWidth={drawerWidth}
          hidden={isLayoutHidden}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen} />
        <Main
          isSidebarOpen={isSidebarOpen}
          isLayoutHidden={isLayoutHidden}
          drawerWidth={drawerWidth}>
          <Outlet />
        </Main>
      </Stack>
      <ProjectTaskDrawer />
    </Stack>
  );
}

function handleIsLayoutHidden(path: string): boolean {
  return path === Paths.Login || path === Paths.Signup
}

export default Layout;