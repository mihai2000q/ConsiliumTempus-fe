import { Skeleton } from "@mui/material";

function ProjectStagesLoader() {
  return (
    <>
      {Array.from(Array(4)).map((_, i) => (
        <Skeleton key={i} variant={'rectangular'} height={'100%'} width={350} sx={{ borderRadius: 4 }} />
      ))}
    </>
  );
}

export default ProjectStagesLoader;