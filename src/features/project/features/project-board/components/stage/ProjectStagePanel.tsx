import {
  alpha,
  Button,
  CircularProgress,
  IconButton,
  Stack, StackProps, styled, Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import ProjectStage from "../../types/ProjectStage.model.ts";
import { useGetProjectTasksQuery, useUpdateStageFromProjectSprintMutation } from "../../state/projectBoardApi.ts";
import ProjectTaskCard from "../task/ProjectTaskCard.tsx";
import { Add, AddRounded, MoreHorizRounded, SearchRounded } from "@mui/icons-material";
import { Dispatch, SetStateAction, useState } from "react";
import ProjectStageActionsMenu from "./ProjectStageActionsMenu.tsx";
import ProjectTasksLoader from "../task/ProjectTasksLoader.tsx";
import AddProjectTaskCard from "../task/AddProjectTaskCard.tsx";
import OutlinedContentEditable from "../../../../../../components/text/OutlinedContentEditable.tsx";
import useTimeoutCallback from "../../../../../../hooks/useTimeoutCallback.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../state/store.ts";

export const StyledProjectStagePanel = styled(Stack)<StackProps>(({ theme }) => ({
  height: '100%',
  width: 335,
  borderRadius: '16px',
  padding: '12px 12px 0px 12px',
  transition: theme.transitions.create(['box-shadow'], {
    duration: theme.transitions.duration.complex,
  }),
  background: theme.palette.mode === 'dark'
    ? alpha(theme.palette.primary[800], 0.25)
    : alpha(theme.palette.background[800], 0.25)
}))

interface ProjectStagePanelProps {
  stage: ProjectStage,
  showAddTaskCard?: boolean | undefined,
  setShowAddTaskCard?: Dispatch<SetStateAction<boolean>> | undefined
}

function ProjectStagePanel({ stage, showAddTaskCard, setShowAddTaskCard }: ProjectStagePanelProps) {
  const theme = useTheme()

  const sprintId = useSelector((state: RootState) => state.project.sprintId)
  const [stageName, setStageName] = useState(stage.name)
  const [updateStageFromProjectSprint] = useUpdateStageFromProjectSprintMutation()
  useTimeoutCallback(
    () => updateStageFromProjectSprint({
      id: sprintId!,
      stageId: stage.id,
      name: stageName
    }), [stageName])

  const getProjectTasksQuery = useGetProjectTasksQuery({ projectStageId: stage.id }).data
  const tasks = getProjectTasksQuery?.tasks
  const totalTasksCount = getProjectTasksQuery?.totalCount

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  const [showTopAddTaskCard, setShowTopAddTaskCard] = useState(false)
  const [showBottomAddTaskCard, setShowBottomAddTaskCard] = useState(false)

  return (
    <StyledProjectStagePanel boxShadow={4} sx={{ '&:hover': { boxShadow: 8 } }}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'}>
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
                title={`There are ${totalTasksCount} task${totalTasksCount === 1 ? '' : 's'} in this stage`}>
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

      <Stack px={0.75} pt={1} sx={{ overflow: 'auto', maxHeight: '100%' }}>
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
            : tasks.map((task) => (<ProjectTaskCard key={task.id} task={task} />))
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
      </Stack>
    </StyledProjectStagePanel>
  );
}

export default ProjectStagePanel;