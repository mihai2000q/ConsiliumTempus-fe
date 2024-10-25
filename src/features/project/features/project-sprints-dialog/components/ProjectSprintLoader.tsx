import { Skeleton, Stack } from '@mui/material'

function ProjectSprintLoader() {
  return (
    <Stack flexGrow={1} py={1} px={2} spacing={1}>
      <Skeleton width={250} height={50} />
      <Skeleton width={200} height={30} />
      <Skeleton width={200} height={30} />
      <Stack spacing={1}>
        <Skeleton variant={'text'} width={100} height={30} />
        <Skeleton variant={'rectangular'} height={300} />
      </Stack>
    </Stack>
  )
}

export default ProjectSprintLoader
