import { Box } from "@mui/material";

interface SidebarProps {
  isDisplayable: boolean
}

function Sidebar(props: SidebarProps) {
  if (!props.isDisplayable)
    return <></>

  return (
    <Box height={'100%'}>
      SideBar
    </Box>
  );
}

export default Sidebar;