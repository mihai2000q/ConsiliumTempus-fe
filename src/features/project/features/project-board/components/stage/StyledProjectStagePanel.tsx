import { alpha, Stack, StackProps, styled } from '@mui/material'

interface StyledProjectStagePanelProps extends StackProps {
  isDragHandleHovered?: boolean | undefined,
  isDragging?: boolean | undefined,
  isDragged?: boolean | undefined
}

const StyledProjectStagePanel = styled(Stack, {
  shouldForwardProp: (props) =>
    props !== 'isDragging' &&
    props !== 'isDragged' &&
    props !== 'isDragHandleHovered'
})<StyledProjectStagePanelProps>(({
                                    theme,
                                    isDragHandleHovered,
                                    isDragging,
                                    isDragged
                                  }) => ({
  height: '100%',
  width: 335,
  padding: '11px 11px 0px 11px',
  backdropFilter: 'blur(2px)',
  borderRadius: '16px',
  boxShadow: theme.shadows[4],
  transition: theme.transitions.create(['box-shadow', 'border-color'], {
    duration: theme.transitions.duration.standard
  }),
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.primary[800], 0.25)
    : alpha(theme.palette.background[800], 0.25),
  border: '1px solid transparent',
  ...(isDragHandleHovered === true && {
    borderColor: alpha(theme.palette.background[100], 0.45)
  }),
  ...(isDragging === false && {
    '&:hover': {
      boxShadow: theme.shadows[12]
    }
  }),
  ...(isDragged === true && {
    cursor: 'grabbing',
    zIndex: theme.zIndex.modal,
    borderColor: 'transparent'
  })
}))

export default StyledProjectStagePanel
