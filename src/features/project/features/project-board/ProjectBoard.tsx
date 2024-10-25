import { ReactNode, useEffect, useState } from 'react'
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
} from '@mui/material'
import ProjectBoardLoader from './components/stage/ProjectBoardLoader.tsx'
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
} from '@mui/icons-material'
import {
  useGetStagesFromProjectSprintQuery,
  useMoveProjectTaskMutation,
  useMoveStageFromProjectSprintMutation
} from './state/projectBoardApi.ts'
import AddProjectStagePanel from './components/stage/AddProjectStagePanel.tsx'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch, useAppSelector } from '../../../../state/store.ts'
import { openAddProjectSprintDialog } from '../../../../state/project/projectSlice.ts'
import AddProjectStatusDialog from '../../shared/components/AddProjectStatusDialog.tsx'
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import SortableProjectStagePanel from './components/stage/SortableProjectStagePanel.tsx'
import { TransitionGroup } from 'react-transition-group'
import {
  setDraggedProjectTask,
  setDragOverlayProjectTask,
  setProjectStagesWithEndTasks,
  setProjectStagesWithOverTasks
} from '../../../../state/project-board/projectBoardSlice.ts'
import DragOverlayProjectTaskCard from './components/stage/DragOverlayProjectTaskCard.tsx'
import ProjectStage from './types/ProjectStage.model.ts'

function ProjectBoard() {
  const dispatch = useAppDispatch()

  const sprintId = useSelector((state: RootState) => state.project.sprintId)

  const [stages, setStages] = useState<ProjectStage[]>([])
  const { data, isLoading } = useGetStagesFromProjectSprintQuery(
    { id: sprintId },
    { skip: sprintId === '' }
  )
  useEffect(() => setStages(data?.stages ?? []), [data])

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
    { icon: <ChargingStationOutlined />, option: 'Status', action: handleAddStatus }
  ]
  const [addOption, setAddOption] = useState(addOptions[0])

  const [addOptionsMenuAnchorEl, setAddOptionsMenuAnchorEl] =
    useState<HTMLElement | null>(null)
  const handleCloseAddOptionsMenu = () => setAddOptionsMenuAnchorEl(null)

  const [draggedStageId, setDraggedStageId] = useState<string | null>(null)

  const stateProjectStages = useAppSelector(state => state.projectBoard.projectStages)

  const [moveStageFromProjectSprint] = useMoveStageFromProjectSprintMutation()
  const [moveProjectTask] = useMoveProjectTaskMutation()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 10
      }
    })
  )

  function handleDragStart(event: DragStartEvent) {
    const id = event.active.id as string

    if (isProjectStageId(id)) {
      setDraggedStageId(id)
    } else {
      const task = stateProjectStages
        .flatMap(ps => ps.tasks)
        .find(task => task?.id === id)
      dispatch(setDraggedProjectTask(task))
      dispatch(setDragOverlayProjectTask(task))
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    const activeId = active.id as string
    const overId = over?.id as string | undefined

    setDraggedStageId(null)
    dispatch(setDraggedProjectTask(undefined))

    if (!overId || overId === activeId) return

    if (isProjectStageId(activeId)) {
      handleDragEndProjectStage(activeId, overId)
    } else {
      handleDragEndProjectTask(activeId, overId)
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over, delta } = event
    const activeId = active.id as string
    const overId = over?.id as string | undefined

    if (!overId || isProjectStageId(activeId)) return

    const activeStage = stateProjectStages.find(ps =>
      ps.tasks?.some(t => t.id === activeId))!
    let overStage = stateProjectStages.find(ps => ps.id === overId)

    if (!overStage) {
      overStage = stateProjectStages.find(ps =>
        ps.tasks?.some(t => t.id === overId))
    }

    if (!overId || !overStage || overStage.id === activeStage.id) return

    dispatch(setProjectStagesWithOverTasks({
      activeId: activeId,
      overId: overId,
      activeStage: activeStage,
      overStage: overStage,
      delta: delta
    }))

    moveProjectTask({
      sprintId: sprintId,
      id: activeId,
      overId: overId
    })
  }

  function isProjectStageId(id: string) {
    return stateProjectStages.some((stage) => stage.id === id)
  }

  function handleDragEndProjectStage(activeId: string, overId: string) {
    const activeIndex = stages.findIndex(s => s.id === activeId)
    const overIndex = stages.findIndex(s => s.id === overId)

    setStages(prevStages => arrayMove(prevStages, activeIndex, overIndex))

    moveStageFromProjectSprint({
      id: sprintId,
      stageId: activeId,
      overStageId: overId
    })
  }

  function handleDragEndProjectTask(activeId: string, overId: string) {
    dispatch(setProjectStagesWithEndTasks({
      activeId: activeId,
      overId: overId
    }))

    moveProjectTask({
      sprintId: sprintId,
      id: activeId,
      overId: overId
    })
  }

  if (isLoading) return <ProjectBoardLoader />

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

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}>
          <SortableContext strategy={rectSortingStrategy} items={stages.map(stage => stage.id)}>
            <TransitionGroup style={{ display: 'flex', gap: '18px' }}>
              {stages.map((stage, i) => (
                <Collapse
                  unmountOnExit
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
          {!draggedStageId && <DragOverlay>
            <DragOverlayProjectTaskCard />
          </DragOverlay>}
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
  )
}

export default ProjectBoard
