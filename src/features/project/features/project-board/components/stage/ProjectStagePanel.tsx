import {
  alpha,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import ProjectStage from "../../types/ProjectStage.model.ts";
import { useGetProjectTasksQuery } from "../../state/projectBoardApi.ts";
import ProjectTaskCard from "../task/ProjectTaskCard.tsx";
import { Add, AddRounded, MoreHorizRounded, SearchRounded } from "@mui/icons-material";
import { useState } from "react";
import ProjectStageActionsMenu from "./ProjectStageActionsMenu.tsx";
import ProjectTasksLoader from "../task/ProjectTasksLoader.tsx";

interface ProjectStagePanelProps {
  stage: ProjectStage
}

function ProjectStagePanel({ stage }: ProjectStagePanelProps) {
  const theme = useTheme()

  const getProjectTasksQuery = useGetProjectTasksQuery({ projectStageId: stage.id }).data
  const tasks = getProjectTasksQuery?.tasks
  const totalTasksCount = getProjectTasksQuery?.totalCount

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  const [showAddTaskCard, setShowAddTaskCard] = useState(false)

  return (
    <Stack
      height={'100%'}
      width={335}
      borderRadius={4}
      p={1.5}
      bgcolor={alpha(theme.palette.primary[800], 0.25)}
      boxShadow={4}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant={'h6'} color={theme.palette.background[200]} mr={1}>
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
          <IconButton>
            <AddRounded />
          </IconButton>
          <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
            <MoreHorizRounded />
          </IconButton>
          <ProjectStageActionsMenu anchorEl={menuAnchorEl} setAnchorEl={setMenuAnchorEl} />
        </Stack>
      </Stack>
      <Stack spacing={1} px={0.75} py={1} sx={{ overflow: 'auto', maxHeight: '100%' }}>
        {
          !tasks
            ? <ProjectTasksLoader />
            : tasks.map((task) => (<ProjectTaskCard key={task.id} task={task} />))
        }
        {showAddTaskCard &&
          <ProjectTaskCard
            addNewTaskProps={{
              closeCard: () => setShowAddTaskCard(false),
              projectStageId: stage.id,
              onTop: false
            }} />}
        <Button startIcon={<Add />} onClick={() => setShowAddTaskCard(!showAddTaskCard)}>
          Add Task
        </Button>
      </Stack>
    </Stack>
  );
}

export default ProjectStagePanel;