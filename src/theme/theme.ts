import { darkThemeColors, lightThemeColors } from './colors.ts'
import { typographies } from './typography.ts'
import { components } from './components.ts'
import { alpha } from '@mui/material'

export type ThemeMode = 'dark' | 'light';

const darkThemePalette = {
  primary: {
    ...darkThemeColors.primary,
    main: darkThemeColors.primary[400]
  },
  secondary: {
    ...darkThemeColors.secondary,
    main: darkThemeColors.secondary[300]
  },
  triadic: {
    ...darkThemeColors.triadic,
    main: darkThemeColors.triadic[900]
  },
  background: {
    ...darkThemeColors.background,
    default: darkThemeColors.background[900]
  },
  text: {
    primary: darkThemeColors.background[100],
    secondary: alpha(darkThemeColors.background[100], 0.7),
    triadic: alpha(darkThemeColors.background[100], 0.5)
  }
}

const lightThemePalette = {
  primary: {
    ...lightThemeColors.primary,
    main: lightThemeColors.primary[200]
  },
  secondary: {
    ...lightThemeColors.secondary,
    main: lightThemeColors.secondary[300]
  },
  triadic: {
    ...lightThemeColors.triadic,
    main: lightThemeColors.triadic[900]
  },
  background: {
    ...lightThemeColors.background,
    default: lightThemeColors.background[900]
  },
  text: {
    primary: lightThemeColors.background[100],
    secondary: alpha(lightThemeColors.background[100], 0.7),
    triadic: alpha(lightThemeColors.background[100], 0.6)
  }
}

export const themeSettings = (mode: ThemeMode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark' ? darkThemePalette : lightThemePalette)
    },
    typography: {
      ...typographies
    },
    components: {
      ...components
    }
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    triadic: PaletteColor,
  }

  interface PaletteColor {
    50: string,
    100: string,
    200: string,
    300: string,
    400: string,
    500: string,
    600: string,
    700: string,
    800: string,
    900: string,
  }

  interface TypeBackground {
    50: string,
    100: string,
    200: string,
    300: string,
    400: string,
    500: string,
    600: string,
    700: string,
    800: string,
    900: string,
  }

  interface TypeText {
    triadic: string
  }
}
