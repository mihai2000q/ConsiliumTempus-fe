import { alpha, ButtonProps, darken, DrawerProps, lighten, ListItemButtonProps, Theme } from "@mui/material";
import { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler } from "react";

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
    }),
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        borderRadius: '4px'
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: ({ ownerState, theme } : { ownerState: ButtonProps, theme: Theme }) => ({
        textTransform: 'none',
        '& .MuiButton-startIcon': {
          marginRight: '2px'
        },
        ...(ownerState.variant === 'outlined' && {
          color: theme.palette.primary[400],
          backgroundColor: 'transparent',
          '&:hover': {
            color: theme.palette.primary[300],
            backgroundColor: alpha(theme.palette.primary[100], 0.1)
          },
        }),
        ...(ownerState.variant === 'text' && {
          '&:hover': {
            color: theme.palette.primary[100],
            backgroundColor: alpha(theme.palette.primary[100], 0.1)
          },
        }),
        ...(ownerState.variant === 'text' && ownerState.size === 'small' && {
          padding: '6px 8px',
          borderRadius: '6px',
          fontSize: '12px',
          '&:hover': {
            color: theme.palette.primary[100],
            backgroundColor: alpha(theme.palette.primary[100], 0.1)
          },
          '& .MuiButton-startIcon': {
            marginRight: '4px'
          },
        }),
        ...(ownerState.variant === 'contained' && {
          backgroundColor: theme.palette.primary[700],
          '&:hover': {
            backgroundColor: theme.palette.primary[900]
          }
        })
      })
    }
  },
  MuiIconButton: {
    variants: [
      {
        props: { variant: 'standard' },
        style: {
          borderRadius: '7px',
          width: 30,
          height: 30,
          fontSize: '17px',
          "& .MuiTouchRipple-root .MuiTouchRipple-child": {
            borderRadius: '7px',
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
      root: ({ ownerState, theme } : { ownerState: { selected: true }, theme: Theme }) => ({
        textTransform: 'none',
        borderRadius: '8px 8px 0px 0px',
        padding: '8px 8px 10px 6px',
        minHeight: '10px',
        transition: theme.transitions.create(['background-color', 'color'], {
          duration: theme.transitions.duration.short,
        }),
        '&:hover': {
          color: ownerState.selected ? theme.palette.primary[200] : theme.palette.primary[50],
          backgroundColor: alpha(theme.palette.primary[100], 0.1),
        }
      })
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 0
      }
    }
  },
  MuiListItemButton: {
    styleOverrides: {
      root: ({ ownerState, theme } : { ownerState: ListItemButtonProps, theme: Theme }) => ({
        alignItems: 'center',
        borderRadius: '10px',
        margin: '1px 16px',
        padding: '4px 12px',
        transition: theme.transitions.create(['background-color', 'color'], {
          duration: theme.transitions.duration.short,
        }),
        color: ownerState.selected ? theme.palette.primary[200] : theme.palette.background[200],
        '&:hover': {
          color: ownerState.selected ? theme.palette.primary[50] : theme.palette.background[50],
          backgroundColor: alpha(theme.palette.primary[100], 0.1),
          '& .MuiListItemIcon-root': {
            color: ownerState.selected ? theme.palette.primary[50] : theme.palette.background[50],
          }
        },
        '& .MuiListItemIcon-root': {
          transition: theme.transitions.create(['color'], {
            duration: theme.transitions.duration.short,
          }),
          color: ownerState.selected ? theme.palette.primary[200] : theme.palette.background[200],
          marginRight: '8px'
        }
      })
    }
  },
  MuiDrawer: {
    styleOverrides: {
      root: ({ ownerState, theme } : { ownerState: DrawerProps, theme: Theme }) => ({
        ...(ownerState.variant === 'persistent' && {
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background[800],
            ...(theme.palette.mode === 'dark' && { border: 0 })
          },
        })
      })
    }
  },
  MuiMenu: {
    styleOverrides: {
      root: ({ theme } : { theme: Theme }) => ({
        '& .MuiPaper-root': {
          backgroundColor: theme.palette.background[900],
          color: theme.palette.background[50],
          backgroundImage: 'none'
        }
      })
    }
  },
  MuiPopper: {
    styleOverrides: {
      root: ({ theme } : { theme: Theme }) => ({
        '& .MuiTooltip-tooltip': {
          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background[700] : theme.palette.primary[600],
          color: theme.palette.mode === 'dark' ? theme.palette.background[100] : theme.palette.background[900]
        }
      })
    }
  },
  MuiDialog: {
    styleOverrides: {
      root: ({ theme } : { theme: Theme }) => ({
        '& .MuiDialog-paper': {
          backgroundImage: 'none',
          backgroundColor: theme.palette.mode === 'dark'
            ? lighten(theme.palette.background[900], 0.02)
            : lighten(theme.palette.background[800], 0.02)
        }
      })
    }
  },
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme } : { theme: Theme }) => ({
        backgroundColor: darken(theme.palette.background[900], 0.3),
      })
    }
  },
  MuiLink: {
    styleOverrides: {
      root: ({ theme } : { theme: Theme }) => ({
        cursor: 'pointer',
        transition: theme.transitions.create(['color'], {
          duration: theme.transitions.duration.short,
        }),
        color: theme.palette.background[200],
        '&: hover': {
          color: theme.palette.secondary[100]
        }
      })
    },
    defaultProps: {
      underline: 'hover'
    }
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonOwnProps {
    variant?: 'standard' | 'dashed' | 'circular';
  }
}

declare module '@mui/material/Typography' {
  interface TypographyOwnProps {
    onKeyDown?: KeyboardEventHandler<HTMLSpanElement>,
    onFocus?: FocusEventHandler<HTMLSpanElement>,
    onBlur?: FocusEventHandler<HTMLSpanElement>,
    onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
    contentEditable?: boolean,
    suppressContentEditableWarning?: boolean,
  }
}