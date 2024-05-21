import { ProjectTask } from "../../types/ProjectTask.response.ts";
import { alpha, Box, Button, ButtonProps, IconButton, Stack, styled, Typography, useTheme } from "@mui/material";
import { CheckCircleOutlineRounded, CheckCircleRounded, Person } from "@mui/icons-material";
import { useState } from "react";
import ProjectTaskActionsMenu from "./ProjectTaskActionsMenu.tsx";
import { useUpdateProjectTaskMutation } from "../../state/projectBoardApi.ts";

export const TaskCard = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: '16px',
  justifyContent: 'start',
  width: '100%',
  padding: '16px 16px 55px 16px',
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

  const [taskMenuAnchorEl, setTaskMenuAnchorEl] = useState<HTMLElement | null>(null)

  const [isCompleted, setIsCompleted] = useState(false)

  function handleClick() {
    console.log('Task clicked')
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
    <Box position={'relative'}>
      <TaskCard
        component={'div'}
        onClick={handleClick}
        onContextMenu={handleRightClick}
        sx={{ boxShadow: 2, '&:hover': { boxShadow: 4 } }}>
        <Stack width={'100%'}>
          <Typography>
            <IconButton
              variant={'circular'}
              size={'small'}
              onClick={(e) => {
                e.stopPropagation()
                setIsCompleted(!isCompleted)
                updateTask({ newIsCompleted: !isCompleted })
              }}
              sx={{
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
            {task.name}
          </Typography>
        </Stack>
      </TaskCard>
      <Stack direction={'row'} mt={2} position={'absolute'} bottom={0} padding={2}>
        <IconButton variant={'dashed'}>
          <Person fontSize={'inherit'} />
        </IconButton>
      </Stack>
      {task &&
        <ProjectTaskActionsMenu
          anchorEl={taskMenuAnchorEl}
          setAnchorEl={setTaskMenuAnchorEl}
          taskId={task.id} />
      }
    </Box>
  );
}

export default ProjectTaskCard;