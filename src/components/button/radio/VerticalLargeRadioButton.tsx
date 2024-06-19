import { alpha, Box, BoxProps, styled } from "@mui/material";

interface ProjectStatusButtonProps extends BoxProps {
  isSelected: boolean
}

const VerticalLargeRadioButton = styled(Box, {
  shouldForwardProp: (props) => props !== 'isSelected'
})<ProjectStatusButtonProps>(({ theme, isSelected }) => ({
  padding: '20px 24px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'start',
  borderRadius: 0,
  fontWeight: 600,
  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.short,
  }),
  backgroundColor: 'transparent',
  color: theme.palette.text.secondary,
  '&: hover': {
    backgroundColor: alpha(theme.palette.background[100], 0.08),
    color: theme.palette.background[200],
  },
  ...(isSelected && {
    backgroundColor: alpha(theme.palette.background[100], 0.08),
    color: theme.palette.background[200],
    '&:hover': {
      backgroundColor: alpha(theme.palette.background[100], 0.13),
      color: theme.palette.background[50],
    }
  })
}))

export default VerticalLargeRadioButton;