import { Drawer } from "@mui/material";
import SidebarContent from "./components/SidebarContent.tsx";

interface SidebarProps {
  width: number,
  isDisplayable: boolean,
  isOpen: boolean,
}

function Sidebar({ width, isDisplayable, isOpen }: SidebarProps) {
  if (!isDisplayable)
    return <></>

  return (
    <Drawer
      variant={"persistent"}
      open={isOpen}
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
        },
      }}>
      <SidebarContent />
    </Drawer>
  );
}

export default Sidebar;