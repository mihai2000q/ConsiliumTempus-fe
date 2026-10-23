import { Box, Skeleton, Stack } from '@mui/material'

function ProjectLoader() {
  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: "start",
        height: '100%'
      }}>
      <Stack direction={'row'} spacing={1} sx={{
        alignItems: 'center'
      }}>
        <Skeleton variant={'circular'} width={35} height={35} sx={{ borderRadius: 2 }} />
        <Skeleton variant={'text'} width={200} height={40} />
        <Skeleton variant={'rectangular'} width={30} height={30} sx={{ borderRadius: 2 }} />
        <Skeleton variant={'rectangular'} width={60} height={30} sx={{ borderRadius: 2 }} />
        <Skeleton variant={'rectangular'} width={120} height={30} sx={{ borderRadius: 3 }} />
      </Stack>

      <Skeleton variant={'rectangular'} width={'75%'} height={30} sx={{ borderRadius: 2 }} />

      <Box
        sx={{
          width: '100%',
          height: '85%'
        }}>
        <Stack
          direction={'row'}
          spacing={2}
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            mt: 2
          }}>
          <Skeleton variant={'rectangular'} height={'100%'} sx={{ borderRadius: 2, flexGrow: 1.5 }} />

          <Stack
            spacing={1}
            sx={{
              flexGrow: 1,
              height: '100%'
            }}>
            <Skeleton variant={'rectangular'} height={'100%'} sx={{ borderRadius: 2, flexGrow: 1 }} />
            <Skeleton variant={'rectangular'} height={'100%'} sx={{ borderRadius: 2, flexGrow: 1 }} />
          </Stack>

          <Stack
            spacing={1}
            sx={{
              flexGrow: 1,
              height: '100%'
            }}>
            <Skeleton variant={'rectangular'} height={'100%'} sx={{ borderRadius: 2, flexGrow: 1 }} />
            <Skeleton variant={'rectangular'} height={'100%'} sx={{ borderRadius: 2, flexGrow: 1 }} />
            <Stack
              direction={'row'}
              spacing={1}
              sx={{
                flexGrow: 1,
                height: '100%'
              }}>
              <Skeleton variant={'rectangular'} height={'100%'} sx={{ borderRadius: 2, flexGrow: 1 }} />
              <Skeleton variant={'rectangular'} height={'100%'} sx={{ borderRadius: 2, flexGrow: 1 }} />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}

export default ProjectLoader
