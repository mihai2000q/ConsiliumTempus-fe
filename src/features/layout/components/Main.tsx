import { styled } from '@mui/material'

interface MainProps {
  isSidebarOpen: boolean,
  isLayoutHidden: boolean,
  drawerWidth: number
}

const Main = styled(
  'main',
  {
    shouldForwardProp: (prop) =>
      prop !== 'isSidebarOpen' &&
      prop !== 'drawerWidth' &&
      prop !== 'isLayoutHidden'
  }
)<MainProps>(({ theme, isSidebarOpen, isLayoutHidden, drawerWidth }) => ({
  padding: '76px 30px 12px 30px',
  flexGrow: 1,
  marginLeft: `-${isLayoutHidden ? 0 : drawerWidth}px`,
  background: `linear-gradient(
    to right bottom,
    ${theme.palette.secondary[900]},
    ${theme.palette.background[800]},
    ${theme.palette.background[900]},
    ${theme.palette.mode === 'dark' ? 'black' : 'white'}
  )`,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(isSidebarOpen && {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

export default Main
