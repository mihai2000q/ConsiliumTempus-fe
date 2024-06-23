import { Avatar, Box, Button, Divider, ListItemIcon, Menu, MenuItem, Stack, Switch, Typography } from "@mui/material";
import { logout } from "../../../../../state/auth/authSlice.ts";
import { MouseEventHandler, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../state/store.ts";
import {
  AccountCircleRounded,
  AddOutlined,
  Check,
  DarkModeRounded,
  PersonAddRounded,
  PowerOffRounded,
  SettingsRounded
} from "@mui/icons-material";
import useIsDarkMode from "../../../../../hooks/useIsDarkMode.ts";
import { setMode } from "../../../../../state/global/globalSlice.ts";
import User from "../types/User.model.ts";
import demoUserPic from '../../../../../assets/demo-user-pic.jpg'

interface TopbarUserMenuItemProps {
  icon: ReactNode,
  children: ReactNode,
  onClick?: MouseEventHandler<HTMLLIElement> | undefined
}

const TopbarUserMenuItem = ({
  onClick,
  icon,
  children
} : TopbarUserMenuItemProps) => (
  <MenuItem
    onClick={onClick}
    sx={{ '& .MuiListItemIcon-root' : { minWidth: 0 }, }}>
    <ListItemIcon sx={{ mr: 1 }}>{icon}</ListItemIcon>
    <Typography pt={0.5}>{children}</Typography>
  </MenuItem>
)

interface MultipleAccountMenuItemProps {
  children: ReactNode,
  onClick: MouseEventHandler<HTMLLIElement>,
  selected: boolean
}

const MultipleAccountMenuItem = ({
  children,
  onClick,
  selected
}: MultipleAccountMenuItemProps) => (
  <MenuItem
    selected={selected}
    onClick={onClick}
    sx={{
      '& .MuiListItemIcon-root' : { minWidth: 0 },
      '&:hover': {
        '& .MuiAvatar-root': { filter: 'saturate(1)' }
      },
    }}>
    <ListItemIcon sx={{ mr: 1,  }}>
      <Avatar
        alt={"User Profile Picture"}
        src={demoUserPic}
        sx={{
          width: 25,
          height: 25,
          filter: selected ? 'saturate(1)' : 'saturate(25%)',
        }}/>
    </ListItemIcon>
    <Stack direction={'row'} width={'100%'} justifyContent={'space-between'} alignItems={"center"}>
      <Typography pt={0.5} fontWeight={500}>{children}</Typography>
      {selected && <Check sx={{ mb: '1px' }} /> }
    </Stack>
  </MenuItem>
)

interface TopbarUserMenuProps {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  user: User
}

function TopbarUserMenu({ anchorEl, onClose, user }: TopbarUserMenuProps) {
  const dispatch = useDispatch<AppDispatch>()
  const isDarkMode = useIsDarkMode()

  function handleMultipleAccount() {
    onClose()
  }
  function handleLogOut() {
    onClose()
    dispatch(logout())
  }

  function handleDarkModeToggle() {
    dispatch(setMode())
  }
  function handleInvite() {
    onClose()
  }
  function handleProfile() {
    onClose()
  }
  function handleSettings() {
    onClose()
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}>
      <Stack direction={'row'}>
        <Stack justifyContent={'space-between'} width={230} sx={{ overflowY: 'auto' }}>
          <Stack>
            <Typography variant={'h6'} fontSize={18} px={1.5} py={1}>Accounts</Typography>
            <MultipleAccountMenuItem selected={true} onClick={handleMultipleAccount}>
              {user.email}
            </MultipleAccountMenuItem>
            <Button startIcon={<AddOutlined />} sx={{ borderRadius: 0, fontSize: 12 }}>
              Add Another Account
            </Button>
          </Stack>

          <Stack>
            <Divider />
            <TopbarUserMenuItem icon={<PowerOffRounded />} onClick={handleLogOut}>
              Log Out
            </TopbarUserMenuItem>
          </Stack>
        </Stack>

        <Divider orientation={'vertical'} flexItem />

        <Stack>
          <Stack alignItems={'center'} mt={1} mb={2}>
            <Avatar alt={"User Profile Picture"} src={demoUserPic} sx={{ width: 60, height: 60, mb: 1 }} />
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

          <Box position={'relative'}>
            <MenuItem
              onClick={handleDarkModeToggle}
              sx={{ '& .MuiListItemIcon-root' : { minWidth: 0 }, }}>
              <ListItemIcon sx={{ mr: 1 }}><DarkModeRounded /></ListItemIcon>
              <Typography pt={0.5}>Dark Mode</Typography>
            </MenuItem>
            <Switch
              checked={isDarkMode}
              onClick={handleDarkModeToggle}
              size={'small'}
              sx={{ position: 'absolute', right: 0, top: '18%' }} />
          </Box>
          <TopbarUserMenuItem icon={<PersonAddRounded />} onClick={handleInvite}>
            Invite to Consilium Tempus
          </TopbarUserMenuItem>
          <TopbarUserMenuItem icon={<AccountCircleRounded />} onClick={handleProfile}>
            Profile
          </TopbarUserMenuItem>
          <TopbarUserMenuItem icon={<SettingsRounded />} onClick={handleSettings}>
            Settings
          </TopbarUserMenuItem>
        </Stack>
      </Stack>
    </Menu>
  );
}

export default TopbarUserMenu;