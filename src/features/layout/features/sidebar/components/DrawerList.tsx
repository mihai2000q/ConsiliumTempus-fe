import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListSubheader,
  Skeleton,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import DrawerItem from "../types/DrawerItem.ts";
import DrawerListItem from "./DrawerListItem.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactElement, useState } from "react";
import useIsDarkMode from "../../../../../hooks/useIsDarkMode.ts";
import { ArrowDropDownRounded, ArrowRightRounded } from "@mui/icons-material";

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
  const theme = useTheme()
  const isDarkMode = useIsDarkMode()
  const navigate = useNavigate()
  const location = useLocation()

  const [hideItems, setHideItems  ] = useState(false)

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
          <ListSubheader component={'div'} sx={{ padding: 0, backgroundColor: theme.palette.background[800] }}>
            {
              subheaderDestination
                ? (
                  <Box>
                    <ListItemButton
                      selected={location.pathname === subheaderDestination}
                      onClick={handleSubheaderClick}
                      sx={{
                        marginBottom: 0,
                        padding: '10px 26px 10px 26px',
                        marginLeft: '2px',
                        marginRight: '2px',
                        justifyContent: 'space-between',
                        color: isDarkMode ? theme.palette.grey[300] : theme.palette.grey[600],
                        '&:hover': { color: theme.palette.background[100] }
                      }}>
                      <Typography fontWeight={500}>{subheader}</Typography>
                    </ListItemButton>

                    <Box position={'absolute'} bottom={0} top={'-5px'} left={'5px'}>
                      <IconButton sx={{ width: 20, height: 20 }} onClick={() => setHideItems(!hideItems)}>
                        {hideItems ? <ArrowRightRounded /> : <ArrowDropDownRounded />}
                      </IconButton>
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
          : (
            <Stack>
              {Array.from(Array(5)).map((_, i) => (
                <Skeleton
                  key={i}
                  variant={'rectangular'}
                  height={35}
                  sx={{
                    borderRadius: '10px',
                    margin: '1px 16px',
                  }} />
              ))}
            </Stack>
          )
      }
    </List>
  );
}

export default DrawerList;