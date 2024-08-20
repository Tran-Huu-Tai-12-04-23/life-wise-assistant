import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS

export const grey = {
  0: '#000000',
  100: '#1C1C1C',
  200: '#2C2C2C',
  300: '#3C3C3C',
  400: '#4C4C4C',
  500: '#6C6C6C',
  600: '#8C8C8C',
  700: '#A0A0A0',
  800: '#C0C0C0',
  900: '#D0D0D0',
};

export const primary = {
  lighter: '#004D32',
  light: '#5AE49B',
  main: '#007C54',
  dark: '#00594C',
  darker: '#003B35',
  contrastText: '#FFFFFF',
};

export const secondary = {
  lighter: '#3B1A6B',
  light: '#4E1D8D',
  main: '#6F1EAE',
  dark: '#4A148C',
  darker: '#2E0D4F',
  contrastText: '#FFFFFF',
};

export const info = {
  lighter: '#004D6C',
  light: '#007AB8',
  main: '#00A4D7',
  dark: '#006089',
  darker: '#004060',
  contrastText: '#FFFFFF',
};

export const success = {
  lighter: '#004D32',
  light: '#007C54',
  main: '#00A76F',
  dark: '#00594C',
  darker: '#003B35',
  contrastText: '#FFFFFF',
};

export const warning = {
  lighter: '#6A4F00',
  light: '#8F6600',
  main: '#FFAB00',
  dark: '#B76E00',
  darker: '#7A4100',
  contrastText: grey[800],
};

export const error = {
  lighter: '#6A0C0C',
  light: '#A71E1E',
  main: '#FF5630',
  dark: '#B71D18',
  darker: '#7A0916',
  contrastText: '#FFFFFF',
};

export const common = {
  black: '#000000',
  white: '#FFFFFF',
};

export const action = {
  hover: alpha(grey[500], 0.24),
  selected: alpha(grey[500], 0.32),
  disabled: alpha(grey[500], 0.48),
  disabledBackground: alpha(grey[500], 0.16),
  focus: alpha(grey[500], 0.32),
  hoverOpacity: 0.24,
  disabledOpacity: 0.48,
};

const base = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: alpha(grey[200], 0.4),
  action,
};

// ----------------------------------------------------------------------

export function paletteDark() {
  return {
    ...base,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: '#909EAB',
      disabled: grey[500],
    },
    background: {
      paper: '#1C252E',
      default: '#141A21',
      neutral: '#141A21',
    },
    action: {
      ...base.action,
      active: '#909EAB',
    },
  };
}
