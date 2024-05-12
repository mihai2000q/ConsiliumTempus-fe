import { styled, Toolbar, ToolbarProps } from "@mui/material";

interface AppToolbarProps extends ToolbarProps {
  isSidebarOpen: boolean,
  drawerWidth: number
}

export const AppToolbar = styled(Toolbar, {
  shouldForwardProp: (prop) => prop !== 'isSidebarOpen' && prop !== 'drawerWidth',
})<AppToolbarProps>(({ theme, isSidebarOpen, drawerWidth }) => ({
  position: 'absolute',
  width: `${isSidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%'}`,
  justifyContent: "space-between",
  marginLeft: `-${drawerWidth}px`,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isSidebarOpen && {
    marginLeft: 0,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));