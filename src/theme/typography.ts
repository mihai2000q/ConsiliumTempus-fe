export const typographies = {
  h1: {
    fontFamily: fonts('"Source Sans 3"'),
    fontSize: 50,
    fontWeight: 900,
  },
  h2: {
    fontFamily: fonts('"Source Sans 3"'),
    fontSize: 48,
    fontWeight: 800
  },
  h3: {
    fontFamily: fonts('"Source Sans 3"'),
    fontSize: 36,
    fontWeight: 700
  },
  h4: {
    fontFamily: fonts('"Source Sans 3"'),
    fontSize: 26,
    fontWeight: 600
  },
  h5: {
    fontFamily: fonts('"Source Sans 3"'),
    fontSize: 22,
    fontWeight: 500
  },
  h6: {
    fontFamily: fonts('"Source Sans 3"'),
    fontSize: 16,
  },
  body1: {
    fontFamily: fonts('"Source Sans 3"'),
    fontSize: 14
  },
  body2: {
    fontFamily: fonts('"Source Sans 3"'),
    fontSize: 13,
  },
  subtitle1: {
    fontFamily: fonts('"Source Sans 3"'),
    fontSize: 12
  },
  subtitle2: {
    fontFamily: fonts('"Source Sans 3"'),
    fontSize: 12
  },
  caption: {
    fontFamily: fonts('"Source Sans 3"'),
    fontSize: 12,
    fontWeight: 600
  },
  button: {
    fontSize: 14,
    fontWeight: 600,
  }
}

function fonts(...strings: string[]) {
  return strings.join(',')
}