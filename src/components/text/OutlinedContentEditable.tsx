import { alpha, Box, SxProps, Theme, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { OverridableStringUnion } from "@mui/types";
import { Variant } from "@mui/material/styles/createTypography";
import { TypographyPropsVariantOverrides } from "@mui/material/Typography/Typography";

interface OutlinedInputTextFieldProps {
  value: string,
  handleChange: (change: string) => void,
  typographyVariant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>,
  sx?: SxProps<Theme> | undefined,
  noWrap?: boolean | undefined
}

function OutlinedContentEditable({
  value,
  handleChange,
  typographyVariant,
  sx,
  noWrap
}: OutlinedInputTextFieldProps) {
  const theme = useTheme()

  const [isFocused, setIsFocused] = useState(false)
  const [localNoWrap, setLocalNoWrap] = useState(noWrap)
  useEffect(() => {
    if (noWrap !== undefined) setLocalNoWrap(!isFocused)
  }, [isFocused]);

  const borderColor = alpha(theme.palette.background[100], 0.7)

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
    <Box sx={{
      ...sx,
      boxSizing: 'border-box',
      border: 'solid 2px transparent',
      borderRadius: 1.5,
      ...(isFocused
        ? {
          borderColor: borderColor,
        }
        : {
          '&:hover': {
            padding: '1px',
            border: `solid 1px ${borderColor}`,
          },
        })
    }}>
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
    </Box>
  );
}

export default OutlinedContentEditable;