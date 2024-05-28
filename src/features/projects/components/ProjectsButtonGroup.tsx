import { Button, Stack } from "@mui/material";

function ProjectsButtonGroup() {
  return (
    <Stack direction={'row'}>
      <Button>Archived Projects</Button>
      <Button>Active Projects</Button>
      <Button>Upcoming Projects</Button>
    </Stack>
  );
}

export default ProjectsButtonGroup;