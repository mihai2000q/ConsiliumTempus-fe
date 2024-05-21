import { Button, Menu, MenuItem, useTheme } from "@mui/material";
import ProjectSprint from "../../../types/ProjectSprint.model.ts";
import { useGetProjectSprintsQuery } from "../../../state/projectApi.ts";
import useDependencyOnceEffect from "../../../../../hooks/useDependencyOnceEffect.ts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";

interface ProjectSprintsSelectorProps {
  projectId: string,
  sprintId: string | undefined,
  setSprintId: Dispatch<SetStateAction<string | undefined>>
}

function ProjectSprintsSelector({ projectId, sprintId, setSprintId }: ProjectSprintsSelectorProps) {
  const theme = useTheme()

  const sprints: ProjectSprint[] | undefined = useGetProjectSprintsQuery({ projectId: projectId }).data?.sprints
  const [currentSprint, setCurrentSprint] = useState<ProjectSprint>()
  useDependencyOnceEffect(
    () => setCurrentSprint(sprints && sprints[sprints.length - 1]),
    sprints
  )

  useEffect(() => {
    setSprintId(currentSprint?.id)
  }, [currentSprint, setSprintId]);

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const handleCloseMenu = () => setMenuAnchorEl(null)

  return (
    <>
      <Button
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
        {currentSprint?.name ?? ''}
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