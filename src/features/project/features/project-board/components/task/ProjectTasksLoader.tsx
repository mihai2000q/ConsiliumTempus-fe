import { Skeleton, Stack } from "@mui/material";

function ProjectTasksLoader() {
  return (
    <Stack spacing={1}>
      {Array.from(Array(5)).map((_, i) => (
        <Skeleton variant={'rectangular'} key={i} height={100} width={'100%'} sx={{ borderRadius: 4 }} />
      ))}
    </Stack>
  );
}

export default ProjectTasksLoader;