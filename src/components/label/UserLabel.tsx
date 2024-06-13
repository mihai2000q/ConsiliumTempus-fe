import { Avatar, Box, BoxProps, darken, lighten, styled, Typography } from "@mui/material";
import UserPopover from "../popover/UserPopover.tsx";
import demoUserPic from '../../assets/demo-user-pic.jpg'
import { useState } from "react";
import useTimeoutCallback from "../../hooks/useTimeoutCallback.ts";

const StyledUserLabel = styled(Box)<BoxProps>(({ theme }) => ({
  cursor: 'default',
  display: 'flex',
  alignItems: 'center',
  maxWidth: 200,
  backgroundColor: theme.palette.mode === 'dark'
    ? darken(theme.palette.background[900], 0.1)
    : theme.palette.primary[900],
  color: theme.palette.background[100],
  padding: '5px 10px',
  borderRadius: '16px',
  transition: theme.transitions.create(['background-color', 'color', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? lighten(theme.palette.background[900], 0.02)
      : theme.palette.primary[800],
    color: theme.palette.background[50],
  }
}))

interface User {
  id: string,
  name: string,
  email: string,
}

interface UserLabelProps {
  user: User;
}

function UserLabel({
  user
}: UserLabelProps) {
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(null)
  const [facadePopoverAnchorEl, setFacadePopoverAnchorEl] = useState<HTMLElement | null>(null)
  useTimeoutCallback(() => {
    if (facadePopoverAnchorEl !== null) setPopoverAnchorEl(facadePopoverAnchorEl)
  }, [facadePopoverAnchorEl])

  const handleClosePopover = () => {
    setFacadePopoverAnchorEl(null)
    setPopoverAnchorEl(null)
  }

  return (
    <>
      <StyledUserLabel
        onMouseEnter={(e) => setFacadePopoverAnchorEl(e.currentTarget)}
        onMouseLeave={() => {
          if (popoverAnchorEl === null) setFacadePopoverAnchorEl(null)}
        }
        sx={{ boxShadow: 2, '&:hover': { boxShadow: 6 } }}>
        <Avatar src={demoUserPic} alt={'user profile picture'} sx={{ width: 23, height: 23, mr: 0.75 }} />
        <Typography noWrap>{user.name}</Typography>
      </StyledUserLabel>
      <UserPopover
        user={user}
        anchorEl={popoverAnchorEl}
        onClose={handleClosePopover} />
    </>
  );
}

export default UserLabel;