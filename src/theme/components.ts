import { Theme } from "@mui/material";

export const components = {
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      h1: {
        color: theme.palette.background[100]
      },
      h2: {
        color: theme.palette.background[100]
      },
      h3: {
        color: theme.palette.background[100]
      },
      h4: {
        color: theme.palette.background[100]
      },
      h5: {
        color: theme.palette.background[100]
      },
      h6: {
        color: theme.palette.background[100]
      },
    })
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none'
      }
    }
  },
  MuiIconButton: {
    variants: [
      {
        props: { variant: 'standard' },
        style: {
          borderRadius: '20%',
          width: 30,
          height: 30,
          fontSize: '17px',
          "& .MuiTouchRipple-root .MuiTouchRipple-child": {
            borderRadius: '20%',
          }
        },
      },
      {
        props: { variant: 'dashed' },
        style: {
          width: 30,
          height: 30,
          fontSize: '17px',
          border: 'dashed 1px',
          borderRadius: '50%',
          "& .MuiTouchRipple-root .MuiTouchRipple-child": {
            borderRadius: '50%'
          }
        },
      },
      {
        props: { variant: 'circular' },
        style: {
          borderRadius: '50%',
          "& .MuiTouchRipple-root .MuiTouchRipple-child": {
            borderRadius: '50%'
          }
        },
      }
    ],
    defaultProps: {
      variant: 'standard',
    }
  },
  MuiSvgIcon: {
    defaultProps: {
      fontSize: 'small'
    }
  },
  MuiTab: {
    defaultProps: {
      iconPosition: 'start'
    },
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: '8px 8px 0px 0px',
        padding: '8px 8px 10px 6px',
        minHeight: '10px'
      }
    },
  },
}

declare module '@mui/material/IconButton' {
  interface IconButtonOwnProps {
    variant?: 'standard' | 'dashed' | 'circular';
  }

  interface ButtonOwnProps {
    borderRadius?: number | string,
    boxShadow?: number | string,
  }
}