import { useSearchParams } from "react-router-dom";
import { useGetProjectQuery, useUpdateProjectMutation } from "./state/projectApi.ts";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme
} from "@mui/material";
import demoProjectPicture from './../../assets/demo-projects.jpg'
import {
  AccessTimeRounded,
  ArrowDropDown,
  AttachFileRounded,
  CalendarTodayRounded,
  CampaignRounded,
  CircleOutlined,
  CycloneRounded,
  ListRounded,
  SpaceDashboardRounded,
  Star,
  StarOutline,
  SubjectRounded,
  TimelineRounded
} from "@mui/icons-material";
import { SyntheticEvent, useState } from "react";
import ProjectActionsMenu from "./components/ProjectActionsMenu.tsx";
import { ProjectTabs } from "./types/ProjectTabs.ts";
import TabPanel from "../../components/tab/TabPanel.tsx";
import ProjectBoard from "./features/project-board/ProjectBoard.tsx";
import ProjectSearchParams from "./utils/ProjectSearchParams.ts";
import useDependencyOnceEffect from "../../hooks/useDependencyOnceEffect.ts";
import OutlinedContentEditable from "../../components/text/OutlinedContentEditable.tsx";
import useTimeoutCallbackSkipOnce from "../../hooks/useTimeoutCallbackSkipOnce.ts";
import ProjectSprintsSelector from "./features/project-board/components/ProjectSprintsSelector.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store.ts";

function Project() {
  const theme = useTheme()

  const [searchParams, setSearchParams] = useSearchParams()
  const projectId = searchParams.get(ProjectSearchParams.Id)!
  const tab = Number(searchParams.get(ProjectSearchParams.Tab)) ?? ProjectTabs.Overview

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  const project = useGetProjectQuery({ id: projectId })?.data
  const [isFavorite, setIsFavorite] = useState(false)
  const [name, setName] = useState('')
  useDependencyOnceEffect(
    () => {
      setName(project!.name)
      setIsFavorite(project!.isFavorite)
    },
    project
  )
  useTimeoutCallbackSkipOnce(
    () => handleUpdateProject({}).then(),
    [name]
  )

  const sprintId = useSelector((state: RootState) => state.project.sprintId)

  const [updateProject] = useUpdateProjectMutation()
  const handleUpdateProject = async ({ newIsFavorite = isFavorite }) => {
    await updateProject({
      id: projectId,
      name: name,
      isFavorite: newIsFavorite
    }).unwrap()
  }

  const handleTabChange = (_e: SyntheticEvent<Element, Event>, newTab: number) => {
    searchParams.set(ProjectSearchParams.Tab, newTab.toString())
    setSearchParams(searchParams)
  }

  return (
    <Stack alignItems="start" height={'100%'}>
      <Stack direction={'row'} alignItems={'center'} spacing={0.75}>
        {
          !project
            ?
            <>
              <Skeleton variant={'circular'} width={35} height={35} sx={{ borderRadius: 2 }} />
              <Skeleton variant={'text'} width={200} height={40} sx={{ ml: 1 }} />
            </>
            :
            <>
              <Stack direction={'row'} alignItems={'center'}>
                <Avatar
                  alt={project.name}
                  src={demoProjectPicture}
                  sx={{ borderRadius: 2 }} />
                <OutlinedContentEditable
                  typographyVariant={'h6'}
                  value={name}
                  handleChange={setName}
                  sx={{ ml: 1 }} />
                <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
                  <ArrowDropDown />
                </IconButton>
              </Stack>
              <ProjectActionsMenu anchorEl={menuAnchorEl} setAnchorEl={setMenuAnchorEl} />
              <IconButton
                onClick={() => {
                  setIsFavorite(!isFavorite)
                  handleUpdateProject({ newIsFavorite: !isFavorite }).then()
                }}
                sx={{
                  color: theme.palette.primary[100],
                  '&:hover': { color: theme.palette.secondary.main }
                }}>
                {isFavorite ? <Star /> : <StarOutline />}
              </IconButton>
              <Button
                startIcon={<CircleOutlined />}
                sx={{
                  color: theme.palette.primary[100],
                  justifyContent: 'center',
                  borderRadius: 2
                }}>
                <Typography fontWeight={500} ml={1} pt={'2px'}>Set Status</Typography>
              </Button>
              <ProjectSprintsSelector projectId={projectId} />
            </>
        }
      </Stack>

      <Tabs value={tab} onChange={handleTabChange} sx={{ mt: 1 }}>
        <Tab icon={<SubjectRounded />} label={'Overview'} />
        <Tab icon={<ListRounded />} label={'List'} />
        <Tab icon={<SpaceDashboardRounded />} label={'Board'} />
        <Tab icon={<TimelineRounded />} label={'Dashboards'} />
        <Tab icon={<AccessTimeRounded />} label={'Timeline'} />
        <Tab icon={<CalendarTodayRounded />} label={'Calendar'} />
        <Tab icon={<CycloneRounded />} label={'Event Storming'} />
        <Tab icon={<AttachFileRounded />} label={'Files'} />
        <Tab icon={<CampaignRounded />} label={'Announcements'} />
      </Tabs>
      <Divider flexItem />

      <TabPanel value={tab} index={ProjectTabs.Overview}>
        This is the overview
      </TabPanel>
      <TabPanel value={tab} index={ProjectTabs.List}>
        This is the list
      </TabPanel>
      <TabPanel value={tab} index={ProjectTabs.Board}>
        {sprintId && <ProjectBoard sprintId={sprintId} />}
      </TabPanel>
      <TabPanel value={tab} index={ProjectTabs.Dashboard}>
        THis is the dashboard
      </TabPanel>
      <TabPanel value={tab} index={ProjectTabs.Timeline}>
        THis is the timeline
      </TabPanel>
      <TabPanel value={tab} index={ProjectTabs.Calendar}>
        THis is the calendar
      </TabPanel>
      <TabPanel value={tab} index={ProjectTabs.EventStorming}>
        THis is the event storming tool
      </TabPanel>
      <TabPanel value={tab} index={ProjectTabs.Files}>
        THis is the files
      </TabPanel>
      <TabPanel value={tab} index={ProjectTabs.Announcements}>
        THis is the announcements
      </TabPanel>
    </Stack>
  );
}

export default Project;