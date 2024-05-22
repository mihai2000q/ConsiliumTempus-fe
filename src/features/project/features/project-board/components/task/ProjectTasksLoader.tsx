import { Skeleton } from "@mui/material";

function ProjectTasksLoader() {
  return (
    <>
      {Array.from(Array(5)).map((_, i) => (
        <Skeleton variant={'rectangular'} key={i} height={100} width={'100%'} sx={{ borderRadius: 4 }} />
      ))}
    </>
  );
}

export default ProjectTasksLoader;