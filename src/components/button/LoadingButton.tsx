import { Box, Button, ButtonPropsVariantOverrides, CircularProgress } from '@mui/material'
import { ReactNode } from 'react'
import { OverridableStringUnion } from '@mui/types'

interface LoadingButtonProps {
  children: ReactNode,
  isLoading: boolean,
  type?: 'button' | 'submit' | 'reset' | undefined,
  variant?: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides> | undefined
}

function LoadingButton({
                         children,
                         isLoading,
                         variant,
                         type
                       }: LoadingButtonProps) {
  return (
    <Box position={'relative'}>
      <Button disabled={isLoading} variant={variant} type={type}>
        <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
          {children}
        </div>
      </Button>
      {isLoading &&
        <CircularProgress
          color={'secondary'}
          thickness={7}
          size={24}
          sx={{ position: 'absolute', top: '50%', left: '50%', mt: '-12px', ml: '-12px' }} />}
    </Box>
  )
}

export default LoadingButton
