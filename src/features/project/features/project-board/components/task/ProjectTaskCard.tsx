import { Box, IconButton, Stack } from "@mui/material";
import { CheckCircleOutlineRounded, CheckCircleRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ProjectTaskCardActionsMenu from "./ProjectTaskCardActionsMenu.tsx";
import { useUpdateProjectTaskMutation } from "../../state/projectBoardApi.ts";
import AssigneeIconButton from "./AssigneeIconButton.tsx";
import ProjectTask from "../../types/ProjectTask.model.ts";
import StyledProjectTaskCard from "./StyledProjectTaskCard.tsx";
import ProjectTaskDrawer from "../../../../../project-task-drawer/ProjectTaskDrawer.tsx";
import StyledCompleteButton from "./StyledCompleteButton.tsx";
import { useAppSelector } from "../../../../../../state/store.ts";
import EmptyStyledProjectTaskCard from "./EmptyStyledProjectTaskCard.tsx";
import Paragraph from "../../../../../../components/text/Paragraph.tsx";

interface ProjectTaskCardProps {
  task: ProjectTask,
  stageId: string
}

function ProjectTaskCard({ task, stageId }: ProjectTaskCardProps) {
  const draggedProjectTask = useAppSelector(state => state.projectBoard.draggedProjectTask)

  const [selected, setSelected] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [taskMenuAnchorEl, setTaskMenuAnchorEl] = useState<HTMLElement | null>(null)

  const [isCompleted, setIsCompleted] = useState(false)
  useEffect(() => {
    setIsCompleted(task.isCompleted)
  }, [task])

  function handleClick() {
    setIsDrawerOpen(true)
    setSelected(true)
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

  if (task.id === draggedProjectTask?.id) {
    return (
      <EmptyStyledProjectTaskCard>
        <Stack width={'100%'} sx={{ visibility: 'hidden' }}>
          <Paragraph paragraph={false} lines={5}>
            <IconButton hidden={true} sx={{ height: 15 }} />
            {task.name}
          </Paragraph>
        </Stack>
      </EmptyStyledProjectTaskCard>
    )
  }

  return (
    <Box position={'relative'} my={1}>
      <StyledProjectTaskCard
        component={'div'}
        isSelected={selected}
        isCompleted={isCompleted}
        onClick={handleClick}
        onContextMenu={handleRightClick}>
        <Stack width={'100%'}>
          <Paragraph paragraph={false} lines={5}>
            <IconButton hidden={true} sx={{ height: 15 }} />
            {task.name}
          </Paragraph>
        </Stack>
      </StyledProjectTaskCard>

      <StyledCompleteButton
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
      </StyledCompleteButton>

      <Stack direction={'row'} position={'absolute'} bottom={0} margin={'14px 16px'}>
        <AssigneeIconButton
          isCompleted={isCompleted}
          assignee={task.assignee}
          setAssigneeId={(newAssigneeId) => updateTask({ assigneeId: newAssigneeId })} />
      </Stack>

      {task &&
        <>
          <ProjectTaskCardActionsMenu
            anchorEl={taskMenuAnchorEl}
            onClose={() => setTaskMenuAnchorEl(null)}
            task={task}
            stageId={stageId} />

          <ProjectTaskDrawer
            isDrawerOpen={isDrawerOpen}
            onClose={() => {
              setIsDrawerOpen(false)
              setSelected(false)
            }}
            taskId={task.id} />
        </>}
    </Box>
  );
}

export default ProjectTaskCard;