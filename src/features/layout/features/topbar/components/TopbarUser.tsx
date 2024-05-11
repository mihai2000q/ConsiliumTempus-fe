import { Avatar, Box, Button, Menu, MenuItem, Skeleton, Stack, Typography } from "@mui/material";
import User from "../types/User.model.ts";
import { useGetCurrentUserQuery } from "../../../../../state/api.ts";
import demoUserPic from '../../../../../assets/demo-user-pic.jpg'
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../state/store";
import { logout } from "../../../../../state/auth/authSlice";
import { ArrowDropDownOutlined } from "@mui/icons-material";

function TopbarUser() {
  const dispatch = useDispatch<AppDispatch>()

  const user: User | undefined = useGetCurrentUserQuery(undefined).data

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(menuAnchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setMenuAnchorEl(null)
  function handleLogOut() {
    handleCloseMenu()
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
        onClick={handleClick}
        sx={{
          textTransform: 'none',
        }}
      >
        <Stack direction={'row'} justifyContent="center" alignItems={"center"}>
          <Avatar
            alt={"User Profile Picture"}
            src={demoUserPic} />
          <Stack ml={1} width={150}>
            <Typography
              fontWeight={'bold'}
              noWrap>
              {user.firstName} {user.lastName}
            </Typography>

            <Typography
              variant={'body2'}
              noWrap>
              {user.email}
            </Typography>
          </Stack>
          <ArrowDropDownOutlined />
        </Stack>
      </Button>
      <Menu
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}>
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </Menu>
    </Box>
  );
}

export default TopbarUser;