import { alpha, Button, ButtonProps, styled } from "@mui/material";

interface StyledProjectTaskCardProps extends ButtonProps {
  isCompleted?: boolean,
  isDrawerOpen?: boolean
}

const StyledProjectTaskCard = styled(Button, {
  shouldForwardProp: (props) => props !== 'isCompleted' && props !== 'isDrawerOpen',
})<StyledProjectTaskCardProps>(({ theme, isCompleted, isDrawerOpen }) => ({
  borderRadius: '16px',
  justifyContent: 'start',
  width: '100%',
  padding: '16px 16px 60px 16px',
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.primary[900], 0.5)
    : alpha(theme.palette.background[900], 0.5),
  color: theme.palette.text.primary,
  border: 'solid 1px',
  borderColor: alpha(theme.palette.background[50], 0.25),
  '&:hover': {
    borderColor: alpha(theme.palette.background[50], 0.5),
    color: theme.palette.background[50]
  },
  ...(isCompleted === true && {
    backgroundColor: alpha(theme.palette.grey[100], 0.05),
    color: alpha(theme.palette.text.triadic, 0.5),
    borderColor: alpha(theme.palette.grey[100], 0.1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.grey[100], 0.1),
      borderColor: alpha(theme.palette.grey[100], 0.2),
      color: alpha(theme.palette.text.triadic, 0.7)
    },
  }),
  ...(isDrawerOpen === true && {
    backgroundColor: alpha(theme.palette.background[900], 0.5),
    borderColor: alpha(theme.palette.background[100], 0.8)
  })
}))

export default StyledProjectTaskCard