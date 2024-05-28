import { ProjectTask } from "../../types/ProjectTask.response.ts";
import { alpha, Box, Button, ButtonProps, IconButton, Stack, styled, Typography, useTheme } from "@mui/material";
import { CheckCircleOutlineRounded, CheckCircleRounded, Person } from "@mui/icons-material";
import { useState } from "react";
import ProjectTaskCardActionsMenu from "./ProjectTaskCardActionsMenu.tsx";
import { useUpdateProjectTaskMutation } from "../../state/projectBoardApi.ts";
import { useDispatch } from "react-redux";
import { openDrawer } from "../../../../../../state/project-task-drawer/projectTaskDrawerSlice.ts";

export const StyledProjectTaskCard = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: '16px',
  justifyContent: 'start',
  width: '100%',
  padding: '16px 16px 60px 16px',
  background: alpha(theme.palette.primary[900], 0.5),
  color: theme.palette.background[100],
  border: 'solid 1px',
  borderColor: alpha(theme.palette.background[50], 0.25),
  '&:hover': {
    borderColor: alpha(theme.palette.background[50], 0.5),
    color: theme.palette.background[50]
  }
}))

interface ProjectTaskCardProps {
  task: ProjectTask,
}

function ProjectTaskCard({ task }: ProjectTaskCardProps) {
  const theme = useTheme()
  const dispatch = useDispatch()

  const [taskMenuAnchorEl, setTaskMenuAnchorEl] = useState<HTMLElement | null>(null)

  const [isCompleted, setIsCompleted] = useState(false)

  function handleClick() {
    dispatch(openDrawer(task.id))
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function handleRightClick(e) {
    e.preventDefault()
    setTaskMenuAnchorEl(e.currentTarget)
  }

  const [updateProjectTask] = useUpdateProjectTaskMutation()

  function updateTask({ newIsCompleted = isCompleted }) {
    updateProjectTask({
      id: task.id,
      name: task.name,
      isCompleted: newIsCompleted,
      assigneeId: null
    }).unwrap()
  }

  return (
    <Box position={'relative'} my={0.5}>
      <StyledProjectTaskCard
        component={'div'}
        onClick={handleClick}
        onContextMenu={handleRightClick}
        sx={{ boxShadow: 2, '&:hover': { boxShadow: 4 } }}>
        <Stack width={'100%'}>
          <Typography>
            <IconButton hidden={true} sx={{ height: 15 }}></IconButton>
            {task.name}
          </Typography>
        </Stack>
      </StyledProjectTaskCard>
      <IconButton
        variant={'circular'}
        size={'small'}
        onClick={() => {
          setIsCompleted(!isCompleted)
          updateTask({ newIsCompleted: !isCompleted })
        }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          mt: 1.5,
          ml: 2,
          color: isCompleted ? theme.palette.success.light : theme.palette.grey[500],
          mb: '1px',
          '&:hover': {
            color: isCompleted ? theme.palette.success.dark : theme.palette.success.light,
          }
        }}>
        {isCompleted
          ? <CheckCircleRounded fontSize={'small'} />
          : <CheckCircleOutlineRounded fontSize={'small'} />}
      </IconButton>
      <Stack direction={'row'} position={'absolute'} bottom={0} padding={2}>
        <IconButton variant={'dashed'}>
          <Person fontSize={'inherit'} />
        </IconButton>
      </Stack>
      {task &&
        <ProjectTaskCardActionsMenu
          anchorEl={taskMenuAnchorEl}
          setAnchorEl={setTaskMenuAnchorEl}
          taskId={task.id} />
      }
    </Box>
  );
}

export default ProjectTaskCard;