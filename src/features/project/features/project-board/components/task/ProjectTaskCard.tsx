import { Box, IconButton, IconButtonProps, Stack, styled, Typography } from "@mui/material";
import { CheckCircleOutlineRounded, CheckCircleRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ProjectTaskCardActionsMenu from "./ProjectTaskCardActionsMenu.tsx";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "../../../../../../state/project-task-drawer/projectTaskDrawerSlice.ts";
import { useUpdateProjectTaskMutation } from "../../state/projectBoardApi.ts";
import { RootState } from "../../../../../../state/store.ts";
import AssigneeIconButton from "./AssigneeIconButton.tsx";
import ProjectTask from "../../types/ProjectTask.model.ts";
import StyledProjectTaskCard from "../../../../../../components/project-task/StyledProjectTaskCard.tsx";

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

  function updateTask({
    newIsCompleted = isCompleted,
    assigneeId = task.assignee?.id ?? null
  }) {
    updateProjectTask({
      id: task.id,
      name: task.name,
      isCompleted: newIsCompleted,
      assigneeId: assigneeId
    }).unwrap()
  }

  return (
    <Box position={'relative'} my={0.5}>
      <StyledProjectTaskCard
        component={'div'}
        isDrawerOpen={drawerTaskId === task.id}
        isCompleted={isCompleted}
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

      <Stack direction={'row'} position={'absolute'} bottom={0} margin={2}>
        <AssigneeIconButton
          isCompleted={isCompleted}
          assignee={task.assignee}
          setAssigneeId={(newAssigneeId) => updateTask({ assigneeId: newAssigneeId })} />
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