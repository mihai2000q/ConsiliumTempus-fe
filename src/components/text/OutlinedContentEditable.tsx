import { alpha, Box, BoxProps, styled, SxProps, Theme, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { OverridableStringUnion } from "@mui/types";
import { Variant } from "@mui/material/styles/createTypography";
import { TypographyPropsVariantOverrides } from "@mui/material/Typography/Typography";

interface OutlinedBorderProps extends BoxProps {
  isFocused: boolean
}

const OutlinedBorder = styled(Box, {
  shouldForwardProp: (props) => props !== 'isFocused'
})<OutlinedBorderProps>(({ theme, isFocused }) => ({
  boxSizing: 'border-box',
  border: 'solid 2px transparent',
  borderRadius: '6px',
  ...(isFocused
    ? {
      borderColor: alpha(theme.palette.background[100], 0.7),
    }
    : {
      '&:hover': {
        padding: '1px',
        border: `solid 1px ${alpha(theme.palette.background[100], 0.7)}`,
      },
    })
}))

interface OutlinedInputTextFieldProps {
  value: string,
  handleChange: (change: string) => void,
  typographyVariant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>,
  sx?: SxProps<Theme> | undefined,
  noWrap?: boolean | undefined,
  maxLength?: number | undefined,
}

function OutlinedContentEditable({
  value,
  handleChange,
  typographyVariant,
  sx,
  noWrap,
  maxLength
}: OutlinedInputTextFieldProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [localNoWrap, setLocalNoWrap] = useState(noWrap)
  useEffect(() => {
    if (noWrap !== undefined) setLocalNoWrap(!isFocused)
  }, [isFocused]);

  const contentEditableRef = useRef(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (contentEditableRef.current && contentEditableRef.current.textContent !== value) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      contentEditableRef.current.textContent = value;
    }
  }, [contentEditableRef, value]) // TODO: CHECK THIS

  return (
    <OutlinedBorder isFocused={isFocused} sx={{ ...sx }}>
      <Typography
        ref={contentEditableRef}
        variant={typographyVariant}
        role={'textbox'}
        contentEditable
        suppressContentEditableWarning
        suppressHydrationWarning
        spellCheck={false}
        noWrap={localNoWrap}
        onInput={(e) => handleChange(e.currentTarget.textContent ?? '')}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => {
          if (maxLength && value.length === maxLength) {
            e.preventDefault()
          }

          if (e.key === 'Enter') {
            e.preventDefault()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            contentEditableRef.current.blur()
          }
        }}
        sx={{
          px: '4px',
          outline: 0
        }} />
    </OutlinedBorder>
  );
}

export default OutlinedContentEditable;