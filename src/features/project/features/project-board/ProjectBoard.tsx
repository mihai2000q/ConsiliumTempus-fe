import { ReactNode, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Fade,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack
} from "@mui/material";
import ProjectBoardLoader from "./components/stage/ProjectBoardLoader.tsx";
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
import { useGetStagesFromProjectSprintQuery } from "./state/projectBoardApi.ts";
import AddProjectStagePanel from "./components/stage/AddProjectStagePanel.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../state/store.ts";
import { openAddProjectSprintDialog } from "../../../../state/project/projectSlice.ts";
import AddProjectStatusDialog from "../../shared/components/AddProjectStatusDialog.tsx";
import { closestCenter, DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableProjectStagePanel from "./components/stage/SortableProjectStagePanel.tsx";
import { TransitionGroup } from "react-transition-group";

function ProjectBoard() {
  const dispatch = useDispatch<AppDispatch>()

  const sprintId = useSelector((state: RootState) => state.project.sprintId)

  const { data } = useGetStagesFromProjectSprintQuery(
    { id: sprintId },
    { skip: sprintId === '' }
  )
  const stages = data?.stages

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

  const [draggedStageId, setDraggedStageId] = useState<string | null>(null)

  function handleDragStart(event: DragStartEvent) {
    setDraggedStageId(event.active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      console.log('moved on', over.id)
    }
    setDraggedStageId(null)
  }

  if (!stages) return <ProjectBoardLoader />

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

      <Stack direction={'row'} mt={3} height={800}>
        <Collapse in={showLeftAddStagePanel} orientation={'horizontal'} unmountOnExit>
          <AddProjectStagePanel
            sprintId={sprintId}
            closeCard={() => setShowLeftAddStagePanel(false)}
            onTop={true}
            show={showLeftAddStagePanel}
            sx={{ mr: '18px' }} />
        </Collapse>

        <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <SortableContext strategy={horizontalListSortingStrategy} items={stages.map(stage => stage.id)}>
            <TransitionGroup style={{ display: 'flex', gap: '18px' }}>
              {stages.map((stage, i) => (
                <Collapse
                  orientation={'horizontal'}
                  key={stage.id}
                  sx={{
                    height: '100%',
                    '& .MuiCollapse-wrapper': { height: '100%' },
                    '& .MuiCollapse-wrapperInner': { height: '100%' }
                  }}>
                  <SortableProjectStagePanel
                    stage={stage}
                    showAddTaskCard={i === 0 ? showAddTaskCard : undefined}
                    setShowAddTaskCard={i === 0 ? setShowAddTaskCard : undefined}
                    draggedStageId={draggedStageId} />
                </Collapse>
              ))}
            </TransitionGroup>
          </SortableContext>
        </DndContext>

        <Box display={'grid'} ml={'18px'} height={'100%'}>
          <Fade in={showRightAddStagePanel} mountOnEnter unmountOnExit>
            <Box height={'100%'} gridRow={1} gridColumn={1}>
              <AddProjectStagePanel
                sprintId={sprintId}
                closeCard={() => setShowRightAddStagePanel(false)}
                onTop={false}
                show={showRightAddStagePanel} />
            </Box>
          </Fade>

          <Fade in={!showRightAddStagePanel} mountOnEnter unmountOnExit>
            <Box height={'100%'} gridRow={1} gridColumn={1}>
              <Button
                size={'large'}
                startIcon={<Add />}
                onClick={() => setShowRightAddStagePanel(true)}
                sx={{
                  height: '100%',
                  width: 335,
                  borderRadius: 4,
                  fontSize: 16,
                  alignItems: 'start',
                  pt: 2,
                  '& .MuiButton-startIcon': { marginTop: '2px' }
                }}>
                Add Stage
              </Button>
            </Box>
          </Fade>
        </Box>
      </Stack>

      <AddProjectStatusDialog
        open={isAddProjectStatusDialogOpen}
        onClose={() => setIsAddProjectStatusDialogOpen(false)} />
    </Stack>
  );
}

export default ProjectBoard;