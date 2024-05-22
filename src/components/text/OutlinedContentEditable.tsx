import { alpha, Box, SxProps, Theme, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { OverridableStringUnion } from "@mui/types";
import { Variant } from "@mui/material/styles/createTypography";
import { TypographyPropsVariantOverrides } from "@mui/material/Typography/Typography";

interface OutlinedInputTextFieldProps {
  value: string,
  handleChange: (change: string) => void,
  typographyVariant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>,
  sx?: SxProps<Theme> | undefined
}

function OutlinedContentEditable({
  value,
  handleChange,
  typographyVariant,
  sx,
}: OutlinedInputTextFieldProps) {
  const theme = useTheme()

  const [isFocused, setIsFocused] = useState(false)

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
  });

  return (
    <Box sx={{
      ...sx,
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
        component={'span'}
        role={'textbox'}
        contentEditable
        suppressContentEditableWarning
        suppressHydrationWarning
        spellCheck={false}
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
          py: 0.3,
          px: 0.75,
          outline: 0,
        }} />
    </Box>
  );
}

export default OutlinedContentEditable;