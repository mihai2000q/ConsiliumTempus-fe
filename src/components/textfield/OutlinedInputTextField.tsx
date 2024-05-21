import { alpha, Box, SxProps, Theme, Typography, useTheme } from "@mui/material";
import { ChangeEventHandler, useState } from "react";
import { OverridableStringUnion } from "@mui/types";
import { Variant } from "@mui/material/styles/createTypography";
import { TypographyPropsVariantOverrides } from "@mui/material/Typography/Typography";

interface OutlinedInputTextFieldProps {
  value: string,
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
  typographyVariant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>,
  sx?: SxProps<Theme> | undefined,
}

function OutlinedInputTextField({
  value,
  onChange,
  typographyVariant,
  sx
}: OutlinedInputTextFieldProps) {
  const theme = useTheme()

  const [isFocused, setIsFocused] = useState(false)

  const borderColor = alpha(theme.palette.background[100], 0.7)

  return (
    <Box sx={{
      ...sx,
      border: 'solid 2px transparent',
      borderRadius: 1.5,
      '&:hover': {
        borderColor: borderColor,
      },
      ...(isFocused && {
        borderColor: borderColor,
      })
    }}>
      <Typography
        variant={typographyVariant}
        role={'textbox'}
        contentEditable
        suppressContentEditableWarning
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        sx={{
          py: 0.3,
          px: 0.75,
          outline: 0,
          border: 'solid 1px transparent',
        }}>
        {value}
      </Typography>
    </Box>
  );
}

export default OutlinedInputTextField;