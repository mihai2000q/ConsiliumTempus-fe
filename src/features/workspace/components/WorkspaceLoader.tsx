import { Box, Skeleton, Stack } from "@mui/material";

function WorkspaceLoader() {
  return (
    <Stack alignItems="start" height={'100%'} spacing={2}>
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <Skeleton variant={'circular'} width={35} height={35} sx={{ borderRadius: 2 }} />
        <Skeleton variant={'text'} width={200} height={40} />
        <Skeleton variant={'rectangular'} width={30} height={30} sx={{ borderRadius: 2 }} />
      </Stack>

      <Skeleton variant={'rectangular'} width={'60%'} height={30} sx={{ borderRadius: 2 }} />

      <Box width={'100%'} height={'85%'}>
        <Stack display={'flex'} direction={'row'} width={'100%'} height={'100%'} spacing={2} mt={2}>
          <Skeleton variant={'rectangular'} height={'100%'} sx={{ borderRadius: 2, flexGrow: 1.5 }} />

          <Stack flexGrow={1} height={'100%'} spacing={1}>
            <Skeleton variant={'rectangular'} height={'100%'} sx={{ borderRadius: 2, flexGrow: 1 }} />
            <Skeleton variant={'rectangular'} height={'100%'}  sx={{ borderRadius: 2, flexGrow: 1 }} />
          </Stack>

          <Stack flexGrow={1} height={'100%'} spacing={1}>
            <Skeleton variant={'rectangular'} height={'100%'} sx={{ borderRadius: 2, flexGrow: 1 }} />
            <Skeleton variant={'rectangular'} height={'100%'}  sx={{ borderRadius: 2, flexGrow: 1 }} />
            <Stack direction={'row'} flexGrow={1} height={'100%'} spacing={1}>
              <Skeleton variant={'rectangular'} height={'100%'}  sx={{ borderRadius: 2, flexGrow: 1 }} />
              <Skeleton variant={'rectangular'} height={'100%'}  sx={{ borderRadius: 2, flexGrow: 1 }} />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

export default WorkspaceLoader;