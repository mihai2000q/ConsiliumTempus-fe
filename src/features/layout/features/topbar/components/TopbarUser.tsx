import { Avatar, Box, Button, Menu, MenuItem, Skeleton, Stack, Typography } from "@mui/material";
import User from "../types/User.model.ts";
import { useGetCurrentUserQuery } from "../../../../../state/api.ts";
import demoUserPic from '../../../../../assets/demo-user-pic.jpg'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../state/store";
import { logout } from "../../../../../state/auth/authSlice";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import useIsDarkMode from "../../../../../hooks/useIsDarkMode.ts";

function TopbarUser() {
  const isDarkMode = useIsDarkMode()

  const dispatch = useDispatch<AppDispatch>()

  const user: User | undefined = useGetCurrentUserQuery(undefined).data

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  function handleLogOut() {
    setMenuAnchorEl(null)
    dispatch(logout())
  }

  if (!user)
    return (
      <Button>
        <Stack direction="row" justifyContent="center" alignItems={"center"}>
          <Skeleton variant={"circular"} width={40} height={40}  />
          <Stack ml={1}>
            <Skeleton variant={"text"} width={175} height={30} />
            <Skeleton variant={"text"} width={175} height={17} />
          </Stack>
        </Stack>
      </Button>
    )

  return (
    <Box>
      <Button
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
        sx={{
          textTransform: 'none',
          color: 'inherit',
        }}
      >
        <Stack direction={'row'} justifyContent="center" alignItems={"center"}>
          <Avatar
            alt={"User Profile Picture"}
            src={demoUserPic} />
          <Stack ml={1} width={150}>
            <Typography
              variant={'h6'}
              fontWeight={'bold'}
              noWrap>
              {user.firstName} {user.lastName}
            </Typography>

            <Typography
              variant={'body2'}
              fontWeight={isDarkMode ? 'light' : 400}
              noWrap>
              {user.email}
            </Typography>
          </Stack>
          <ArrowDropDownOutlined />
        </Stack>
      </Button>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}>
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </Menu>
    </Box>
  );
}

export default TopbarUser;