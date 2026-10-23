import React, { useMemo } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useAppSelector } from './state/store.ts'
import SnackbarProvider from './providers/SnackbarProvider.tsx'
import { themeSettings } from './theme/theme.ts'

function Providers({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector((state) => state.global.mode)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <CssBaseline enableColorScheme />
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </BrowserRouter>
  )
}

export default Providers
