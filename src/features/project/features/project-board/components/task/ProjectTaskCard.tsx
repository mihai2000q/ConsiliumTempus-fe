import { ProjectTask } from "../../types/ProjectTask.response.ts";
import { alpha, Button, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useState } from "react";
import ProjectTaskActionsMenu from "./ProjectTaskActionsMenu.tsx";

interface ProjectTaskCardProps {
  task: ProjectTask
}

function ProjectTaskCard({ task }: ProjectTaskCardProps) {
  const theme = useTheme()

  const [taskMenuAnchorEl, setTaskMenuAnchorEl] = useState<HTMLElement | null>(null)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function handleRightClick(e) {
    e.preventDefault()
    setTaskMenuAnchorEl(e.currentTarget)
  }

  return (
    <Button
      component={'div'}
      onContextMenu={handleRightClick}
      sx={{
        borderRadius: 4,
        boxShadow: 2,
        width: '100%',
        textTransform: 'none',
        justifyContent: 'start',
        padding: 2,
        bgcolor: alpha(theme.palette.primary[900], 0.5),
        color: theme.palette.background[100],
        border: 1,
        borderColor: alpha(theme.palette.background[50], 0.25),
        '&:hover': {
          borderColor: alpha(theme.palette.background[50], 0.5),
          boxShadow: 4,
          color: theme.palette.background[50]
        }
      }}>
      <Stack>
        <Typography>{task.name}</Typography>
        <Stack direction={'row'} mt={2}>
          <IconButton variant={'dashed'}>
            <Person fontSize={'inherit'} />
          </IconButton>
        </Stack>
      </Stack>
      <ProjectTaskActionsMenu anchorEl={taskMenuAnchorEl} setAnchorEl={setTaskMenuAnchorEl} />
    </Button>
  );
}

export default ProjectTaskCard;