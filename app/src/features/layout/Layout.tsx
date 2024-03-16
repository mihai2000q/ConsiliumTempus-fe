import { Stack } from "@mui/material";
import Topbar from "./topbar/Topbar.tsx";
import Sidebar from "./sidebar/Sidebar.tsx";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Stack
      direction={'row'}
      width={'100%'}
      height={'100%'}>
      <Sidebar />
      <Stack width={'100%'}>
        <Topbar />
        <Outlet />
      </Stack>
    </Stack>
  );
}

export default Layout;