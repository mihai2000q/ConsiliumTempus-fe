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
                <Box>
                  <ListItemButton
                    selected={location.pathname == subheaderDestination }
                    sx={{ py: 1.3, justifyContent: 'space-between' }}
                    onClick={() => navigate(subheaderDestination)}>
                    <Typography fontWeight={500}>{subheader}</Typography>
                  </ListItemButton>
                  <Box display={'flex'} position={'absolute'} bottom={0} right={0} mr={1}>
                    {subheaderAction}
                  </Box>
                </Box>
              )
              : <Typography fontWeight={500} px={1.6} py={1}>{subheader}</Typography>}
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
                <DrawerListItem key={item.link + item.searchParams} drawerItem={item} />
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