import React, { HTMLAttributes } from 'react'
import { CustomContentProps, SnackbarContent } from 'notistack'

const DefaultSnackbar = React.forwardRef<HTMLDivElement, CustomContentProps>(function DefaultSnackbar(props, ref) {
  const {
    message,
    ...other
  } = props

  return (
    <SnackbarContent ref={ref} role="alert" {...(other as HTMLAttributes<HTMLDivElement>)}>
      {message}
    </SnackbarContent>
  )
})

export default DefaultSnackbar
