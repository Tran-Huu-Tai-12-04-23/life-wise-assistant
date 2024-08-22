import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function overrides(theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          maxWidth: '100%',
          display: 'inline-block',
          verticalAlign: 'bottom',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.background.default, 0.4),
          backdropFilter: 'blur(3px)',
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedInherit: {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.grey[800],
          '&:hover': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.grey[800],
          },
        },
        sizeLarge: {
          minHeight: 48,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: theme.customShadows.card,
          borderRadius: Number(theme.shape.borderRadius) * 2,
          position: 'relative',
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: alpha(theme.palette.grey[500], 0.24),
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backdropFilter: 'blur(10px) !important',
          backgroundColor: theme.palette.background.neutral,
        },
        arrow: {
          color: theme.palette.background.neutral,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: '#000',
          backdropFilter: 'blur(10px) !important',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: `0px 5px 5px -3px ${alpha(
            theme.palette.background.default,
            0.9
          )} ,0px 8px 10px 1px ${alpha(
            theme.palette.background.default,
            0.9
          )}, 0px 3px 14px 2px ${alpha(theme.palette.background.default, 0.9)}`,
          background: alpha(theme.palette.background.default, 0.5),
          backdropFilter: 'blur(10px) !important',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        paper: {
          backdropFilter: 'blur(10px) !important',
          backgroundColor: alpha(theme.palette.background.default, 0.5),
          boxShadow: `0px 5px 5px -3px ${alpha(
            theme.palette.background.default,
            0.9
          )} ,0px 8px 10px 1px ${alpha(
            theme.palette.background.default,
            0.9
          )}, 0px 3px 14px 2px ${alpha(theme.palette.background.default, 0.9)}`,
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          backdropFilter: 'blur(10px) !important',
          backgroundColor: theme.palette.background.neutral,
          backgroundImage: 'none',
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px) !important',
          color: theme.palette.text.primary,
        },
      },
    },
  };
}
