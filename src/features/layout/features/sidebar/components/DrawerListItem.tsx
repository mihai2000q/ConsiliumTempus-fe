import { Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DrawerItem from "../types/DrawerItem.ts";
import { useLocation, useNavigate } from "react-router-dom";

interface DrawerListItemProps {
  drawerItem: DrawerItem
}

function DrawerListItem({ drawerItem }: DrawerListItemProps) {
  const location = useLocation()

  const navigate = useNavigate()
  const handleClick = () => navigate(drawerItem.link)

  return (
    <ListItem disablePadding>
      <ListItemButton selected={drawerItem.link === location.pathname} onClick={handleClick}>
        <ListItemIcon>
          {drawerItem?.icon
            ? drawerItem.icon
            : <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>{drawerItem.text[0]}</Avatar>}
        </ListItemIcon>
        <ListItemText>
          <Typography variant={'body1'} fontWeight={600} noWrap>
            {drawerItem.text}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

export default DrawerListItem;