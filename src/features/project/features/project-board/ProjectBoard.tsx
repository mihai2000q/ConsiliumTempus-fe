import { ReactNode, useState } from "react";
import { Button, ButtonGroup, ListItemIcon, ListItemText, Menu, MenuItem, Stack } from "@mui/material";
import ProjectStagesLoader from "./components/stage/ProjectStagesLoader.tsx";
import {
  Add,
  ArrowDropDownOutlined,
  AssignmentOutlined,
  ChargingStationOutlined,
  FilterList,
  GroupWorkOutlined,
  Sort,
  ViewTimelineOutlined,
  ViewWeekOutlined,
  VisibilityOffOutlined
} from "@mui/icons-material";
import ProjectSprint from "./types/ProjectSprint.model.ts";
import { useGetProjectSprintQuery } from "./state/projectBoardApi.ts";
import ProjectStagePanel from "./components/stage/ProjectStagePanel.tsx";
import AddProjectStagePanel from "./components/stage/AddProjectStagePanel.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../state/store.ts";
import { openAddProjectSprintDialog } from "../../../../state/project/projectSlice.ts";
import AddProjectStatusDialog from "../../shared/components/AddProjectStatusDialog.tsx";

function ProjectBoard() {
  const dispatch = useDispatch<AppDispatch>()

  const sprintId = useSelector((state: RootState) => state.project.sprintId)

  const sprint: ProjectSprint | undefined = useGetProjectSprintQuery(
    { id: sprintId },
    { skip: sprintId === '' }
  ).data // TODO: Replace with stages from transformResponse

  const [showAddTaskCard, setShowAddTaskCard] = useState(false)
  const [showLeftAddStagePanel, setShowLeftAddStagePanel] = useState(false)
  const [showRightAddStagePanel, setShowRightAddStagePanel] = useState(false)
  const [isAddProjectStatusDialogOpen, setIsAddProjectStatusDialogOpen] = useState(false)

  const handleAddTask = () => {
    setShowAddTaskCard(s => !s)
  }
  const handleAddStage = () => {
    setShowLeftAddStagePanel(s => !s)
  }
  const handleAddSprint = () => {
    dispatch(openAddProjectSprintDialog({
      open: true
    }))
  }
  const handleAddStatus = () => {
    setIsAddProjectStatusDialogOpen(true)
  }

  type Option = { icon: ReactNode, option: string, action: () => void }
  const addOptions: Option[] = [
    { icon: <AssignmentOutlined />, option: 'Task', action: handleAddTask },
    { icon: <ViewWeekOutlined />, option: 'Stage', action: handleAddStage },
    { icon: <ViewTimelineOutlined />, option: 'Sprint', action: handleAddSprint },
    { icon: <ChargingStationOutlined />, option: 'Status', action: handleAddStatus },
  ]
  const [addOption, setAddOption] = useState(addOptions[0])

  const [addOptionsMenuAnchorEl, setAddOptionsMenuAnchorEl] =
    useState<HTMLElement | null>(null)
  const handleCloseAddOptionsMenu = () => setAddOptionsMenuAnchorEl(null)

  if (!sprint) return <ProjectStagesLoader />

  return (
    <Stack alignItems="start" height={'100%'} mt={1}>
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <ButtonGroup variant={'outlined'} size={'small'}>
          <Button
            startIcon={<Add />}
            sx={{ borderRadius: 1.5 }}
            onClick={addOption.action}>
            Add {addOption.option}
          </Button>
          <Button
            size={'small'}
            sx={{ borderRadius: 1.5 }}
            onClick={(e) => setAddOptionsMenuAnchorEl(e.currentTarget)}>
            <ArrowDropDownOutlined />
          </Button>
        </ButtonGroup>
        <Menu
          open={Boolean(addOptionsMenuAnchorEl)}
          anchorEl={addOptionsMenuAnchorEl}
          onClose={handleCloseAddOptionsMenu}>
          {addOptions.map((a, i) => (
            <MenuItem
              key={i}
              onClick={() => {
                setAddOption(a)
                handleCloseAddOptionsMenu()
              }}
              sx={{
                py: 0.5,
                '& .MuiListItemIcon-root': {
                  minWidth: 0,
                  mr: 1
                }
              }}>
              <ListItemIcon>{a.icon}</ListItemIcon>
              <ListItemText sx={{ pt: 0.5 }}>{a.option}</ListItemText>
            </MenuItem>
          ))}
        </Menu>

        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <Button startIcon={<FilterList />} size={'small'}>
            Filter
          </Button>
          <Button startIcon={<Sort />} size={'small'}>
            Sort
          </Button>
          <Button startIcon={<GroupWorkOutlined />} size={'small'}>
            Group By
          </Button>
          <Button startIcon={<VisibilityOffOutlined />} size={'small'}>
            Hide
          </Button>
        </Stack>
      </Stack>

      <Stack direction={'row'} spacing={2.25} mt={3} height={800}>
        {
          showLeftAddStagePanel &&
          <AddProjectStagePanel
            sprintId={sprintId}
            closeCard={() => setShowLeftAddStagePanel(false)}
            onTop={true} />
        }
        {sprint?.stages.map((stage, i) => (
          <ProjectStagePanel
            key={stage.id}
            stage={stage}
            showAddTaskCard={i === 0 ? showAddTaskCard : undefined}
            setShowAddTaskCard={i === 0 ? setShowAddTaskCard : undefined} />
        ))}
        {
          showRightAddStagePanel
            ?
            <AddProjectStagePanel
              sprintId={sprintId}
              closeCard={() => setShowRightAddStagePanel(false)}
              onTop={false} />
            :
            <Button
              size={'large'}
              startIcon={<Add />}
              onClick={() => setShowRightAddStagePanel(true)}
              sx={{
                width: 350,
                borderRadius: 4,
                fontSize: 16,
                alignItems: 'start',
                pt: 2,
                '& .MuiButton-startIcon': {
                  marginTop: '2px'
                }
              }}>
              Add Stage
            </Button>
        }
      </Stack>

      <AddProjectStatusDialog
        open={isAddProjectStatusDialogOpen}
        onClose={() => setIsAddProjectStatusDialogOpen(false)} />
    </Stack>
  );
}

export default ProjectBoard;