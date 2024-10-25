import { TextField } from '@mui/material'
import React, { ReactNode } from 'react'

interface PasswordTextFieldProps {
  value: string,
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
  name?: string,
  label?: string,
  placeholder?: string,
  error?: boolean,
  helperText?: ReactNode,
  maxLength?: number,
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>,
}

function PasswordTextField({
                             value,
                             onChange,
                             onBlur,
                             error,
                             helperText,
                             maxLength,
                             name = 'password',
                             label = 'Password',
                             placeholder = 'Enter your password'
                           }: PasswordTextFieldProps) {
  return (
    <TextField
      name={name}
      label={label}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      type={'password'}
      inputProps={{ maxLength: maxLength }}
      value={value}
      onBlur={onBlur}
      onChange={onChange} />
  )
}

export default PasswordTextField
