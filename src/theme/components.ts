import { alpha, Theme } from "@mui/material";
import { ChangeEventHandler, FocusEventHandler } from "react";

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
      root: ({ ownerState, theme }) => ({
        textTransform: 'none',
        '& .MuiButton-startIcon': {
          marginRight: 2
        },
        ...(ownerState.variant === 'outlined' && {
          '&:hover': {
            color: theme.palette.primary[300],
          },
        }),
        ...(ownerState.variant === 'text' && {
          '&:hover': {
            color: theme.palette.primary[100],
          },
        }),
        ...(ownerState.variant === 'text' && ownerState.size === 'small' && {
          padding: '6px 8px',
          borderRadius: '6px',
          fontSize: '12px',
          '&:hover': {
            color: theme.palette.primary[100],
          },
          '& .MuiButton-startIcon': {
            marginRight: 4
          },
        })
      })
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
  MuiTabs: {
    styleOverrides: {
      root: {
        minHeight: '10px'
      }
    }
  },
  MuiTab: {
    defaultProps: {
      iconPosition: 'start'
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        textTransform: 'none',
        borderRadius: '8px 8px 0px 0px',
        padding: '8px 8px 10px 6px',
        minHeight: '10px',
        '&:hover': {
          color: ownerState.selected ? theme.palette.primary[200] : theme.palette.primary[50],
          "& .MuiTouchRipple-root": {
            backgroundColor: alpha(theme.palette.background[500], 0.1),
          }
        }
      })
    },
  },
}

declare module '@mui/material/IconButton' {
  interface IconButtonOwnProps {
    variant?: 'standard' | 'dashed' | 'circular';
  }
}

declare module '@mui/material/Typography' {
  interface TypographyOwnProps {
    onFocus?: FocusEventHandler<HTMLSpanElement>,
    onBlur?: FocusEventHandler<HTMLSpanElement>,
    onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
    contentEditable?: boolean,
    suppressContentEditableWarning?: boolean,
  }
}