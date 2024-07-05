import { alpha, Button, ButtonProps, styled } from "@mui/material";

interface StyledProjectTaskCardProps extends ButtonProps {
  isCompleted?: boolean,
  isSelected?: boolean
}

const StyledProjectTaskCard = styled(Button, {
  shouldForwardProp: (props) => props !== 'isCompleted' && props !== 'isSelected',
})<StyledProjectTaskCardProps>(({ theme, isCompleted, isSelected }) => ({
  borderRadius: '16px',
  justifyContent: 'start',
  width: '100%',
  padding: '16px 16px 53px 16px',
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.primary[900], 0.5)
    : alpha(theme.palette.background[900], 0.5),
  color: theme.palette.text.primary,
  border: 'solid 1px',
  borderColor: alpha(theme.palette.background[50], 0.25),
  boxShadow: theme.shadows[2],
  '&:hover': {
    borderColor: alpha(theme.palette.background[50], 0.5),
    color: theme.palette.background[50],
    boxShadow: theme.shadows[4],
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
  ...(isSelected === true && {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.background[900], 0.5)
      : theme.palette.secondary[900],
    borderColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.background[100], 0.8)
      : theme.palette.primary[500]
  })
}))

export default StyledProjectTaskCard