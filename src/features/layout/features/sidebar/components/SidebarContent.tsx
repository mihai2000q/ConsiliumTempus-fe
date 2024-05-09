import DrawerList from "./DrawerList.tsx";
import topDrawerItems from "../data/TopDrawerItemsData.tsx";
import { Workspace } from "../types/Workspace.ts";
import { useGetProjectsQuery, useGetWorkspacesQuery } from "../state/sidebarApi.ts";
import { Project } from "../types/Project.ts";
import { Box, IconButton } from "@mui/material";
import Paths from "../../../../../utils/Paths.ts";
import { Add } from "@mui/icons-material";

function SidebarContent() {
  const workspaces: Workspace[] | undefined = useGetWorkspacesQuery(undefined).data?.workspaces
  const projects: Project[] | undefined = useGetProjectsQuery(undefined).data?.projects

  return (
    <Box py={1.5}>
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
          <IconButton sx={{ color: 'darkgrey' }}>
            <Add/>
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