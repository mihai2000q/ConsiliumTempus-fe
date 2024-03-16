import { TextField } from "@mui/material";

interface PasswordTextFieldProps {
  label?: string,
  placeholder?: string,
  value: string,
  onValueChange: (password: string) => void
}

function PasswordTextField({
  label = 'Password',
  placeholder = 'Enter your password',
  ...props
}: PasswordTextFieldProps
) {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      type={'password'}
      value={props.value}
      onChange={e => props.onValueChange(e.target.value)} />
  );
}

export default PasswordTextField;