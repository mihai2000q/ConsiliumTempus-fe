import { Divider, DividerProps, Stack, styled, Tooltip, Typography } from '@mui/material'
import { ReactElement } from 'react'

interface ThickDividerProps extends DividerProps {
  thickness?: number | undefined
}

const ThickDivider = styled(Divider, {
  shouldForwardProp: (props) => props !== 'thickness'
})<ThickDividerProps>(({ theme, thickness, orientation }) => ({
  backgroundColor: theme.palette.text.secondary,
  borderRadius: 8,
  ...(thickness &&
    (orientation === 'vertical'
      ? { borderRightWidth: thickness }
      : { borderBottomWidth: thickness }))
}))

interface RichTooltipProps {
  children: ReactElement,
  title: string,
  description?: string,
  arrow?: boolean,
  enterDelay?: number,
  leaveDelay?: number,
  width?: number,
  placement?: 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top' | undefined,
}

function RichTooltip({
                       children,
                       title,
                       description,
                       enterDelay = 300,
                       leaveDelay = 100,
                       placement = 'top',
                       arrow = true,
                       width = 150
                     }: RichTooltipProps) {
  return (
    <Tooltip
      arrow={arrow}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      placement={placement}
      title={
        <Stack mx={0.3} my={0.5} spacing={0.5} width={width}>
          <Typography>{title}</Typography>
          <ThickDivider thickness={2} />
          <Typography variant={'subtitle1'}>{description}</Typography>
        </Stack>
      }>
      {children}
    </Tooltip>
  )
}

export default RichTooltip
