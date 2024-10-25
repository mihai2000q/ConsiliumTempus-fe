import { Avatar, Box, BoxProps, darken, lighten, styled, Typography } from '@mui/material'
import UserPopper from '../popper/UserPopper.tsx'
import demoUserPic from '../../assets/demo-user-pic.jpg'

const StyledUserLabel = styled(Box)<BoxProps>(({ theme }) => ({
  cursor: 'default',
  display: 'flex',
  alignItems: 'center',
  maxWidth: 200,
  padding: '5px 10px',
  borderRadius: '16px',
  backgroundColor: theme.palette.mode === 'dark'
    ? darken(theme.palette.background[900], 0.1)
    : theme.palette.primary[900],
  color: theme.palette.background[100],
  boxShadow: theme.shadows[2],
  transition: theme.transitions.create(['background-color', 'color', 'box-shadow'], {
    duration: theme.transitions.duration.short
  }),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? lighten(theme.palette.background[900], 0.02)
      : theme.palette.primary[800],
    color: theme.palette.background[50],
    boxShadow: theme.shadows[6]
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

function UserLabel({ user }: UserLabelProps) {
  return (
    <UserPopper user={user}>
      <StyledUserLabel>
        <Avatar src={demoUserPic} alt={'user profile picture'} sx={{ width: 23, height: 23, mr: 0.75 }} />
        <Typography noWrap>{user.name}</Typography>
      </StyledUserLabel>
    </UserPopper>
  )
}

export default UserLabel
