import { Stack, Typography } from '@mui/material'

function Unauthorized() {
  return (
    <Stack>
      <Typography variant={'h1'} fontSize={150} fontWeight={600}>403</Typography>
      <Typography>You are not authorized to access this page.</Typography>
    </Stack>
  )
}

export default Unauthorized
