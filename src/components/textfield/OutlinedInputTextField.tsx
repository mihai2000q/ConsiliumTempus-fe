import { alpha, InputBase, InputBaseProps, styled, SxProps, Theme } from "@mui/material";
import { useRef, useState } from "react";

interface OutlinedInputProps extends InputBaseProps {
  isFocused: boolean,
  isTitle: boolean
}

const OutlinedInput = styled(
  InputBase,
  {
    shouldForwardProp: (prop) =>
      prop !== 'isFocused' &&
      prop !== 'isTitle'
  }
)<OutlinedInputProps>(({ theme, isFocused, error, isTitle }) => ({
  border: `solid 2px transparent`,
  borderRadius: isTitle === true ? '4px' : '9px',
  fontSize: isTitle === true ? 20 : 14,
  '& .MuiInputBase-input': {
    padding: isTitle === true ? '1px 5px' : '4px 6px',
  },
  ...(isFocused
    ? {
      borderColor: alpha(theme.palette.background[100], 0.7),
    }
    : {
      '&:hover': {
        '& .MuiInputBase-input': {
          padding: isTitle === true ? '2px 6px' : '5px 7px',
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
      isFocused={isFocused}
      isTitle={isTitle ?? false}
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