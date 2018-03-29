// @flow

import { shade, tint, darken, lighten } from 'polished';
import * as colors from './colors';

type PaletteColor = {
  light: string,
  main: string,
  dark: string,
};

export type Palette = {
  primary: PaletteColor,
  secondary: PaletteColor,
  text: {
    inputText: string,
    labelText: string,
  },
};

const createPaletteColor = (color: string): PaletteColor => ({
  light: lighten(0.2, color),
  main: color,
  dark: darken(0.2, color),
});

const createPalette = (options: Object = {}): Palette => {
  const {
    primary = colors.common.grey,
    secondary = '#fff',
    text = {
      inputText: colors.common.black,
      labelText: colors.common.grey,
    },
  } = options;

  return {
    primary: createPaletteColor(primary),
    secondary: createPaletteColor(secondary),
    text,
  };
};

export default createPalette;
