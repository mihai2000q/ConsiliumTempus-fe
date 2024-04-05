import { AppBar, IconButton, Stack, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store.ts";
import { DarkModeOutlined, LightModeOutlined, Menu, Search, Settings } from "@mui/icons-material";
import { setMode } from "../../../state/global/globalSlice.ts";
import TopbarUser from "./components/TopbarUser.tsx";

interface TopbarProps {
  isDisplayable: boolean
}

function Topbar(props: TopbarProps) {
  const mode = useSelector((state: RootState) => state.global.mode)

  const dispatch = useDispatch<AppDispatch>()

  if (!props.isDisplayable)
    return <></>

  return (
    //<AppBar position={'static'}>
      <Toolbar sx={{
        width: '100%',
        justifyContent: "space-between"
      }}>
        <IconButton>
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
      </Toolbar>
    //</AppBar>
  );
}


export default Topbar;