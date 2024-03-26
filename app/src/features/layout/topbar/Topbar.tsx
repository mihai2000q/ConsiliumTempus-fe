import { Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store.ts";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { setMode } from "../../../state/global/globalSlice.ts";

interface TopbarProps {
  isDisplayable: boolean
}

function Topbar(props: TopbarProps) {
  if (!props.isDisplayable)
    return <></>

  const mode = useSelector((state: RootState) => state.global.mode)

  const dispatch = useDispatch<AppDispatch>()

  return (
    <Box width={'100%'}>
      <IconButton onClick={() => dispatch(setMode())}>
        {mode === 'dark' ? <DarkModeOutlined /> : <LightModeOutlined />}
      </IconButton>
    </Box>
  );
}



export default Topbar;