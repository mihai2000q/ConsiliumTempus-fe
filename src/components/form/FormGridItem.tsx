import Grid from '@mui/material/Grid2'
import { FormLabel } from '@mui/material'
import { ReactNode } from 'react'

interface FormGridItemProps {
  children: ReactNode,
  label: string | ReactNode,
  labelSize?: number | undefined,
  justifyContent?: string | undefined,

}

function FormGridItem({
                        children,
                        label,
                        labelSize,
                        justifyContent
                      }: FormGridItemProps) {
  labelSize ??= 4
  justifyContent ??= 'start'

  return (
    <>
      <Grid size={labelSize} display={'flex'} alignItems={'center'}>
        {typeof label === 'string' ? <FormLabel>{label}</FormLabel> : label}
      </Grid>
      <Grid
        size={12 - labelSize}
        display={'flex'}
        justifyContent={justifyContent}
        alignItems={'center'}
      >
        {children}
      </Grid>
    </>
  )
}

export default FormGridItem
