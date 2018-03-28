// @flow

import createBreakpoints, { type Breakpoints } from './createBreakpoints';
import createPalette, { type Palette } from './createPalette';
import createTypography, { type Typography } from './createTypography';
import shadows from './shadows';
import spacing from './spacing';
import transitions from './transitions';

export type Theme = {
  breakpoints: Breakpoints,
  palette: Palette,
  shadows: typeof shadows,
  spacing: typeof spacing,
  typography: Typography,
  transitions: typeof transitions,
};

const createTheme = (options: Object = {}): Theme => {
  const { breakpointOptions, paletteOptions, typographyOptions } = options;

  const breakpoints = createBreakpoints(breakpointOptions);
  const palette = createPalette(paletteOptions);
  const typography = createTypography(typographyOptions);

  return {
    breakpoints,
    palette,
    shadows,
    spacing,
    typography,
    transitions,
  };
};

export default createTheme;
