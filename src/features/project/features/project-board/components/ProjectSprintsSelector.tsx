import { Button, CircularProgress, Menu, MenuItem, useTheme } from "@mui/material";
import ProjectSprint from "../../../types/ProjectSprint.model.ts";
import { useGetProjectSprintsQuery } from "../../../state/projectApi.ts";
import useDependencyOnceEffect from "../../../../../hooks/useDependencyOnceEffect.ts";
import { useEffect, useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../state/store.ts";
import { setProjectSprintId } from "../../../../../state/project/projectSlice.ts";

interface ProjectSprintsSelectorProps {
  projectId: string
}

function ProjectSprintsSelector({ projectId }: ProjectSprintsSelectorProps) {
  const theme = useTheme()

  const sprintId = useSelector((state: RootState) => state.project.sprintId)
  const dispatch = useDispatch<AppDispatch>()

  const sprints: ProjectSprint[] | undefined = useGetProjectSprintsQuery({ projectId: projectId }).data?.sprints
  const [currentSprint, setCurrentSprint] = useState<ProjectSprint>()
  useDependencyOnceEffect(
    () => setCurrentSprint(sprints && sprints[sprints.length - 1]),
    sprints
  )

  useEffect(() => {
    dispatch(setProjectSprintId(currentSprint?.id))
  }, [currentSprint, dispatch]);

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const handleCloseMenu = () => setMenuAnchorEl(null)

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
            {sprint.name}
          </MenuItem>))}
      </Menu>
    </>
  );
}

export default ProjectSprintsSelector;