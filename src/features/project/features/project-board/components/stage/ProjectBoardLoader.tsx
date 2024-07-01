import { Skeleton, Stack } from "@mui/material";

function ProjectBoardLoader() {
  return (
    <Stack mt={1}>
      <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
        <Skeleton variant={'rectangular'} width={100} height={30} sx={{ borderRadius: 1.5 }} />
        <Skeleton variant={'rectangular'} width={50} height={27} sx={{ borderRadius: 1.5 }} />
        <Skeleton variant={'rectangular'} width={50} height={27} sx={{ borderRadius: 1.5 }} />
        <Skeleton variant={'rectangular'} width={50} height={27} sx={{ borderRadius: 1.5 }} />
        <Skeleton variant={'rectangular'} width={50} height={27} sx={{ borderRadius: 1.5 }} />
      </Stack>
      <Stack direction={'row'} spacing={2.25} mt={2} height={800}>
        {Array.from(Array(4)).map((_, i) => (
          <Skeleton key={i} variant={'rectangular'} height={'100%'} width={335} sx={{ borderRadius: 4 }} />
        ))}
      </Stack>
    </Stack>
  );
}

export default ProjectBoardLoader;