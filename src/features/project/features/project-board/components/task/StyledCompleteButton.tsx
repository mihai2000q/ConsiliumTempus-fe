import { IconButton, IconButtonProps, styled } from '@mui/material'

interface CompletedButtonProps extends IconButtonProps {
  isCompleted: boolean
}

const StyledCompleteButton = styled(IconButton, {
  shouldForwardProp: (props) => props !== 'isCompleted'
})<CompletedButtonProps>(({ theme, isCompleted }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  margin: '12px 16px 1px 16px',
  transition: theme.transitions.create(['color', 'background-color'], {
    duration: theme.transitions.duration.short
  }),
  color: isCompleted ? theme.palette.success.light : theme.palette.grey[500],
  '&:hover': {
    color: isCompleted ? theme.palette.success.dark : theme.palette.success.light
  }
}))

export default StyledCompleteButton
