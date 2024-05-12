import { TextField } from "@mui/material";
import React, { ReactNode } from "react";

interface PasswordTextFieldProps {
  name?: string,
  label?: string,
  placeholder?: string,
  error?: boolean,
  helperText?: ReactNode,
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>,
  value: string,
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
}

function PasswordTextField({
  name = 'password',
  label = 'Password',
  placeholder = 'Enter your password',
  ...props
}: PasswordTextFieldProps
) {
  return (
    <TextField
      name={name}
      label={label}
      placeholder={placeholder}
      error={props.error}
      helperText={props.helperText}
      type={'password'}
      value={props.value}
      onBlur={props.onBlur}
      onChange={props.onChange} />
  );
}

export default PasswordTextField;