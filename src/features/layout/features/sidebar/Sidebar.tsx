import { Button, Divider, Drawer, IconButton, Stack, Typography, useTheme } from "@mui/material";
import demoLogo from "../../../../assets/demo-logo.png";
import DrawerList from "./components/DrawerList.tsx";
import topDrawerItems from "./data/TopDrawerItemsData.tsx";
import Paths from "../../../../utils/Paths.ts";
import { Add, MailOutlined, Person } from "@mui/icons-material";
import AddProjectDialog from "./components/AddProjectDialog.tsx";
import AddWorkspaceDialog from "./components/AddWorkspaceDialog.tsx";
import Workspace from "./types/Workspace.model.ts";
import { useGetWorkspacesQuery } from "./state/sidebarApi.ts";
import { useState } from "react";
import randomWorkspaceIcons from "./data/RandomWorkspaceIcons.tsx";
import randomProjectIcons from "./data/RandomProjectIcons.tsx";
import useProjects from "./hooks/useProjects.ts";
import ProjectsOrderQueryParams from "./utils/ProjectsOrderQueryParams.ts";
import SidebarProjectsMenu from "./components/SidebarProjectsMenu.tsx";
import ProjectLifecycle from "../../../../utils/project/ProjectLifecycle.ts";

interface SidebarProps {
  width: number,
  hidden: boolean,
  open: boolean,
}

function Sidebar({ width, hidden, open }: SidebarProps) {
  const theme = useTheme()

  const workspaces: Workspace[] | undefined = useGetWorkspacesQuery(
    {
      isPersonalWorkspaceFirst: true,
      orderBy: ['last_activity.desc']
    },
    { skip: hidden }
  ).data?.workspaces

  const [order, setOrder] = useState(ProjectsOrderQueryParams.LastActivity)
  const [lifecycle, setLifecycle] = useState<ProjectLifecycle | null>(ProjectLifecycle.Active)

  const [
    projects,
    projectIsFetching,
    projectIncreaseCurrentPage
  ] = useProjects(hidden, order, lifecycle)

  const [addProjectDialogOpen, setAddProjectDialogOpen] = useState(false)
  const [addWorkspaceDialogOpen, setAddWorkspaceDialogOpen] = useState(false)

  function handleOpenAddProjectDialog() {
    setAddProjectDialogOpen(true)
  }
  function handleOpenAddWorkspaceDialog() {
    setAddWorkspaceDialogOpen(true)
  }

  function getWorkspaceIcon(index: number, name: string) {
    if (index === 0) return <Person />
    return randomWorkspaceIcons[Math.floor(name.length % randomWorkspaceIcons.length)]
  }
  function getProjectIcon(name: string) {
    return randomProjectIcons[Math.floor(name.length % randomProjectIcons.length)]
  }

  if (hidden) return <></>

  return (
    <Drawer
      variant={"persistent"}
      open={open}
      sx={{
        width: width,
        '& .MuiDrawer-paper': { width: width },
      }}>
      <Stack pt={1.5} height={'100%'} sx={{ overflowY: 'hidden' }}>
        <Stack direction={'row'} alignItems={'center'} mb={2}>
          <img src={demoLogo} alt={'logo'} width={50} style={{ marginLeft: '14px' }} />
          <Typography
            variant="h6"
            pl={2}
            color={theme.palette.background[200]}
            fontWeight={500}
            sx={{ textShadow: `1px 1px 2px ${theme.palette.background[200]}` }}>
            Consilium Tempus
          </Typography>
        </Stack>

        <Stack flexGrow={1} sx={{ overflowY: 'auto' }}>
          <DrawerList drawerItems={topDrawerItems} />
          <DrawerList
            subheader={"Workspaces"}
            subheaderDestination={Paths.Workspaces}
            subheaderAction={
              <IconButton onClick={handleOpenAddWorkspaceDialog}>
                <Add sx={{ color: 'darkgrey' }}/>
              </IconButton>
            }
            drawerItems={workspaces?.map((w, i) => ({
              text: w.name,
              link: `${Paths.Workspace}/${w.id}`,
              icon: getWorkspaceIcon(i, w.name)
            }))}
          />
          <DrawerList
            subheader={"Projects"}
            subheaderDestination={Paths.Projects}
            subheaderAction={
              <IconButton onClick={handleOpenAddProjectDialog}>
                <Add sx={{ color: 'darkgrey' }}/>
              </IconButton>
            }
            drawerItems={projects?.map((p) => ({
              text: p.name,
              link: `${Paths.Project}/${p.id}`,
              icon: getProjectIcon(p.name)
            }))}
            isFetching={projectIsFetching}
            increaseCurrentPage={projectIncreaseCurrentPage}
            menu={(anchorEl, onClose) => (
              <SidebarProjectsMenu
                anchorEl={anchorEl}
                onClose={onClose}
                order={order}
                setOrder={setOrder}
                lifecycle={lifecycle}
                setLifecycle={setLifecycle} />
            )}
          />
        </Stack>

        <Stack>
          <Divider />
          <Button
            variant={'alt-outlined'}
            startIcon={<MailOutlined sx={{ mr: '3px' }} />}
            sx={{ marginX: 2, marginTop: 3, marginBottom: 2 }}>
            Invite teammates
          </Button>
          <Typography
            variant={'caption'}
            ml={1} mb={0.5}
            fontWeight={400}
            color={theme.palette.background[300]}>
            © {new Date().getFullYear()} Consilium Tempus
          </Typography>
        </Stack>

        <AddProjectDialog
          workspaces={workspaces}
          open={addProjectDialogOpen}
          onClose={() => setAddProjectDialogOpen(false)} />
        <AddWorkspaceDialog
          open={addWorkspaceDialogOpen}
          onClose={() => setAddWorkspaceDialogOpen(false)} />
      </Stack>
    </Drawer>
  );
}

export default Sidebar;