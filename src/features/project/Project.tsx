import { useSearchParams } from "react-router-dom";
import { useGetProjectQuery, useUpdateProjectMutation } from "./state/projectApi.ts";
import { Avatar, Button, IconButton, Skeleton, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import demoProjectPicture from './../../assets/demo-projects.jpg'
import { ArrowDropDown, CircleOutlined, Star, StarOutline } from "@mui/icons-material";
import { useState } from "react";
import ProjectActionsMenu from "./components/ProjectActionsMenu.tsx";
import { ProjectTabs } from "./types/ProjectTabs.ts";
import TabPanel from "../../components/tab/TabPanel.tsx";
import ProjectBoard from "./features/project-board/ProjectBoard.tsx";

function Project() {
  const theme = useTheme()

  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('id')!

  const project = useGetProjectQuery({ id: projectId })?.data

  const [isFavorite, setIsFavorite] = useState(project?.isFavorite ?? false)

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const [tab, setTab] = useState(ProjectTabs.Overview)

  const [updateProject] = useUpdateProjectMutation()
  const handleUpdateProject = async () => {
    await updateProject({
      id: projectId,
      name: project!.name,
      isFavorite: isFavorite
    }).unwrap()
  }

  return (
    <Stack>
      <Stack direction={'row'} alignItems={'center'} spacing={0.75}>
        {
          !project
            ?
            <>
              <Skeleton variant={'circular'} width={35} height={35} sx={{ borderRadius: 3 }} />
              <Skeleton variant={'text'} width={200} height={30} sx={{ ml: 1 }} />
            </>
            :
            <>
              <Stack direction={'row'} alignItems={'center'}>
                <Avatar
                  alt={project.name}
                  src={demoProjectPicture}
                  sx={{ borderRadius: 2 }} />
                <Typography variant={'h6'} ml={1.5} mr={1}>
                  {project.name}
                </Typography>
                <IconButton
                  onClick={(e) => setMenuAnchorEl(e.currentTarget)}
                  sx={{ borderRadius: 3, p: 0.5 }}>
                  <ArrowDropDown />
                </IconButton>
              </Stack>
              <ProjectActionsMenu anchorEl={menuAnchorEl} setAnchorEl={setMenuAnchorEl} />
              <IconButton
                onClick={() => {
                  setIsFavorite(!isFavorite)
                  handleUpdateProject().then()
                }}
                sx={{
                  color: theme.palette.primary[100],
                  '&:hover': { color: theme.palette.secondary.main }
                }}>
                {isFavorite ? <Star /> : <StarOutline />}
              </IconButton>
              <Button sx={{
                textTransform: 'none',
                color: theme.palette.primary[100],
                justifyContent: 'center',
                borderRadius: 2
              }}>
                <CircleOutlined fontSize={'small'} />
                <Typography ml={1} py={'2px'}>Set Status</Typography>
              </Button>
            </>
        }
      </Stack>

      <Tabs value={tab} onChange={(_e, newTab) => setTab(newTab)} sx={{ mt: 1 }}>
        <Tab label={'Overview'} sx={{ textTransform: 'none' }} />
        <Tab label={'List'} sx={{ textTransform: 'none' }} />
        <Tab label={'Board'} sx={{ textTransform: 'none' }} />
      </Tabs>

      <TabPanel value={tab} index={ProjectTabs.Overview}>
        This is the overview
      </TabPanel>
      <TabPanel value={tab} index={ProjectTabs.List}>
        This is the list
      </TabPanel>
      <TabPanel value={tab} index={ProjectTabs.Board}>
        <ProjectBoard projectId={projectId} />
      </TabPanel>
    </Stack>
  );
}

export default Project;