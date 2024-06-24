import { alpha, InputBase, InputBaseProps, styled, SxProps, Theme } from "@mui/material";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";

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
  ...(error === true && {
    borderColor: theme.palette.error.main,
    '&:hover': { borderColor: theme.palette.error.main }
  })
}))

interface OutlinedInputTextFieldProps {
  value: string,
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
  name?: string | undefined,
  placeholder?: string,
  autoFocus?: boolean,
  fullWidth?: boolean,
  multiline?: boolean,
  isTitle?: boolean,
  error?: boolean,
  minRows?: number,
  maxLength?: number,
  sx?: SxProps<Theme> | undefined,
  onBlur?: ((e: unknown) => unknown),
  onBlurEvent?: (() => void) | undefined,
}

function OutlinedInputTextField({
  value,
  onChange,
  name,
  placeholder,
  autoFocus,
  fullWidth,
  multiline,
  isTitle,
  error,
  onBlur,
  onBlurEvent,
  minRows,
  maxLength,
  sx,
}: OutlinedInputTextFieldProps) {
  const inputRef = useRef<HTMLElement>(null)

  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus, inputRef]);

  return (
    <OutlinedInput
      autoFocus={autoFocus}
      fullWidth={fullWidth}
      multiline={multiline}
      minRows={minRows}
      inputProps={{ maxLength: maxLength }}
      error={error}
      inputRef={inputRef}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      isFocused={isFocused}
      isTitle={isTitle ?? false}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        setIsFocused(false)
        if (onBlurEvent) onBlurEvent()
        if (onBlur) onBlur(e)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          inputRef.current?.blur()
        }
      }}
      sx={{ ...sx }} />
  );
}

export default OutlinedInputTextField;