import DrawerList from "./DrawerList.tsx";
import topDrawerItems from "../data/TopDrawerItemsData.tsx";
import Workspace from "../types/Workspace.model.ts";
import { useGetProjectsQuery, useGetWorkspacesQuery } from "../state/sidebarApi.ts";
import Project from "../types/Project.model.ts";
import { Button, Divider, IconButton, Stack, Typography, useTheme } from "@mui/material";
import Paths from "../../../../../utils/Paths.ts";
import { Add, MailOutlined, Person } from "@mui/icons-material";
import AddProjectDialog from "./AddProjectDialog.tsx";
import { useState } from "react";
import AddWorkspaceDialog from "./AddWorkspaceDialog.tsx";
import randomWorkspaceIcons from "../data/RandomWorkspaceIcons.tsx";
import demoLogo from "../../../../../assets/demo-logo.png";
import randomProjectIcons from "../data/RandomProjectIcons.tsx";

function SidebarContent() {
  const theme = useTheme()

  const workspaces: Workspace[] | undefined = useGetWorkspacesQuery({
    isPersonalWorkspaceFirst: true,
    order: 'last_activity.desc'
  }).data?.workspaces
  const projects: Project[] | undefined = useGetProjectsQuery({ order: 'last_activity.desc' }).data?.projects

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

  return (
    <Stack display={'flex'} mt={1.5} justifyContent={'space-between'} height={'100%'}>
      <Stack>
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
        <AddProjectDialog
          workspaces={workspaces}
          open={addProjectDialogOpen}
          onClose={() => setAddProjectDialogOpen(false)} />
        <AddWorkspaceDialog
          open={addWorkspaceDialogOpen}
          onClose={() => setAddWorkspaceDialogOpen(false)} />
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
          }))}/>
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
          }))}/>
      </Stack>

      <Stack display={'flex'}>
        <Divider />
        <Button
          variant={'outlined'}
          startIcon={<MailOutlined sx={{ mr: '3px' }} />}
          sx={{ marginX: 2, marginTop: 2 }}>
          Invite teammates
        </Button>
        <Typography
          variant={'caption'}
          ml={1} mt={1} mb={0.5}
          fontWeight={400}
          color={theme.palette.background[300]}>
          © {new Date().getFullYear()} Consilium Tempus
        </Typography>
      </Stack>
    </Stack>
  );
}

export default SidebarContent;