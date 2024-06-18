import { FormLabel, Grid } from "@mui/material";
import { ReactNode } from "react";

interface FormGridItemProps {
  children: ReactNode,
  label: string | ReactNode
}

function FormGridItem({ label, children }: FormGridItemProps) {
  return (
    <>
      <Grid item xs={4} display={'flex'} alignItems={'center'}>
        {typeof label === 'string' ? <FormLabel>{label}</FormLabel> : label}
      </Grid>
      <Grid item xs={8} display={'flex'} justifyContent={'center'}>
        {children}
      </Grid>
    </>
  );
}

export default FormGridItem;