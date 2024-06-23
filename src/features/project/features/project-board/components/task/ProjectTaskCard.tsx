import { alpha, Box, Button, ButtonProps, IconButton, IconButtonProps, Stack, styled, Typography } from "@mui/material";
import { CheckCircleOutlineRounded, CheckCircleRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ProjectTaskCardActionsMenu from "./ProjectTaskCardActionsMenu.tsx";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "../../../../../../state/project-task-drawer/projectTaskDrawerSlice.ts";
import { useUpdateProjectTaskMutation } from "../../state/projectBoardApi.ts";
import { RootState } from "../../../../../../state/store.ts";
import ProjectTask from "../../types/ProjectTask.model.ts";

interface StyledProjectTaskCardProps extends ButtonProps {
  isCompleted?: boolean,
  isDrawerOpen?: boolean
}

export const StyledProjectTaskCard = styled(Button, {
  shouldForwardProp: (props) => props !== 'isCompleted' && props !== 'isDrawerOpen',
})<StyledProjectTaskCardProps>(({ theme, isCompleted, isDrawerOpen }) => ({
  borderRadius: '16px',
  justifyContent: 'start',
  width: '100%',
  padding: '16px 16px 60px 16px',
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.primary[900], 0.5)
    : alpha(theme.palette.background[900], 0.5),
  color: theme.palette.text.primary,
  border: 'solid 1px',
  borderColor: alpha(theme.palette.background[50], 0.25),
  '&:hover': {
    borderColor: alpha(theme.palette.background[50], 0.5),
    color: theme.palette.background[50]
  },
  ...(isCompleted === true && {
    backgroundColor: alpha(theme.palette.grey[100], 0.05),
    color: alpha(theme.palette.text.triadic, 0.5),
    borderColor: alpha(theme.palette.grey[100], 0.1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.grey[100], 0.1),
      borderColor: alpha(theme.palette.grey[100], 0.2),
      color: alpha(theme.palette.text.triadic, 0.7)
    },
  }),
  ...(isDrawerOpen === true && {
    backgroundColor: alpha(theme.palette.background[900], 0.5),
    borderColor: alpha(theme.palette.background[100], 0.8)
  })
}))

interface CompletedButtonProps extends IconButtonProps {
  isCompleted: boolean
}

const CompletedButton = styled(IconButton, {
  shouldForwardProp: (props) => props !== 'isCompleted'
})<CompletedButtonProps>(({ theme, isCompleted }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  margin: '12px 16px 1px 16px',
  transition: theme.transitions.create(['color', 'background-color'], {
    duration: theme.transitions.duration.short,
  }),
  color: isCompleted ? theme.palette.success.light : theme.palette.grey[500],
  '&:hover': {
    color: isCompleted ? theme.palette.success.dark : theme.palette.success.light,
  }
}))

interface ProjectTaskCardProps {
  task: ProjectTask,
}

function ProjectTaskCard({ task }: ProjectTaskCardProps) {
  const theme = useTheme()
  const dispatch = useDispatch()

  const drawerTaskId = useSelector((state: RootState) => state.projectTaskDrawer.taskId)

  const [taskMenuAnchorEl, setTaskMenuAnchorEl] = useState<HTMLElement | null>(null)

  const [isCompleted, setIsCompleted] = useState(false)
  useEffect(() => {
    setIsCompleted(task.isCompleted)
  }, [task])

  function handleClick() {
    dispatch(openDrawer(task.id))
  }

  function handleRightClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    setTaskMenuAnchorEl(e.currentTarget)
  }

  const [updateProjectTask] = useUpdateProjectTaskMutation()

  function updateTask({ newIsCompleted = isCompleted }) {
    updateProjectTask({
      id: task.id,
      name: task.name,
      isCompleted: newIsCompleted,
      assigneeId: task.assignee?.id ?? null
    }).unwrap()
  }

  return (
    <Box position={'relative'} my={0.5}>
      <StyledProjectTaskCard
        isDrawerOpen={drawerTaskId === task.id}
        isCompleted={isCompleted}
        component={'div'}
        onClick={handleClick}
        onContextMenu={handleRightClick}
        sx={{ boxShadow: 2, '&:hover': { boxShadow: 4 } }}>
        <Stack width={'100%'}>
          <Typography>
            <IconButton hidden={true} sx={{ height: 15 }} />
            {task.name}
          </Typography>
        </Stack>
      </StyledProjectTaskCard>

      <CompletedButton
        isCompleted={isCompleted}
        variant={'circular'}
        size={'small'}
        onClick={() => {
          setIsCompleted(!isCompleted)
          updateTask({ newIsCompleted: !isCompleted })
        }}>
        {isCompleted
          ? <CheckCircleRounded fontSize={'small'} />
          : <CheckCircleOutlineRounded fontSize={'small'} />}
      </CompletedButton>

      </Stack>

      {task &&
        <ProjectTaskCardActionsMenu
          anchorEl={taskMenuAnchorEl}
          onClose={() => setTaskMenuAnchorEl(null)}
          task={task} />}
    </Box>
  );
}

export default ProjectTaskCard;