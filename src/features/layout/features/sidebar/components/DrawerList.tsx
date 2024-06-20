import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  IconButtonProps,
  List,
  ListItemButton,
  ListItemButtonProps,
  ListSubheader,
  Stack,
  styled,
  Typography
} from "@mui/material";
import DrawerItem from "../types/DrawerItem.ts";
import DrawerListItem from "./DrawerListItem.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactElement, useState } from "react";
import { ArrowDropDownRounded } from "@mui/icons-material";
import DrawerListLoader from "./DrawerListLoader.tsx";

interface CollapseButtonProps extends IconButtonProps {
  isCollapsed: boolean
}

const CollapseButton = styled(IconButton, {
  shouldForwardProp: (props) => props !== 'isCollapsed'
})<CollapseButtonProps>(({ theme, isCollapsed }) => ({
  width: 20,
  height: 20,
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.short,
  }),
  transform: isCollapsed ? 'rotate(-90deg)' : undefined
}))

const StyledListItemButton = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
  margin: '0 2px',
  padding: '10px 26px 10px 26px',
  color: theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[600],
  '&:hover': {
    color: theme.palette.background[100]
  }
}))

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

  const [hideItems, setHideItems] = useState(false)

  const handleSubheaderClick = () => {
    if (subheaderDestination && location.pathname !== subheaderDestination)
      navigate(subheaderDestination)
  }

  return (
    <List
      disablePadding
      component="nav"
      subheader={
        (
          subheader &&
          <ListSubheader component={'div'}>
            {
              subheaderDestination
                ? (
                  <Box>
                    <StyledListItemButton
                      selected={location.pathname === subheaderDestination}
                      onClick={handleSubheaderClick}>
                      <Typography fontWeight={500}>{subheader}</Typography>
                    </StyledListItemButton>

                    <Box position={'absolute'} bottom={0} top={'-5px'} left={'5px'}>
                      <CollapseButton isCollapsed={hideItems} onClick={() => setHideItems(!hideItems)}>
                        <ArrowDropDownRounded />
                      </CollapseButton>
                    </Box>

                    <Box display={'flex'} position={'absolute'} bottom={'13%'} right={'0'} pr={'8px'}>
                      {subheaderAction}
                    </Box>
                  </Box>
                )
                : <Typography fontWeight={500} px={1.6} py={1}>{subheader}</Typography>
            }
          </ListSubheader>
        )
      }>
      {
        drawerItems
          ? (
            drawerItems.length === 0
              ?
              <Typography ml={5} my={1} variant={'body2'} fontWeight={"lighter"}>
                No {subheader ?? "data"}
              </Typography>
              : <Collapse in={!hideItems}>
                {drawerItems.map((item) =>
                  <DrawerListItem key={item.link} drawerItem={item} />
                )}
              </Collapse>
          )
          : <DrawerListLoader />
      }
    </List>
  );
}

export default DrawerList;