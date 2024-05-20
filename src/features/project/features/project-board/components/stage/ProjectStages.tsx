import ProjectSprint from "../../types/ProjectSprint.model.ts";
import { useGetProjectSprintQuery } from "../../state/projectBoardApi.ts";
import ProjectStagesLoader from "./ProjectStagesLoader.tsx";
import ProjectStagePanel from "./ProjectStagePanel.tsx";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

interface ProjectStagesProps {
  sprintId: string
}

function ProjectStages({ sprintId }: ProjectStagesProps) {
  const sprint: ProjectSprint | undefined = useGetProjectSprintQuery({ id: sprintId }).data

  return (
    !sprint ?
      <ProjectStagesLoader />
      :
      <>
        {sprint?.stages.map((stage) => (
          <ProjectStagePanel key={stage.id} stage={stage} />
        ))}
        <Button
          size={'large'}
          startIcon={<Add />}
          sx={{
            width: 350,
            borderRadius: 4,
            fontSize: 16,
            alignItems: 'start',
            pt: 2 }}>
          Add Stage
        </Button>
      </>
  );
}

export default ProjectStages;