import { IconButton, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../state/store.ts";
import { DarkModeOutlined, LightModeOutlined, Menu, Search, Settings } from "@mui/icons-material";
import { setMode } from "../../../../state/global/globalSlice.ts";
import TopbarUser from "./components/TopbarUser.tsx";
import { Dispatch, SetStateAction } from "react";
import { AppToolbar } from "./components/AppToolbar.tsx";
import useIsDarkMode from "../../../../hooks/useIsDarkMode.ts";

interface TopbarProps {
  isDisplayable: boolean,
  isSidebarOpen: boolean,
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>,
  drawerWidth: number
}

function Topbar({ isDisplayable, isSidebarOpen, setIsSidebarOpen, drawerWidth }: TopbarProps) {
  const isDarkMode = useIsDarkMode()

  const dispatch = useDispatch<AppDispatch>()

  if (!isDisplayable)
    return <></>

  return (
    <AppToolbar drawerWidth={drawerWidth} isSidebarOpen={isSidebarOpen}>
      <IconButton onClick={() => setIsSidebarOpen((prev) => !prev)}>
        <Menu />
      </IconButton>

      <Stack
        alignItems={"center"}
        direction={"row"}
        gap={1}>
        <IconButton>
          <Search />
        </IconButton>
        <IconButton onClick={() => dispatch(setMode())}>
          {isDarkMode ? <DarkModeOutlined /> : <LightModeOutlined />}
        </IconButton>
        <IconButton>
          <Settings />
        </IconButton>
        <TopbarUser />
      </Stack>
    </AppToolbar>
  );
}


export default Topbar;