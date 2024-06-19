import { Button, CircularProgress, Menu, MenuItem, Stack, Typography, useTheme } from "@mui/material";
import ProjectSprint from "../types/ProjectSprint.model.ts";
import { useGetProjectSprintsQuery } from "../state/projectApi.ts";
import { useEffect, useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store.ts";
import { openProjectSprintsDialog, setProjectSprintId } from "../../../state/project/projectSlice.ts";
import useAdapterState from "../../../hooks/useAdapterState.ts";
import ProjectSprintAdapter from "../adapters/ProjectSprint.adapter.ts";

interface ProjectSprintsSelectorProps {
  projectId: string
}

function ProjectSprintsSelector({ projectId }: ProjectSprintsSelectorProps) {
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()

  const sprintId = useSelector((state: RootState) => state.project.sprintId)

  const { data } = useGetProjectSprintsQuery({
    projectId: projectId,
    fromThisYear: true
  })
  const sprints = useAdapterState(data?.sprints, ProjectSprintAdapter.adapt)
  const [currentSprint, setCurrentSprint] = useState<ProjectSprint>()
  useEffect(() => {
    if (sprints) setCurrentSprint(sprints[0])
  }, [sprints])

  useEffect(() => {
    dispatch(setProjectSprintId(currentSprint?.id))
  }, [currentSprint]) // TODO: Reference equality

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const handleCloseMenu = () => setMenuAnchorEl(null)

  function handleViewAllClick() {
    dispatch(openProjectSprintsDialog({
      open: true
    }))
    handleCloseMenu()
  }

  return (
    <>
      <Button
        disabled={currentSprint === undefined}
        endIcon={<ArrowDropDown />}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
        sx={{
          color: theme.palette.primary[100],
          fontWeight: 600,
          borderRadius: 2,
          '& .MuiButton-endIcon': {
            marginLeft: 0.5
          }
        }}>
        {currentSprint?.name ?? <CircularProgress size={20} thickness={8} sx={{ marginX: 1 }} />}
      </Button>
      <Menu open={Boolean(menuAnchorEl)} anchorEl={menuAnchorEl} onClose={handleCloseMenu}>
        {sprints?.map((sprint) => (
          <MenuItem
            key={sprint.id}
            selected={sprintId === sprint.id}
            onClick={() => {
              setCurrentSprint(sprint)
              handleCloseMenu()
            }}>
            <Stack direction={'row'} spacing={1}>
              <Typography>{sprint.name}</Typography>
              {(sprint.startDate || sprint.endDate) &&
                <Stack direction={'row'} spacing={'4px'}>
                  <Typography color={'text.secondary'}>{sprint.startDate?.format('DD MMM') ?? '?'}</Typography>
                  <Typography color={'text.secondary'}>-</Typography>
                  <Typography color={'text.secondary'}>{sprint.endDate?.format('DD MMM') ?? '?'}</Typography>
                </Stack>
              }
            </Stack>
          </MenuItem>))}
        <Button fullWidth color={'inherit'} size={'small'} onClick={handleViewAllClick} sx={{ borderRadius: 0 }}>
          View All
        </Button>
      </Menu>
    </>
  );
}

export default ProjectSprintsSelector;