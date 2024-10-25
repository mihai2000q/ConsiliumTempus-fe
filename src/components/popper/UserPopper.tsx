import { Box, Button, Grow, Popper, Stack, Typography, useTheme } from '@mui/material'
import demoUserPic from '../../assets/demo-user-pic.jpg'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store.ts'
import { ReactNode, useState } from 'react'
import useTimeoutCallback from '../../hooks/useTimeoutCallback.ts'

interface User {
  id: string,
  name: string,
  email: string,
}

type PopperPlacement = 'top' | 'bottom' | 'left' | 'right' |
  'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' |
  'left-start' | 'left-end' | 'right-start' | 'right-end'

interface UserPopperProps {
  children: ReactNode,
  user: User | null,
  placement?: PopperPlacement | undefined
}

function UserPopper({
                      children,
                      user,
                      placement = 'top-start'
                    }: UserPopperProps) {
  const theme = useTheme()
  const userId = useSelector((state: RootState) => state.global.userId)

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [facadeAnchorEl, setFacadeAnchorEl] = useState<HTMLElement | null>(null)
  useTimeoutCallback(() => {
    if (facadeAnchorEl !== null) setAnchorEl(facadeAnchorEl)
  }, [facadeAnchorEl])

  useTimeoutCallback(() => {
    if (facadeAnchorEl === null) setAnchorEl(null)
  }, [facadeAnchorEl], 300)

  return (
    <Box onMouseLeave={() => setFacadeAnchorEl(null)}>
      <Box onMouseEnter={(e) => setFacadeAnchorEl(e.currentTarget)}>
        {children}
      </Box>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement={placement}
        transition
        sx={{ zIndex: theme.zIndex.modal }}>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Stack
              direction={'row'}
              alignItems={'center'}
              bgcolor={theme.palette.background.default}
              boxShadow={15}
              borderRadius={'8px'}>
              <img src={demoUserPic} alt={'user profile picture'} style={{ width: 150, borderRadius: '8px' }} />
              <Stack
                px={2}
                alignSelf={'stretch'}
                justifyContent={'center'}
                position={'relative'}
                minWidth={user?.id === userId ? 258 : 0}
                maxWidth={258}>
                <Stack mb={4}>
                  <Typography variant={'h6'} fontWeight={700} noWrap>{user?.name}</Typography>
                  <Typography variant={'body2'} fontWeight={400} color={'text.secondary'} noWrap>
                    {user?.email}
                  </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'end'} position={'absolute'} bottom={'8%'} spacing={1.5}>
                  {user?.id === userId &&
                    <Button variant={'alt-outlined'} size={'small'} sx={{ padding: '4px 20px' }}>
                      Edit Profile
                    </Button>}
                  <Button variant={'alt-outlined'} size={'small'} sx={{ padding: '4px 20px' }}>
                    View Profile
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Grow>
        )}
      </Popper>
    </Box>
  )
}

export default UserPopper
