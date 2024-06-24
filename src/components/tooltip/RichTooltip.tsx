import { Divider, DividerProps, Stack, styled, Tooltip, Typography } from "@mui/material";
import { ReactElement } from "react";

interface ThickDividerProps extends DividerProps {
  thickness?: number | undefined
}

const ThickDivider = styled(Divider, {
  shouldForwardProp: (props) => props !== 'thickness',
})<ThickDividerProps>(({ theme, thickness, orientation }) => ({
  backgroundColor: theme.palette.text.secondary,
  borderRadius: 8,
  ...(thickness &&
    (orientation === "vertical"
      ? { borderRightWidth: thickness }
      : { borderBottomWidth: thickness }))
}))

interface RichTooltipProps {
  children: ReactElement,
  title?: string | undefined,
  arrow?: boolean | undefined,
  placement?: "bottom-end" | "bottom-start" | "bottom" | "left-end" | "left-start" | "left" | "right-end" | "right-start" | "right" | "top-end" | "top-start" | "top" | undefined,
  description?: string | undefined,
}

function RichTooltip({
  children,
  title,
  description,
  placement = 'top',
  arrow = true,
}: RichTooltipProps) {
  return (
    <Tooltip
      arrow={arrow}
      placement={placement}
      title={
        <Stack mx={0.5} my={0.75} spacing={0.5}>
          <Typography>{title}</Typography>
          <ThickDivider thickness={2} />
          <Typography variant={'subtitle1'}>{description}</Typography>
        </Stack>
      }>
      {children}
    </Tooltip>
  );
}

export default RichTooltip;