import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Paths from "../../../utils/Paths.ts";

function Sidebar() {
  const location = useLocation()

  if (cannotDisplay(location.pathname))
    return <></>

  return (
    <Box height={'100%'}>
      SideBar
    </Box>
  );
}

function cannotDisplay(path: string): boolean
{
  return path === Paths.login || path == Paths.signup
}

export default Sidebar;