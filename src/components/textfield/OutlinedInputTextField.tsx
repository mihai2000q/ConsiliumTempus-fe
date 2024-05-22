import { alpha, InputBase, InputBaseProps, styled, SxProps, Theme } from "@mui/material";
import { useRef } from "react";

const OutlinedInput = styled(InputBase)<InputBaseProps>(({ theme }) => ({
  border: `solid 2px ${alpha(theme.palette.background[100], 0.7)}`,
  borderRadius: '9px',
  padding: '2px 5px',
}))

interface OutlinedInputTextFieldProps {
  value: string,
  onChange: (change: string) => void,
  placeholder?: string | undefined,
  sx?: SxProps<Theme> | undefined,
  onBlur?: (() => void) | undefined
}

function OutlinedInputTextField({
  value,
  onChange,
  placeholder,
  onBlur,
  sx,
}: OutlinedInputTextFieldProps) {
  const inputRef = useRef(null)

  return (
    <OutlinedInput
      autoFocus
      inputRef={inputRef}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => {
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