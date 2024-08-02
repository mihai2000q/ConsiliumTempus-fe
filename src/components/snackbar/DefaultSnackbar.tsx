import React from 'react';
import { SnackbarContent } from "notistack";

const DefaultSnackbar = React.forwardRef<HTMLDivElement>((props, ref) => {
  const {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    message,
    ...other
  } = props

  return (
    <SnackbarContent ref={ref} role="alert" {...other}>
      {message}
    </SnackbarContent>
  )
})

export default DefaultSnackbar;