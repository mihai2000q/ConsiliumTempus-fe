import { Stack, styled } from "@mui/material";
import Topbar from "./features/topbar/Topbar.tsx";
import Sidebar from "./features/sidebar/Sidebar.tsx";
import { Outlet, useLocation } from "react-router-dom";
import Paths from "../../utils/Paths.ts";
import { useState } from "react";

const drawerWidth = 250

function Layout() {
  const location = useLocation()
  const isDisplayable = isLayoutDisplayable(location.pathname)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const Main = styled(
    'main',
    { shouldForwardProp: (prop) => prop !== 'open' }
  )<{ open: boolean }>(({ theme, open }) => ({
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${isDisplayable ? drawerWidth : 0}px`,
    ...(open && {
      marginLeft: 0,
      marginRight: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

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
          open={isSidebarOpen}
          sx={{
            padding: '12px 50px',
            flexGrow: 1
          }}>
          <Outlet />
        </Main>
      </Stack>
    </Stack>
  );
}

function isLayoutDisplayable(path: string): boolean {
  return path !== Paths.login && path !== Paths.signup
}

export default Layout;