import { alpha, Box, BoxProps, lighten, styled } from '@mui/material'

const EmptyStyledProjectTaskCard = styled(Box)<BoxProps>(({ theme }) => ({
  borderRadius: '16px',
  width: '100%',
  padding: '16px 16px 52px 16px',
  margin: '5px 0 6px 0',
  backgroundColor: alpha(lighten(theme.palette.primary[100], 0.1), 0.1)
}))

export default EmptyStyledProjectTaskCard
