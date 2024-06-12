import { Button, Popover, Stack, Typography } from "@mui/material";
import demoUserPic from '../../assets/demo-user-pic.jpg'
import { useSelector } from "react-redux";
import { RootState } from "../../state/store.ts";

interface User {
  id: string,
  name: string,
  email: string,
}

interface UserPopoverProps {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  user: User
}

function UserPopover({
  anchorEl,
  onClose,
  user
}: UserPopoverProps) {
  const userId = useSelector((state: RootState) => state.global.userId)

  return (
    <Popover
      disableAutoFocus
      disableRestoreFocus
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      sx={{
        '& .MuiPaper-root': {
          borderRadius: 3
        }
      }}>
      <Stack direction={'row'} alignItems={'center'}>
        <img src={demoUserPic} alt={'user profile picture'} style={{ width: 150 }} />
        <Stack
          px={2}
          alignSelf={'stretch'}
          justifyContent={'center'}
          position={'relative'}
          minWidth={user.id === userId ? 258 : 0}
          maxWidth={258}>
          <Stack mb={4}>
            <Typography variant={'h6'} fontWeight={700} noWrap>{user.name}</Typography>
            <Typography variant={'body2'} fontWeight={400} color={'text.secondary'} noWrap>{user.email}</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'end'} position={'absolute'} bottom={'8%'} spacing={1.5}>
            {user.id === userId &&
              <Button variant={'alt-outlined'} size={'small'} sx={{ padding: '4px 20px' }}>
                Edit Profile
              </Button>}
            <Button variant={'alt-outlined'} size={'small'} sx={{ padding: '4px 20px' }}>
              View Profile
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Popover>
  );
}

export default UserPopover;