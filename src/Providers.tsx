import React from 'react'
import { BrowserRouter } from 'react-router'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useAppSelector } from './state/store.ts'
import SnackbarProvider from './providers/SnackbarProvider.tsx'
import { themeSettings } from './theme/theme.ts'

function Providers({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector((state) => state.global.mode)
  const theme = createTheme(themeSettings(mode))

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
