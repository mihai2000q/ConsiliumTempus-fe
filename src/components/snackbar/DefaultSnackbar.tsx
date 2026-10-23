import { HTMLAttributes, Ref } from 'react'
import { CustomContentProps, SnackbarContent } from 'notistack'

function DefaultSnackbar({
  message,
  ref,
  ...other
}: CustomContentProps & { ref?: Ref<HTMLDivElement> }) {
  return (
    <SnackbarContent ref={ref} role="alert" {...(other as HTMLAttributes<HTMLDivElement>)}>
      {message}
    </SnackbarContent>
  )
}

export default DefaultSnackbar
