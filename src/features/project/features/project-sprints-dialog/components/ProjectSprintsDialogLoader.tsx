import { Dialog, Divider, Skeleton, Stack } from '@mui/material'
import ProjectSprintLoader from './ProjectSprintLoader.tsx'

interface ProjectSprintsDialogLoaderProps {
  open: boolean
  onClose: () => void
}

function ProjectSprintsDialogLoader({ open, onClose }: ProjectSprintsDialogLoaderProps) {
  return (
    <Dialog fullWidth open={open} onClose={onClose} maxWidth={'lg'}>
      <Stack
        sx={{
          height: 720
        }}
      >
        <Stack
          direction={'row'}
          spacing={2}
          sx={{
            alignItems: 'center',
            px: 3,
            py: 2
          }}
        >
          <Stack
            sx={{
              flexGrow: 1
            }}
          >
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
          }}
        >
          <Stack
            sx={{
              width: 280
            }}
          >
            {Array.from(Array(7)).map((_, i) => (
              <div key={i}>
                <Skeleton variant={'rectangular'} height={100} />
                <Divider />
              </div>
            ))}
          </Stack>
          <Divider orientation={'vertical'} flexItem />
          <ProjectSprintLoader />
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default ProjectSprintsDialogLoader
