export type ThemeMode = 'dark' | 'light';

export const darkThemeColors = {
  grey: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000",
  },
  primary: {
    // blue
    100: "#d3d4de",
    200: "#a6a9be",
    300: "#7a7f9d",
    400: "#4d547d",
    500: "#21295c",
    600: "#191F45",
    700: "#141937",
    800: "#0d1025",
    900: "#070812",
  },
  secondary: {
    // yellow
    50: "#f0f0f0",
    100: "#fff6e0",
    200: "#ffedc2",
    300: "#ffe3a3",
    400: "#ffda85",
    500: "#ffd166",
    600: "#cca752",
    700: "#997d3d",
    800: "#665429",
    900: "#332a14",
  },
};

type PaletteColor = typeof darkThemeColors

function reverseColorsOrder(themeColors: PaletteColor) {
  const reversedThemeColors = {};
  Object.entries(themeColors).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedTheme = {};
    for (let i = 0; i < length; i++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      reversedTheme[keys[i]] = values[length - i - 1];
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    reversedThemeColors[key] = reversedTheme;
  })
  return reversedThemeColors;
}

export const lightThemeColors: PaletteColor = reverseColorsOrder(darkThemeColors) as PaletteColor

const darkThemePalette = {
  primary: {
    ...darkThemeColors.primary,
    main: darkThemeColors.primary[400],
    light: darkThemeColors.primary[400],
  },
  secondary: {
    ...darkThemeColors.secondary,
    main: darkThemeColors.secondary[300],
  },
  neutral: {
    ...darkThemeColors.grey,
    main: darkThemeColors.grey[500],
  },
  background: {
    default: darkThemeColors.primary[600],
    alt: darkThemeColors.primary[500],
  }
}

const lightThemePalette = {
  primary: {
    ...lightThemeColors.primary,
    main: lightThemeColors.primary[400],
    light: lightThemeColors.primary[400],
  },
  secondary: {
    ...lightThemeColors.secondary,
    main: lightThemeColors.secondary[300],
  },
  neutral: {
    ...lightThemeColors.grey,
    main: lightThemeColors.grey[500],
  },
  background: {
    default: lightThemeColors.primary[900],
    alt: lightThemeColors.primary[500],
  }
}

export const themeSettings = (mode: ThemeMode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark' ? darkThemePalette : lightThemePalette)
    },
    typography: {
      // TODO: Add Typography
    }
  }
}