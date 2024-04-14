import { List, ListSubheader, Skeleton, Typography } from "@mui/material";
import DrawerItem from "../types/DrawerItem.ts";
import DrawerListItem from "./DrawerListItem.tsx";

interface DrawerListProps {
  drawerItems: DrawerItem[] | undefined,
  subheader?: string | undefined
}

function DrawerList({ subheader, drawerItems }: DrawerListProps) {
  return (
    <List
      disablePadding
      component="nav"
      subheader={
        (subheader &&
          <ListSubheader component={'div'}>
            {subheader}
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