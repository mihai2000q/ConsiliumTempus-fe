import { Drawer } from "@mui/material";
import SidebarContent from "./components/SidebarContent.tsx";

interface SidebarProps {
  width: number,
  hidden: boolean,
  open: boolean,
}

function Sidebar({ width, hidden, open }: SidebarProps) {
  if (hidden)
    return <></>

  return (
    <Drawer
      variant={"persistent"}
      open={open}
      sx={{
        width: width,
        '& .MuiDrawer-paper': { width: width },
      }}>
      <SidebarContent />
    </Drawer>
  );
}

export default Sidebar;