import {
  alpha,
  Button,
  CircularProgress,
  IconButton,
  Stack, StackProps, styled,
  Typography,
  useTheme
} from "@mui/material";
import ProjectStage from "../../types/ProjectStage.model.ts";
import { useGetProjectTasksQuery } from "../../state/projectBoardApi.ts";
import ProjectTaskCard from "../task/ProjectTaskCard.tsx";
import { Add, AddRounded, MoreHorizRounded, SearchRounded } from "@mui/icons-material";
import { Dispatch, SetStateAction, useState } from "react";
import ProjectStageActionsMenu from "./ProjectStageActionsMenu.tsx";
import ProjectTasksLoader from "../task/ProjectTasksLoader.tsx";
import AddProjectTaskCard from "../task/AddProjectTaskCard.tsx";

export const StagePanel = styled(Stack)<StackProps>(({ theme }) => ({
  height: '100%',
  width: 335,
  borderRadius: '16px',
  padding: '12px',
  background: alpha(theme.palette.primary[800], 0.25)
}))

interface ProjectStagePanelProps {
  stage: ProjectStage,
  showAddTaskCard?: boolean | undefined,
  setShowAddTaskCard?: Dispatch<SetStateAction<boolean>> | undefined
}

function ProjectStagePanel({ stage, showAddTaskCard, setShowAddTaskCard }: ProjectStagePanelProps) {
  const theme = useTheme()

  const getProjectTasksQuery = useGetProjectTasksQuery({ projectStageId: stage.id }).data
  const tasks = getProjectTasksQuery?.tasks
  const totalTasksCount = getProjectTasksQuery?.totalCount

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  const [showTopAddTaskCard, setShowTopAddTaskCard] = useState(false)
  const [showBottomAddTaskCard, setShowBottomAddTaskCard] = useState(false)

  return (
    <StagePanel boxShadow={4}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant={'h6'} color={theme.palette.background[200]} mr={1} noWrap maxWidth={150}>
            {stage.name}
          </Typography>
          {totalTasksCount === undefined
            ? <CircularProgress size={16} />
            : <Typography fontWeight={300}>{totalTasksCount}</Typography>}
        </Stack>
        <Stack direction={'row'}>
          <IconButton>
            <SearchRounded />
          </IconButton>
          <IconButton onClick={() => setShowTopAddTaskCard(true)}>
            <AddRounded />
          </IconButton>
          <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
            <MoreHorizRounded />
          </IconButton>
          <ProjectStageActionsMenu
            anchorEl={menuAnchorEl}
            setAnchorEl={setMenuAnchorEl}
            stageId={stage.id} />
        </Stack>
      </Stack>
      <Stack spacing={1} px={0.75} py={1} sx={{ overflow: 'auto', maxHeight: '100%' }}>
        {
          showTopAddTaskCard &&
            <AddProjectTaskCard
              closeCard={() => setShowTopAddTaskCard(false)}
              projectStageId={stage.id}
              onTop={true} />
        }
        {
          showAddTaskCard && setShowAddTaskCard &&
            <AddProjectTaskCard
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
                closeCard={() => setShowBottomAddTaskCard(false)}
                projectStageId={stage.id}
                onTop={false} />
        }
        <Button startIcon={<Add />} onClick={() => setShowBottomAddTaskCard(!showBottomAddTaskCard)}>
          Add Task
        </Button>
      </Stack>
    </StagePanel>
  );
}

export default ProjectStagePanel;