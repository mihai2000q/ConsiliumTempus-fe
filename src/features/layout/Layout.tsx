import { Stack } from '@mui/material'
import Topbar from './features/topbar/Topbar.tsx'
import Sidebar from './features/sidebar/Sidebar.tsx'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Main from './components/Main.tsx'
import useAuth from '../../hooks/useAuth.ts'
import useErrorRedirection from '../../hooks/useErrorRedirection.ts'

const drawerWidth = 250

function Layout() {
  const isLayoutHidden = !useAuth()

  useErrorRedirection()

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <Stack
      display={'flex'}
      direction={'row'}
      width={'100%'}
      height={'100%'}>
      <Sidebar
        width={drawerWidth}
        hidden={isLayoutHidden}
        open={isSidebarOpen} />
      <Stack width={'100%'}>
        <Topbar
          drawerWidth={drawerWidth}
          hidden={isLayoutHidden}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen} />
        <Main
          isSidebarOpen={isSidebarOpen}
          isLayoutHidden={isLayoutHidden}
          drawerWidth={drawerWidth}>
          <Outlet />
        </Main>
      </Stack>
    </Stack>
  )
}

export default Layout
