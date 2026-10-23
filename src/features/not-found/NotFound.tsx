import { Stack, Typography } from '@mui/material'

function NotFound() {
  return (
    <Stack>
      <Typography
        variant={'h1'}
        sx={{
          fontSize: 150,
          fontWeight: 600
        }}>404</Typography>
      <Typography><b>Whoops!</b> It seems what you&apos;re looking for does not exist.</Typography>
    </Stack>
  )
}

export default NotFound
