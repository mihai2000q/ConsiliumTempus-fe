import { styled } from "@mui/material";

interface MainProps {
  isSidebarOpen: boolean,
  isLayoutDisplayable: boolean,
  drawerWidth: number
}

export const Main = styled(
  'main',
  {
    shouldForwardProp: (prop) =>
      prop !== 'isSidebarOpen' &&
      prop !== 'drawerWidth' &&
      prop !== 'isLayoutDisplayable'
  }
)<MainProps>(({ theme, isSidebarOpen, isLayoutDisplayable, drawerWidth }) => ({
  padding: '76px 30px 12px 30px',
  flexGrow: 1,
  marginLeft: `-${isLayoutDisplayable ? drawerWidth : 0}px`,
  background: `linear-gradient(
    to right bottom, 
    ${theme.palette.secondary[900]}, 
    ${theme.palette.background[800]}, 
    ${theme.palette.background[900]}, 
    ${theme.palette.mode === 'dark' ? 'black' : 'white'}
  )`,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isSidebarOpen && {
    marginLeft: 0,
    marginRight: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));