import { Box, List, ListItemButton, ListSubheader, Skeleton, Typography } from "@mui/material";
import DrawerItem from "../types/DrawerItem.ts";
import DrawerListItem from "./DrawerListItem.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactElement } from "react";

interface DrawerListProps {
  drawerItems: DrawerItem[] | undefined,
  subheader?: string | undefined,
  subheaderDestination?: string | undefined,
  subheaderAction?: ReactElement | undefined,
}

function DrawerList({
  subheader,
  subheaderDestination,
  subheaderAction,
  drawerItems
}: DrawerListProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <List
      disablePadding
      component="nav"
      subheader={
        (subheader &&
          <ListSubheader component={'div'} sx={{ padding: 0 }}>
            {subheaderDestination
              ? (
                <ListItemButton
                  selected={location.pathname == subheaderDestination }
                  sx={{ paddingY: 0, justifyContent: 'space-between' }}
                  onClick={() => navigate(subheaderDestination)}>
                  {subheader}
                  {subheaderAction}
                </ListItemButton>
              )
              : <Box px={1.6}>{subheader}</Box>}
          </ListSubheader>)
      }>
      {
        drawerItems
          ? (
            drawerItems.length === 0
              ?
              <Typography ml={5} my={1} variant={'body2'} fontWeight={"lighter"}>
                No {subheader ?? "data"}
              </Typography>
              : drawerItems.map((item) =>
                <DrawerListItem key={item.link} drawerItem={item} />
              )
          )
          : (
            <>
              {Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} variant={'text'} sx={{ fontSize: '2rem' }} />
              ))}
            </>
          )
      }
    </List>
  );
}

export default DrawerList;