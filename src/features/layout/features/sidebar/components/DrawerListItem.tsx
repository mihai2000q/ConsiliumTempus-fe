import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DrawerItem from "../types/DrawerItem.ts";
import { useLocation, useNavigate } from "react-router-dom";

interface DrawerListItemProps {
  drawerItem: DrawerItem
}

function DrawerListItem({ drawerItem }: DrawerListItemProps) {
  const location = useLocation()

  const isSelected = location.pathname.startsWith(drawerItem.link)

  const navigate = useNavigate()
  const handleClick = () => {
    if (!isSelected) navigate(drawerItem.link)
  }

  return (
    <ListItem disablePadding>
      <ListItemButton selected={isSelected} onClick={handleClick}>
        <ListItemIcon>{drawerItem.icon}</ListItemIcon>
        <ListItemText>
          <Typography fontWeight={600} noWrap>{drawerItem.text}</Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

export default DrawerListItem;