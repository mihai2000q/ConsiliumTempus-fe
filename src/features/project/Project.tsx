import { useParams, useSearchParams } from "react-router-dom";
import { useGetProjectQuery, useUpdateProjectMutation } from "./state/projectApi.ts";
import { Avatar, Button, Divider, IconButton, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
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
import { SyntheticEvent, useEffect, useState } from "react";
import ProjectActionsMenu from "./components/ProjectActionsMenu.tsx";
import { ProjectTabs } from "./utils/ProjectTabs.ts";
import TabPanel from "../../components/tab/TabPanel.tsx";
import ProjectBoard from "./features/project-board/ProjectBoard.tsx";
import ProjectSearchParams from "./utils/ProjectSearchParams.ts";
import OutlinedContentEditable from "../../components/text/OutlinedContentEditable.tsx";
import ProjectSprintsSelector from "./components/ProjectSprintsSelector.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store.ts";
import ProjectOverview from "./features/project-overview/ProjectOverview.tsx";
import ProjectParams from "./utils/ProjectParams.ts";
import useUpdateEffect from "../../hooks/useUpdateEffect.ts";
import useDependencyState from "../../hooks/useDependencyState.ts";
import useDependencyFacadeState from "../../hooks/useDependencyFacadeState.ts";
import { isNoneUserDependencyState } from "../../types/DependencyState.ts";
import ProjectLoader from "./components/ProjectLoader.tsx";
import ProjectStatusMenu from "./components/status/ProjectStatusMenu.tsx";
import ProjectStatusLabel from "./components/status/ProjectStatusLabel.tsx";
import ProjectStatusesDialog from "./components/status/ProjectStatusesDialog.tsx";
import ProjectAdapter from "./adapters/Project.adapter.ts";
import { setBreadcrumbs, setProjectId, setProjectName } from "../../state/project/projectSlice.ts";
import Paths from "../../utils/Paths.ts";
import AddProjectSprintDialog from "./shared/components/AddProjectSprintDialog.tsx";
import useAdapterState from "../../hooks/useAdapterState.ts";
import ProjectSprintsDialog from "./features/project-sprints-dialog/ProjectSprintsDialog.tsx";

function Project() {
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()

  const params = useParams()
  const projectId = params[ProjectParams.Id] ?? ''
  useEffect(() => {
    dispatch(setProjectId(projectId))
  }, [projectId]);

  const [searchParams, setSearchParams] = useSearchParams()
  const tab = Number(searchParams.get(ProjectSearchParams.Tab)) ?? ProjectTabs.Overview

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const [statusMenuAnchorEl, setStatusMenuAnchorEl] = useState<HTMLElement | null>(null)

  const projectResponse = useGetProjectQuery(
    { id: projectId },
    { skip: projectId === '' }
  )?.data
  const project = useAdapterState(projectResponse, ProjectAdapter.adapt)

  const [name, refreshName, facadeName, setFacadeName] = useDependencyFacadeState('')
  const [isFavorite, setIsFavorite, refreshIsFavorite] = useDependencyState(false)
  useEffect(() => {
    if (project) {
      setFacadeName(project.name)
      setIsFavorite(project.isFavorite)

      dispatch(setProjectName(project.name))
      dispatch(setBreadcrumbs([
        { path: `${Paths.Workspace}/${project.workspace.id}`, name: project.workspace.name },
        { path: `${Paths.Project}/${projectId}`, name: project.name },
      ]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]) // TODO: Referential Equality

  const [updateProject] = useUpdateProjectMutation()
  useUpdateEffect(() => {
    if (!project || name.value === '' || isNoneUserDependencyState([isFavorite, name])) return

    updateProject({
      id: projectId,
      name: name.value,
      lifecycle: project.lifecycle,
      isFavorite: isFavorite.value
    }).unwrap()

    refreshName()
    refreshIsFavorite()
  }, [isFavorite, name])

  const sprintId = useSelector((state: RootState) => state.project.sprintId)

  const handleTabChange = (_e: SyntheticEvent<Element, Event>, newTab: number) => {
    searchParams.set(ProjectSearchParams.Tab, newTab.toString())
    setSearchParams(searchParams)
  }

  if (!project) return <ProjectLoader />

  return (
    <Stack alignItems="start" height={'100%'}>
      <Stack direction={'row'} alignItems={'center'} spacing={0.75}>
        <Stack direction={'row'} alignItems={'center'}>
          <Avatar
            alt={project.name}
            src={demoProjectPicture}
            sx={{ borderRadius: 2 }} />
          <OutlinedContentEditable
            typographyVariant={'h6'}
            value={facadeName}
            handleChange={(n) => setFacadeName(n, true)}
            sx={{ ml: 1 }} />
          <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
            <ArrowDropDown />
          </IconButton>
          <ProjectActionsMenu
            anchorEl={menuAnchorEl}
            setAnchorEl={setMenuAnchorEl}
            projectId={projectId}
            project={project} />
        </Stack>

        <IconButton
          onClick={() => setIsFavorite(!isFavorite.value, true)}
          sx={{
            color: theme.palette.primary[100],
            '&:hover': { color: theme.palette.secondary.main }
          }}>
          {isFavorite.value ? <Star /> : <StarOutline />}
        </IconButton>

        <Button
          onClick={(e) => setStatusMenuAnchorEl(e.currentTarget)}
          sx={{
            color: theme.palette.primary[100],
            justifyContent: 'center',
            borderRadius: 2
          }}>
          {project.latestStatus !== null
            ? (<ProjectStatusLabel status={project.latestStatus.status} />)
            : (
              <>
                <CircleOutlined sx={{ fontSize: '16px' }} />
                <Typography fontWeight={500} ml={'4px'} pt={'2px'}>Set Status</Typography>
              </>
            )}
        </Button>
        <ProjectStatusMenu
          anchorEl={statusMenuAnchorEl}
          setAnchorEl={setStatusMenuAnchorEl}
          latestStatus={project.latestStatus} />

        <ProjectSprintsSelector projectId={projectId} />
      </Stack>

      <Tabs value={tab} onChange={handleTabChange} sx={{ mt: 1 }}>
        <Tab icon={<SubjectRounded />} label={'Overview'} />
        <Tab icon={<ListRounded />} label={'List'} />
        <Tab icon={<SpaceDashboardRounded />} label={'Board'} />
        <Tab icon={<CalendarTodayRounded />} label={'Calendar'} />
        <Tab icon={<TimelineRounded />} label={'Dashboards'} />
        <Tab icon={<AccessTimeRounded />} label={'Timeline'} />
        <Tab icon={<CycloneRounded />} label={'Event Storming'} />
        <Tab icon={<AttachFileRounded />} label={'Files'} />
        <Tab icon={<CampaignRounded />} label={'Announcements'} />
      </Tabs>
      <Divider flexItem />

      <TabPanel value={tab} index={ProjectTabs.Overview}>
        <ProjectOverview projectId={projectId} />
      </TabPanel>
      <TabPanel value={tab} index={ProjectTabs.List}>
        This is the list
      </TabPanel>
      <TabPanel value={tab} index={ProjectTabs.Board}>
        {sprintId && <ProjectBoard sprintId={sprintId} />}
      </TabPanel>
      <TabPanel value={tab} index={ProjectTabs.Calendar}>
        THis is the calendar
      </TabPanel>
      <TabPanel value={tab} index={ProjectTabs.Dashboard}>
        THis is the dashboard
      </TabPanel>
      <TabPanel value={tab} index={ProjectTabs.Timeline}>
        THis is the timeline
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

      <ProjectStatusesDialog />
      <ProjectSprintsDialog />
      <AddProjectSprintDialog />
    </Stack>
  );
}

export default Project;