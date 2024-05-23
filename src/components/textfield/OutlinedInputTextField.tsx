import { alpha, InputBase, InputBaseProps, styled, SxProps, Theme } from "@mui/material";
import { useRef, useState } from "react";

const OutlinedInput = styled(
  InputBase,
  {
    shouldForwardProp: (prop) =>
      prop !== 'isFocused' &&
      prop !== 'isTitle'
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
)<InputBaseProps>(({ theme, isFocused, error, isTitle }) => ({
  border: `solid 2px transparent`,
  borderRadius: isTitle === true ? '4px' : '9px',
  fontSize: isTitle === true ? 20 : 14,
  '& .MuiInputBase-input': {
    padding: isTitle === true ? '1px 5px' : '2px 5px',
  },
  ...(isFocused
    ? {
      borderColor: alpha(theme.palette.background[100], 0.7),
    }
    : {
      '&:hover': {
        '& .MuiInputBase-input': {
          padding: isTitle === true ? '2px 6px' : '3px 6px',
        },
        border: `solid 1px ${alpha(theme.palette.background[100], 0.7)}`,
      },
    }),
  ...(error === true && { borderColor: theme.palette.error.main })
}))

interface OutlinedInputTextFieldProps {
  value: string,
  onChange: (change: string) => void,
  placeholder?: string | undefined,
  autoFocus?: boolean | undefined,
  fullWidth?: boolean | undefined,
  multiline?: boolean | undefined,
  isTitle?: boolean | undefined,
  error?: boolean | undefined,
  sx?: SxProps<Theme> | undefined,
  onBlur?: (() => void) | undefined,
}

function OutlinedInputTextField({
  value,
  onChange,
  placeholder,
  autoFocus,
  fullWidth,
  multiline,
  isTitle,
  error,
  onBlur,
  sx,
}: OutlinedInputTextFieldProps) {
  const inputRef = useRef(null)

  const [isFocused, setIsFocused] = useState(false)

  return (
    <OutlinedInput
      autoFocus={autoFocus}
      fullWidth={fullWidth}
      multiline={multiline}
      error={error}
      inputRef={inputRef}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      isFocused={isFocused}
      isTitle={isTitle}
      onFocus={() => setIsFocused(true)}
      onBlur={() => {
        setIsFocused(false)
        if (onBlur) onBlur()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          inputRef.current.blur()
        }
      }}
      sx={{ ...sx }} />
  );
}

export default OutlinedInputTextField;