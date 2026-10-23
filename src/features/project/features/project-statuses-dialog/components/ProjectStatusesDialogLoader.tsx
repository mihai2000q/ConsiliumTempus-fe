import { Dialog, Divider, Skeleton, Stack } from '@mui/material'

interface ProjectStatusesDialogLoaderProps {
  open: boolean,
  onClose: () => void
}

function ProjectStatusesDialogLoader({ open, onClose }: ProjectStatusesDialogLoaderProps) {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      maxWidth={'lg'}>
      <Stack sx={{
        height: 720
      }}>
        <Stack
          direction={'row'}
          spacing={2}
          sx={{
            alignItems: 'center',
            px: 3,
            py: 2
          }}>
          <Stack sx={{
            flexGrow: 1
          }}>
            <Skeleton width={250} height={40} />
          </Stack>
          <Skeleton variant={'rectangular'} width={140} height={30} />
          <Skeleton variant={'circular'} width={30} height={30} />
        </Stack>
        <Divider flexItem />
        <Stack
          direction={'row'}
          sx={{
            height: '100%',
            overflowY: 'hidden'
          }}>
          <Stack sx={{
            width: 280
          }}>
            {Array.from(Array(7)).map((_, i) => (
              <div key={i}>
                <Skeleton variant={'rectangular'} height={100} />
                <Divider />
              </div>
            ))}
          </Stack>
          <Divider orientation={'vertical'} flexItem />
          <Stack
            spacing={1}
            sx={{
              flexGrow: 1,
              py: 1,
              px: 2
            }}>
            <Skeleton width={250} height={50} />
            <Skeleton width={200} height={30} />
            <Skeleton width={200} height={30} />
            <Stack spacing={1}>
              <Skeleton variant={'text'} width={100} height={30} />
              <Skeleton variant={'rectangular'} height={300} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default ProjectStatusesDialogLoader
