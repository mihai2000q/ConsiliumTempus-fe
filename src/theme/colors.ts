export const darkThemeColors = {
  primary: {
    // purple
    50: "#ebebf2",
    100: "#cccbdf",
    200: "#acaac9",
    300: "#8d89b2",
    400: "#776fa1",
    500: "#635592",
    600: "#5c4d89",
    700: "#53437d",
    800: "#4b3a70", // primary
    900: "#3c2a58",
  },
  secondary: {
    // light purple
    50: "#ecddf5",
    100: "#edd2f1",
    200: "#b7a2c9", // primary
    300: "#9d7bb7",
    400: "#8a5dac",
    500: "#7840a1",
    600: "#703b9b",
    700: "#653292",
    800: "#5b2c8a",
    900: "#4b207d",
  },
  // TODO: Choose better nuances
  triadic: {
    // deep purple
    50: "#fffaff",
    100: "#faf5ff",
    200: "#f5f0ff",
    300: "#f0ebff",
    400: "#d2cee6",
    500: "#716a8f",
    600: "#595370",
    700: "#3b374b",
    800: "#322f42", // primary
    900: "#282b3c",
  },
  background: {
    // dark purple
    50: "#faf6ff",
    100: "#f7f1ff",
    200: "#f5ecff",
    300: "#e7dcf5",
    400: "#c0b4d2",
    500: "#9f8cb3",
    600: "#7b6e89",
    700: "#675a74",
    800: "#302540",
    900: "#262131", // primary
  }
};

type ThemePaletteColors = typeof darkThemeColors

function reverseColorsOrder(themeColors: ThemePaletteColors) {
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

export const lightThemeColors: ThemePaletteColors = reverseColorsOrder(darkThemeColors) as ThemePaletteColors