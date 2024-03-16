import { Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store.ts";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { setMode } from "../../../state/global/globalSlice.ts";
import Paths from "../../../utils/Paths.ts";
import { useLocation } from "react-router-dom";

function Topbar() {
  const mode = useSelector((state: RootState) => state.global.mode)

  const dispatch = useDispatch<AppDispatch>()

  const location = useLocation()

  if (cannotDisplay(location.pathname))
    return <></>

  return (
    <Box width={'100%'}>
      <IconButton onClick={() => dispatch(setMode())}>
        {mode === 'dark' ? <DarkModeOutlined /> : <LightModeOutlined />}
      </IconButton>
    </Box>
  );
}

function cannotDisplay(path: string): boolean
{
  return path === Paths.login || path == Paths.signup
}

export default Topbar;