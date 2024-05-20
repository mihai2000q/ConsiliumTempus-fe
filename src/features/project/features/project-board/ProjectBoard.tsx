import { useEffect, useState } from "react";
import { useGetProjectSprintsQuery } from "./state/projectBoardApi.ts";
import { ListItemText, MenuItem, Select, Stack } from "@mui/material";
import { ProjectSprint } from "./types/ProjectSprint.response.ts";
import ProjectStages from "./components/stage/ProjectStages.tsx";
import ProjectStagesLoader from "./components/stage/ProjectStagesLoader.tsx";

interface ProjectBoardProps {
  projectId: string
}

function ProjectBoard({ projectId }: ProjectBoardProps) {
  const sprints: ProjectSprint[] | undefined = useGetProjectSprintsQuery({ projectId: projectId }).data?.sprints

  const [sprintId, setSprintId] = useState<string | undefined>(undefined)
  useEffect(() => {
    setSprintId(sprints && sprints[sprints.length - 1].id)
  }, [sprints]);

  return (
    <Stack alignItems="start" height={'100%'} mt={1}>
      <Select
        variant="standard"
        value={sprintId ?? ''}
        onChange={(e) => setSprintId(e.target.value)}
        SelectDisplayProps={{
          style: { paddingLeft: 5, paddingTop: 5 }
        }}>
        {
          sprints?.map((sprint) => (
            <MenuItem key={sprint.id} value={sprint.id}>
              <ListItemText>{sprint.name}</ListItemText>
            </MenuItem>
          ))
        }
      </Select>

      <Stack direction={'row'} spacing={3} mt={4} height={'71vh'}>
        {sprintId ? <ProjectStages sprintId={sprintId} /> : <ProjectStagesLoader />}
      </Stack>
    </Stack>
  );
}

export default ProjectBoard;