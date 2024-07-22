import {
  Box,
  BoxProps,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  styled,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import ProjectStage from "../../types/ProjectStage.model.ts";
import { useUpdateStageFromProjectSprintMutation } from "../../state/projectBoardApi.ts";
import ProjectTaskCard from "../task/ProjectTaskCard.tsx";
import { Add, AddRounded, MoreHorizRounded, SearchRounded } from "@mui/icons-material";
import { Dispatch, SetStateAction, useState } from "react";
import ProjectStageActionsMenu from "./ProjectStageActionsMenu.tsx";
import ProjectTasksLoader from "../task/ProjectTasksLoader.tsx";
import AddProjectTaskCard from "../task/AddProjectTaskCard.tsx";
import OutlinedContentEditable from "../../../../../../components/text/OutlinedContentEditable.tsx";
import useTimeoutCallback from "../../../../../../hooks/useTimeoutCallback.ts";
import plural from "../../../../../../utils/plural.ts";
import useProjectTasks from "../../hooks/useProjectTasks.ts";
import StyledProjectStagePanel from "./StyledProjectStagePanel.tsx";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "../../../../../../components/dnd/SortableItem.tsx";
import { useAppSelector } from "../../../../../../state/store.ts";

const StyledDragHandle = styled(Box)<BoxProps>(() => ({
  position: 'absolute',
  width: "calc(100% + 24px)",
  left: '-12px',
  top: '-12px',
  borderRadius: '16px 16px 0 0',
  height: 45
}))

interface ProjectStagePanelProps {
  stage: ProjectStage,
  showAddTaskCard?: boolean | undefined,
  setShowAddTaskCard?: Dispatch<SetStateAction<boolean>> | undefined,
  listeners: SyntheticListenerMap | undefined,
  setActivatorNodeRef: (element: (HTMLElement | null)) => void,
  isDragged: boolean,
  isDragging: boolean,
}

function ProjectStagePanel({
  stage,
  showAddTaskCard,
  setShowAddTaskCard,
  listeners,
  setActivatorNodeRef,
  isDragged,
  isDragging
}: ProjectStagePanelProps) {
  const theme = useTheme()

  const sprintId = useAppSelector((state) => state.project.sprintId)
  const [stageName, setStageName] = useState(stage.name)
  const [updateStageFromProjectSprint] = useUpdateStageFromProjectSprintMutation()
  useTimeoutCallback(() =>
    updateStageFromProjectSprint({
      id: sprintId,
      stageId: stage.id,
      name: stageName
  }), [stageName])

  const {
    tasks,
    totalTasksCount,
    isFetching,
    isLoading,
    fetchMoreTasks
  } = useProjectTasks(stage.id, undefined, undefined)

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  const [showTopAddTaskCard, setShowTopAddTaskCard] = useState(false)
  const [showBottomAddTaskCard, setShowBottomAddTaskCard] = useState(false)

  const [isDragHandleHovered, setIsDragHandleHovered] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollTop + clientHeight > scrollHeight - 25) {
      fetchMoreTasks()
    }
  }

  return (
    <StyledProjectStagePanel
      isDragHandleHovered={isDragHandleHovered}
      isDragged={isDragged}
      isDragging={isDragging}>
      <Box position={'relative'}>
        <StyledDragHandle
          ref={setActivatorNodeRef}
          {...listeners}
          onMouseEnter={() => setIsDragHandleHovered(true)}
          onMouseLeave={() => setIsDragHandleHovered(false)}
          sx={{ cursor: isDragged ? 'unset' : 'grab' }}
        />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Stack direction={'row'} alignItems={'center'} zIndex={1}>
            <OutlinedContentEditable
              typographyVariant={'h6'}
              value={stageName}
              handleChange={setStageName}
              noWrap
              maxLength={50}
              sx={{
                color: theme.palette.background[200],
                maxWidth: 180,
                mr: '1px'
              }} />
            {
              totalTasksCount === undefined
                ? <CircularProgress size={16} />
                :
                <Tooltip
                  arrow
                  placement={'top'}
                  sx={{ cursor: 'default' }}
                  title={`There are ${totalTasksCount} task${plural(totalTasksCount)} in this stage`}>
                  <Typography fontWeight={300}>{totalTasksCount}</Typography>
                </Tooltip>
            }
          </Stack>

          <Stack direction={'row'}>
            <IconButton>
              <SearchRounded />
            </IconButton>
            <IconButton onClick={() => setShowTopAddTaskCard(!showTopAddTaskCard)}>
              <AddRounded />
            </IconButton>
            <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
              <MoreHorizRounded />
            </IconButton>
            <ProjectStageActionsMenu
              anchorEl={menuAnchorEl}
              onClose={() => setMenuAnchorEl(null)}
              stageId={stage.id} />
          </Stack>
        </Stack>
      </Box>

      <Stack px={0.75} pt={1} sx={{ overflow: 'auto', maxHeight: '100%' }} onScroll={handleScroll}>
        {
          showTopAddTaskCard &&
          <AddProjectTaskCard
            mb={1}
            closeCard={() => setShowTopAddTaskCard(false)}
            projectStageId={stage.id}
            onTop={true} />
        }
        {
          showAddTaskCard && setShowAddTaskCard &&
          <AddProjectTaskCard
            mb={1}
            closeCard={() => setShowAddTaskCard(false)}
            projectStageId={stage.id}
            onTop={true} />
        }
        {
          !tasks
            ? <ProjectTasksLoader />
            : (
              <SortableContext strategy={rectSortingStrategy} items={tasks.map((task) => task.id)}>
                {tasks.map((task) => (
                  <SortableItem key={task.id} id={task.id}>
                    <ProjectTaskCard task={task} />
                  </SortableItem>
                ))}
              </SortableContext>
            )
        }
        {
          showBottomAddTaskCard &&
          <AddProjectTaskCard
            mt={1}
            mb={1}
            closeCard={() => setShowBottomAddTaskCard(false)}
            projectStageId={stage.id}
            onTop={false} />
        }
        <Button
          startIcon={<Add />}
          onClick={() => setShowBottomAddTaskCard(!showBottomAddTaskCard)}
          sx={{ mb: 1.5, mt: 0.5 }}>
          Add Task
        </Button>
        {isFetching && !isLoading &&
          <CircularProgress thickness={6} size={35} sx={{ mb: 4, mt: 2, alignSelf: 'center' }} />}
      </Stack>
    </StyledProjectStagePanel>
  );
}

export default ProjectStagePanel;