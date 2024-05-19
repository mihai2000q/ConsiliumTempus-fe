import { Theme } from "@mui/material";

export const components = {
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => `
      h1 {
        color: ${theme.palette.background[100]}
      },
      h2 {
        color: ${theme.palette.background[100]}
      },
      h3 {
        color: ${theme.palette.background[100]}
      },
      h4 {
        color: ${theme.palette.background[100]}
      },
      h5 {
        color: ${theme.palette.background[100]}
      },
      h6 {
        color: ${theme.palette.background[100]}
      },
    `
  }
}