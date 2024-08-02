import { Avatar, Divider, IconButton, Stack, Tab, Tabs, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store.ts";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { SyntheticEvent, useEffect, useState } from "react";
import { setWorkspaceId } from "../../state/workspace/workspaceSlice.ts";
import useDependencyFacadeState from "../../hooks/useDependencyFacadeState.ts";
import useUpdateEffect from "../../hooks/useUpdateEffect.ts";
import { isNoneUserDependencyState } from "../../types/DependencyState.ts";
import OutlinedContentEditable from "../../components/text/OutlinedContentEditable.tsx";
import {
  ArrowDropDown,
  AssignmentRounded,
  CalendarTodayRounded,
  CampaignRounded,
  Star,
  StarOutline,
  SubjectRounded,
  TimelineRounded
} from "@mui/icons-material";
import WorkspaceActionsMenu from "./components/WorkspaceActionsMenu.tsx";
import WorkspaceParams from "./utils/WorkspaceParams.ts";
import {
  useGetWorkspaceQuery,
  useUpdateFavoritesWorkspaceMutation,
  useUpdateWorkspaceMutation
} from "./state/workspaceApi.ts";
import demoWorkspacePicture from "../../assets/demo-workspace-pic.jpg";
import { WorkspaceTabs } from "./utils/WorkspaceTabs.ts";
import WorkspaceLoader from "./components/WorkspaceLoader.tsx";
import WorkspaceOverview from "./features/workspace-overview/WorkspaceOverview.tsx";
import WorkspaceProjects from "./features/workspace-projects/WorkspaceProjects.tsx";

function Workspace() {
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const params = useParams()
  const workspaceId = params[WorkspaceParams.Id] ?? ''
  useEffect(() => {
    dispatch(setWorkspaceId(workspaceId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId]);

  const [tab, setTab] = useState(WorkspaceTabs.Overview)
  useEffect(() => {
    navigate(tab)
  }, [navigate, tab]);

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  const workspace = useGetWorkspaceQuery(
    { id: workspaceId },
    { skip: workspaceId === '' }
  )?.data

  const [name, refreshName, facadeName, setFacadeName] = useDependencyFacadeState('')
  useEffect(() => {
    if (workspace) {
      setFacadeName(workspace.name)
      setIsFavorite(workspace.isFavorite)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspace]) // TODO: Referential Equality

  const [updateWorkspace] = useUpdateWorkspaceMutation()
  useUpdateEffect(() => {
    if (!workspace || name.value === '' || isNoneUserDependencyState([name])) return

    updateWorkspace({
      id: workspaceId,
      name: name.value
    })

    refreshName()
  }, [name])

  const [updateFavoritesWorkspace] = useUpdateFavoritesWorkspaceMutation()
  const [isFavorite, setIsFavorite] = useState(false)

  const handleTabChange = (_e: SyntheticEvent<Element, Event>, newTab: WorkspaceTabs) => {
    setTab(newTab)
  }

  if (!workspace) return <WorkspaceLoader />

  return (
    <Stack alignItems="start" height={'100%'}>
      <Stack direction={'row'} alignItems={'center'} spacing={0.75}>
        <Stack direction={'row'} alignItems={'center'}>
          <Avatar
            alt={workspace.name}
            src={demoWorkspacePicture}
            sx={{ borderRadius: 2 }} />
          <OutlinedContentEditable
            typographyVariant={'h6'}
            maxLength={100}
            value={facadeName}
            handleChange={(n) => setFacadeName(n, true)}
            sx={{ ml: 1 }} />
          <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
            <ArrowDropDown />
          </IconButton>
          <WorkspaceActionsMenu
            anchorEl={menuAnchorEl}
            onClose={() => setMenuAnchorEl(null)}
            workspaceId={workspaceId} />
        </Stack>

        <IconButton
          onClick={() => {
            setIsFavorite(!isFavorite)
            updateFavoritesWorkspace({
              id: workspaceId,
              isFavorite: !isFavorite
            })
          }}
          sx={{
            color: theme.palette.primary[100],
            '&:hover': { color: theme.palette.secondary.main }
          }}>
          {isFavorite ? <Star /> : <StarOutline />}
        </IconButton>
      </Stack>

      <Tabs value={tab} onChange={handleTabChange} sx={{ mt: 1 }}>
        <Tab icon={<SubjectRounded />} label={'Overview'} value={WorkspaceTabs.Overview} />
        <Tab icon={<AssignmentRounded />} label={'Projects'} value={WorkspaceTabs.Projects} />
        <Tab icon={<CalendarTodayRounded />} label={'Calendar'} value={WorkspaceTabs.Calendar} />
        <Tab icon={<TimelineRounded />} label={'Dashboards'} value={WorkspaceTabs.Dashboards} />
        <Tab icon={<CampaignRounded />} label={'Announcements'} value={WorkspaceTabs.Announcements} />
      </Tabs>
      <Divider flexItem />

      <Routes>
        <Route path={WorkspaceTabs.Overview} element={<WorkspaceOverview />} />
        <Route path={WorkspaceTabs.Projects} element={<WorkspaceProjects />} />
      </Routes>
    </Stack>
  );
}

export default Workspace;