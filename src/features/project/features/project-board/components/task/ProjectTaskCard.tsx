import { ProjectTask } from "../../types/ProjectTask.response.ts";
import { alpha, Box, Button, ButtonProps, IconButton, InputBase, Stack, styled, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useState } from "react";
import ProjectTaskActionsMenu from "./ProjectTaskActionsMenu.tsx";
import { useAddProjectTaskMutation } from "../../state/projectBoardApi.ts";

export const TaskCard = styled(Button)<ButtonProps>(({ theme }) => ({
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
  task?: ProjectTask | undefined,
  addNewTaskProps?: {
    closeCard: (() => void),
    projectStageId: string,
    onTop: boolean
  }
}

function ProjectTaskCard({
  task,
  addNewTaskProps
}: ProjectTaskCardProps) {
  function handleClick() {
    console.log('Task clicked')
  }

  const [taskMenuAnchorEl, setTaskMenuAnchorEl] = useState<HTMLElement | null>(null)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function handleRightClick(e) {
    e.preventDefault()
    setTaskMenuAnchorEl(e.currentTarget)
  }

  const [newName, setNewName] = useState(task?.name ?? '')

  const [addProjectTask] = useAddProjectTaskMutation()
  function addNewTask() {
    if (newName !== '') {
      addProjectTask({
        projectStageId: addNewTaskProps!.projectStageId,
        name: newName,
        onTop: addNewTaskProps!.onTop
      }).unwrap()
    }
    addNewTaskProps!.closeCard()
  }

  return (
    <Box position={'relative'}>
      <TaskCard
        component={'div'}
        onClick={handleClick}
        onContextMenu={handleRightClick}
        onBlur={addNewTaskProps && addNewTask}
        onKeyUp={(e) => addNewTaskProps && (e.key === 'Enter') && addNewTask()}
        sx={{ boxShadow: 2, '&:hover': { boxShadow: 4 } }}>
        <Stack width={'100%'}>
          {
            addNewTaskProps
              ? (
                <InputBase
                  fullWidth
                  placeholder={'Enter new task name'}
                  autoFocus={true}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)} />
              )
              : <Typography>{task!.name}</Typography>
          }
        </Stack>
      </TaskCard>
      <Stack direction={'row'} mt={2} position={'absolute'} bottom={0} padding={2}>
        <IconButton variant={'dashed'}>
          <Person fontSize={'inherit'} />
        </IconButton>
      </Stack>
      <ProjectTaskActionsMenu
        anchorEl={taskMenuAnchorEl}
        setAnchorEl={setTaskMenuAnchorEl} />
    </Box>
  );
}

export default ProjectTaskCard;