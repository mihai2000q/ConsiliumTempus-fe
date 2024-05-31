import { IconButton, Stack } from "@mui/material";
import { Menu, NotificationsOutlined, NotificationsRounded } from "@mui/icons-material";
import TopbarUser from "./components/TopbarUser.tsx";
import { Dispatch, SetStateAction } from "react";
import { AppToolbar } from "./components/AppToolbar.tsx";
import TopbarSearchBar from "./components/TopbarSearchBar.tsx";

interface TopbarProps {
  isDisplayable: boolean,
  isSidebarOpen: boolean,
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>,
  drawerWidth: number
}

function Topbar({ isDisplayable, isSidebarOpen, setIsSidebarOpen, drawerWidth }: TopbarProps) {
  if (!isDisplayable)
    return <></>

  function handleMenu() {
    setIsSidebarOpen((prev) => !prev)
  }
  function handleNotifications() {

  }

  return (
    <AppToolbar drawerWidth={drawerWidth} isSidebarOpen={isSidebarOpen}>
      <IconButton variant={'circular'} onClick={handleMenu}>
        <Menu />
      </IconButton>

      <Stack
        alignItems={"center"}
        direction={"row"}
        spacing={1}>
        <TopbarSearchBar />
        <IconButton variant={'circular'} onClick={handleNotifications}>
          <NotificationsOutlined />
        </IconButton>
        <TopbarUser />
      </Stack>
    </AppToolbar>
  );
}


export default Topbar;