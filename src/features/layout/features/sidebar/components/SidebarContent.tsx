import DrawerList from "./DrawerList.tsx";
import topDrawerItems from "../data/TopDrawerItemsData.tsx";
import { Workspace } from "../types/Workspace.ts";
import { useGetProjectsQuery, useGetWorkspacesQuery } from "../state/sidebarApi.ts";
import { Project } from "../types/Project.ts";
import { Box, IconButton } from "@mui/material";
import Paths from "../../../../../utils/Paths.ts";
import { Add } from "@mui/icons-material";
import AddProjectDialog from "./AddProjectDialog.tsx";
import { useState } from "react";

function SidebarContent() {
  const workspaces: Workspace[] | undefined = useGetWorkspacesQuery({}).data?.workspaces
  const projects: Project[] | undefined = useGetProjectsQuery({ order: 'last_activity.desc' }).data?.projects

  const [addProjectDialogOpen, setAddProjectDialogOpen] = useState(false)

  function handleAddProjectDialog() {
    setAddProjectDialogOpen(true)
  }

  return (
    <Box py={1.5}>
      <AddProjectDialog
        workspaces={workspaces}
        open={addProjectDialogOpen}
        onClose={() => setAddProjectDialogOpen(false)}/>
      <DrawerList drawerItems={topDrawerItems} />
      <DrawerList
        subheader={"Workspaces"}
        drawerItems={workspaces?.map((w) => ({
          text: w.name,
          link: `workspaces/${w.id}`
        }))}/>
      <DrawerList
        subheader={"Projects"}
        subheaderDestination={Paths.projects}
        subheaderAction={
          <IconButton onClick={handleAddProjectDialog}>
            <Add sx={{ color: 'darkgrey' }}/>
          </IconButton>
        }
        drawerItems={projects?.map((p) => ({
          text: p.name,
          link: `projects/${p.id}`
        }))}/>
    </Box>
  );
}

export default SidebarContent;