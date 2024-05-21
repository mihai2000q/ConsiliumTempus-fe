import { alpha, Box, SxProps, Theme, Typography, useTheme } from "@mui/material";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { OverridableStringUnion } from "@mui/types";
import { Variant } from "@mui/material/styles/createTypography";
import { TypographyPropsVariantOverrides } from "@mui/material/Typography/Typography";

interface OutlinedInputTextFieldProps {
  value: string,
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
  typographyVariant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>,
  sx?: SxProps<Theme> | undefined,
  autoFocus?: boolean | undefined,
  onBlur?: (() => void) | undefined
  onEnter?: (() => void) | undefined
}

function OutlinedInputTextField({
  value,
  onChange,
  typographyVariant,
  sx,
  autoFocus,
  onBlur,
  onEnter
}: OutlinedInputTextFieldProps) {
  const theme = useTheme()

  const [isFocused, setIsFocused] = useState(false)

  const borderColor = alpha(theme.palette.background[100], 0.7)

  const inputRef = useRef(null)
  useEffect(() => {
    if (autoFocus && inputRef !== null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      inputRef.current.focus()
    }
  }, [autoFocus, inputRef]);

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
        ref={inputRef}
        variant={typographyVariant}
        role={'textbox'}
        contentEditable
        suppressContentEditableWarning
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false)
          if (onBlur) onBlur()
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            if (onEnter) onEnter()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            inputRef.current.blur()
          }
        }}
        sx={{
          py: 0.3,
          px: 0.75,
          outline: 0,
        }}>
        {value}
      </Typography>
    </Box>
  );
}

export default OutlinedInputTextField;