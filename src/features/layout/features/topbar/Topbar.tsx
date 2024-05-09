import { IconButton, Stack, styled, Toolbar, ToolbarProps } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../state/store.ts";
import { DarkModeOutlined, LightModeOutlined, Menu, Search, Settings } from "@mui/icons-material";
import { setMode } from "../../../../state/global/globalSlice.ts";
import TopbarUser from "./components/TopbarUser.tsx";
import React from "react";

interface TopbarProps {
  isDisplayable: boolean,
  isSidebarOpen: boolean,
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>,
  drawerWidth: number
}

function Topbar({ isDisplayable, isSidebarOpen, setIsSidebarOpen, drawerWidth }: TopbarProps) {
  interface AppToolbarProps extends ToolbarProps {
    open: boolean;
  }

  const AppToolbar = styled(Toolbar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppToolbarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      marginLeft: 0,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const mode = useSelector((state: RootState) => state.global.mode)

  const dispatch = useDispatch<AppDispatch>()

  if (!isDisplayable)
    return <></>

  return (
    //<AppBar position={'static'}>
      <AppToolbar open={isSidebarOpen} sx={{
        justifyContent: "space-between"
      }}>
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
            {mode === 'dark' ? <DarkModeOutlined /> : <LightModeOutlined />}
          </IconButton>
          <IconButton>
            <Settings />
          </IconButton>
          <TopbarUser />
        </Stack>
      </AppToolbar>
    //</AppBar>
  );
}


export default Topbar;