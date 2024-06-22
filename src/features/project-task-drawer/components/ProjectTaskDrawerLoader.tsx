import { Divider, Drawer, Skeleton, Stack } from "@mui/material";

interface ProjectTaskDrawerLoaderProps {
  open: boolean,
  onClose: () => void,
  width: number
}

function ProjectTaskDrawerLoader({ open, onClose, width }: ProjectTaskDrawerLoaderProps) {
  return (
    <Drawer
      anchor={'right'}
      open={open}
      onClose={onClose}
      sx={{
        width: width,
        '& .MuiDrawer-paper': { width: width, },
      }}>
      <Stack mt={1}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mx={2} mb={0.5}>
          <Skeleton variant={'rectangular'} width={150} height={30} sx={{ borderRadius: 1 }} />

          <Stack direction={'row'} spacing={1}>
            {Array.from(Array(4)).map((_, i) => (
              <Skeleton key={i} variant={'circular'} width={25} height={25} sx={{ borderRadius: 1.5 }} />
            ))}
          </Stack>
        </Stack>
        <Divider sx={{ mb: 1 }} />

        <Stack mx={2} spacing={2}>
          <Skeleton variant={'rectangular'} width={'100%'} height={50} sx={{ borderRadius: 1 }} />
          <Skeleton variant={'rectangular'} width={'100%'} height={300} sx={{ borderRadius: 1 }} />
        </Stack>
      </Stack>
    </Drawer>
  );
}

export default ProjectTaskDrawerLoader;